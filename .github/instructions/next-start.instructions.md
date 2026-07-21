---
ai_generated: true
model: "openai/gpt-5.3-codex@unknown"
operator: "johnmillerATcodemag-com"
chat_id: "execute-create-next-start-instruction-file-20260721"
prompt: |
  #file:create-next-start-instruction-file.prompt.md
started: "2026-07-21T00:00:00Z"
ended: "2026-07-21T00:00:00Z"
task_durations:
  - task: "review prompt and repository conventions"
    duration: "00:00:00"
  - task: "author next-start instruction file"
    duration: "00:00:00"
total_duration: "00:00:00"
ai_log: "ai-logs/2026/07/21/execute-create-next-start-instruction-file-20260721/conversation.md"
source: ".github/prompts/create-next-start-instruction-file.prompt.md"
name: next-start
description: Practical guidance for using next start in this codebase
applyTo: "package.json|README.md"
version: "1.0.0"
author: "Development Team"
tags: ["next-start", "nextjs", "operations"]
owner: "Development Team"
reviewedDate: "2026-07-21"
nextReview: "2026-10-21"
---

# next start

## Overview

Use `next start` only to run a production build that was generated with `next build`. Keep scripts and docs aligned with the current Next.js App Router scope in this repository (`src/app/**`) and preserve TypeScript strict defaults.

- Treat `next start` as production runtime behavior, not development workflow.
- Keep `npm run dev` for local feature work and route iteration.
- Ensure any runtime guidance in README matches package scripts exactly.

## Standards

- Define runtime scripts in `package.json` using the explicit build/start sequence:
  - `build`: `next build`
  - `start`: `next start`
- Do not document or add `next start` as a substitute for `next dev`.
- Keep script names conventional (`dev`, `build`, `start`, `lint`) unless a verified project need requires additional scripts.
- Document required production prerequisites in README:
  - Build artifacts must exist before start.
  - Runtime environment variables must be present.
- Keep runtime examples compatible with current repository scope; do not reference Pages Router-only behavior.

## Patterns

- Script pattern in `package.json`:
  - `npm run build` compiles production assets.
  - `npm run start` serves the production app.
- Documentation pattern in README:
  - Separate development commands from production commands.
  - Show production as a two-step flow (`build` then `start`).
- Verification pattern:
  - Treat production smoke checks as route-level checks for App Router output.
  - Keep examples and checks TypeScript-strict friendly by avoiding undocumented runtime assumptions.

## Validation Checklist

- `package.json` contains a `start` script that runs `next start`.
- `package.json` contains a `build` script that runs `next build`.
- README documents production startup as `npm run build` followed by `npm run start`.
- README does not present `next start` as a development command.
- Documentation remains aligned with App Router structure and current project scope.
- No script or README guidance introduces behavior that conflicts with TypeScript strict project defaults.

## Common Pitfalls

- Running `next start` before creating a production build.
- Mixing development and production instructions so users run the wrong command.
- Documenting runtime behavior that assumes Pages Router conventions instead of App Router conventions.
- Adding custom start flags or script indirection without a clear, validated need.
- Letting README command examples drift from the real scripts in `package.json`.
