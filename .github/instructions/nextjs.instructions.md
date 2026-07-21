---
ai_generated: true
model: "openai/gpt-5.3-codex@unknown"
operator: "johnmillerATcodemag-com"
chat_id: "execute-create-nextjs-instruction-file-20260721"
prompt: |
  #file:create-nextjs-instruction-file.prompt.md
started: "2026-07-21T00:00:00Z"
ended: "2026-07-21T00:00:00Z"
task_durations:
  - task: "analyze repository scope and conventions"
    duration: "00:00:00"
  - task: "create nextjs instruction file"
    duration: "00:00:00"
total_duration: "00:00:00"
ai_log: "ai-logs/2026/07/21/execute-create-nextjs-instruction-file-20260721/conversation.md"
source: ".github/prompts/create-nextjs-instruction-file.prompt.md"
name: nextjs
description: practical guidance for using Next.js 16.2.10 in this codebase
applyTo: "src/app/**|next.config.ts"
version: "1.0.0"
author: "Development Team"
tags: ["nextjs", "app-router", "typescript"]
owner: "Development Team"
reviewedDate: "2026-07-21"
nextReview: "2026-10-21"
---

# Next.js 16.2.10

## Overview

Use Next.js App Router patterns that match this repository's current scope: one route in `src/app/page.tsx`, global setup in `src/app/layout.tsx`, and client logic isolated to `src/components/Calculator.tsx`.

- Keep routing and layout concerns in `src/app/**`.
- Keep interactive UI logic in explicit Client Components using `"use client"`.
- Prefer server-first components by default, and only opt into client rendering when browser APIs or React client hooks are required.

## Standards

- Use TypeScript strict-safe code paths; avoid `any`, unchecked casts, and nullable assumptions.
- Preserve the `@/*` path alias and existing module boundaries (`src/app` for route shell, `src/components` for reusable UI).
- Keep `next.config.ts` minimal and intentional. Add config only for verified project needs.
- Use the Next.js metadata API in `src/app/layout.tsx` for document metadata changes.
- Keep global styles and tokens in `src/app/globals.css`; avoid scattering global CSS.
- Follow existing ESLint and Next.js core web vitals rules before merging.

## Patterns

- App Router structure:
  - Route-level files belong under `src/app/**`.
  - Shared layout and metadata stay in `src/app/layout.tsx`.
- Component boundaries:
  - Default to Server Components.
  - Add `"use client"` only where hooks (`useState`, `useEffect`) or DOM APIs are used.
- Data and behavior:
  - Keep feature state local when the scope is single-page (current calculator behavior).
  - Introduce broader state patterns only when a real cross-route need exists.
- Styling:
  - Use Tailwind utility classes for component styling.
  - Keep reusable theme tokens in global CSS.

## Validation Checklist

- `src/app/**` changes follow App Router file conventions.
- Client-only behavior is in files marked with `"use client"`.
- TypeScript remains strict-compatible with no new unsafe patterns.
- Lint checks pass with the existing Next.js + ESLint configuration.
- Metadata updates are implemented through the layout metadata API.
- `next.config.ts` changes are necessary, minimal, and documented in PR context.

## Common Pitfalls

- Marking too many components as Client Components instead of isolating interactivity.
- Mixing route concerns and reusable UI concerns in the same file.
- Adding config to `next.config.ts` without a concrete runtime or build requirement.
- Bypassing strict typing with broad assertions that hide real null/undefined issues.
- Introducing global CSS rules for component-specific styling that belongs in utilities.
