# React Calculator (Next.js)

A minimal, keyboard-friendly calculator built with Next.js App Router, React, TypeScript, and Tailwind CSS.

## Tech Stack

- Next.js 16.2.10
- React 19.2.4
- TypeScript 5 (strict)
- Tailwind CSS 4
- ESLint 9 with eslint-config-next
- npm

## Features

- Four-function calculator: addition, subtraction, multiplication, division
- Decimal input, sign toggle, percent conversion, and backspace editing
- Repeated equals behavior for last-operation replay
- Error handling for invalid operations like divide-by-zero
- Input guardrails: 12-character display limit and compact formatting for large/small numbers
- Keyboard support for numeric and operator input
- Responsive, phone-style calculator UI with active-operator highlighting
- Optional calculation logging to `logs/calculations.log` behind a JSON feature flag

## Getting Started

Install dependencies:

```bash
npm install
```

Run local development:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Production Commands

Create a production build:

```bash
npm run build
```

Start the production server (after build):

```bash
npm run start
```

Run lint checks:

```bash
npm run lint
```

## Test Automation

This project uses Vitest with Testing Library for automated component tests.

Run the full test suite once (CI mode):

```bash
npm run test
```

Run tests in watch mode during development:

```bash
npm run test:watch
```

Generate a coverage report:

```bash
npm run test:coverage
```

Coverage output is written to [coverage/](coverage/), including [coverage/index.html](coverage/index.html) for a browser report.

Recommended CI validation order:

```bash
npm run lint
npm run test
npm run build
```

For PR quality gates, keep at least lint + test in automation, and add coverage checks when needed.

## Keyboard Shortcuts

- Digits: 0-9
- Operators: +, -, \*, /
- Decimal: . or ,
- Equals: Enter or =
- Percent: %
- Clear: Escape
- Delete last digit: Backspace

## Calculator Behavior Notes

- Display length is capped during manual entry (`MAX_INPUT_LENGTH = 12`).
- Results are rounded/normalized for readability and may switch to precision or exponential notation for extreme values.
- Pressing an operator repeatedly updates the pending operator without recomputing until the next operand is entered.
- Pressing equals repeatedly replays the last completed operation.
- In error state (`Error`), entering a digit or decimal starts a new value; backspace resets the calculator.

## Feature Flags and Logging

- JSON flags are configured in [src/config/flags.json](src/config/flags.json).
- Set `calculationLoggingFeature` to `true` to send calculation entries to the logging API route.
- Calculation logs are appended to `logs/calculations.log` by default.
- Set `CALCULATION_LOG_FILE` to override the output file path. Relative paths resolve from the app working directory.

## Project Structure

- [src/app/layout.tsx](src/app/layout.tsx): Root layout, fonts, and metadata
- [src/app/page.tsx](src/app/page.tsx): Landing page and calculator shell
- [src/components/Calculator.tsx](src/components/Calculator.tsx): Calculator logic, state, keyboard handling, and UI
- [src/app/api/calculations/route.ts](src/app/api/calculations/route.ts): Calculation log API route
- [src/config/flags.json](src/config/flags.json): JSON feature flags, including calculation logging toggle
- [src/app/globals.css](src/app/globals.css): Global Tailwind import and theme tokens
- [package.json](package.json): Scripts and dependency versions

## Notes

- App metadata is defined in [src/app/layout.tsx](src/app/layout.tsx).
- Geist and Geist Mono fonts are loaded via next/font/google.
- Styling uses utility-first Tailwind classes plus a small global theme in [src/app/globals.css](src/app/globals.css).
- Keyboard listeners are registered in [src/components/Calculator.tsx](src/components/Calculator.tsx) with React `useEffectEvent`.

## Architecture

- C4 diagrams are available in [docs/c4-architecture.md](docs/c4-architecture.md).

## CI/CD

- GitHub Pages deployment instructions are documented in [docs/developer-guide.md](docs/developer-guide.md) under "CI/CD: Deploy to GitHub Pages".
