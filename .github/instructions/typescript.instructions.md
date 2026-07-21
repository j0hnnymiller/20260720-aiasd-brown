---
ai_generated: true
model: "openai/gpt-5.3-codex@unknown"
operator: "johnmillerATcodemag-com"
chat_id: "execute-create-typescript-instruction-file-20260721"
prompt: |
  #file:create-typescript-instruction-file.prompt.md
started: "2026-07-21T00:00:00Z"
ended: "2026-07-21T00:00:00Z"
task_durations:
  - task: "analyze repository scope and conventions"
    duration: "00:00:00"
  - task: "create typescript instruction file"
    duration: "00:00:00"
total_duration: "00:00:00"
ai_log: "ai-logs/2026/07/21/execute-create-typescript-instruction-file-20260721/conversation.md"
source: ".github/prompts/create-typescript-instruction-file.prompt.md"
name: typescript
description: practical guidance for using TypeScript 5 in this codebase
applyTo: "src/**/*.ts|src/**/*.tsx|tsconfig.json"
version: "1.0.0"
author: "Development Team"
tags: ["typescript", "nextjs", "strictness"]
owner: "Development Team"
reviewedDate: "2026-07-21"
nextReview: "2026-10-21"
---

# TypeScript 5

## Overview

Use TypeScript to make Next.js App Router code explicit, strict, and easy to change. Keep route shell concerns in `src/app/**` and interactive logic in focused client components such as `src/components/Calculator.tsx`.

- Prefer narrow, descriptive types over broad utility types.
- Keep data flow and component props statically verifiable.
- Make nullability and error states explicit in types.

## Standards

- Keep strict mode assumptions intact. Do not weaken checks in `tsconfig.json` without a concrete project requirement.
- Avoid `any`. Use `unknown` plus type narrowing when input shape is uncertain.
- Avoid non-null assertions (`!`) unless a runtime guard in the same scope proves safety.
- Model component props with explicit interfaces or type aliases; keep optional fields intentional.
- Keep module boundaries clear: route and layout types in `src/app/**`, reusable UI types near `src/components/**`.
- Prefer typed return values for exported functions and shared utilities when inference would hide contract drift.

## Patterns

- React component typing:
  - Type props with small, focused interfaces.
  - Keep derived values typed through `const` inference and discriminated unions where state branches differ.
- Event and input handling:
  - Use React event types (`React.ChangeEvent<HTMLInputElement>`, `React.MouseEvent<HTMLButtonElement>`) for handlers.
  - Convert and validate user input at boundaries before state updates.
- State modeling:
  - Represent finite UI states with union types instead of boolean combinations.
  - Encode parse or validation failures in typed state, not implicit sentinel values.
- Project structure:
  - Keep shared type-only exports stable and local to the feature until true reuse appears.
  - Use the existing path alias pattern consistently when importing across `src/**`.

## Validation Checklist

- `tsconfig.json` remains strict-oriented with no unnecessary relaxations.
- New or changed code in `src/**/*.ts` and `src/**/*.tsx` compiles without type errors.
- No new `any` usage unless clearly justified and isolated.
- Nullable and optional values are guarded before use.
- Client component event handlers and props are explicitly typed where inference is ambiguous.
- Type changes preserve current calculator behavior and existing route/component boundaries.

## Common Pitfalls

- Using `as` casts to bypass real typing problems instead of refining types.
- Expanding shared types too early, creating coupling across unrelated components.
- Encoding multi-state UI flows with loosely related booleans instead of union types.
- Relaxing TypeScript compiler options to silence errors rather than fixing root causes.
- Mixing route-layer responsibilities with reusable component contracts in the same file.
