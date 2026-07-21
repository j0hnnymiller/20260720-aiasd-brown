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
source: ".github/prompts/create-next-build-instruction-file.prompt.md"
name: next-build
description: Practical guidance for using next build in this codebase
applyTo: "package.json|README.md|next.config.ts"
version: "1.0.0"
author: "Development Team"
tags: ["nextjs", "build", "tooling"]
owner: "Development Team"
reviewedDate: "2026-07-21"
nextReview: "2026-10-21"
---

# next build

## Overview

Use `next build` to produce a deterministic production build for this repository's Next.js App Router project (`src/app/**`) with TypeScript strictness and current ESLint conventions.

- Keep build behavior aligned with the current repository scope: a small App Router app with one primary route and a client calculator component.
- Treat build configuration as production-critical: prefer default Next.js behavior and only add options to `next.config.ts` for verified needs.
- Ensure changes touching build scripts or runtime configuration remain consistent across `package.json`, `README.md`, and `next.config.ts`.

## Standards

- Keep `package.json` build script canonical as `next build` unless there is a documented, testable reason to add flags or wrappers.
- Keep `next.config.ts` minimal, explicit, and compatible with the installed Next.js version.
- Preserve TypeScript strict-safe patterns so production builds do not rely on unsafe casts or implicit nullable behavior.
- Keep documentation in `README.md` accurate for local and CI build commands.
- Prefer reproducible builds: avoid environment-specific assumptions in scripts, config, or docs.

## Patterns

- Script pattern:
  - Use `"build": "next build"` in `package.json`.
  - Keep related scripts (`dev`, `start`, `lint`) consistent with the documented workflow.
- Configuration pattern:
  - Start with no custom config; add only narrowly scoped options in `next.config.ts`.
  - Co-locate rationale in PR context when adding build-affecting options.
- Documentation pattern:
  - Document production build and run flow in `README.md` using the same commands defined in `package.json`.
  - Update docs in the same change when scripts or config change.
- Validation pattern:
  - Run `npm run build` after modifying `package.json`, `next.config.ts`, or build instructions.
  - Confirm the build completes without introducing new lint/type regressions.

## Validation Checklist

- `package.json` contains a valid `build` script using `next build`.
- `README.md` build instructions match the actual npm scripts.
- `next.config.ts` changes are necessary, minimal, and compatible with current Next.js usage.
- Production build completes locally with `npm run build`.
- No new strict typing or linting issues are introduced by build-related changes.
- Any deviation from default build behavior is explicitly justified.

## Common Pitfalls

- Adding custom build flags or wrappers in `package.json` without a verified requirement.
- Letting `README.md` drift from the real build command.
- Using `next.config.ts` for speculative optimizations that increase maintenance risk.
- Introducing environment-dependent behavior that breaks reproducible CI or local builds.
- Treating successful `next dev` as sufficient proof that production `next build` is healthy.