---
ai_generated: true
model: "openai/gpt-5.3-codex@unknown"
operator: "johnmillerATcodemag-com"
chat_id: "execute-create-react-state-hooks-instruction-file-20260721"
prompt: |
  #file:create-react-state-hooks-instruction-file.prompt.md
started: "2026-07-21T00:00:00Z"
ended: "2026-07-21T00:00:00Z"
task_durations:
  - task: "analyze prompt and repository conventions"
    duration: "00:00:00"
  - task: "create react state hooks instruction file"
    duration: "00:00:00"
total_duration: "00:00:00"
ai_log: "ai-logs/2026/07/21/execute-create-react-state-hooks-instruction-file-20260721/conversation.md"
source: ".github/prompts/create-react-state-hooks-instruction-file.prompt.md"
name: react-state-hooks
description: practical guidance for using React state hooks in this codebase
applyTo: "src/components/**/*.tsx|src/app/**/*.tsx"
version: "1.0.0"
author: "Development Team"
tags: ["react", "hooks", "state", "nextjs", "typescript"]
owner: "Development Team"
reviewedDate: "2026-07-21"
nextReview: "2026-10-21"
---

# React state hooks

## Overview

Use React state hooks to keep component state local, explicit, and type-safe within this Next.js App Router project.

- Default to local state in client components for UI behavior and transient interaction data.
- Keep route files under `src/app/**` server-first, and only opt into client behavior where browser interactivity is required.
- Preserve strict TypeScript safety for all state values and state transitions.

## Standards

- Add `"use client"` to any file that uses `useState`, `useReducer`, `useRef`, or `useEffect`.
- Use explicit state types when inference is ambiguous, nullable, or union-based.
- Prefer immutable updates and functional state setters when next state depends on previous state.
- Keep state as small as possible; store derived values in expressions or memoized selectors instead of duplicating source state.
- Group related transitions in `useReducer` when multiple fields change together or state logic becomes branch-heavy.
- Avoid non-null assertions and broad type assertions in state reads and updates.

## Patterns

### Local UI state

- Use `useState` for simple, component-scoped values such as input text, toggles, and computed display output.
- Co-locate state near the component that owns it to reduce prop drilling and accidental coupling.

### Derived state

- Compute derived values from canonical state during render when cheap and deterministic.
- Use memoization only when profiling or known re-render costs justify it.

### Transition-heavy state

- Use `useReducer` for finite transition flows (for example, multi-step input handling).
- Define discriminated union action types to keep reducer branches exhaustive and strict-safe.

### Side effects tied to state

- Use `useEffect` only for external side effects (browser APIs, subscriptions, timers).
- Keep dependency arrays accurate and stable; cleanup all listeners or timers in the return function.

## Validation Checklist

- Files using React state hooks are marked as client components.
- State types are explicit where inference is not obviously safe.
- State updates use immutable patterns and functional setters where needed.
- Derived values are not duplicated as writable state without a clear reason.
- Complex transition logic uses `useReducer` with typed actions.
- Effects include correct dependencies and cleanup for subscribed resources.
- Changes remain aligned with current single-feature project scope and pass TypeScript strict checks.

## Common Pitfalls

- Storing duplicated derived values that can drift out of sync.
- Mutating objects or arrays in state updates.
- Capturing stale values in closures because dependencies are incomplete.
- Expanding local hook state into global patterns without a real cross-route requirement.
- Using `any`, forced casts, or non-null assertions to bypass strict typing.
