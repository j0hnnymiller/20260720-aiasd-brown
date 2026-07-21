---
ai_generated: true
model: "openai/gpt-5.3-codex@unknown"
operator: "johnmillerATcodemag-com"
chat_id: "execute-create-eslint-9-instruction-file-20260721"
prompt: |
  Execute the prompt file at c:\git\AIASD\20260720-aiasd-brown\.github\prompts\create-eslint-9-instruction-file.prompt.md.
started: "2026-07-21T00:00:00Z"
ended: "2026-07-21T00:00:00Z"
task_durations:
  - task: "read prompt and conventions"
    duration: "00:00:00"
  - task: "author eslint instruction file"
    duration: "00:00:00"
total_duration: "00:00:00"
ai_log: "ai-logs/2026/07/21/execute-create-eslint-9-instruction-file-20260721/conversation.md"
source: ".github/prompts/create-eslint-9-instruction-file.prompt.md"
name: eslint-9
description: Practical guidance for using ESLint 9 in this codebase
applyTo: "eslint.config.mjs|package.json"
version: "1.0.0"
author: "Development Team"
tags: ["eslint", "linting", "nextjs", "typescript"]
owner: "Development Team"
reviewedDate: "2026-07-21"
nextReview: "2026-10-21"
---

# ESLint 9

## Overview

Use ESLint 9 to enforce consistent, maintainable quality gates for this Next.js App Router and TypeScript codebase. Keep linting focused on correctness, readability, and framework-safe patterns, and avoid adding rules that are not exercised by current project scope.

## Standards

- Keep ESLint configuration centralized in `eslint.config.mjs` using the flat config format required by ESLint 9.
- Align lint rules with Next.js App Router defaults before adding custom overrides.
- Treat TypeScript strictness as a source of truth and avoid lint settings that conflict with strict compiler checks.
- Keep rule severity intentional:
  - Use `error` for issues that can cause runtime bugs, unsafe behavior, or invalid framework usage.
  - Use `warn` for style or maintainability guidance that should not block iteration.
- Add rule overrides only for concrete repository needs; include a short rationale comment near non-obvious exceptions.
- Keep dependencies in `package.json` consistent with ESLint 9-compatible plugin and config versions.
- Prefer deterministic lint runs in CI and local development by using explicit scripts rather than ad hoc commands.

## Patterns

- Prefer script conventions in `package.json` that separate check and fix flows:
  - `lint`: run diagnostics only.
  - `lint:fix`: apply safe automatic fixes.
- Keep lint coverage scoped to active source and config files used by this repository.
- Use targeted disable comments only when necessary and always scope them to the smallest line or block.
- Keep Next.js and TypeScript plugin settings explicit where project behavior depends on them.
- Revisit custom rule decisions when framework or language versions change.

## Validation Checklist

- `eslint.config.mjs` uses ESLint 9 flat config patterns.
- `package.json` has lint scripts that are clear and reproducible.
- Custom rules or overrides are minimal and justified.
- Lint configuration supports Next.js App Router conventions.
- Lint configuration complements TypeScript strictness instead of duplicating or contradicting it.
- Linting runs successfully on current repository files.

## Common Pitfalls

- Mixing legacy ESLint config formats with ESLint 9 flat config.
- Adding broad rule disables instead of fixing root causes.
- Enabling speculative rules that do not map to active project code paths.
- Introducing plugin versions that are not compatible with ESLint 9.
- Treating all lint findings as equal severity, which reduces signal quality.
- Letting lint scripts drift from actual repository structure or Next.js conventions.
