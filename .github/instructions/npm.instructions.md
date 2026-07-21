---
ai_generated: true
model: "openai/gpt-5.3-codex@unknown"
operator: "johnmillerATcodemag-com"
chat_id: "execute-create-npm-instruction-file-20260721"
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
ai_log: "ai-logs/2026/07/21/execute-create-npm-instruction-file-20260721/conversation.md"
source: ".github/prompts/create-npm-instruction-file.prompt.md"
name: npm
description: practical guidance for using npm in this codebase
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

Use npm as the single package manager for this repository and keep dependency decisions aligned with the current stack: Next.js App Router, TypeScript strict mode, React 19, and ESLint 9.

- Commit dependency changes intentionally and keep lockfile state deterministic.
- Prefer the smallest dependency surface that solves the current requirement.
- Keep scripts focused on the existing lifecycle (`dev`, `build`, `start`, `lint`).

## Standards

- Use `npm` commands for all package operations in this repo.
- Keep `package.json` scripts simple and explicit; avoid shell-specific logic in scripts.
- Pin framework-coupled packages to known-compatible versions (for example `next` with matching `eslint-config-next`).
- Keep TypeScript and React type packages aligned with major runtime versions.
- Add new dependencies only when native platform or existing packages cannot satisfy the need.
- Prefer dev dependencies for build-time, lint, test, and typing tools.
- Preserve a clean separation between `dependencies` (runtime) and `devDependencies` (development-time).

## Patterns

- Dependency updates:
  - Use targeted installs for incremental upgrades.
  - Validate `npm run lint` and `npm run build` after version changes.
- Script conventions:
  - `dev` for local development.
  - `build` for production compilation.
  - `start` for production runtime.
  - `lint` for static quality checks.
- Lockfile management:
  - Commit `package-lock.json` with any dependency change.
  - Avoid manual lockfile edits.

## Validation Checklist

- `package.json` remains valid JSON and scripts still match repository workflows.
- `dependencies` and `devDependencies` classification is correct.
- Added package versions are compatible with Next.js 16.2.10 and TypeScript strict usage.
- `package-lock.json` is updated and committed with dependency changes.
- `npm run lint` passes after package changes.
- `npm run build` succeeds after package changes.

## Common Pitfalls

- Mixing package managers (for example using pnpm or yarn artifacts in this repo).
- Adding broad utility dependencies for small problems that can be solved locally.
- Upgrading `next` or React-related packages without validating compatibility together.
- Placing runtime-required packages in `devDependencies`.
- Editing `package-lock.json` manually instead of letting npm regenerate it.
