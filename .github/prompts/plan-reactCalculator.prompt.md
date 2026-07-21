Build a greenfield React calculator web app using Next.js with TypeScript.

The project should be frontend-only for v1 and live in the repository root. Use the Next.js App Router, keep the structure minimal, and avoid adding backend routes, server actions, or unnecessary framework features.

## Objective

Create a simple calculator that feels complete for everyday use:

- responsive on desktop and mobile
- clean, minimal UI
- click and keyboard support
- basic accessibility
- reliable handling for common calculator edge cases

## Product Requirements

Use these implementation decisions unless a stronger local constraint appears:

- framework: Next.js
- language: TypeScript
- scope: frontend only
- calculator behavior: phone-style sequential operations, not a full expression parser
- visual direction: minimal clean UI
- keyboard support: included in v1

Support these user actions:

- digits `0-9`
- decimal input
- addition, subtraction, multiplication, division
- equals
- clear or reset
- backspace
- sign toggle
- percent

## Behavior Rules

Define and implement calculator behavior explicitly:

1. Entering digits should replace the initial zero and append thereafter.
2. Only one decimal point is allowed per active number.
3. Pressing an operator after entering a number should store the current value and pending operator.
4. Pressing a different operator before entering the next number should replace the pending operator instead of evaluating immediately.
5. Pressing equals should evaluate the current operation.
6. Repeated equals should repeat the last operation when practical.
7. Clear should fully reset calculator state.
8. Backspace should remove the last digit from the active input without breaking state.
9. Division by zero should not crash the UI. Show a clear fallback display state such as `Error`, and allow the next clear or digit input to recover cleanly.
10. Percent should behave like a basic consumer calculator, not like a scientific expression engine.
11. Input length should remain visually stable. Prevent the display from overflowing the layout.

## Implementation Shape

Prefer this project structure after scaffolding:

- `package.json` for scripts and dependencies
- `tsconfig.json` for TypeScript config
- `src/app/layout.tsx` for a minimal root layout
- `src/app/page.tsx` for the calculator page entrypoint
- `src/app/globals.css` for global styles and theme primitives
- `src/components/Calculator.tsx` for calculator state, behavior, and composition
- `src/components/CalculatorButton.tsx` only if a small presentational abstraction reduces repetition

Keep the calculator logic isolated in a focused client component. Keep styling lightweight and intentional rather than decorative.

## Delivery Steps

1. Scaffold the project in the repository root with Next.js, TypeScript, App Router, ESLint, and the default npm workflow.
2. Replace the starter screen with a single-page calculator layout.
3. Implement calculator state and interaction logic in a focused client component.
4. Build the display and button grid with accessible labels, sensible tab order, and responsive sizing.
5. Add keyboard support for digits, operators, Enter, Backspace, and Escape.
6. Verify behavior with focused checks before expanding scope.

## Verification

Run and confirm the following:

1. The scaffold command completes successfully and dependencies install cleanly.
2. The dev server starts without build or hydration errors.
3. Linting passes for touched files.
4. Manual behavior checks pass for:
   - `2 + 2 = 4`
   - chained operations
   - decimal handling
   - clear and reset behavior
   - operator overwrite behavior
   - divide-by-zero recovery
   - narrow mobile layout
5. Keyboard interaction works for digits, operators, Enter, Escape, and Backspace.

## Constraints

Do not add these unless explicitly requested:

- backend or API work
- persisted history
- authentication
- PWA or offline support
- theming system
- unit or integration tests beyond what is necessary for this task
- scientific functions or memory registers

## Output Expectations

When implementing, prefer small focused changes, keep the codebase readable, and verify the app after the first substantive edit. If a behavior choice becomes ambiguous during implementation, choose the simplest calculator behavior that matches a standard phone calculator.
