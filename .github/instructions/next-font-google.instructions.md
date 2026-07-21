---
name: next-font-google
description: Practical guidance for using next/font/google in this codebase.
applyTo: src/app/layout.tsx|src/**/*.tsx
---

# next/font/google

## Overview

Use `next/font/google` to self-host Google Fonts through Next.js and keep typography configuration centralized and predictable. In this App Router codebase, define shared font configuration in `src/app/layout.tsx` and expose font variables or class names for consistent usage across React components.

## Standards

- Import fonts from `next/font/google`, not from external CSS URLs.
- Keep root-level, app-wide font setup in `src/app/layout.tsx`.
- Use TypeScript-safe configuration objects and explicit font options (`subsets`, `display`, `weight`, `style`, and `variable` when needed).
- Prefer a small, intentional font set to reduce payload and avoid duplicate font families.
- Use CSS variables for reusable typography tokens when multiple components need the same family.
- Keep fallback fonts defined in CSS to preserve readability during load transitions.
- Preserve existing layout and App Router structure when adding or changing fonts.

## Patterns

### App-wide primary font in layout

- Create a font instance once in `src/app/layout.tsx`.
- Apply the returned `className` or `variable` at the `<html>` or `<body>` level.
- Keep this setup stable so all routes inherit consistent typography.

### CSS variable pattern for multiple fonts

- Define each font with a `variable` name via `next/font/google`.
- Attach variables in `src/app/layout.tsx`.
- Map variables to semantic typography tokens in `src/app/globals.css` (for example, body, heading, mono roles).

### Component-level usage

- Prefer inheriting app-level typography by default.
- Only apply font-specific utility classes in a component when there is a clear design requirement.
- Avoid re-instantiating the same font in many components.

## Validation Checklist

- Font imports come from `next/font/google` only.
- Shared font configuration exists in `src/app/layout.tsx` for app-wide usage.
- Font options are explicit and minimal (no unnecessary weights/styles/subsets).
- Typography usage remains consistent across routes and components.
- CSS variables and fallback stacks are defined when multiple font roles are required.
- No duplicate or conflicting font declarations were introduced.
- Changes compile cleanly with TypeScript strict settings.

## Common Pitfalls

- Importing fonts through remote CSS links instead of `next/font/google`.
- Defining the same font repeatedly across many components.
- Requesting too many weights or styles, increasing bundle size.
- Omitting required subsets, causing incomplete glyph coverage.
- Mixing ad hoc font classes and global font tokens without clear rules.
- Moving app-wide font setup out of `src/app/layout.tsx`, causing inconsistent route styling.
