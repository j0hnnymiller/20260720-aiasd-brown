---
ai_generated: true
model: "openai/gpt-5.3-codex@unknown"
operator: "johnmillerATcodemag-com"
chat_id: "create-npm-instruction-file-20260721"
prompt: |
  #file:create-npm-instruction-file.prompt.md
started: "2026-07-21T00:00:00Z"
ended: "2026-07-21T00:00:00Z"
task_durations:
  - task: "analyze repository scope and conventions"
    duration: "00:00:00"
  - task: "create npm instruction file"
    duration: "00:00:00"
total_duration: "00:00:00"
ai_log: "ai-logs/2026/07/21/create-npm-instruction-file-20260721/conversation.md"
source: ".github/prompts/create-npm-instruction-file.prompt.md"
name: npm
description: Practical guidance for using npm in this codebase
applyTo: "package.json|package-lock.json"
version: "1.0.0"
author: "Development Team"
tags: ["npm", "dependencies", "nextjs", "typescript"]
owner: "Development Team"
reviewedDate: "2026-07-21"
nextReview: "2026-10-21"
---

# npm

## Overview

Use npm as the single package manager for this repository and keep dependency decisions aligned with the current Next.js App Router and TypeScript-strict setup.

- Treat `package-lock.json` as the source of truth for reproducible installs.
- Keep runtime dependencies minimal and explicit for the current app scope.
- Prefer stable package versions and intentional upgrades over frequent churn.

## Standards

- Use npm commands consistently (`npm install`, `npm uninstall`, `npm run <script>`).
- Commit `package-lock.json` changes with related `package.json` updates in the same change.
- Add dependencies to `dependencies` only when required at runtime; otherwise use `devDependencies`.
- Keep scripts focused and descriptive (`dev`, `build`, `start`, `lint`) and avoid redundant aliases.
- Do not bypass TypeScript strictness with tooling that hides type or lint failures.
- Prefer official Next.js and TypeScript ecosystem packages unless a clear project need requires alternatives.

## Patterns

- Dependency changes:
  - Add one package change at a time when practical.
  - Validate impact with `npm run lint` and `npm run build` after dependency updates.
- Version management:
  - Use semver-aware ranges intentionally.
  - Pin exact versions only when reproducibility or known compatibility issues require it.
- Script design:
  - Keep scripts cross-environment friendly and free of machine-specific assumptions.
  - Use npm lifecycle scripts only when they provide clear value and predictable behavior.

## Validation Checklist

- `package.json` and `package-lock.json` are both updated when dependencies change.
- New packages are categorized correctly as runtime or development dependencies.
- Script changes are necessary, named clearly, and remain aligned with project workflow.
- Lint and build commands succeed after dependency or script updates.
- No unused, duplicate, or overlapping dependencies were introduced.

## Common Pitfalls

- Updating `package.json` without committing the corresponding lockfile changes.
- Adding runtime dependencies for build-time or lint-only tooling.
- Introducing multiple tools that solve the same problem (for example overlapping formatters or linters).
- Using broad version ranges without validating compatibility in the current Next.js and TypeScript setup.
- Adding scripts that encode local-only paths, shell assumptions, or one-off developer behavior.