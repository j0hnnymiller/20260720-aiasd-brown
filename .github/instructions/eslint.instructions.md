---
ai_generated: true
model: "openai/gpt-5.3-codex@unknown"
operator: "johnmillerATcodemag-com"
chat_id: "create-eslint-instruction-file-20260721"
prompt: |
  #file:create-eslint-instruction-file.prompt.md
started: "2026-07-21T00:00:00Z"
ended: "2026-07-21T00:00:00Z"
task_durations:
  - task: "analyze repository eslint scope and conventions"
    duration: "00:00:00"
  - task: "create eslint instruction file"
    duration: "00:00:00"
total_duration: "00:00:00"
ai_log: "ai-logs/2026/07/21/create-eslint-instruction-file-20260721/conversation.md"
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

Use ESLint as the fast feedback loop for code quality and framework correctness in this Next.js App Router project.

- Keep linting aligned with the existing flat config in `eslint.config.mjs`.
- Preserve `eslint-config-next` rule sets (`core-web-vitals` and `typescript`) as the baseline.
- Favor fixes that improve readability and type safety over suppressing rules.

## Standards

- Run `npm run lint` before finalizing changes that touch `src/**/*.ts` or `src/**/*.tsx`.
- Keep code strict-TypeScript friendly: avoid `any`, unsafe assertions, and nullable assumptions that bypass checks.
- Prefer framework-safe patterns expected by Next.js rules (App Router boundaries, client/server separation, React hook correctness).
- Treat warnings as actionable; resolve them unless there is a clear, documented reason not to.
- If an ESLint disable comment is unavoidable, scope it to the smallest possible line or block and include a short rationale.
- Update `eslint.config.mjs` only for verified project needs, and keep ignores minimal and explicit.

## Patterns

- New code pattern:
  - Write implementation first with clear types.
  - Run `npm run lint`.
  - Apply targeted fixes rather than broad rule suppression.
- Next.js component pattern:
  - Keep Server Components as default.
  - Add `"use client"` only where React client hooks or browser APIs are required.
  - Let lint feedback guide hook usage and client-boundary placement.
- Configuration pattern:
  - Extend existing Next.js presets instead of replacing them.
  - Add project-specific rules in small, reviewable increments.
  - Re-check for unintended side effects across `src/app` and `src/components` after config changes.

## Validation Checklist

- `npm run lint` completes without new errors.
- Changed TypeScript and TSX files remain compliant with Next.js core web vitals and TypeScript lint rules.
- No broad rule disablement was introduced.
- Any required suppression is narrowly scoped and justified inline.
- `eslint.config.mjs` changes, if any, are necessary and consistent with current project scope.

## Common Pitfalls

- Disabling rules globally to bypass a local issue.
- Adding large ignore patterns that hide real regressions.
- Using `any` or broad casts to silence lint/type problems instead of correcting types.
- Marking components as client-only prematurely, which can conflict with server-first App Router patterns.
- Editing lint config and code together without rerunning lint to verify net effect.