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
  - task: "prompt file generation"
    duration: "00:20:00"
total_duration: "00:30:00"
ai_log: "ai-logs/2026/07/20/tech-inventory-prompts-20260720/conversation.md"
source: ".github/prompts/create-tsconfig-json-instruction-file.prompt.md"
name: tsconfig-json
description: Practical guidance for using tsconfig.json in this codebase
applyTo: "tsconfig.json"
version: "1.0.0"
author: "Development Team"
tags: ["typescript", "tsconfig", "nextjs"]
owner: "Development Team"
reviewedDate: "2026-07-21"
nextReview: "2026-10-21"
---

# tsconfig.json

## Overview

Use `tsconfig.json` as the single source of truth for TypeScript compiler behavior in this repository's Next.js App Router project.

- Keep the configuration strict, predictable, and aligned with `next-env.d.ts`, `src/app/**`, and `src/components/**`.
- Prefer incremental, explicitly justified changes to compiler options.
- Preserve compatibility with Next.js build and type-check workflows.

## Standards

- Keep `compilerOptions.strict` enabled unless a documented, temporary exception is required.
- Preserve the `@/*` path alias and ensure path mappings continue to resolve `src/*` correctly.
- Keep module and target settings compatible with the current Next.js and TypeScript toolchain; do not override defaults without a verified need.
- Keep `include` and `exclude` concise and intentional; include app source and required type declaration files, exclude generated artifacts.
- Prefer `noUncheckedIndexedAccess`, `noImplicitOverride`, and similar safety flags when they align with existing project constraints.
- Avoid broad relaxations like `skipLibCheck` changes, `allowJs`, or disabling strict flags without repository-level agreement.
- Treat `tsconfig.json` as infrastructure: changes should be reviewed with the same rigor as build config updates.

## Patterns

- Baseline pattern:
  - Start from Next.js defaults generated for App Router projects.
  - Add only project-specific deltas (for example, path aliases and explicit includes).
- Strictness pattern:
  - Fix code to satisfy type checks instead of weakening compiler settings.
  - If strictness must be softened temporarily, add a clear TODO and an owner in the related PR context.
- Scope pattern:
  - Keep source code under `src/**` and avoid expanding include globs to unrelated directories.
  - Keep test/tooling-specific overrides in separate config files when needed (for example, `tsconfig.test.json`).
- Evolution pattern:
  - Change one compiler concern at a time (paths, strictness, module settings) to simplify regression analysis.

## Validation Checklist

- `npm run lint` passes without introducing new TypeScript-related rule regressions.
- `tsc --noEmit` (or equivalent repository type-check command) passes after config changes.
- Path alias imports using `@/*` resolve correctly across `src/app/**` and `src/components/**`.
- `next build` remains successful after any compiler option updates.
- No strictness downgrade was introduced without explicit rationale and follow-up plan.
- `include` and `exclude` entries match current project structure and do not hide source files unintentionally.

## Common Pitfalls

- Relaxing strict options to bypass real type issues that should be fixed in code.
- Expanding include globs too broadly and unintentionally type-checking generated or external files.
- Changing module resolution behavior without validating Next.js runtime and build impact.
- Breaking `@/*` alias resolution by updating `paths` without matching directory structure.
- Bundling multiple unrelated compiler-option changes in a single commit, making regressions harder to isolate.
