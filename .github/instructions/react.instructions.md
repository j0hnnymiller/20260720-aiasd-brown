---
ai_generated: true
model: "openai/gpt-5.3-codex@unknown"
operator: "johnmillerATcodemag-com"
chat_id: "react-instructions-20260721"
prompt: |
  #file:create-react-instruction-file.prompt.md
started: "2026-07-21T00:00:00Z"
ended: "2026-07-21T00:00:00Z"
task_durations:
  - task: "analyze repository conventions and prompt requirements"
    duration: "00:00:00"
  - task: "create react instruction file"
    duration: "00:00:00"
total_duration: "00:00:00"
ai_log: "ai-logs/2026/07/21/react-instructions-20260721/conversation.md"
source: ".github/prompts/create-react-instruction-file.prompt.md"
name: react
description: Practical guidance for using React 19.2.4 in this codebase
applyTo: "src/**/*.tsx"
version: "1.0.0"
author: "Development Team"
tags: ["react", "typescript", "nextjs"]
owner: "Development Team"
reviewedDate: "2026-07-21"
nextReview: "2026-10-21"
---

# React 19.2.4

## Overview

Use React patterns that fit the current repository scope: a small App Router shell in `src/app/**` and interactive UI logic concentrated in reusable components such as `src/components/Calculator.tsx`.

- Keep components focused, predictable, and easy to test.
- Prefer explicit props and local state over hidden shared state.
- Build React components to integrate cleanly with Next.js App Router and TypeScript strict mode.

## Standards

- Use function components with explicit prop types and strict-safe null handling.
- Avoid `any`; prefer precise types, unions, and utility types where needed.
- Keep hooks at the top level of components and custom hooks only.
- Keep render logic side-effect free; place side effects in `useEffect` when required.
- Derive display values from props/state rather than duplicating state.
- Use stable keys for rendered lists; never use array index keys for mutable lists.
- Keep event handlers small and intention-revealing; extract helper functions when branching grows.

## Patterns

- Component composition:
  - Compose from small, single-purpose components.
  - Pass data down through props; lift state up only when two or more siblings truly share it.
- State management:
  - Keep state local by default for feature-level behavior (current calculator scope).
  - Use `useMemo` and `useCallback` only when they address measured or obvious rerender cost.
- Effects and async behavior:
  - Use effects only for synchronization with external systems (timers, network, browser APIs).
  - Always clean up subscriptions, listeners, and timers in effect cleanup.
- Next.js integration:
  - Keep server-first boundaries: add `"use client"` only where hooks or browser APIs are required.
  - Keep route and layout concerns in `src/app/**`; keep reusable UI in `src/components/**`.

## Validation Checklist

- All changed `.tsx` files compile under strict TypeScript settings.
- Components have clear prop contracts with no new `any` usage.
- Hook usage follows React rules (top-level, consistent call order).
- Side effects are isolated in effects with cleanup where applicable.
- Client-only code is limited to components that require `"use client"`.
- Component boundaries remain aligned with current Next.js App Router structure.

## Common Pitfalls

- Copying props into state unnecessarily and creating stale UI state.
- Using effects for pure computations that belong in render logic.
- Overusing `useMemo` or `useCallback` without a real rerender problem.
- Mixing route-layer concerns into reusable components.
- Introducing broad shared state for behavior that is local to one component tree.
