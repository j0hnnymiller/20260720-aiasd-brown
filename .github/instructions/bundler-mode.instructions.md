---
ai_generated: true
model: "openai/gpt-5.3-codex@unknown"
operator: "johnmillerATcodemag-com"
chat_id: "create-bundler-mode-instruction-file-20260721"
prompt: |
  #file:create-bundler-mode-instruction-file.prompt.md
started: "2026-07-21T00:00:00Z"
ended: "2026-07-21T00:00:00Z"
task_durations:
  - task: "analyze repository scope and conventions"
    duration: "00:00:00"
  - task: "create bundler mode instruction file"
    duration: "00:00:00"
total_duration: "00:00:00"
ai_log: "ai-logs/2026/07/21/create-bundler-mode-instruction-file-20260721/conversation.md"
source: ".github/prompts/create-bundler-mode-instruction-file.prompt.md"
name: bundler-mode
description: Practical guidance for using Bundler mode in this codebase
applyTo: "tsconfig.json|next.config.ts"
version: "1.0.0"
author: "Development Team"
tags: ["typescript", "bundler", "nextjs"]
owner: "Development Team"
reviewedDate: "2026-07-21"
nextReview: "2026-10-21"
---

# Bundler Mode

## Overview

Use TypeScript Bundler mode to keep module resolution aligned with modern Next.js behavior and this repository's current scope.

- Keep `compilerOptions.moduleResolution` set to `"bundler"` in `tsconfig.json`.
- Keep `next.config.ts` focused on intentional, minimal configuration.
- Preserve compatibility with strict TypeScript settings and the existing `@/*` path alias.

## Standards

- Keep `compilerOptions.strict` enabled and avoid introducing unsafe type shortcuts.
- Preserve `compilerOptions.module` as `"esnext"` when using Bundler mode.
- Keep `compilerOptions.paths` aligned with actual source layout (`@/*` -> `./src/*`).
- Use ESM-compatible imports and avoid Node-specific resolution assumptions that conflict with bundler semantics.
- Add `next.config.ts` options only for verified runtime or build requirements.
- Keep config changes local, reviewable, and reversible.

## Patterns

- TypeScript config updates:
  - Treat `moduleResolution`, `module`, and `paths` as a coordinated set.
  - Change one only when you have validated the others still reflect project behavior.
- Import discipline:
  - Prefer explicit file/module imports that are valid under bundler resolution.
  - Keep aliases stable across app and component code.
- Next.js config discipline:
  - Start with default config and add only the smallest required option.
  - Document why each non-default option exists in PR context.
- Scope alignment:
  - Prioritize App Router + TypeScript strict compatibility over speculative cross-tool optimizations.

## Validation Checklist

- `tsconfig.json` retains `"moduleResolution": "bundler"` and `"module": "esnext"`.
- TypeScript strict mode remains enabled with no new unsafe patterns.
- Path alias resolution (`@/*`) still maps correctly to `src/*`.
- `next.config.ts` remains minimal and type-safe (`NextConfig`).
- Import paths compile and lint cleanly under current project tooling.
- Any bundler-related config change is justified by a concrete repository need.

## Common Pitfalls

- Switching resolution mode without validating import behavior across the project.
- Mixing Node-specific assumptions into code intended for bundler resolution.
- Changing aliases in `tsconfig.json` without updating usage patterns.
- Adding broad `next.config.ts` customizations to solve issues that belong in code.
- Relaxing strict typing to bypass resolution or build issues instead of fixing root causes.
