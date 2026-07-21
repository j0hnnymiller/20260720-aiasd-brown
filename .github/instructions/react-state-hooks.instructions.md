---
ai_generated: true
model: "openai/gpt-5.3-codex@unknown"
operator: "johnmillerATcodemag-com"
chat_id: "create-react-state-hooks-instruction-file-20260721"
prompt: |
  #file:create-react-state-hooks-instruction-file.prompt.md
started: "2026-07-21T00:00:00Z"
ended: "2026-07-21T00:00:00Z"
task_durations:
  - task: "analyze repository scope and conventions"
    duration: "00:00:00"
  - task: "create react state hooks instruction file"
    duration: "00:00:00"
total_duration: "00:00:00"
ai_log: "ai-logs/2026/07/21/create-react-state-hooks-instruction-file-20260721/conversation.md"
source: ".github/prompts/create-react-state-hooks-instruction-file.prompt.md"
name: react-state-hooks
description: Practical guidance for using React state hooks in this codebase
applyTo: "src/components/**/*.tsx|src/app/**/*.tsx"
version: "1.0.0"
author: "Development Team"
tags: ["react", "state", "hooks", "typescript", "nextjs"]
owner: "Development Team"
reviewedDate: "2026-07-21"
nextReview: "2026-10-21"
---

# React State Hooks

## Overview

Use React state hooks to keep interactive behavior predictable and local to the smallest practical component boundary.

- Prefer Server Components by default in App Router and only opt into Client Components when hooks are required.
- Place hook-driven UI behavior in `src/components/**` unless the state is route-shell specific.
- Keep state models simple, explicit, and typed to match TypeScript strictness.

## Standards

- Add `"use client"` at the top of any file that uses `useState`, `useReducer`, `useEffect`, `useMemo`, or `useCallback`.
- Use explicit state types when inference is ambiguous, especially for nullable or union state.
- Treat state as immutable: replace objects and arrays instead of mutating existing references.
- Keep derived values computed from source state using memoization only when there is measured or clear render-cost benefit.
- Keep event handlers side-effect aware: update state first, then trigger follow-up effects through clear control flow.
- Avoid `any` for state and dispatch; define narrow types for safer updates.

## Patterns

- Local scalar state:
  - Use `useState` for primitive UI controls (text, toggles, selected option).
- Structured or multi-step state:
  - Use `useReducer` when transitions are non-trivial, and model actions as discriminated unions.
- State initialization:
  - Use lazy initializers (`useState(() => initialValue)`) for expensive setup.
- Derived state:
  - Compute from existing state/props instead of storing duplicate values.
- Handler stability:
  - Use `useCallback` only when callback identity impacts child memoization or effect dependencies.
- Route alignment:
  - Keep page-level shell state in `src/app/**/*.tsx` only when it is specific to that route segment.

## Validation Checklist

- Files using hooks are explicitly Client Components with `"use client"`.
- State updates are immutable and type-safe under strict TypeScript rules.
- No duplicated source-of-truth state was introduced.
- Reducer actions and state shapes are strongly typed and exhaustively handled.
- Hook dependency arrays are accurate and do not suppress real dependencies.
- Interactive behavior remains confined to client boundaries without leaking into server-only code.

## Common Pitfalls

- Using hooks in Server Components or forgetting `"use client"`.
- Storing derived values in state, which causes drift and unnecessary sync logic.
- Mutating arrays/objects in place and expecting React to re-render.
- Overusing `useMemo`/`useCallback` for unmeasured micro-optimizations.
- Using broad state objects when a reducer or smaller state slices would be clearer.
- Ignoring strict null checks when state can be uninitialized or transient.