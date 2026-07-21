---
ai_generated: true
model: "openai/gpt-5.3-codex@unknown"
operator: "johnmillerATcodemag-com"
chat_id: "tech-inventory-prompts-20260720"
prompt: |
  #file:create-eslint-9-instruction-file.prompt.md
started: "2026-07-20T00:00:00Z"
ended: "2026-07-20T00:00:00Z"
task_durations:
  - task: "analyze repository scope and conventions"
    duration: "00:00:00"
  - task: "create eslint 9 instruction file"
    duration: "00:00:00"
total_duration: "00:00:00"
ai_log: "ai-logs/2026/07/20/tech-inventory-prompts-20260720/conversation.md"
source: ".github/prompts/create-eslint-9-instruction-file.prompt.md"
name: eslint-9
description: Practical guidance for using ESLint 9 in this codebase
applyTo: "eslint.config.mjs|package.json"
version: "1.0.0"
author: "Development Team"
tags: ["eslint", "nextjs", "typescript"]
owner: "Development Team"
reviewedDate: "2026-07-21"
nextReview: "2026-10-21"
---

# ESLint 9

## Overview

Use ESLint 9 as the primary static quality gate for this Next.js App Router and TypeScript strict project. Keep lint rules aligned with the current repository scope: one App Router route shell in `src/app/**` and interactive logic in `src/components/Calculator.tsx`.

- Keep lint behavior deterministic across local and CI runs.
- Favor rules that prevent real defects over cosmetic churn.
- Enforce consistency with Next.js core web vitals and TypeScript-safe patterns.

## Standards

- Keep `eslint.config.mjs` in Flat Config format compatible with ESLint 9.
- Preserve integration with Next.js linting (`eslint-config-next`) and do not replace it with incompatible legacy presets.
- Ensure `package.json` lint scripts invoke ESLint directly against intended source paths and fail on actionable issues.
- Treat TypeScript strictness as a baseline: avoid patterns that bypass type safety (`any`, unchecked assertions, ignored diagnostics).
- Scope rule changes to verified project needs; avoid broad rule toggles without a concrete issue.
- Prefer warnings for exploratory guidance and errors for correctness, safety, or CI-blocking requirements.

## Patterns

- Flat config composition:
  - Start from Next.js-provided config layers.
  - Add only minimal repository-specific overrides.
- Rule targeting:
  - Use file-pattern overrides when rules differ between config files and application code.
  - Keep overrides narrow so `src/app/**` and `src/components/**` remain consistently enforced.
- Script hygiene in `package.json`:
  - Keep a single canonical lint script and avoid duplicate lint entry points with conflicting flags.
  - Pair lint scripts with fix scripts only when safe autofixes are expected.
- TypeScript-aware linting:
  - Keep parser and plugin settings compatible with current TypeScript and Next.js versions.
  - Prefer explicit exceptions with comments over disabling rules globally.

## Validation Checklist

- `eslint.config.mjs` remains ESLint 9 Flat Config compliant.
- `package.json` contains clear, maintainable lint commands for local and CI usage.
- Next.js core web vitals lint coverage is preserved.
- No new rule disables were added without a documented, file-scoped reason.
- Lint output is actionable and free of noisy or redundant rules.
- Changes align with current repository scope and TypeScript strict expectations.

## Common Pitfalls

- Mixing legacy `.eslintrc*` assumptions into ESLint 9 Flat Config setup.
- Adding overlapping rule sets that duplicate or conflict with Next.js defaults.
- Using broad ignore patterns that hide real issues in `src/app/**` or `src/components/**`.
- Downgrading strict rules to silence errors instead of fixing root causes.
- Introducing lint scripts that behave differently between developer machines and CI.
