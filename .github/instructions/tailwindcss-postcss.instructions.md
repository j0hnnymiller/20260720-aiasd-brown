---
ai_generated: true
model: "openai/gpt-5.3-codex@unknown"
operator: "johnmillerATcodemag-com"
chat_id: "create-tailwindcss-postcss-instruction-file-20260721"
prompt: |
  #file:create-tailwindcss-postcss-instruction-file.prompt.md
started: "2026-07-21T00:00:00Z"
ended: "2026-07-21T00:00:00Z"
task_durations:
  - task: "analyze prompt and repository instruction conventions"
    duration: "00:00:00"
  - task: "create tailwindcss postcss instruction file"
    duration: "00:00:00"
total_duration: "00:00:00"
ai_log: "ai-logs/2026/07/21/create-tailwindcss-postcss-instruction-file-20260721/conversation.md"
source: ".github/prompts/create-tailwindcss-postcss-instruction-file.prompt.md"
name: tailwindcss-postcss
description: Practical guidance for using @tailwindcss/postcss in this codebase
applyTo: "postcss.config.mjs|src/**/*.css"
version: "1.0.0"
author: "Development Team"
tags: ["tailwindcss", "postcss", "nextjs", "styling"]
owner: "Development Team"
reviewedDate: "2026-07-21"
nextReview: "2026-10-21"
---

# @tailwindcss/postcss

## Overview

Use `@tailwindcss/postcss` as the single PostCSS integration point for Tailwind in this Next.js App Router project.

- Keep Tailwind build behavior defined in `postcss.config.mjs`.
- Keep global and shared style tokens in `src/app/globals.css`.
- Keep component-level styling utility-first; avoid introducing competing CSS frameworks.
- Prefer predictable, static class composition over runtime-generated class name strings.

## Standards

- Keep `postcss.config.mjs` minimal and explicit; configure only plugins that are required.
- Use Tailwind directives in `src/app/globals.css` and avoid duplicating global layers across files.
- Preserve TypeScript strictness by using typed variant maps and explicit string unions when mapping class names in components.
- Keep utility classes readable: group classes by layout, spacing, typography, color, and state.
- Reuse design tokens through CSS variables in global styles when a value appears repeatedly.
- Avoid broad `!important` usage; treat it as a last resort and scope it narrowly.

## Patterns

- Global stylesheet pattern:
  - Define theme tokens and base-level conventions in `src/app/globals.css`.
  - Keep global selectors shallow and intentional to prevent cross-component side effects.
- Component styling pattern:
  - Build UI with Tailwind utility classes directly in TSX.
  - Use small helper functions for conditional class composition when branches grow.
  - Prefer deterministic class strings over computed fragments that hide styling intent.
- PostCSS plugin pattern:
  - Use `@tailwindcss/postcss` for Tailwind processing.
  - Add additional PostCSS plugins only when they solve a demonstrated requirement.

## Validation Checklist

- `postcss.config.mjs` uses `@tailwindcss/postcss` and contains no unused plugins.
- `src/**/*.css` changes preserve global-vs-local styling boundaries.
- Tailwind class usage in TSX remains readable and maintainable.
- No new inline styles or ad-hoc CSS files were added for utility-friendly cases.
- Style changes render correctly in the Next.js App Router surface on desktop and mobile.
- Lint and build checks pass after styling changes.

## Common Pitfalls

- Adding PostCSS plugins without a concrete need, increasing build complexity.
- Spreading global CSS rules across multiple files and creating precedence conflicts.
- Building class names dynamically in ways Tailwind cannot reliably detect.
- Encoding semantic design decisions as one-off literal values instead of reusable tokens.
- Mixing utility styles and deep custom selectors in the same component without clear ownership.
