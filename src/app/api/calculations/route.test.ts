import { access, mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

let calculationLoggingEnabled = false;
let tempDir = "";
let cwdSpy: ReturnType<typeof vi.spyOn>;

vi.mock("@/lib/featureFlags", () => ({
  isEnabled: (flag: string) =>
    flag === "calculationLoggingFeature" && calculationLoggingEnabled,
}));

async function loadRouteWithFlag(enabled: boolean) {
  calculationLoggingEnabled = enabled;
  vi.resetModules();
  return import("./route");
}

describe("POST /api/calculations", () => {
  beforeEach(async () => {
    tempDir = await mkdtemp(path.join(os.tmpdir(), "calc-log-test-"));
    cwdSpy = vi.spyOn(process, "cwd").mockReturnValue(tempDir);
  });

  afterEach(async () => {
    cwdSpy.mockRestore();
    await rm(tempDir, { recursive: true, force: true });
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

    await expect(
      access(path.join(tempDir, "logs", "calculations.log")),
    ).rejects.toBeDefined();
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

    await expect(
      access(path.join(tempDir, "logs", "calculations.log")),
    ).rejects.toBeDefined();
  });

  it("appends log line when payload is valid and feature flag is enabled", async () => {
    const { POST } = await loadRouteWithFlag(true);

    const request = new Request("http://localhost/api/calculations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expression: "4 * 5", result: "20" }),
    });

    const response = await POST(request);
    const logContent = await readFile(
      path.join(tempDir, "logs", "calculations.log"),
      "utf8",
    );

    expect(response.status).toBe(204);
    expect(logContent).toContain('"expression":"4 * 5"');
    expect(logContent).toContain('"result":"20"');
  });
});
