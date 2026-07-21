---
ai_generated: true
model: "openai/gpt-5.3-codex@unknown"
operator: "johnmillerATcodemag-com"
chat_id: "create-tailwind-css-instruction-file-20260721"
prompt: |
  #file:create-tailwind-css-instruction-file.prompt.md
started: "2026-07-21T00:00:00Z"
ended: "2026-07-21T00:00:00Z"
task_durations:
  - task: "analyze repository scope and conventions"
    duration: "00:00:00"
  - task: "create tailwind css instruction file"
    duration: "00:00:00"
total_duration: "00:00:00"
ai_log: "ai-logs/2026/07/21/create-tailwind-css-instruction-file-20260721/conversation.md"
source: ".github/prompts/create-tailwind-css-instruction-file.prompt.md"
name: tailwind-css
description: Practical guidance for using Tailwind CSS 4 in this codebase
applyTo: "src/**/*.css|src/**/*.tsx"
version: "1.0.0"
author: "Development Team"
tags: ["tailwindcss", "css", "nextjs", "typescript"]
owner: "Development Team"
reviewedDate: "2026-07-21"
nextReview: "2026-10-21"
---

# Tailwind CSS 4

## Overview

Use Tailwind CSS 4 as the primary styling approach for UI work in this repository.

- Keep route shell and global styling primitives in `src/app/globals.css`.
- Keep component-level styling in `src/**/*.tsx` using utility classes.
- Preserve alignment with the current Next.js App Router structure and strict TypeScript usage.
- Prefer small, composable class groups over large custom CSS blocks.

## Standards

- Use Tailwind utility classes first; add custom CSS only when utilities cannot express the requirement clearly.
- Keep custom CSS in `src/**/*.css` minimal and purpose-driven (tokens, resets, shared primitives).
- Avoid broad global selectors that can unintentionally affect unrelated components.
- Keep class usage readable by grouping layout, spacing, typography, color, and state utilities consistently.
- Use semantic HTML first, then style with Tailwind classes.
- Keep responsive behavior explicit with breakpoint-prefixed utilities.
- Preserve strict TypeScript safety when building class strings; avoid unsafe casting patterns.

## Patterns

- Component styling:
  - Prefer direct utility composition in JSX for one-off component styles.
  - Extract repeated visual patterns into reusable components instead of copying long class lists.
- State and variants:
  - Use conditional class composition for state (`disabled`, validation, active) in a single, easy-to-scan block.
  - Keep hover/focus/active styles adjacent to base styles for maintainability.
- Global primitives:
  - Define shared design tokens and base layer styles in `src/app/globals.css`.
  - Keep component-specific styling out of global files.
- Layout:
  - Use flex/grid utilities directly in components.
  - Prefer container and spacing utilities over ad hoc margin overrides.

## Validation Checklist

- Styling changes are limited to `src/**/*.css` and `src/**/*.tsx` where appropriate.
- Tailwind utilities are used as the default approach before introducing custom CSS.
- New custom CSS is scoped, minimal, and does not create unintended global side effects.
- Repeated class patterns were refactored into reusable components when practical.
- Responsive and interactive states are implemented explicitly and remain readable.
- The updated UI remains consistent with the current App Router layout and project scope.

## Common Pitfalls

- Moving component-specific styles into global CSS, causing coupling and side effects.
- Copying long utility strings across multiple components instead of extracting shared UI pieces.
- Introducing custom CSS for patterns that Tailwind utilities already cover.
- Mixing unrelated concern groups in class strings, making styles hard to maintain.
- Forgetting focus-visible and keyboard interaction styles when adding hover-only behaviors.
