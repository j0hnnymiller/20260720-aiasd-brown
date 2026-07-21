---
name: @tailwindcss/postcss
description: Practical guidance for using @tailwindcss/postcss in this codebase.
applyTo: postcss.config.mjs|src/**/*.css
---

# @tailwindcss/postcss

## Overview

Use `@tailwindcss/postcss` as the single PostCSS plugin entry for Tailwind CSS in this repository. Keep configuration minimal, stable, and aligned with Next.js App Router usage in `src/app`, where global styles are defined in `src/app/globals.css` and loaded by the root layout.

## Standards

- Keep `postcss.config.mjs` focused on the `@tailwindcss/postcss` plugin unless a new plugin is required by a verified project need.
- Use the object-style PostCSS plugin declaration already used in this repo for predictable merges and diffs.
- Keep Tailwind entry import in CSS as `@import "tailwindcss";` at the top of app-level styles.
- Centralize shared design tokens in `:root` and `@theme` blocks in `src/app/globals.css`.
- Preserve compatibility with strict TypeScript projects by avoiding CSS conventions that require runtime JavaScript mutation for core theme values.
- Keep CSS changes App Router-aware: global primitives in `src/app/globals.css`, component-specific styling local to components.

## Patterns

### Minimal PostCSS configuration

- Keep `postcss.config.mjs` small and explicit.
- Prefer one plugin declaration for Tailwind unless a concrete build requirement justifies adding more.

### Global theme token flow

- Define baseline color and typography tokens in `:root`.
- Map tokens into Tailwind theme variables using `@theme inline` so utility usage and custom CSS stay aligned.
- Keep semantic token names stable (`background`, `foreground`, font tokens) to reduce churn across components.

### Scoped styling strategy

- Use `src/app/globals.css` for app-wide defaults (background, foreground, base typography).
- Keep component-level overrides narrow and purpose-driven to avoid global cascade side effects.
- Prefer utility-driven styling for one-off layout and spacing decisions in TSX components.

## Validation Checklist

- `postcss.config.mjs` includes `@tailwindcss/postcss` and exports valid ESM config.
- `src/app/globals.css` starts with `@import "tailwindcss";`.
- Global tokens in `:root` and `@theme` stay consistent with current layout and font setup.
- CSS edits do not break App Router global styling expectations.
- No unnecessary PostCSS plugins or duplicate Tailwind setup paths were introduced.
- Changes remain readable, minimal, and easy to maintain.

## Common Pitfalls

- Adding extra PostCSS plugins without a verified need, increasing maintenance and build complexity.
- Moving Tailwind import below other rules, which can cause ordering and override surprises.
- Mixing global token definitions across many files, creating inconsistent theme behavior.
- Introducing component styles that unintentionally override global defaults.
- Treating PostCSS config as a place for experimental transforms in a production baseline project.
