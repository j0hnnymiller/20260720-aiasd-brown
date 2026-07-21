---
ai_generated: true
model: "openai/gpt-5.3-codex@unknown"
operator: "johnmillerATcodemag-com"
chat_id: "execute-create-react-instruction-file-20260721"
prompt: |
  #file:create-react-instruction-file.prompt.md
started: "2026-07-21T00:00:00Z"
ended: "2026-07-21T00:00:00Z"
task_durations:
  - task: "analyze repository scope and conventions"
    duration: "00:00:00"
  - task: "create react instruction file"
    duration: "00:00:00"
total_duration: "00:00:00"
ai_log: "ai-logs/2026/07/21/execute-create-react-instruction-file-20260721/conversation.md"
source: ".github/prompts/create-react-instruction-file.prompt.md"
name: react
description: practical guidance for using React 19.2.4 in this codebase.
applyTo: "src/**/*.tsx"
version: "1.0.0"
author: "Development Team"
tags: ["react", "nextjs", "typescript"]
owner: "Development Team"
reviewedDate: "2026-07-21"
nextReview: "2026-10-21"
---

# React 19.2.4

## Overview

Use React components in ways that fit this repository's current shape: Next.js App Router pages in `src/app/**`, reusable UI in `src/components/**`, and strict TypeScript for all component boundaries.

- Keep components focused and readable, with one clear responsibility each.
- Default to Server Components in app routes and only use Client Components for browser-only interactivity.
- Preserve existing project scope (single-page calculator plus app shell) unless a real requirement justifies expansion.

## Standards

- Use TypeScript-first React code with explicit prop types and narrow unions where behavior differs by state.
- Avoid `any`, broad type assertions, and nullable assumptions that bypass strict checks.
- Keep hooks at the top level of function components and custom hooks; do not call hooks conditionally.
- Treat props as immutable inputs; derive UI state intentionally with `useState` and memoized computations only when needed.
- Favor controlled form inputs for predictable state flow.
- Keep side effects isolated and minimal; use `useEffect` only for effects that cannot be handled during render.
- In App Router code, add `"use client"` only to components that need client hooks or DOM APIs.

## Patterns

- Component composition:
  - Build small presentational pieces and compose them in feature components.
  - Pass behavior through typed callbacks instead of hidden shared mutable state.
- State updates:
  - Use functional updates when next state depends on previous state.
  - Keep transient UI state local to the nearest component that owns it.
- Event handling:
  - Use typed React event handlers (`React.ChangeEvent`, `React.MouseEvent`) in TSX.
  - Keep handlers thin; move non-trivial logic to local helper functions.
- Rendering:
  - Prefer declarative conditional rendering over imperative DOM-style branching.
  - Provide stable keys for mapped lists; do not use array index when order can change.

## Validation Checklist

- Components compile cleanly under strict TypeScript settings.
- New props and callbacks have explicit, reusable types.
- Hooks usage follows the Rules of Hooks with no conditional or nested calls.
- Client-only behavior is isolated to files that declare `"use client"`.
- State ownership is local and minimal, with no unnecessary lifting.
- Rendered lists use stable keys based on identity, not volatile indexes.
- Changes align with existing Next.js App Router structure and current feature scope.

## Common Pitfalls

- Marking broad component trees with `"use client"` instead of isolating only interactive leaves.
- Using `useEffect` for derived values that should be computed during render.
- Storing duplicate or derivable state, causing synchronization bugs.
- Passing loosely typed objects through props and relying on runtime assumptions.
- Over-optimizing with memoization before measuring a real rendering problem.
- Coupling reusable components directly to route-specific logic from `src/app/**`.
