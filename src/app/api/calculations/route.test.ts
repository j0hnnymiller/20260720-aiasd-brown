import { beforeEach, describe, expect, it, vi } from "vitest";

const appendFileMock = vi.fn();
const mkdirMock = vi.fn();

vi.mock("node:fs/promises", () => ({
  appendFile: appendFileMock,
  mkdir: mkdirMock,
}));

async function loadRouteWithFlag(enabled: boolean) {
  vi.resetModules();
  vi.doMock("@/lib/featureFlags", () => ({
    isEnabled: (flag: string) => flag === "calculationLoggingFeature" && enabled,
  }));

  return import("./route");
}

describe("POST /api/calculations", () => {
  beforeEach(() => {
    appendFileMock.mockReset();
    mkdirMock.mockReset();
  });

  it("returns 204 and skips file writes when logging flag is disabled", async () => {
    const { POST } = await loadRouteWithFlag(false);

    const request = new Request("http://localhost/api/calculations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expression: "2 + 3", result: "5" }),
    });

    const response = await POST(request);

    expect(response.status).toBe(204);
    expect(mkdirMock).not.toHaveBeenCalled();
    expect(appendFileMock).not.toHaveBeenCalled();
  });

  it("returns 400 for invalid payload", async () => {
    const { POST } = await loadRouteWithFlag(true);

    const request = new Request("http://localhost/api/calculations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expression: "", result: "5" }),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body).toEqual({
      error: "Invalid payload. Expected non-empty expression and result.",
    });
    expect(mkdirMock).not.toHaveBeenCalled();
    expect(appendFileMock).not.toHaveBeenCalled();
  });

  it("appends log line when payload is valid and feature flag is enabled", async () => {
    const { POST } = await loadRouteWithFlag(true);

    const request = new Request("http://localhost/api/calculations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expression: "4 * 5", result: "20" }),
    });

    const response = await POST(request);

    expect(response.status).toBe(204);
    expect(mkdirMock).toHaveBeenCalledWith(expect.stringContaining("logs"), {
      recursive: true,
    });
    expect(appendFileMock).toHaveBeenCalledWith(
      expect.stringContaining("logs/calculations.log"),
      expect.stringContaining('"expression":"4 * 5"'),
      "utf8",
    );
    expect(appendFileMock).toHaveBeenCalledWith(
      expect.stringContaining("logs/calculations.log"),
      expect.stringContaining('"result":"20"'),
      "utf8",
    );
  });
});
