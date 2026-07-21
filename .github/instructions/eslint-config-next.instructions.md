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
source: ".github/prompts/create-eslint-config-next-instruction-file.prompt.md"
name: eslint-config-next
description: Practical guidance for using eslint-config-next in this codebase
applyTo: "eslint.config.mjs"
version: "1.0.0"
author: "Development Team"
tags: ["eslint", "nextjs", "typescript", "quality"]
owner: "Development Team"
reviewedDate: "2026-07-21"
nextReview: "2026-10-21"
---

# eslint-config-next

## Overview

Use `eslint-config-next` as the baseline lint policy for this repository's Next.js App Router and TypeScript workflow.

- Keep the config focused on correctness and maintainability, not stylistic churn.
- Prefer rule changes that prevent real defects or unsafe patterns.
- Align lint behavior with the current project scope in `src/app/**` and `src/components/**`.

## Standards

- Extend `eslint-config-next` as the primary rule source for Next.js and React guidance.
- Preserve compatibility with TypeScript strictness configured in the repository.
- Keep lint rules deterministic across local and CI runs.
- Add overrides only when there is a concrete false positive or project-specific requirement.
- Document non-default rule changes inline in `eslint.config.mjs` with a short rationale.
- Prefer warnings first for new non-critical rules, then promote to errors after validation.

## Patterns

- Baseline composition:
  - Start from `eslint-config-next` defaults.
  - Layer minimal repository-specific adjustments after defaults.
- Rule tuning:
  - Tighten rules that protect runtime behavior (`no-unused-vars`, `no-unreachable`, React hook correctness).
  - Avoid disabling broad rule sets; scope exceptions to specific files when needed.
- File targeting:
  - Keep app/router rules applicable to `src/app/**`.
  - Keep component-level lint behavior consistent in `src/components/**`.
- Suppression hygiene:
  - Use single-line disables with explicit reason comments.
  - Remove stale suppressions during adjacent edits.

## Validation Checklist

- `eslint.config.mjs` continues to extend `eslint-config-next` as the base.
- New rules are justified by an actual issue, not preference alone.
- Overrides are narrowly scoped and avoid weakening unrelated files.
- TypeScript and Next.js App Router files lint cleanly under current config.
- Any lint suppression includes a reason and the narrowest possible scope.
- Configuration changes are verified with local lint execution before merge.

## Common Pitfalls

- Replacing `eslint-config-next` defaults with large custom rule blocks.
- Introducing conflicting rules that duplicate or fight framework defaults.
- Using global disables instead of targeted file or line exceptions.
- Promoting many new rules to errors at once, creating noisy and low-signal failures.
- Keeping legacy suppressions that no longer match current code.