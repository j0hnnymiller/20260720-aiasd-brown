---
ai_generated: true
model: "openai/gpt-5.3-codex@unknown"
operator: "johnmillerATcodemag-com"
chat_id: "execute-create-tailwind-css-instruction-file-20260721"
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
ai_log: "ai-logs/2026/07/21/execute-create-tailwind-css-instruction-file-20260721/conversation.md"
source: ".github/prompts/create-tailwind-css-instruction-file.prompt.md"
name: tailwind-css
description: practical guidance for using Tailwind CSS 4 in this codebase.
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

Use Tailwind CSS 4 as the default styling approach for UI in this repository.

- Keep Tailwind setup anchored in `src/app/globals.css` with `@import "tailwindcss"`.
- Prefer utility-first styling in TSX components over custom component-level CSS.
- Align styling decisions with the current project scope: a compact App Router calculator app.

## Standards

- Use utility classes directly in TSX for layout, spacing, color, and typography.
- Keep global tokens in `:root` and `@theme inline` in `src/app/globals.css`.
- Favor semantic class composition and readable class groupings over very long, unstructured class lists.
- Reuse existing color and font tokens before adding new token names.
- Keep styling TypeScript-safe by avoiding class construction patterns that hide invalid or misspelled utilities.
- Preserve mobile-first behavior and verify that key layouts remain usable on small screens.

## Patterns

- Page shell and route structure:
  - Keep route-level structure in `src/app/**` and style route content with Tailwind utilities.
  - Use global CSS only for tokens, resets, and app-wide base behavior.
- Component styling:
  - Use class groups by concern (layout, spacing, color, interaction) to keep TSX readable.
  - Use conditional classes sparingly and keep conditions explicit.
- Theme consistency:
  - Use existing foreground/background token mapping from `@theme inline`.
  - Extend tokens only when a repeated UI need appears in more than one component.
- Accessibility and interaction:
  - Provide visible focus states and adequate contrast for interactive controls.
  - Keep hover-only effects optional and ensure keyboard users get equivalent feedback.

## Validation Checklist

- Tailwind remains imported in `src/app/globals.css` using `@import "tailwindcss"`.
- TSX styling is utility-first, with no unnecessary custom CSS files introduced.
- Global CSS changes are limited to tokens or base styles that apply across routes.
- New utilities and tokens are consistent with current app visuals and naming.
- Updated UI remains readable and usable on mobile and desktop sizes.
- Styling changes pass the repository lint and build workflows without introducing warnings tied to class usage.

## Common Pitfalls

- Moving component-specific styling into global CSS instead of local utility classes.
- Adding one-off tokens for single elements instead of reusing existing theme variables.
- Creating hard-to-maintain class strings without grouping by styling concern.
- Relying on mouse hover behavior without clear focus-visible states.
- Introducing stylistic changes that conflict with the existing calculator-focused scope.
