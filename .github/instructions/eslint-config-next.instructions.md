---
ai_generated: true
model: "openai/gpt-5.3-codex@unknown"
operator: "johnmillerATcodemag-com"
chat_id: "execute-create-eslint-config-next-instruction-file-20260721"
prompt: |
  Execute the prompt file at c:\git\AIASD\20260720-aiasd-brown\.github\prompts\create-eslint-config-next-instruction-file.prompt.md.
started: "2026-07-21T00:00:00Z"
ended: "2026-07-21T00:00:00Z"
task_durations:
  - task: "read prompt and repository conventions"
    duration: "00:05:00"
  - task: "author eslint-config-next instruction file"
    duration: "00:10:00"
total_duration: "00:15:00"
ai_log: "ai-logs/2026/07/21/execute-create-eslint-config-next-instruction-file-20260721/conversation.md"
source: ".github/prompts/create-eslint-config-next-instruction-file.prompt.md"
name: eslint-config-next
description: Practical guidance for using eslint-config-next in this codebase.
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

Use `eslint-config-next` as the baseline for linting in this repository.

- Keep configuration in `eslint.config.mjs` only.
- Preserve compatibility with Next.js App Router conventions under `src/app`.
- Keep TypeScript linting enabled through the `eslint-config-next/typescript` preset.
- Prefer minimal, explicit overrides over broad custom rule sets.

## Standards

- Use flat config with `defineConfig` from `eslint/config`.
- Include `eslint-config-next/core-web-vitals` for Next.js performance and correctness checks.
- Include `eslint-config-next/typescript` to align linting with strict TypeScript usage.
- Keep ignore patterns explicit and limited to generated artifacts.
- Do not disable rules globally unless there is a documented project-specific need.
- When adding overrides, scope them by file pattern and keep rule changes narrow.

## Patterns

- Start with preset spreads, then append local adjustments.
- Keep ignore definitions centralized via `globalIgnores`.
- Document any non-default rule in-place with one short rationale comment.
- Prefer fixing code to satisfy rules instead of relaxing rules.

Recommended structure:

```mjs
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
```

## Validation Checklist

- `eslint.config.mjs` imports both `core-web-vitals` and `typescript` presets.
- Ignore patterns only target build artifacts and generated files.
- No broad `off` switches for core safety or correctness rules.
- Lint runs cleanly with repository scripts before merging.
- Any custom rule change has a clear, local rationale.

## Common Pitfalls

- Replacing presets with hand-written rule bundles that drift from Next.js defaults.
- Disabling noisy rules globally instead of addressing the underlying code issue.
- Expanding ignores to hide lint findings in source files.
- Adding config complexity for one-off cases that should be solved in code.
- Introducing framework-agnostic rule packs that conflict with Next.js App Router behavior.
