---
ai_generated: true
model: "openai/gpt-5.3-codex@unknown"
operator: "johnmillerATcodemag-com"
chat_id: "create-next-font-google-instruction-file-20260721"
prompt: |
  #file:create-next-font-google-instruction-file.prompt.md
started: "2026-07-21T00:00:00Z"
ended: "2026-07-21T00:00:00Z"
task_durations:
  - task: "analyze repository scope and conventions"
    duration: "00:00:00"
  - task: "create next/font/google instruction file"
    duration: "00:00:00"
total_duration: "00:00:00"
ai_log: "ai-logs/2026/07/21/create-next-font-google-instruction-file-20260721/conversation.md"
source: ".github/prompts/create-next-font-google-instruction-file.prompt.md"
name: next-font-google
description: Practical guidance for using next/font/google in this codebase
applyTo: "src/app/layout.tsx|src/**/*.tsx"
version: "1.0.0"
author: "Development Team"
tags: ["nextjs", "fonts", "typography"]
owner: "Development Team"
reviewedDate: "2026-07-21"
nextReview: "2026-10-21"
---

# next/font/google

## Overview

Use `next/font/google` to load Google fonts through Next.js build-time optimization, and keep font setup centralized in `src/app/layout.tsx`.

- Configure global fonts once in `src/app/layout.tsx`.
- Export font CSS variables and consume them through theme tokens in `src/app/globals.css`.
- Keep component files focused on behavior and layout, not font loading.

## Standards

- Import fonts from `next/font/google` only in app-shell locations unless there is a clear route-specific typography requirement.
- Use explicit `subsets` for each font (for example, `"latin"`) to keep payloads intentional.
- Prefer variable-based setup (`variable: "--font-*"`) so Tailwind theme tokens can reference fonts consistently.
- Keep TypeScript-safe usage by storing font objects in typed constants and reusing their `variable` fields in class composition.
- Avoid duplicate font declarations across multiple files; one canonical declaration per global font family.

## Patterns

- Global font pattern (current repository approach):
  - Define fonts in `src/app/layout.tsx`.
  - Attach font variables to the `<html>` class list.
  - Map CSS variables in `src/app/globals.css` to theme tokens (`--font-sans`, `--font-mono`).
- App Router alignment:
  - Keep font registration in the root layout for cross-route consistency.
  - Introduce route-level font setup only when a route has an intentional, isolated design requirement.
- Client component alignment:
  - Do not import `next/font/google` directly in most client components.
  - Consume the configured theme tokens/classes instead.

## Validation Checklist

- Font imports come from `next/font/google` and are centralized in `src/app/layout.tsx`.
- Each configured font declares explicit `subsets`.
- Font variables are attached to `<html>` and wired to global theme tokens.
- No duplicate or conflicting font variable names were introduced.
- TypeScript and lint checks pass with no new unsafe patterns.

## Common Pitfalls

- Loading the same font in multiple components, causing unnecessary duplication and drift.
- Mixing hard-coded `font-family` rules with variable-based theme tokens.
- Omitting `subsets`, which can produce less intentional bundles.
- Introducing route-specific font behavior without a concrete design or product requirement.