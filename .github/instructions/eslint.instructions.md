---
ai_generated: true
model: "openai/gpt-5.3-codex@unknown"
operator: "johnmillerATcodemag-com"
chat_id: "execute-create-eslint-instruction-file-prompt-20260721"
prompt: |
  Execute the prompt file at c:\git\AIASD\20260720-aiasd-brown\.github\prompts\create-eslint-instruction-file.prompt.md.
started: "2026-07-21T00:00:00Z"
ended: "2026-07-21T00:00:00Z"
task_durations:
  - task: "read prompt and repository conventions"
    duration: "00:00:00"
  - task: "author eslint instruction file"
    duration: "00:00:00"
total_duration: "00:00:00"
ai_log: "ai-logs/2026/07/21/execute-create-eslint-instruction-file-prompt-20260721/conversation.md"
source: ".github/prompts/create-eslint-instruction-file.prompt.md"
name: eslint
description: Practical guidance for using eslint in this codebase
applyTo: "eslint.config.mjs|src/**/*.ts|src/**/*.tsx"
version: "1.0.0"
author: "Development Team"
tags: ["eslint", "nextjs", "typescript", "quality"]
owner: "Development Team"
reviewedDate: "2026-07-21"
nextReview: "2026-10-21"
---

# ESLint

## Overview

Use ESLint to enforce safe, consistent code across this Next.js App Router repository.

- Keep linting aligned with the current project scope: `src/app/**` routes, `src/components/**` UI logic, and strict TypeScript.
- Preserve compatibility with `eslint-config-next` and Next.js Core Web Vitals defaults.
- Treat lint feedback as a correctness and maintainability guardrail, not just style noise.

## Standards

- Keep `eslint.config.mjs` minimal and explicit. Add rules only when they solve a repeated real issue.
- Prefer fixing code over disabling rules. Use inline disables only for narrow, justified cases.
- Enforce TypeScript-safe patterns:
  - Avoid `any` unless unavoidable and documented.
  - Avoid unused variables, imports, and dead branches.
  - Avoid broad type assertions that hide null or undefined handling problems.
- Keep React and Next.js patterns clean:
  - Client hooks and browser APIs stay in files that opt into `"use client"`.
  - Route and layout files under `src/app/**` should remain focused on App Router concerns.
- Keep import paths consistent with the existing `@/*` alias and avoid fragile deep relative imports when an alias is clearer.

## Patterns

- For repository-wide rule changes:
  - Update `eslint.config.mjs`.
  - Keep defaults first; add overrides only where file-pattern scope is needed.
- For file-level exceptions:
  - Prefer refactoring to satisfy the rule.
  - If suppression is required, scope it to the smallest line or block and add a short reason.
- For TypeScript + React updates in `src/**/*.ts` and `src/**/*.tsx`:
  - Resolve root causes of warnings (types, control flow, imports) instead of silencing diagnostics.
  - Keep components and hooks deterministic and side-effect boundaries explicit.

## Validation Checklist

- `npm run lint` completes with no new errors.
- `eslint.config.mjs` changes are necessary, small, and scoped.
- No new blanket disable comments were introduced.
- New TypeScript code avoids `any` and unsafe assertions unless clearly justified.
- App Router files in `src/app/**` and components in `src/components/**` follow existing Next.js and React conventions.
- Any lint suppression includes a precise scope and short rationale.

## Common Pitfalls

- Disabling rules globally to bypass local code issues.
- Adding overlapping or contradictory custom rules on top of `eslint-config-next`.
- Using broad `eslint-disable` comments without a specific reason.
- Treating strict TypeScript lint findings as optional and deferring fixes indefinitely.
- Mixing client-only behavior into server-first files without `"use client"`.
