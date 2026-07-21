"use client";

import { useEffect, useEffectEvent, useState } from "react";

type Operator = "+" | "-" | "*" | "/";

type ButtonConfig = {
  label: string;
  value: string;
  variant?: "action" | "operator" | "number";
  wide?: boolean;
};

type LastOperation = {
  operator: Operator;
  operand: number;
};

const buttons: ButtonConfig[] = [
  { label: "Clear", value: "clear", variant: "action" },
  { label: "Toggle sign", value: "sign", variant: "action" },
  { label: "Percent", value: "percent", variant: "action" },
  { label: "Divide", value: "/", variant: "operator" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "Multiply", value: "*", variant: "operator" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "Subtract", value: "-", variant: "operator" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "Add", value: "+", variant: "operator" },
  { label: "0", value: "0", wide: true },
  { label: "Decimal", value: "." },
  { label: "Equals", value: "=", variant: "operator" },
];

const MAX_INPUT_LENGTH = 12;

function roundResult(value: number) {
  return Number.parseFloat(value.toFixed(10));
}

function formatNumber(value: number) {
  if (!Number.isFinite(value)) {
    return "Error";
  }

  const absoluteValue = Math.abs(value);

  if (absoluteValue >= 1e12 || (absoluteValue > 0 && absoluteValue < 1e-9)) {
    return value.toExponential(6);
  }

  const normalized = roundResult(value).toString();
  return normalized.length > MAX_INPUT_LENGTH
    ? value.toPrecision(8)
    : normalized;
}

function compute(left: number, right: number, operator: Operator) {
  switch (operator) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "*":
      return left * right;
    case "/":
      return right === 0 ? Number.NaN : left / right;
  }
}

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [storedValue, setStoredValue] = useState<number | null>(null);
  const [pendingOperator, setPendingOperator] = useState<Operator | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(true);
  const [lastOperation, setLastOperation] = useState<LastOperation | null>(
    null,
  );
  const [isError, setIsError] = useState(false);

  function resetCalculator() {
    setDisplay("0");
    setStoredValue(null);
    setPendingOperator(null);
    setWaitingForOperand(true);
    setLastOperation(null);
    setIsError(false);
  }

  function getCurrentValue() {
    return Number.parseFloat(display);
  }

  function updateDisplay(nextValue: number) {
    const formatted = formatNumber(nextValue);

    if (formatted === "Error") {
      setDisplay("Error");
      setStoredValue(null);
      setPendingOperator(null);
      setLastOperation(null);
      setWaitingForOperand(true);
      setIsError(true);
      return false;
    }

    setDisplay(formatted);
    setIsError(false);
    return true;
  }

  function inputDigit(digit: string) {
    if (isError) {
      setDisplay(digit);
      setStoredValue(null);
      setPendingOperator(null);
      setLastOperation(null);
      setWaitingForOperand(false);
      setIsError(false);
      return;
    }

    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
      return;
    }

    if (display === "0") {
      setDisplay(digit);
      return;
    }

    if (display.length >= MAX_INPUT_LENGTH) {
      return;
    }

    setDisplay(`${display}${digit}`);
  }

  function inputDecimal() {
    if (isError) {
      setDisplay("0.");
      setStoredValue(null);
      setPendingOperator(null);
      setLastOperation(null);
      setWaitingForOperand(false);
      setIsError(false);
      return;
    }

    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(`${display}.`);
    }
  }

  function handleOperator(nextOperator: Operator) {
    if (isError) {
      return;
    }

    const inputValue = getCurrentValue();

    if (storedValue === null) {
      setStoredValue(inputValue);
      setPendingOperator(nextOperator);
      setWaitingForOperand(true);
      setLastOperation(null);
      return;
    }

    if (waitingForOperand) {
      setPendingOperator(nextOperator);
      return;
    }

    if (!pendingOperator) {
      setPendingOperator(nextOperator);
      setStoredValue(inputValue);
      setWaitingForOperand(true);
      return;
    }

    const result = compute(storedValue, inputValue, pendingOperator);

    if (!updateDisplay(result)) {
      return;
    }

    setStoredValue(result);
    setPendingOperator(nextOperator);
    setWaitingForOperand(true);
    setLastOperation({ operator: pendingOperator, operand: inputValue });
  }

  function handleEquals() {
    if (isError) {
      return;
    }

    const inputValue = getCurrentValue();

    if (pendingOperator && storedValue !== null) {
      const operand = waitingForOperand ? storedValue : inputValue;
      const result = compute(storedValue, operand, pendingOperator);

      if (!updateDisplay(result)) {
        return;
      }

      setStoredValue(result);
      setLastOperation({ operator: pendingOperator, operand });
      setPendingOperator(null);
      setWaitingForOperand(true);
      return;
    }

    if (lastOperation) {
      const result = compute(
        inputValue,
        lastOperation.operand,
        lastOperation.operator,
      );

      if (!updateDisplay(result)) {
        return;
      }

      setStoredValue(result);
      setWaitingForOperand(true);
    }
  }

  function handlePercent() {
    if (isError) {
      return;
    }

    const currentValue = getCurrentValue();
    updateDisplay(currentValue / 100);
    setWaitingForOperand(false);
  }

  function handleSignToggle() {
    if (isError || display === "0") {
      return;
    }

    if (display.startsWith("-")) {
      setDisplay(display.slice(1));
      return;
    }

    if (display.length < MAX_INPUT_LENGTH) {
      setDisplay(`-${display}`);
    }
  }

  function handleBackspace() {
    if (isError) {
      resetCalculator();
      return;
    }

    if (waitingForOperand) {
      return;
    }

    if (
      display.length === 1 ||
      (display.length === 2 && display.startsWith("-"))
    ) {
      setDisplay("0");
      setWaitingForOperand(true);
      return;
    }

    setDisplay(display.slice(0, -1));
  }

  function handleInput(value: string) {
    if (/^\d$/.test(value)) {
      inputDigit(value);
      return;
    }

    switch (value) {
      case ".":
        inputDecimal();
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        handleOperator(value);
        break;
      case "=":
        handleEquals();
        break;
      case "clear":
        resetCalculator();
        break;
      case "sign":
        handleSignToggle();
        break;
      case "percent":
        handlePercent();
        break;
      case "backspace":
        handleBackspace();
        break;
    }
  }

  const onKeyDown = useEffectEvent((event: KeyboardEvent) => {
    if (
      (event.ctrlKey || event.metaKey) &&
      ["c", "v", "x", "a"].includes(event.key.toLowerCase())
    ) {
      return;
    }

    if (/^\d$/.test(event.key)) {
      event.preventDefault();
      handleInput(event.key);
      return;
    }

    const mappedKey: Record<string, string> = {
      Enter: "=",
      "=": "=",
      Escape: "clear",
      Backspace: "backspace",
      ".": ".",
      ",": ".",
      "/": "/",
      "*": "*",
      "-": "-",
      "+": "+",
      "%": "percent",
    };

    const action = mappedKey[event.key];

    if (action) {
      event.preventDefault();
      handleInput(action);
    }
  });

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <section className="w-full max-w-sm rounded-[2rem] border border-black/10 bg-white/90 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.18)] backdrop-blur">
      <div className="mb-4 rounded-[1.5rem] bg-slate-950 px-5 py-6 text-right text-white shadow-inner">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400">
          Simple Calculator
        </p>
        <output
          aria-live="polite"
          aria-atomic="true"
          className="mt-4 block min-h-[3.5rem] overflow-hidden text-4xl font-semibold tracking-tight [text-wrap:nowrap]"
        >
          {display}
        </output>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {buttons.map((button) => {
          const isOperator = button.variant === "operator";
          const isAction = button.variant === "action";
          const isPercentButton = button.value === "percent";
          const isActiveOperator =
            isOperator && pendingOperator === button.value;

          return (
            <button
              key={button.value}
              type="button"
              aria-label={button.label}
              onClick={() => handleInput(button.value)}
              className={[
                "h-16 rounded-2xl text-xl font-semibold transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                button.wide ? "col-span-2" : "col-span-1",
                isOperator
                  ? isActiveOperator
                    ? "bg-amber-500 text-slate-950 ring-amber-300"
                    : "bg-slate-900 text-white hover:bg-slate-800 focus-visible:ring-slate-300"
                  : isAction
                    ? isPercentButton
                      ? "bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-300"
                      : "bg-slate-200 text-slate-900 hover:bg-slate-300 focus-visible:ring-slate-400"
                    : "bg-slate-100 text-slate-950 hover:bg-slate-200 focus-visible:ring-slate-300",
              ].join(" ")}
            >
              {button.value === "*"
                ? "×"
                : button.value === "/"
                  ? "÷"
                  : button.value === "sign"
                    ? "±"
                    : button.value === "percent"
                      ? "%"
                      : button.value === "clear"
                        ? "C"
                        : button.value}
            </button>
          );
        })}
      </div>
    </section>
  );
}
