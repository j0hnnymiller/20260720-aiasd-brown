---
ai_generated: true
model: "openai/gpt-5.3-codex@unknown"
operator: "johnmillerATcodemag-com"
chat_id: "execute-next-dev-instruction-file-20260721"
prompt: |
  Execute the prompt file at c:\git\AIASD\20260720-aiasd-brown\.github\prompts\create-next-dev-instruction-file.prompt.md.
started: "2026-07-21T00:00:00Z"
ended: "2026-07-21T00:00:00Z"
task_durations:
  - task: "read prompt and repository conventions"
    duration: "00:00:00"
  - task: "create next-dev instruction file"
    duration: "00:00:00"
total_duration: "00:00:00"
ai_log: "ai-logs/2026/07/21/execute-next-dev-instruction-file-20260721/conversation.md"
source: ".github/prompts/create-next-dev-instruction-file.prompt.md"
name: next-dev
description: Practical guidance for using next dev in this codebase
applyTo: "package.json|README.md"
version: "1.0.0"
author: "Development Team"
tags: ["next-dev", "nextjs", "workflow"]
owner: "Development Team"
reviewedDate: "2026-07-21"
nextReview: "2026-10-21"
---

# next dev

## Overview

Use `next dev` as the primary local development workflow for this repository's Next.js App Router project.

- Run development from repository root with dependency and script state defined in `package.json`.
- Keep instructions in `README.md` aligned with the current scripts and expected local setup.
- Prefer minimal, verifiable process guidance over environment-specific assumptions.

## Standards

- Define and maintain the canonical dev command in `package.json` scripts (`"dev": "next dev"` unless a scoped change is required).
- Keep `README.md` run steps consistent with actual scripts and package manager usage.
- Prioritize TypeScript strictness and lint compliance during local development before adding new workflow steps.
- Use explicit script names for alternate dev modes (for example, non-default ports) instead of changing default behavior silently.
- Update workflow docs whenever script behavior, prerequisites, or local runtime expectations change.

## Patterns

- Script-first workflow:
  - Start local development through `npm run dev` to enforce repository-defined behavior.
  - Add companion scripts only when there is a repeated team need.
- Documentation-first alignment:
  - Keep a single authoritative quick-start path in `README.md`.
  - Mirror command changes in README within the same change set.
- Scope discipline:
  - Keep `next dev` guidance focused on local development behavior.
  - Keep deployment and production runtime guidance separate from local dev instructions.

## Validation Checklist

- `package.json` contains a working `dev` script for `next dev`.
- `README.md` includes accurate, current steps for running local development.
- New or changed scripts are intentional, named clearly, and reflected in documentation.
- Local workflow guidance aligns with Next.js App Router and current repository scope.
- Development instructions do not conflict with TypeScript strictness or lint expectations.

## Common Pitfalls

- Documenting commands in `README.md` that do not match `package.json` scripts.
- Replacing the default `dev` behavior for one-off needs instead of adding a separate script.
- Expanding local dev instructions with speculative setup steps not validated in this repository.
- Mixing production/deployment guidance into `next dev` workflow documentation.
- Introducing script changes without updating accompanying docs and team usage expectations.
