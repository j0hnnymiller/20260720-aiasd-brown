---
ai_generated: true
model: "openai/gpt-5.3-codex@unknown"
operator: "johnmillerATcodemag-com"
chat_id: "tech-inventory-prompts-20260720"
prompt: |
  for each technology in the inventory create a prompt file that creates an instruction file for that technology.
started: "2026-07-20T00:00:00Z"
ended: "2026-07-20T00:00:00Z"
task_durations:
  - task: "inventory-to-prompt mapping"
    duration: "00:10:00"
  - task: "instruction file generation"
    duration: "00:20:00"
total_duration: "00:30:00"
ai_log: "ai-logs/2026/07/20/tech-inventory-prompts-20260720/conversation.md"
source: ".github/prompts/create-bundler-mode-instruction-file.prompt.md"
name: bundler-mode
description: Practical guidance for using Bundler mode in this codebase
applyTo: "tsconfig.json|next.config.ts"
version: "1.0.0"
author: "Development Team"
tags: ["typescript", "module-resolution", "nextjs"]
owner: "Development Team"
reviewedDate: "2026-07-21"
nextReview: "2026-10-21"
---

# Bundler mode

## Overview

Use TypeScript `moduleResolution: "bundler"` to match this repository's Next.js App Router setup and modern ESM-oriented tooling.

- Keep configuration centered in `tsconfig.json` with minimal, intentional options.
- Treat `next.config.ts` as runtime/build configuration, not as a workaround for TypeScript resolution issues.
- Preserve current project scope: a small App Router app with strict TypeScript and `@/*` path aliasing.

## Standards

- Keep `compilerOptions.moduleResolution` set to `"bundler"` in `tsconfig.json`.
- Keep TypeScript strictness enabled; do not weaken checks to compensate for import or resolution errors.
- Prefer explicit, stable imports that work with the existing alias mapping (`@/*` to `src/*`).
- Keep `next.config.ts` changes minimal and directly tied to verified Next.js build/runtime needs.
- Avoid adding compatibility flags or custom resolution hacks unless a concrete, reproducible issue requires them.

## Patterns

- Import style:
  - Use project alias imports for internal modules (for example, `@/components/Calculator`).
  - Keep import paths consistent with `src/` boundaries and App Router structure.
- Config ownership:
  - Type resolution behavior belongs in `tsconfig.json`.
  - Next.js framework behavior belongs in `next.config.ts`.
- Error handling workflow:
  - On unresolved import errors, verify file paths and alias usage first.
  - Update configuration only after confirming the issue is not a path, casing, or file-location mismatch.

## Validation Checklist

- `tsconfig.json` uses `moduleResolution: "bundler"`.
- Strict TypeScript settings remain enabled after changes.
- Imports in changed files resolve through existing relative or `@/*` alias paths.
- `next.config.ts` edits are minimal and justified by a concrete framework requirement.
- No new resolution workarounds were introduced without a reproducible problem statement.

## Common Pitfalls

- Changing module resolution mode to mask incorrect import paths.
- Relaxing strict TypeScript settings instead of fixing source typing issues.
- Adding unrelated `next.config.ts` options while addressing TypeScript import errors.
- Mixing alias and relative imports inconsistently across the same feature area.
- Treating bundler mode as a replacement for correct file organization under `src/app` and `src/components`.
