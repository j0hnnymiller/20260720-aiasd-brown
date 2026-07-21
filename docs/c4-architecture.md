# C4 Architecture Diagrams

This document captures the architecture of the current calculator application using C4 model levels.

## Level 1: System Context

```mermaid
C4Context
    title Level 1 - System Context: Simple Calculator Web App

    Person(user, "End User", "Uses the calculator in a web browser")

    System(calcApp, "Simple Calculator Web App", "Next.js app that serves a single-page calculator experience")

    Rel(user, calcApp, "Performs calculations", "HTTPS")
```

## Level 2: Container Diagram

```mermaid
C4Container
    title Level 2 - Container Diagram: Simple Calculator Web App

    Person(user, "End User", "Uses the calculator")

    System_Boundary(calcBoundary, "Simple Calculator Web App") {
        Container(nextServer, "Next.js App Server", "Next.js 16 / Node.js", "Serves page shell, JavaScript bundle, and static assets")
        Container(browserClient, "Calculator Client", "React 19 Client Component", "Runs calculator UI, keyboard handling, and stateful calculation logic")
    }

    Rel(user, browserClient, "Clicks buttons and types keys")
    Rel(browserClient, nextServer, "Loads page and assets", "HTTPS")
```

## Level 3: Component Diagram

```mermaid
C4Component
    title Level 3 - Component Diagram: Calculator Client Container

    Container_Boundary(browserClient, "Calculator Client (src/components/Calculator.tsx)") {
        Component(uiRenderer, "UI Renderer", "React JSX", "Renders display/output and button grid")
        Component(inputRouter, "Input Router", "handleInput + key mapping", "Normalizes button and keyboard events into calculator actions")
        Component(operationEngine, "Operation Engine", "compute, handleOperator, handleEquals", "Executes arithmetic operations and operation chaining")
        Component(formatter, "Formatting and Validation", "formatNumber, roundResult", "Formats results and detects non-finite error states")
        Component(stateStore, "State Store", "React useState", "Tracks display, stored value, pending operator, last operation, and error/wait flags")
        Component(keyboardAdapter, "Keyboard Adapter", "useEffect + useEffectEvent", "Subscribes to keydown and maps keys to router actions")
    }

    Rel(keyboardAdapter, inputRouter, "Dispatches mapped keyboard actions")
    Rel(uiRenderer, inputRouter, "Dispatches button actions")
    Rel(inputRouter, operationEngine, "Routes operator/equals actions")
    Rel(inputRouter, formatter, "Routes percent/number display updates")
    Rel(operationEngine, formatter, "Formats computation results")
    Rel(inputRouter, stateStore, "Reads and updates state")
    Rel(operationEngine, stateStore, "Reads and updates state")
    Rel(formatter, stateStore, "Updates display/error state")
    Rel(stateStore, uiRenderer, "Provides current display and active operator")
```

## Level 4: Code Diagram

```mermaid
classDiagram
    direction TB

    class Calculator {
      +display: string
      +storedValue: number | null
      +pendingOperator: Operator | null
      +waitingForOperand: boolean
      +lastOperation: LastOperation | null
      +isError: boolean
      +resetCalculator()
      +getCurrentValue() number
      +updateDisplay(nextValue) boolean
      +inputDigit(digit)
      +inputDecimal()
      +handleOperator(nextOperator)
      +handleEquals()
      +handlePercent()
      +handleSignToggle()
      +handleBackspace()
      +handleInput(value)
    }

    class NumberFormatting {
      +roundResult(value) number
      +formatNumber(value) string
    }

    class Arithmetic {
      +compute(left, right, operator) number
    }

    class KeyboardMapping {
      +onKeyDown(event)
      +mappedKey: Record<string,string>
    }

    class ButtonConfig {
      +label: string
      +value: string
      +variant: action | operator | number
      +wide: boolean
    }

    Calculator --> NumberFormatting : uses
    Calculator --> Arithmetic : uses
    Calculator --> KeyboardMapping : uses
    Calculator --> ButtonConfig : renders from buttons[]
```

## Source Mapping

- Root layout and metadata: src/app/layout.tsx
- Page shell: src/app/page.tsx
- Calculator implementation: src/components/Calculator.tsx
- Global styling/theme: src/app/globals.css
