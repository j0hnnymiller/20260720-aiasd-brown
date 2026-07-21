import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import Calculator from "@/components/Calculator";

describe("Calculator", () => {
  afterEach(() => {
    cleanup();
  });

  function click(label: string) {
    fireEvent.click(screen.getByRole("button", { name: label }));
  }

  function press(key: string, options?: KeyboardEventInit) {
    fireEvent.keyDown(window, { key, ...options });
  }

  function getDisplay() {
    const output = document.querySelector("output");
    if (!output) {
      throw new Error("Calculator display output element not found");
    }
    return output;
  }

  function expectDisplay(value: string) {
    expect(getDisplay()).toHaveTextContent(value);
  }

  it("runs a basic addition flow", () => {
    render(<Calculator />);

    click("2");
    click("Add");
    click("3");
    click("Equals");

    expectDisplay("5");
  });

  it("replays last operation on repeated equals", () => {
    render(<Calculator />);

    click("2");
    click("Multiply");
    click("3");
    click("Equals");
    click("Equals");

    expectDisplay("18");
  });

  it("enters error state on divide by zero and recovers with digit input", () => {
    render(<Calculator />);

    click("8");
    click("Divide");
    click("0");
    click("Equals");
    expectDisplay("Error");

    click("7");
    expectDisplay("7");
  });

  it("maps keyboard input including comma decimal and percent", () => {
    render(<Calculator />);

    press("1");
    press(",");
    press("5");
    press("%");

    expectDisplay("0.015");
  });

  it("supports backspace and resets from error via backspace", () => {
    render(<Calculator />);

    click("9");
    click("9");
    press("Backspace");
    expectDisplay("9");

    click("Divide");
    click("0");
    click("Equals");
    expectDisplay("Error");

    press("Backspace");
    expectDisplay("0");
  });

  it("allows clipboard shortcuts without preventing default", () => {
    render(<Calculator />);

    const event = new KeyboardEvent("keydown", {
      key: "c",
      ctrlKey: true,
      cancelable: true,
    });

    const preventedBeforeDispatch = event.defaultPrevented;
    window.dispatchEvent(event);

    expect(preventedBeforeDispatch).toBe(false);
    expect(event.defaultPrevented).toBe(false);
    expectDisplay("0");
  });

  it("enforces manual input max length", () => {
    render(<Calculator />);

    const digits = "1234567890123";
    for (const d of digits) {
      click(d);
    }

    expectDisplay("123456789012");
  });

  it("highlights pending operator", () => {
    render(<Calculator />);

    click("7");
    click("Add");

    const addButton = screen.getByRole("button", { name: "Add" });
    expect(addButton.className).toContain("bg-amber-500");

    click("Subtract");
    expect(addButton.className).not.toContain("bg-amber-500");
  });

  // HIGH PRIORITY: Core Logic Tests
  it("chains multiple operations: 2 + 3 + 4 = 9", () => {
    render(<Calculator />);

    click("2");
    click("Add");
    click("3");
    click("Add");
    click("4");
    click("Equals");

    expectDisplay("9");
  });

  it("produces negative results: 3 - 5 = -2", () => {
    render(<Calculator />);

    click("3");
    click("Subtract");
    click("5");
    click("Equals");

    expectDisplay("-2");
  });

  it("handles floating-point precision: 0.1 + 0.2 = 0.3", () => {
    render(<Calculator />);

    press("0");
    press(".");
    press("1");
    click("Add");
    press("0");
    press(".");
    press("2");
    click("Equals");

    expectDisplay("0.3");
  });

  it("replaces operator mid-calculation", () => {
    render(<Calculator />);

    click("5");
    click("Add");
    const addButton = screen.getByRole("button", { name: "Add" });
    expect(addButton.className).toContain("bg-amber-500");

    click("Subtract");
    const subtractButton = screen.getByRole("button", { name: "Subtract" });
    expect(subtractButton.className).toContain("bg-amber-500");
    expect(addButton.className).not.toContain("bg-amber-500");

    click("3");
    click("Equals");
    expectDisplay("2");
  });

  it("ignores operator when in error state", () => {
    render(<Calculator />);

    click("8");
    click("Divide");
    click("0");
    click("Equals");
    expectDisplay("Error");

    click("Add");
    expectDisplay("Error");
  });

  it("clears error state when decimal is pressed", () => {
    render(<Calculator />);

    click("8");
    click("Divide");
    click("0");
    click("Equals");
    expectDisplay("Error");

    press(".");
    expectDisplay("0.");
  });

  it("handles chained subtraction with negatives", () => {
    render(<Calculator />);

    click("5");
    click("Subtract");
    click("1");
    click("0");
    click("Subtract");
    click("3");
    click("Equals");

    expectDisplay("-8");
  });

  it("applies multiplication to negative numbers", () => {
    render(<Calculator />);

    click("3");
    click("Subtract");
    click("5");
    click("Equals");
    expectDisplay("-2");

    click("Multiply");
    click("4");
    click("Equals");

    expectDisplay("-8");
  });
});
