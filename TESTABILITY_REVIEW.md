# Testability Review: React Calculator (Next.js)

**Date**: 2026-07-21  
**Project**: 20260720-aiasd-brown  
**Scope**: Full codebase testability assessment

## Executive Summary

Your codebase demonstrates **good foundational testability** with a well-configured test environment, clear component design, and solid test helpers. The Calculator component is testable through behavior-driven tests using React Testing Library. However, there are several **missed opportunities for extracting testable pure functions** and **expanding test coverage** for edge cases and business logic.

---

## 1. Current Testing Infrastructure ✅

### Strengths

| Aspect | Status | Notes |
|--------|--------|-------|
| **Test Framework** | ✅ Excellent | Vitest configured with jsdom environment |
| **Component Testing** | ✅ Good | React Testing Library + user-event for realistic interaction |
| **Setup** | ✅ Good | `@testing-library/jest-dom` matchers configured in `setup.ts` |
| **Coverage Tooling** | ✅ Present | v8 coverage provider with HTML reporter |
| **Test Helpers** | ✅ Well-Designed | Custom `click()`, `press()`, `getDisplay()` helpers reduce test duplication |
| **Isolation** | ✅ Good | `afterEach(cleanup)` ensures test isolation |

### Configuration Review

**vitest.config.ts** is well-configured:
- ✅ `pool: "threads"` + `maxWorkers: 1` prevents test parallelization issues
- ✅ `fileParallelism: false` ensures deterministic execution
- ✅ `jsdom` environment appropriate for React component testing
- ✅ Coverage includes component files only (excludes app boilerplate)

---

## 2. Code Testability Strengths 💪

### Pure Functions (Highly Testable)

Three functions are **isolated and easily unit-testable**:

```typescript
// ✅ Pure function — no side effects
roundResult(value: number)
formatNumber(value: number)
compute(left: number, right: number, operator: Operator)
```

**Why they're testable:**
- Deterministic inputs → deterministic outputs
- No state mutations
- No external dependencies
- Can be tested in isolation without React

**Current gap:** These functions are **not exported** and therefore cannot be unit tested directly. They're only tested indirectly through integration tests.

### Component Architecture

- ✅ **Single Responsibility**: Calculator owns display logic, state, and keyboard handling
- ✅ **Type Safety**: Strong TypeScript types (`Operator`, `ButtonConfig`, `LastOperation`)
- ✅ **Accessibility**: Uses semantic HTML (`<output>` with `aria-live`)
- ✅ **Clear Props**: No props = no prop-drilling complexity
- ✅ **Defined Boundaries**: Button config is static data, not runtime-dependent

---

## 3. Test Coverage Assessment 📊

### Current Test Count: 8 scenarios

```
✅ basic addition flow
✅ replays last operation on repeated equals
✅ enters error state on divide by zero
✅ maps keyboard input (including comma decimal, percent)
✅ supports backspace and resets from error
✅ allows clipboard shortcuts without preventing default
✅ enforces manual input max length
✅ highlights pending operator
```

### Coverage Status

**Positive Coverage:**
- ✅ Happy path (basic arithmetic)
- ✅ Keyboard input mapping
- ✅ Error recovery
- ✅ UI state (operator highlighting)
- ✅ Input constraints

**Gaps & Missing Scenarios:**

| Scenario | Type | Risk Level |
|----------|------|------------|
| Chained operations (e.g., 2 + 3 + 4 =) | Logic | **HIGH** |
| Subtraction with negative results | Logic | **HIGH** |
| Operator replacement mid-calculation | Logic | **MEDIUM** |
| Decimal edge cases (.5 + .5) | Logic | **MEDIUM** |
| Sign toggle with decimals | Logic | **MEDIUM** |
| Large number formatting (scientific notation) | Logic | **MEDIUM** |
| Percent applied to different values | Logic | **MEDIUM** |
| Rapid successive operations | Timing | **LOW** |
| Tab navigation between buttons | Accessibility | **LOW** |
| Display render with ARIA attributes | Accessibility | **LOW** |

---

## 4. Code Testability Gaps 🚨

### Gap 1: Untestable Pure Functions

**Problem:** `roundResult()`, `formatNumber()`, and `compute()` are not exported.

```typescript
// ❌ Cannot test in isolation
function roundResult(value: number) { ... }
function formatNumber(value: number) { ... }
function compute(left: number, right: number, operator: Operator) { ... }
```

**Impact:**
- Pure logic is only validated through slow integration tests
- Floating-point edge cases (e.g., 0.1 + 0.2) buried in component tests
- Number formatting logic (scientific notation) hard to test exhaustively

**Recommendation:** Export these as utility functions.

---

### Gap 2: Tightly Coupled State Management

**Problem:** All state lives in the component; business logic and UI state are intertwined.

```typescript
// ❌ Mixed concerns
const [display, setDisplay] = useState("0");              // UI
const [storedValue, setStoredValue] = useState<number | null>(null);  // Logic
const [pendingOperator, setPendingOperator] = useState<Operator | null>(null);  // Logic
const [waitingForOperand, setWaitingForOperand] = useState(true);  // Logic
const [lastOperation, setLastOperation] = useState<LastOperation | null>(null);  // Logic
const [isError, setIsError] = useState(false);  // Error state
```

**Impact:**
- Hard to test state transitions in isolation
- Business logic cannot be tested without rendering React
- Difficult to reuse calculator logic in different UI contexts (e.g., CLI, non-React app)

**Better approach:** Separate calculator engine from React component.

---

### Gap 3: Implicit State Dependencies

**Problem:** Logic depends on implicit state ordering.

```typescript
// ❌ Hard to reason about
if (waitingForOperand) {
  setDisplay(digit);
  setWaitingForOperand(false);
  return;
}
```

State transitions are not validated separately from the component lifecycle.

---

### Gap 4: No Input Validation Tests

**Problem:** Keyboard shortcuts (`Ctrl+C`, clipboard operations) are handled implicitly.

```typescript
// ✅ Tested that it doesn't prevent default, but...
const event = new KeyboardEvent("keydown", {
  key: "c",
  ctrlKey: true,
  cancelable: true,
});
```

- No test for incomplete shortcut combinations (`Ctrl` alone)
- No test for unsupported modifiers (`Alt+C`)
- No test for rapid key repeats

---

### Gap 5: Limited Layout & Accessibility Testing

**Current:** Only button highlighting is tested.

**Missing:**
- Grid layout integrity (buttons in correct positions)
- ARIA labels correctness (`aria-live="polite"`)
- Semantic structure (`<output>` element)
- Focus management & tab order
- Contrast ratios & color handling

---

## 5. Missing High-Value Test Scenarios 🎯

### Category A: Core Logic (Must Test)

```typescript
// ❌ Not tested
test("chains operations: 2 + 3 + 4 = should equal 9", () => {
  render(<Calculator />);
  click("2");
  click("Add");
  click("3");
  click("Add");      // ← Operator replacement
  click("4");
  click("Equals");
  expectDisplay("9");
});
```

**Why important:** Chained operations test the full state machine.

---

### Category B: Floating-Point Arithmetic (Must Test)

```typescript
// ❌ Not tested
test("handles floating-point precision: 0.1 + 0.2 should equal 0.3", () => {
  // This tests roundResult() indirectly
});

test("formats very small numbers in scientific notation", () => {
  // This tests formatNumber() with edge cases
});
```

---

### Category C: Negative Number Handling (Should Test)

```typescript
// ❌ Not tested
test("subtracts to produce negative result", () => {
  render(<Calculator />);
  click("3");
  click("Subtract");
  click("5");
  click("Equals");
  expectDisplay("-2");
});

test("sign toggle works on negative results", () => {
  // After negative result, toggle sign
});
```

---

### Category D: Error Recovery (Should Test)

```typescript
// ✅ Partially tested (divide by zero → digit), but missing:

test("error state clears with operator press", () => {
  // Divide by zero, then press +
});

test("error state clears with decimal press", () => {
  // Divide by zero, then press .
});
```

---

## 6. Test Quality Observations 📋

### What's Working Well

| Aspect | Example | Score |
|--------|---------|-------|
| **Test Naming** | `"runs a basic addition flow"` | ⭐⭐⭐⭐⭐ Clear intent |
| **Helper Functions** | `click()`, `press()`, `expectDisplay()` | ⭐⭐⭐⭐⭐ Reduces duplication |
| **User Perspective** | Tests via `screen.getByRole()` not implementation details | ⭐⭐⭐⭐⭐ Behavior-focused |
| **Assertions** | Uses accessible queries (`button` role) | ⭐⭐⭐⭐⭐ Semantic |
| **Keyboard Testing** | `KeyboardEventInit` options for modifiers | ⭐⭐⭐⭐ Good coverage |

### Areas for Improvement

| Aspect | Current | Recommended |
|--------|---------|-------------|
| **Test Organization** | Single `describe` block | Consider grouping by feature (addition, subtraction, etc.) |
| **Snapshot Tests** | None | Not needed (good — snapshots are brittle) |
| **Edge Case Testing** | Minimal | Expand Category A–D scenarios above |
| **Documentation** | Implicit | Add comments explaining tricky test setups |

---

## 7. Refactoring for Better Testability 🔧

### Recommended Refactor: Extract Calculator Engine

**Current:** Monolithic component with mixed concerns.

**Proposed:** Extract pure calculator logic into a custom hook or utility.

```typescript
// ✅ New: src/lib/useCalculatorEngine.ts
export function useCalculatorEngine() {
  const [state, setState] = useState<CalculatorState>({
    display: "0",
    storedValue: null,
    pendingOperator: null,
    waitingForOperand: true,
    lastOperation: null,
    isError: false,
  });

  // Pure functions for state transitions
  const handleDigit = (digit: string): CalculatorState => { ... };
  const handleOperator = (op: Operator): CalculatorState => { ... };
  const handleEquals = (): CalculatorState => { ... };

  return { state, handleDigit, handleOperator, handleEquals };
}

// ✅ New: src/lib/calculator.test.ts
describe("Calculator Engine", () => {
  test("transitions correctly on digit input", () => {
    const engine = new CalculatorEngine();
    const newState = engine.input("5");
    expect(newState.display).toBe("5");
  });

  test("chains operations", () => {
    const engine = new CalculatorEngine();
    engine.input("2");
    engine.input("+");
    engine.input("3");
    engine.input("+");
    engine.input("4");
    const result = engine.input("=");
    expect(result.display).toBe("9");
  });
});

// ✅ Updated: src/components/Calculator.tsx
export default function Calculator() {
  const { state, handleDigit, handleOperator, handleEquals } =
    useCalculatorEngine();

  // UI rendering only
  return ( ... );
}
```

**Benefits:**
- ✅ Pure logic testable without React
- ✅ Engine reusable in non-React contexts
- ✅ Easier to reason about state transitions
- ✅ 10x faster unit tests (no jsdom overhead)

---

### Refactor 2: Export Pure Utility Functions

```typescript
// ✅ New: src/lib/calculator-math.ts
export function roundResult(value: number): number {
  return Number.parseFloat(value.toFixed(10));
}

export function formatNumber(value: number): string {
  // ... implementation
}

export function compute(
  left: number,
  right: number,
  operator: Operator
): number {
  // ... implementation
}

// ✅ New: src/lib/calculator-math.test.ts
describe("Calculator Math Utilities", () => {
  describe("roundResult", () => {
    test("rounds to 10 decimal places", () => {
      expect(roundResult(0.1 + 0.2)).toBe(0.3);
    });
  });

  describe("formatNumber", () => {
    test("formats Infinity as Error", () => {
      expect(formatNumber(Infinity)).toBe("Error");
    });

    test("uses scientific notation for very large numbers", () => {
      expect(formatNumber(1e15)).toMatch(/e/);
    });

    test("respects MAX_INPUT_LENGTH", () => {
      const long = "123456789012345";
      expect(formatNumber(Number(long)).length).toBeLessThanOrEqual(8);
    });
  });

  describe("compute", () => {
    test("adds correctly", () => {
      expect(compute(2, 3, "+")).toBe(5);
    });

    test("divides by zero returns NaN", () => {
      expect(Number.isNaN(compute(8, 0, "/"))).toBe(true);
    });
  });
});
```

---

## 8. Recommendations Priority Matrix 📈

| Priority | Item | Effort | Impact | Status |
|----------|------|--------|--------|--------|
| **P0: Critical** | Add chained operation test | 15 min | HIGH | ❌ Missing |
| **P0: Critical** | Add negative number tests | 15 min | HIGH | ❌ Missing |
| **P1: High** | Export math utilities + unit tests | 1 hour | HIGH | ❌ Not done |
| **P1: High** | Extract calculator engine hook | 2 hours | HIGH | ❌ Not done |
| **P1: High** | Add floating-point edge case tests | 30 min | MEDIUM | ❌ Missing |
| **P2: Medium** | Add operator replacement mid-calc test | 10 min | MEDIUM | ❌ Missing |
| **P2: Medium** | Add accessibility/ARIA tests | 1 hour | MEDIUM | ❌ Not done |
| **P3: Low** | Organize tests into feature suites | 30 min | LOW | ✅ Not urgent |

---

## 9. Quick Wins (Add These Tests Now) ⚡

### Quick Win #1: Chained Operations (5 lines)

```typescript
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
```

### Quick Win #2: Negative Results (5 lines)

```typescript
it("produces negative results", () => {
  render(<Calculator />);
  click("3");
  click("Subtract");
  click("5");
  click("Equals");
  expectDisplay("-2");
});
```

### Quick Win #3: Floating-Point Precision (5 lines)

```typescript
it("handles floating-point precision: 0.1 + 0.2", () => {
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
```

---

## 10. Current Coverage Metrics 📊

**Estimated Coverage** (from test scenarios):

| Category | Coverage | Gap |
|----------|----------|-----|
| **Happy Path** | ~80% | ✅ Good |
| **Error States** | ~60% | ⚠️ Moderate gap |
| **Edge Cases** | ~30% | ❌ Large gap |
| **Pure Math Functions** | ~50%* | ❌ Untestable in isolation |
| **Keyboard Shortcuts** | ~75% | ⚠️ Moderate gap |

\* Measured indirectly through integration tests

---

## 11. Testing Checklist for Future Changes ☑️

Before committing new features:

- [ ] New logic has a unit test (if refactored to pure function)
- [ ] New logic has an integration test (if in component)
- [ ] Edge cases documented (e.g., "what if operator pressed twice?")
- [ ] Keyboard shortcut tested with modifiers
- [ ] Display output verified with `expectDisplay()`
- [ ] Error states recover correctly
- [ ] No previous tests broken (`npm run test`)
- [ ] Coverage report shows no new regressions

---

## 12. Commands to Check Testability

```bash
# Run tests
npm run test

# Run tests in watch mode (TDD workflow)
npm run test:watch

# Generate coverage report (opens coverage/index.html)
npm run test:coverage

# Run ESLint (code quality affects testability)
npm run lint
```

---

## Summary: Testability Score 🎯

| Dimension | Score | Notes |
|-----------|-------|-------|
| **Framework Setup** | 9/10 | Excellent — minimal, focused |
| **Component Isolation** | 7/10 | Good, but could extract engine |
| **Pure Function Exposure** | 3/10 | Math functions not exported |
| **Test Comprehensiveness** | 6/10 | Good happy path, gaps in edge cases |
| **Accessibility Testing** | 4/10 | Minimal coverage |
| **Test Maintainability** | 9/10 | Excellent helpers, clear naming |
| **Debugging Ease** | 8/10 | Good error messages, clear failures |

**Overall Testability: 6.6/10 (Good foundation, room for growth)**

---

## Next Steps

1. **This week:** Add 3 quick wins (chained ops, negatives, floating-point)
2. **Next week:** Extract and unit-test pure math functions
3. **Future:** Consider calculator engine hook refactor for max reusability

---

**End of Review**
