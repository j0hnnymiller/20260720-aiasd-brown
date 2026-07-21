---
ai_generated: true
model: "openai/gpt-5.3-codex@unknown"
operator: "johnmillerATcodemag-com"
chat_id: "execute-create-nextjs-metadata-api-instruction-file-20260721"
prompt: |
  #file:create-nextjs-metadata-api-instruction-file.prompt.md
started: "2026-07-21T00:00:00Z"
ended: "2026-07-21T00:00:00Z"
task_durations:
  - task: "analyze repository scope and conventions"
    duration: "00:00:00"
  - task: "create nextjs metadata api instruction file"
    duration: "00:00:00"
total_duration: "00:00:00"
ai_log: "ai-logs/2026/07/21/execute-create-nextjs-metadata-api-instruction-file-20260721/conversation.md"
source: ".github/prompts/create-nextjs-metadata-api-instruction-file.prompt.md"
name: nextjs-metadata-api
description: practical guidance for using Next.js metadata API in this codebase
applyTo: src/app/layout.tsx|src/app/**/*.tsx
version: "1.0.0"
author: "Development Team"
tags: ["nextjs", "metadata", "app-router", "typescript"]
owner: "Development Team"
reviewedDate: "2026-07-21"
nextReview: "2026-10-21"
---

# Next.js metadata API

## Overview

Use the Next.js metadata API as the single source of truth for document metadata in App Router routes. Keep baseline metadata in `src/app/layout.tsx`, and define route-specific metadata in `src/app/**/*.tsx` only when a route needs distinct title, description, or social tags.

- Prefer static `metadata` exports for stable values.
- Use `generateMetadata` only when metadata depends on route params or server-side data.
- Keep metadata server-side and framework-managed; avoid client-side `<head>` mutation patterns.

## Standards

- Import and type metadata with `Metadata` from `next` when type safety is needed.
- Export either `metadata` or `generateMetadata` from a route segment file, not both in conflicting ways.
- Keep metadata declarations in Server Components; do not place metadata exports in Client Components.
- Use absolute canonical URLs and Open Graph image URLs when setting URL fields.
- Keep title/description concise, route-relevant, and aligned with visible page content.
- Reuse shared metadata fragments through typed constants when duplication appears across routes.
- Preserve TypeScript strictness: no `any`, no unsafe casts, and handle nullable values explicitly in `generateMetadata`.

## Patterns

### Root metadata in layout

- Define app-wide defaults in `src/app/layout.tsx`.
- Include baseline title template, description, and global social metadata used by most routes.
- Keep defaults stable so route-level overrides remain minimal.

### Route-level static metadata

- In `src/app/**/*.tsx`, export `metadata` for pages with known static values.
- Override only fields that differ from root defaults.
- Keep per-route metadata close to the page to simplify maintenance.

### Route-level dynamic metadata

- Use `generateMetadata` when metadata depends on params, search params, or server-fetched content.
- Validate/guard dynamic values before assignment to metadata fields.
- Keep data fetching in `generateMetadata` small and purpose-specific to avoid unnecessary overhead.

### Shared metadata helpers

- Create typed helper functions/constants only when multiple routes share the same composition logic.
- Keep helpers deterministic and side-effect free.
- Avoid over-abstraction for one-off route metadata.

## Validation Checklist

- Metadata changes are implemented via `metadata` or `generateMetadata`, not ad hoc `<head>` logic.
- `src/app/layout.tsx` provides app-wide defaults, and route files override only what is needed.
- Metadata exports remain in Server Component files.
- Dynamic metadata handles missing/invalid data safely under TypeScript strict settings.
- Canonical/Open Graph URL fields are absolute and consistent.
- Titles and descriptions match the route content and intent.
- Lint and type checks pass without introducing new suppressions.

## Common Pitfalls

- Defining metadata inside Client Components or files marked with `"use client"`.
- Fetching excessive data in `generateMetadata` instead of limiting to metadata needs.
- Duplicating large metadata objects across routes without shared typed helpers.
- Mixing manual `<head>` mutations with the metadata API.
- Using relative URLs in fields that require absolute URLs.
- Letting metadata drift from actual page content after UI updates.
