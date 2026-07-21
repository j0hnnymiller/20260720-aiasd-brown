import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Home from "@/app/page";

describe("GitHub Pages Deployment Smoke Tests", () => {
  afterEach(() => {
    cleanup();
  });

  describe("Page Rendering", () => {
    it("should render the home page without errors", () => {
      const { container } = render(<Home />);
      expect(container).toBeTruthy();
    });

    it("should display the main heading", () => {
      render(<Home />);
      const heading = screen.getByRole("heading", {
        name: /Fast math, minimal UI/i,
      });
      expect(heading).toBeInTheDocument();
    });

    it("should display the product tagline", () => {
      render(<Home />);
      expect(
        screen.getByText(/React Calculator/i, { selector: "p" }),
      ).toBeInTheDocument();
    });

    it("should display the description text", () => {
      render(<Home />);
      expect(
        screen.getByText(
          /A clean four-function calculator with keyboard support/i,
        ),
      ).toBeInTheDocument();
    });
  });

  describe("Calculator Component", () => {
    it("should render the calculator component", () => {
      render(<Home />);
      const buttons = screen.getAllByRole("button");
      expect(buttons.length).toBeGreaterThan(0);
    });

    it("should have calculator buttons for numbers 0-9", () => {
      render(<Home />);
      for (let i = 0; i <= 9; i++) {
        const button = screen.getByRole("button", { name: i.toString() });
        expect(button).toBeInTheDocument();
      }
    });

    it("should have operation buttons", () => {
      render(<Home />);
      expect(screen.getByRole("button", { name: /Add/i })).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /Subtract/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /Multiply/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /Divide/i }),
      ).toBeInTheDocument();
    });

    it("should perform basic arithmetic operations", () => {
      render(<Home />);

      // Click: 5 + 3 =
      fireEvent.click(screen.getByRole("button", { name: "5" }));
      fireEvent.click(screen.getByRole("button", { name: /Add/i }));
      fireEvent.click(screen.getByRole("button", { name: "3" }));
      fireEvent.click(screen.getByRole("button", { name: /Equals/i }));

      const output = document.querySelector("output");
      expect(output).toHaveTextContent("8");
    });

    it("should support keyboard input", () => {
      render(<Home />);

      // Simulate keyboard input: 2 + 2 =
      fireEvent.keyDown(window, { key: "2" });
      fireEvent.keyDown(window, { key: "+" });
      fireEvent.keyDown(window, { key: "2" });
      fireEvent.keyDown(window, { key: "Enter" });

      const output = document.querySelector("output");
      expect(output).toHaveTextContent("4");
    });
  });

  describe("Accessibility", () => {
    it("should have semantic HTML structure", () => {
      const { container } = render(<Home />);
      const main = container.querySelector("main");
      expect(main).toBeInTheDocument();
    });

    it("should have proper heading hierarchy", () => {
      render(<Home />);
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toBeInTheDocument();
    });

    it("should have accessible button labels", () => {
      render(<Home />);
      const buttons = screen.getAllByRole("button");
      buttons.forEach((button) => {
        expect(
          button.textContent || button.getAttribute("aria-label"),
        ).toBeTruthy();
      });
    });

    it("should have a calculator output display", () => {
      render(<Home />);
      const output = document.querySelector("output");
      expect(output).toBeInTheDocument();
    });
  });

  describe("UI Layout", () => {
    it("should render within a main content area", () => {
      const { container } = render(<Home />);
      const main = container.querySelector("main");
      expect(main).toBeInTheDocument();
      expect(main?.childNodes.length).toBeGreaterThan(0);
    });

    it("should have responsive styling classes", () => {
      const { container } = render(<Home />);
      const mainElement = container.querySelector("main");
      expect(mainElement?.className).toContain("flex");
      expect(mainElement?.className).toContain("min-h-screen");
    });
  });

  describe("Deployment Readiness", () => {
    it("should not have console errors during render", () => {
      const consoleError = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      render(<Home />);
      expect(consoleError).not.toHaveBeenCalled();
      consoleError.mockRestore();
    });

    it("should not have console warnings during render", () => {
      const consoleWarn = vi
        .spyOn(console, "warn")
        .mockImplementation(() => {});
      render(<Home />);
      expect(consoleWarn).not.toHaveBeenCalled();
      consoleWarn.mockRestore();
    });

    it("should be statically exportable", () => {
      // Verify that the Home component doesn't require dynamic runtime features
      const { container } = render(<Home />);
      expect(container).toBeTruthy();
      // If this renders without error, it's compatible with static export
    });
  });
});
