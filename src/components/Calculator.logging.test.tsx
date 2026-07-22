import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

async function renderCalculatorWithFlags({
  calculationLoggingEnabled,
  memoryEnabled,
}: {
  calculationLoggingEnabled: boolean;
  memoryEnabled: boolean;
}) {
  vi.resetModules();
  vi.doMock("@/lib/featureFlags", () => ({
    isEnabled: (flag: string) => {
      if (flag === "memoryFeature") {
        return memoryEnabled;
      }
      if (flag === "calculationLoggingFeature") {
        return calculationLoggingEnabled;
      }
      return false;
    },
  }));

  const { default: Calculator } = await import("@/components/Calculator");
  render(<Calculator />);
}

function click(label: string) {
  fireEvent.click(screen.getByRole("button", { name: label }));
}

describe("Calculator logging feature flag", () => {
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("posts calculation logs when feature flag is enabled", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response(null, { status: 204 }));
    vi.stubGlobal("fetch", fetchMock);

    await renderCalculatorWithFlags({
      calculationLoggingEnabled: true,
      memoryEnabled: true,
    });

    click("2");
    click("Add");
    click("3");
    click("Equals");

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/calculations");
    expect(options).toMatchObject({
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    expect(String(options?.body)).toContain('"expression":"2 + 3"');
    expect(String(options?.body)).toContain('"result":"5"');
  });

  it("does not post calculation logs when feature flag is disabled", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response(null, { status: 204 }));
    vi.stubGlobal("fetch", fetchMock);

    await renderCalculatorWithFlags({
      calculationLoggingEnabled: false,
      memoryEnabled: true,
    });

    click("2");
    click("Add");
    click("3");
    click("Equals");

    await waitFor(() => {
      expect(document.querySelector("output")).toHaveTextContent("5");
    });

    expect(fetchMock).not.toHaveBeenCalled();
  });
});
