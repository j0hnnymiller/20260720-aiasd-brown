---
ai_generated: true
model: "openai/gpt-5.3-codex@unknown"
operator: "johnmillerATcodemag-com"
chat_id: "execute-create-next-build-instruction-file-20260721"
prompt: |
  Execute the prompt file at c:\git\AIASD\20260720-aiasd-brown\.github\prompts\create-next-build-instruction-file.prompt.md.
  Read the prompt and produce exactly the requested technology-specific instruction file(s) in this repository.
started: "2026-07-21T00:00:00Z"
ended: "2026-07-21T00:00:00Z"
task_durations:
  - task: "read prompt and conventions"
    duration: "00:00:00"
  - task: "create next build instruction file"
    duration: "00:00:00"
total_duration: "00:00:00"
ai_log: "ai-logs/2026/07/21/execute-create-next-build-instruction-file-20260721/conversation.md"
source: ".github/prompts/create-next-build-instruction-file.prompt.md"
name: next-build
description: Practical guidance for using next build in this codebase
applyTo: "package.json|README.md|next.config.ts"
version: "1.0.0"
author: "Development Team"
tags: ["nextjs", "build", "typescript", "app-router"]
owner: "Development Team"
reviewedDate: "2026-07-21"
nextReview: "2026-10-21"
---

# next build

## Overview

Use `next build` as the production validation gate for this repository. Keep build behavior aligned with the current Next.js App Router architecture, strict TypeScript settings, and the project's single-app scope.

- Treat build success as a release requirement, not an optional local check.
- Keep build-impacting changes minimal and explicit in `package.json`, `README.md`, and `next.config.ts`.
- Prefer defaults unless a documented project need requires custom build behavior.

## Standards

- Keep the `build` script in `package.json` as `next build` unless there is a verified and documented reason to change it.
- Preserve strict TypeScript compatibility; do not relax checks to force a green build.
- Keep `next.config.ts` small and intentional. Add options only when they solve a real build/runtime requirement.
- Document any build command, prerequisite, or environment expectation changes in `README.md`.
- Do not introduce build-time workarounds that mask lint or type issues.

## Patterns

- Script pattern:
  - Use a direct build command (`next build`) for predictable CI and local parity.
  - Keep script naming conventional (`dev`, `build`, `start`, `lint`) to match Next.js tooling expectations.
- Configuration pattern:
  - Start with framework defaults.
  - Add config one setting at a time, with a short rationale in PR notes and matching README updates when user-facing.
- Scope pattern:
  - Keep build guidance focused on this repository's current App Router setup under `src/app/**`.
  - Avoid adding multi-app, monorepo, or deployment-specific complexity unless the repository scope changes.

## Validation Checklist

- `npm run build` completes successfully with no new type regressions.
- `package.json` scripts remain clear, minimal, and compatible with Next.js defaults.
- `next.config.ts` changes are necessary, reviewed, and limited to current project needs.
- `README.md` reflects any build command or prerequisite changes.
- No rule or config was added solely to suppress build, lint, or type failures.

## Common Pitfalls

- Changing the `build` script to bypass `next build` behavior without a validated reason.
- Disabling strictness or weakening checks to avoid fixing underlying TypeScript issues.
- Accumulating unrelated `next.config.ts` options that increase maintenance cost.
- Forgetting to update `README.md` after changing build expectations.
- Optimizing for hypothetical future architecture instead of current repository scope.
