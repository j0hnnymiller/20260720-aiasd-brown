# Components

This folder contains reusable UI components for the application.

## Current Components

### `Calculator`

File: `Calculator.tsx`

A client-side, keyboard-friendly calculator component that supports:

- Four-function math (`+`, `-`, `*`, `/`)
- Decimal input (`.`)
- Sign toggle (`+/-`)
- Percent conversion (`%`)
- Backspace/delete-last-digit behavior
- Repeated equals behavior (replays last operation)
- Error state handling (for example, divide by zero)
- Active-operator visual state in the keypad
- Optional server-side calculation logging controlled by `src/config/flags.json` (`calculationLoggingFeature`)

## Usage

```tsx
import Calculator from "@/components/Calculator";

export default function Page() {
  return <Calculator />;
}
```

## Keyboard Support

Supported keys inside the app:

- `0-9` for numeric input
- `+`, `-`, `*`, `/` for operators
- `.` or `,` for decimal input
- `Enter` or `=` for equals
- `Escape` for clear
- `Backspace` for deleting the last digit
- `%` for percent

Clipboard shortcuts (`Ctrl/Cmd + C`, `V`, `X`, `A`) are intentionally ignored by the calculator key handler so native browser behavior is preserved.

## Styling Notes

- Tailwind utility classes are used directly in the component.
- Visual button variants are controlled by the local `buttons` config and computed class names.

## State and Behavior Overview

The calculator tracks:

- Current display value
- Stored value for pending operations
- Pending operator
- Operand entry mode (`waitingForOperand`)
- Last operation (for repeated equals)
- Error state

Additional behavior details:

- Manual input is capped at 12 display characters.
- Results are formatted to stay readable (rounding, precision fallback, exponential notation for extreme values).
- In error state, entering a digit or decimal starts a fresh value.

This design keeps all calculator behavior self-contained in one component.

## Adding New Components

When adding a new component in this folder:

- Keep the component focused on one responsibility.
- Prefer typed props and explicit state transitions.
- Document any keyboard shortcuts or non-obvious behavior.
- Add a short usage example in this README.
