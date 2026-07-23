# Implementation Plan

**Repository:** `j0hnnymiller/20260720-aiasd-brown`
**Date:** 2026-07-23
**Open issues:** 11
**Prioritized by:** P-label, effort, and dependency order

---

## Phase 1 — Quick P1 wins _(all low effort, ship together)_

| #                                                                     | Issue                                                                            | Impact | Effort | File             |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------ | ------ | ---------------- |
| [#3](https://github.com/j0hnnymiller/20260720-aiasd-brown/issues/3)   | Replace 20+ nested ternary with `display` field on `ButtonConfig`                | High   | Low    | `Calculator.tsx` |
| [#5](https://github.com/j0hnnymiller/20260720-aiasd-brown/issues/5)   | Add `activeElement` focus guard to global keydown handler                        | Medium | Low    | `Calculator.tsx` |
| [#8](https://github.com/j0hnnymiller/20260720-aiasd-brown/issues/8)   | Export pure math functions (`roundResult`, `compute`, `computeScientific`, etc.) | Medium | Low    | `Calculator.tsx` |
| [#13](https://github.com/j0hnnymiller/20260720-aiasd-brown/issues/13) | Export `resolveLogFilePath` + `isValidPayload`; add targeted unit tests          | High   | Low    | `route.ts`       |

**Outcome:** Readability, security test coverage, and instruction compliance resolved in a single focused PR. All four changes are independent and can be reviewed together.

---

## Phase 2 — Feature flag testability _(medium effort, sequenced)_

| #                                                                     | Issue                                                                                           | Impact | Effort | Dependency |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ------ | ------ | ---------- |
| [#9](https://github.com/j0hnnymiller/20260720-aiasd-brown/issues/9)   | Make feature flags injectable — add `_setFlagOverrides` to eliminate `vi.resetModules` patterns | High   | Medium | —          |
| [#15](https://github.com/j0hnnymiller/20260720-aiasd-brown/issues/15) | Move `buttons` array construction inside component render body                                  | Medium | Low    | After #9   |

**Outcome:** Tests across `Calculator.logging.test.tsx` and `route.test.ts` drop all dynamic-import + module-reset boilerplate. Memory feature button layout becomes directly testable.

---

## Phase 3 — Housekeeping _(low effort, P2)_

| #                                                                   | Issue                                                          | Impact | Effort |
| ------------------------------------------------------------------- | -------------------------------------------------------------- | ------ | ------ |
| [#4](https://github.com/j0hnnymiller/20260720-aiasd-brown/issues/4) | Remove unnecessary `useCallback` wrapper from `logCalculation` | Low    | Low    |
| [#7](https://github.com/j0hnnymiller/20260720-aiasd-brown/issues/7) | Align `<title>` metadata with visible page heading             | Low    | Low    |

**Outcome:** Two minor correctness/content fixes. Bundle in one housekeeping PR.

---

## Phase 4 — Architecture extraction _(high effort, staged)_

| #                                                                     | Issue                                                                  | Impact | Effort | Notes                                                                           |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------ | ------ | ------------------------------------------------------------------------------- |
| [#10](https://github.com/j0hnnymiller/20260720-aiasd-brown/issues/10) | Extract `calculatorEngine.ts` — pure state machine, thin React wrapper | High   | High   | Phase 1 (#8 exports) reduces scope; plan as its own sprint                      |
| [#2](https://github.com/j0hnnymiller/20260720-aiasd-brown/issues/2)   | Replace `useState` calls with `useReducer`                             | Medium | High   | Natural follow-on to #10 — fold into same PR if extracted engine uses a reducer |

**Outcome:** Calculator logic becomes testable without rendering, portable to non-React contexts, and the `handleSignToggle`/`handlePercent` edge cases get direct unit test coverage. This is the highest-investment item and should be scoped as a dedicated work item.

---

## Phase 5 — Polish _(low effort, P3)_

| #                                                                   | Issue                                                                 | Impact | Effort |
| ------------------------------------------------------------------- | --------------------------------------------------------------------- | ------ | ------ |
| [#6](https://github.com/j0hnnymiller/20260720-aiasd-brown/issues/6) | Replace hardcoded gradient hex values with CSS custom property tokens | Low    | Low    |

---

## Sequencing

```
Phase 1 ──► Phase 2 ──► Phase 3
   │                        │
   └────────────────────────┴──► Phase 4 ──► Phase 5
```

Phase 1 has no dependencies and delivers the most P1 value per unit of effort. Phase 2 must follow Phase 1 (the exported pure functions from #8 reduce the scope of #10). Phase 4 is gated only by team capacity, not by earlier phases — but #8 reduces redundant work.

---

## Success metrics

- All P1 issues closed before Phase 4 begins
- Test files contain zero `vi.resetModules()` / dynamic-import workarounds after Phase 2
- `route.ts` security boundary (`resolveLogFilePath`) has ≥ 4 targeted unit tests after Phase 1
- No regression in existing test suite at any phase boundary
