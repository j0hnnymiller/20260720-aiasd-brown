---
ai_generated: true
model: "openai/gpt-5.3-codex@unknown"
operator: "johnmillerATcodemag-com"
chat_id: "tech-inventory-prompts-20260720"
prompt: |
  #file:create-next-start-instruction-file.prompt.md
started: "2026-07-20T00:00:00Z"
ended: "2026-07-20T00:00:00Z"
task_durations:
  - task: "analyze repository scope and conventions"
    duration: "00:00:00"
  - task: "create next-start instruction file"
    duration: "00:00:00"
total_duration: "00:00:00"
ai_log: "ai-logs/2026/07/20/tech-inventory-prompts-20260720/conversation.md"
source: ".github/prompts/create-next-start-instruction-file.prompt.md"
name: next-start
description: Practical guidance for using next start in this codebase
applyTo: "package.json|README.md"
version: "1.0.0"
author: "Development Team"
tags: ["nextjs", "runtime", "operations"]
owner: "Development Team"
reviewedDate: "2026-07-21"
nextReview: "2026-10-21"
---

# next start

## Overview

Use `next start` only for serving a production build that was created by `next build` in the same project state.

- Treat `next start` as a runtime command, not a development command.
- Keep scripts and docs aligned so contributors run `npm run dev` for local iteration and `npm run build` + `npm run start` for production-like validation.
- Keep guidance consistent with the current App Router + TypeScript strict setup in this repository.

## Standards

- Define `start` in `package.json` as `next start`.
- Keep `build` and `start` paired: never document or automate `next start` without a preceding successful `next build`.
- Keep runtime defaults explicit in documentation when needed (for example, default port behavior and how to override with `PORT`).
- Avoid adding custom Node runtime wrappers unless there is a verified operational requirement.
- Ensure README command examples match actual scripts in `package.json`.

## Patterns

- Script pattern in `package.json`:
  - `"build": "next build"`
  - `"start": "next start"`
- Validation workflow pattern:
  - Install dependencies.
  - Run `npm run build`.
  - Run `npm run start`.
  - Confirm the app serves the production build successfully.
- Documentation pattern:
  - Separate development and production commands clearly.
  - Show production run steps in the same order they must be executed.

## Validation Checklist

- `package.json` contains a `start` script that uses `next start`.
- `package.json` build/start scripts are compatible and unchanged by unrelated tooling.
- README production instructions require `npm run build` before `npm run start`.
- No documentation suggests using `next start` as a hot-reload development server.
- Command examples are accurate for the current npm-based workflow.

## Common Pitfalls

- Running `next start` without a fresh production build.
- Treating `next start` as a replacement for `next dev` during feature work.
- Letting README commands drift from `package.json` scripts.
- Adding environment-specific launch flags to docs without confirming they are needed in this repo.