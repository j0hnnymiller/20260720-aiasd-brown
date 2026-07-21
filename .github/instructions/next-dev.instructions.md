---
ai_generated: true
model: "openai/gpt-5.3-codex@unknown"
operator: "johnmillerATcodemag-com"
chat_id: "execute-create-next-dev-instruction-file-20260721"
prompt: |
  #file:create-next-dev-instruction-file.prompt.md
started: "2026-07-21T00:00:00Z"
ended: "2026-07-21T00:00:00Z"
task_durations:
  - task: "analyze prompt and repository instruction conventions"
    duration: "00:00:00"
  - task: "create next dev instruction file"
    duration: "00:00:00"
total_duration: "00:00:00"
ai_log: "ai-logs/2026/07/21/execute-create-next-dev-instruction-file-20260721/conversation.md"
source: ".github/prompts/create-next-dev-instruction-file.prompt.md"
name: next-dev
description: Practical guidance for using next dev in this codebase
applyTo: "package.json|README.md"
version: "1.0.0"
author: "Development Team"
tags: ["nextjs", "next-dev", "app-router", "typescript"]
owner: "Development Team"
reviewedDate: "2026-07-21"
nextReview: "2026-10-21"
---

# next dev

## Overview

Use `next dev` as the default local development workflow for this repository's current scope: Next.js App Router in `src/app`, strict TypeScript, and a focused UI feature set.

- Start local work with `npm run dev` so `next dev` runs with project scripts and shared defaults.
- Keep development behavior aligned with production intent by making minimal, explicit config changes.
- Prefer server-first App Router patterns and isolate interactivity to Client Components only where required.

## Standards

- Keep the `package.json` `dev` script mapped to `next dev`; avoid custom wrappers unless there is a verified team need.
- Treat `next dev` warnings as actionable signals; resolve TypeScript, ESLint, and routing warnings during development instead of deferring.
- Preserve strict TypeScript compatibility in files exercised during local runs; avoid `any` and unchecked assertions.
- Keep README development commands accurate with actual scripts so onboarding and local startup stay reliable.
- Use environment variables intentionally; document any required `.env` values in README when they affect startup.

## Patterns

- Local startup pattern:
  - Install dependencies with `npm install`.
  - Run `npm run dev` for iterative development.
  - Use `npm run lint` and `npm run build` before completion-sensitive changes.
- App Router alignment pattern:
  - Route and layout concerns stay in `src/app/**`.
  - Reusable UI stays in `src/components/**`.
  - Client-only hooks and browser APIs live in explicit Client Components.
- Documentation sync pattern:
  - When changing scripts in `package.json`, update README command examples in the same change.

## Validation Checklist

- `package.json` includes a working `dev` script that runs `next dev`.
- README local development instructions match current scripts and package manager usage.
- Local `next dev` startup works without undocumented prerequisites.
- No new TypeScript strictness regressions are introduced in edited files.
- App Router file boundaries remain consistent with current project structure.

## Common Pitfalls

- Replacing `npm run dev` with ad-hoc commands that drift from team scripts.
- Ignoring repeated `next dev` warnings that later fail in build or CI.
- Editing script names in `package.json` without updating README instructions.
- Expanding Client Component usage broadly instead of isolating interactivity.
- Adding speculative dev-time configuration not required by current repository scope.