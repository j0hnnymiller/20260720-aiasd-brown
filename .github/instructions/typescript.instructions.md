---
ai_generated: true
model: "openai/gpt-5.3-codex@unknown"
operator: "johnmillerATcodemag-com"
chat_id: "create-typescript-instruction-file-20260721"
prompt: |
  Create or update .github/instructions/typescript.instructions.md as a complete markdown instruction file with YAML front matter.

  Requirements:
  - Set name to the technology name.
  - Set description to practical guidance for using TypeScript 5 in this codebase.
  - Set applyTo to: src/**/*.ts|src/**/*.tsx|tsconfig.json.
  - Keep guidance actionable, concise, and maintainable.
  - Include sections for Overview, Standards, Patterns, Validation Checklist, and Common Pitfalls.
  - Prioritize repository alignment with Next.js App Router, TypeScript strictness, and current project scope.
  - Avoid speculative or unverified claims.
started: "2026-07-21T00:00:00Z"
ended: "2026-07-21T00:00:00Z"
task_durations:
  - task: "analyze repository conventions"
    duration: "00:00:00"
  - task: "create typescript instruction file"
    duration: "00:00:00"
total_duration: "00:00:00"
ai_log: "ai-logs/2026/07/21/create-typescript-instruction-file-20260721/conversation.md"
source: ".github/prompts/create-typescript-instruction-file.prompt.md"
name: typescript
description: Practical guidance for using TypeScript 5 in this codebase
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

Use TypeScript as the primary guardrail for correctness across the current Next.js App Router codebase.

- Keep application code under `src/**` and preserve the existing `@/*` path alias.
- Treat strict typing as the default contract: model data explicitly, narrow unknown values, and fail early on invalid states.
- Align TypeScript usage with the current project scope (App Router pages/layouts and reusable React components).

## Standards

- Keep strict mode enabled in `tsconfig.json` and avoid weakening checks to bypass compile errors.
- Prefer explicit, descriptive types for component props, return values, and shared utility functions.
- Avoid `any`; use `unknown` plus runtime narrowing when input shape is uncertain.
- Prefer union types and discriminated unions over boolean flag combinations for multi-state logic.
- Keep nullability intentional: represent optional values explicitly and handle `undefined`/`null` at boundaries.
- Use `readonly` where mutation is not required, especially for configuration-like objects and props.
- Do not suppress type errors with broad assertions (`as any`, non-null assertions) unless no safer option exists and the invariant is local and obvious.

## Patterns

- Component props:
  - Define a dedicated `Props` type per component.
  - Keep prop surfaces minimal and domain-oriented.
- State and events in client components:
  - Type `useState` values explicitly when inference is ambiguous.
  - Use precise event types in handlers (`React.ChangeEvent<HTMLInputElement>`, etc.).
- App Router boundaries:
  - Keep route/layout modules focused on routing and composition.
  - Move interactive logic into typed client components.
- Reusable domain types:
  - Centralize truly shared types in stable modules under `src/**`.
  - Avoid creating global type barrels unless multiple consumers justify them.

## Validation Checklist

- Type checking passes with no new errors under the existing project configuration.
- No new `any` types were introduced without strong justification.
- Public component and utility APIs are explicitly typed and readable.
- Nullable and optional paths are handled intentionally.
- App Router files remain focused on route concerns, with client interactivity isolated to client components.
- `tsconfig.json` changes (if any) are minimal, deliberate, and compatible with repository standards.

## Common Pitfalls

- Using broad type assertions to silence errors instead of fixing data flow or narrowing logic.
- Allowing inferred `any` to spread from loosely typed helpers into component code.
- Encoding complex UI state with many booleans instead of a discriminated union.
- Mixing route composition and heavy client-side logic in the same App Router module.
- Relaxing `tsconfig.json` strictness to accommodate one-off implementation shortcuts.