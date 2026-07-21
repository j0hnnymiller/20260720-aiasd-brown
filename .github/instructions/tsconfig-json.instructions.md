---
ai_generated: true
model: "openai/gpt-5.3-codex@unknown"
operator: "johnmillerATcodemag-com"
chat_id: "create-tsconfig-json-instruction-file-20260721"
prompt: |
  Create or update .github/instructions/tsconfig-json.instructions.md as a complete markdown instruction file with YAML front matter.
started: "2026-07-21T00:00:00Z"
ended: "2026-07-21T00:00:00Z"
task_durations:
  - task: "review prompt requirements"
    duration: "00:00:00"
  - task: "author tsconfig instruction file"
    duration: "00:00:00"
total_duration: "00:00:00"
ai_log: "ai-logs/2026/07/21/create-tsconfig-json-instruction-file-20260721/conversation.md"
source: ".github/prompts/create-tsconfig-json-instruction-file.prompt.md"
name: tsconfig-json
description: Practical guidance for using tsconfig.json in this codebase.
applyTo: "tsconfig.json"
version: "1.0.0"
author: "Development Team"
tags: ["typescript", "tsconfig", "nextjs", "standards"]
owner: "Development Team"
reviewedDate: "2026-07-21"
nextReview: "2026-10-21"
---

# tsconfig.json Instructions

## Overview

Use `tsconfig.json` to enforce predictable TypeScript behavior for this Next.js App Router project. Keep configuration strict, minimal, and aligned with the current repository scope.

- Preserve compatibility with the active Next.js and TypeScript versions in `package.json`.
- Prefer explicit compiler settings over implicit defaults when behavior affects correctness.
- Keep `tsconfig.json` focused on app code under `src/` and avoid adding settings for tooling that does not run in this repository.

## Standards

- Keep `strict` enabled. Do not disable strictness globally to bypass type issues.
- Keep `noEmit` enabled for application builds handled by Next.js.
- Keep module and resolution settings compatible with Next.js defaults unless a verified project need requires change.
- Keep path aliases synchronized with actual folder structure and usage in imports.
- Restrict `include` and `exclude` to the minimum needed files.
- Avoid enabling experimental compiler options unless they are required by committed code and documented in the pull request.
- When changing compiler options that affect runtime behavior, validate build and lint results before merging.

## Patterns

### Safe Baseline Pattern

- Preserve these baseline intents in `tsconfig.json`:
  - Strict type checking is on.
  - JavaScript output is disabled (`noEmit`).
  - Next.js TypeScript plugin is configured.
  - Project includes app source and Next.js generated types.

### Path Alias Pattern

- Use a single root alias pattern (for example `@/*`) mapped to `./src/*` when importing app code.
- Add new aliases only when they reduce complexity; remove aliases that are unused.
- Keep alias mappings and import style consistent across files.

### Incremental Change Pattern

- Change one compiler concern at a time (for example strictness, paths, module behavior).
- After each change, run the cheapest relevant validation (`npm run lint`, then `npm run build` if needed).
- Revert speculative config additions that do not provide clear value.

## Validation Checklist

- `applyTo` remains `tsconfig.json`.
- `strict` remains enabled.
- `noEmit` remains enabled for Next.js app builds.
- `include`/`exclude` patterns match current repository structure.
- Aliases in `paths` map to real directories.
- No obsolete or duplicate compiler options were introduced.
- Lint and build pass after configuration changes.

## Common Pitfalls

- Disabling strictness to silence errors instead of fixing types.
- Adding broad `include` globs that pull in unnecessary files.
- Leaving stale path aliases after refactors.
- Introducing options copied from unrelated templates without validating impact.
- Changing module-related settings in ways that conflict with Next.js expectations.
- Treating `tsconfig.json` as a place for temporary workarounds that never get removed.

## Summary

Keep `tsconfig.json` strict, small, and aligned with Next.js App Router conventions. Prefer incremental, verified changes that improve correctness and maintainability without expanding project scope.
