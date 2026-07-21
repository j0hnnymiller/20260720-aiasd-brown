---
ai_generated: true
model: "openai/gpt-5.3-codex@unknown"
operator: "johnmillerATcodemag-com"
chat_id: "create-utility-first-component-styling-instruction-file-20260721"
prompt: |
  Create or update .github/instructions/utility-first-component-styling.instructions.md as a complete markdown instruction file with YAML front matter.
started: "2026-07-21T00:00:00Z"
ended: "2026-07-21T00:00:00Z"
task_durations:
  - task: "analyze repository instruction conventions"
    duration: "00:00:00"
  - task: "author utility-first styling instructions"
    duration: "00:00:00"
total_duration: "00:00:00"
ai_log: "ai-logs/2026/07/21/create-utility-first-component-styling-instruction-file-20260721/conversation.md"
source: ".github/prompts/create-utility-first-component-styling-instruction-file.prompt.md"
name: utility-first-component-styling
description: Practical guidance for using Utility-first component styling in this codebase
applyTo: "src/**/*.tsx|src/app/globals.css"
version: "1.0.0"
author: "Development Team"
tags: ["styling", "tailwind", "components", "nextjs"]
owner: "Development Team"
reviewedDate: "2026-07-21"
nextReview: "2026-10-21"
---

# Utility-first Component Styling

## Overview

Use utility-first styling to keep component visuals close to component logic while preserving clear boundaries between local styles and global design tokens.

- Prefer utility classes in TSX for layout, spacing, typography, and state styles.
- Keep shared visual primitives (colors, spacing scales, typography tokens) in `src/app/globals.css`.
- Align with Next.js App Router structure by styling route content in `src/app/**` and reusable UI in `src/components/**`.
- Keep TypeScript components strict-safe; style choices must not require unsafe prop shapes or implicit `any` usage.

## Standards

- Use utility classes as the default mechanism for component-level styling.
- Keep class strings readable and stable; group related utilities by intent (layout, spacing, typography, color, interaction).
- Avoid inline `style` objects except for truly dynamic values that cannot be represented with existing utilities.
- Centralize reusable design tokens in `src/app/globals.css` using CSS variables and utility layer extensions when needed.
- Do not introduce one-off global selectors for component-specific behavior.
- Preserve accessibility while styling:
  - Ensure visible focus states.
  - Maintain sufficient color contrast.
  - Avoid using color alone to communicate state.
- Keep responsive behavior explicit with breakpoint utilities instead of ad-hoc media queries inside component files.

## Patterns

- Component composition pattern:
  - Keep base structure utilities in the parent component.
  - Pass variant intent through typed props and map to known class sets.
  - Merge conditional classes deterministically to avoid conflicting styles.
- Reusable variant pattern:
  - Define a small, typed variant map close to the component.
  - Restrict variant keys with union types.
  - Provide a safe default variant.
- Token usage pattern:
  - Add long-lived theme values to `src/app/globals.css`.
  - Reference those values through utilities or semantic class names, not duplicated raw values across components.
- Current project scope pattern:
  - Keep calculator-specific styling local to `src/components/Calculator.tsx`.
  - Promote styles to shared patterns only after repeat usage across multiple components.

## Validation Checklist

- Styling changes in TSX rely on utilities first and avoid unnecessary custom CSS.
- New global CSS is token-oriented and reusable, not component-scoped leakage.
- Class combinations do not conflict across breakpoints or interaction states.
- Focus, hover, disabled, and error states are visually distinct and accessible.
- TypeScript props that affect styling are explicitly typed and defaulted.
- Responsive behavior is verified for both mobile and desktop layouts.
- No unused or dead utility classes remain after changes.

## Common Pitfalls

- Overloading `globals.css` with component-specific selectors that should stay in TSX.
- Building large, unreadable class strings without grouping by intent.
- Using dynamic string concatenation that can generate invalid or conflicting utility combinations.
- Creating too many near-duplicate variants instead of a constrained typed variant map.
- Introducing arbitrary values repeatedly instead of promoting stable tokens.
- Styling interactive elements without keyboard-visible focus treatment.