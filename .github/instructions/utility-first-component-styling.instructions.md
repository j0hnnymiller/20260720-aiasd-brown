---
name: utility-first-component-styling
description: Practical guidance for using Utility-first component styling in this codebase.
applyTo: src/**/*.tsx|src/app/globals.css
version: "1.0.0"
author: "Development Team"
tags: ["styling", "components", "nextjs", "typescript"]
owner: "Development Team"
reviewedDate: "2026-07-21"
nextReview: "2026-10-21"
---

# Utility-first Component Styling

## Overview

Use utility-first styling to build predictable, maintainable UI with minimal custom CSS.

- Prefer utility classes directly in JSX for one-off styling.
- Keep styles local to each component unless reuse is clear and repeated.
- Maintain compatibility with Next.js App Router component boundaries and server/client component behavior.
- Keep class composition readable and deterministic for TypeScript-first component development.

## Standards

- Use semantic HTML first, then apply utility classes for layout and visual design.
- Group classes by intent in a stable order: layout, spacing, typography, color, effects, state.
- Avoid long unstructured class lists. Extract repeated patterns into small typed wrapper components when reuse appears in 3 or more places.
- Keep `src/app/globals.css` for app-wide tokens, resets, and base rules only; do not move component-specific styling there.
- Avoid `!important` and high-specificity selectors that fight utility classes.
- Keep class values explicit; avoid runtime-generated class names that break static analysis.

## Patterns

- Use `className` composition helpers for conditional styles while keeping type-safe props.
- Model variants through typed props (for example `size` or `tone`) and map them to known class sets.
- Prefer container and spacing utilities over custom margin overrides for composition consistency.
- Co-locate styling decisions with component logic in `src/components` and route-level UI in `src/app`.
- Use minimal custom CSS for cases utilities do not express clearly, and document why that CSS is needed.

## Validation Checklist

- Class usage is readable and grouped by intent.
- Repeated class patterns are extracted to a reusable typed component or helper.
- `src/app/globals.css` contains only global styles, not component-specific rules.
- No runtime-only class generation is used.
- Styling behavior is consistent across route-level components and shared components.
- No unnecessary specificity or `!important` usage is introduced.
- Changes remain compatible with strict TypeScript and existing project scope.

## Common Pitfalls

- Overloading `className` with unstructured utility strings that are hard to review.
- Adding component styling rules to `src/app/globals.css` and creating hidden coupling.
- Introducing custom CSS too early instead of using available utilities.
- Encoding styling variants with ad hoc booleans instead of typed variant props.
- Using dynamic class name construction that tooling cannot statically detect.
- Mixing unrelated responsibilities (layout, theming, behavior) in a single large component.
