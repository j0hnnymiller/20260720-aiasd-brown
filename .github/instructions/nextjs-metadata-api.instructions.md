---
ai_generated: true
model: "openai/gpt-5.3-codex@unknown"
operator: "johnmillerATcodemag-com"
chat_id: "tech-inventory-prompts-20260720"
prompt: |
  #file:create-nextjs-metadata-api-instruction-file.prompt.md
started: "2026-07-20T00:00:00Z"
ended: "2026-07-20T00:00:00Z"
task_durations:
  - task: "analyze repository scope and conventions"
    duration: "00:00:00"
  - task: "create nextjs metadata api instruction file"
    duration: "00:00:00"
total_duration: "00:00:00"
ai_log: "ai-logs/2026/07/20/tech-inventory-prompts-20260720/conversation.md"
source: ".github/prompts/create-nextjs-metadata-api-instruction-file.prompt.md"
name: nextjs-metadata-api
description: Practical guidance for using Next.js metadata API in this codebase
applyTo: "src/app/layout.tsx|src/app/**/*.tsx"
version: "1.0.0"
author: "Development Team"
tags: ["nextjs", "metadata", "app-router", "typescript"]
owner: "Development Team"
reviewedDate: "2026-07-21"
nextReview: "2026-10-21"
---

# Next.js Metadata API

## Overview

Use the Next.js metadata API to define document metadata in App Router files and keep metadata behavior predictable across routes.

- Define site-wide defaults in `src/app/layout.tsx`.
- Use route-level metadata only when a page or segment needs intentional overrides.
- Keep metadata typed and explicit to align with TypeScript strictness.
- Prefer built-in metadata fields instead of manual `<head>` tags for standard SEO and social metadata.

## Standards

- Import `Metadata` from `next` and annotate exported metadata objects when practical.
- Keep base metadata centralized in `src/app/layout.tsx` and avoid duplicating shared values in page files.
- Use `metadataBase` in layout metadata when absolute URL resolution is required for canonical or Open Graph assets.
- Prefer static `export const metadata` for values known at build time.
- Use `generateMetadata` only when metadata depends on route params or server data.
- Keep `title`, `description`, and Open Graph/Twitter metadata aligned to avoid conflicting previews.
- Ensure image URLs and canonical URLs are valid and environment-safe.

## Patterns

- Global defaults in layout:
  - Define `title` with a template and default.
  - Define `description`, `metadataBase`, and shared social fields.
- Route overrides in page files:
  - Export `metadata` for static page-specific title/description changes.
  - Export `generateMetadata` for dynamic routes that derive metadata from params or fetched content.
- Dynamic metadata safety:
  - Handle missing data with deterministic fallback metadata.
  - Avoid throwing in metadata generation for recoverable conditions.
- URL consistency:
  - Build canonical and image URLs relative to `metadataBase` when possible.

## Validation Checklist

- Metadata defaults exist in `src/app/layout.tsx`.
- Route-specific metadata changes are intentional and minimal.
- Static metadata uses `metadata`; dynamic metadata uses `generateMetadata` only when needed.
- TypeScript typing is preserved with no new unsafe casts.
- Canonical/Open Graph/Twitter values are coherent and resolve correctly.
- Metadata changes match current App Router structure and project scope.

## Common Pitfalls

- Mixing manual `<head>` tags with metadata API for the same fields.
- Duplicating global metadata values in multiple page files.
- Using `generateMetadata` for static values that should be plain `metadata`.
- Returning partial or inconsistent metadata between title, description, and social fields.
- Emitting invalid URLs because `metadataBase` is missing or inconsistent.