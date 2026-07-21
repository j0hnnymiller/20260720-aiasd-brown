---
ai_generated: true
model: "openai/gpt-5.3-codex@unknown"
operator: "johnmillerATcodemag-com"
chat_id: "create-browser-keydown-events-instruction-file-20260721"
prompt: |
  Execute the prompt file at c:\git\AIASD\20260720-aiasd-brown\.github\prompts\create-browser-keydown-events-instruction-file.prompt.md. Read the prompt and produce exactly the requested technology-specific instruction file(s) in this repository. Make edits directly. Follow repository instruction conventions and any required metadata/front matter from the prompt. Return the output file path(s) created/updated and a brief status.
started: "2026-07-21T00:00:00Z"
ended: "2026-07-21T00:00:00Z"
task_durations:
  - task: "read prompt and conventions"
    duration: "00:00:00"
  - task: "author browser keydown events instruction file"
    duration: "00:00:00"
total_duration: "00:00:00"
ai_log: "ai-logs/2026/07/21/create-browser-keydown-events-instruction-file-20260721/conversation.md"
source: ".github/prompts/create-browser-keydown-events-instruction-file.prompt.md"
name: browser-keydown-events
description: Practical guidance for using Browser keydown events in this codebase
applyTo: "src/components/**/*.tsx"
version: "1.0.0"
author: "Development Team"
tags: ["browser", "keydown", "events", "react", "nextjs"]
owner: "Development Team"
reviewedDate: "2026-07-21"
nextReview: "2026-10-21"
---

# Browser keydown events

## Overview

Use browser keydown handling only in Client Components under `src/components/**` where keyboard interaction is required.

- Keep keyboard behavior explicit, predictable, and scoped to the active UI.
- Align with Next.js App Router defaults by keeping route files server-first and handling DOM events in client code.
- Preserve TypeScript strictness with strongly typed event handlers.

## Standards

- Add `"use client"` at the top of any component file that registers keydown handlers.
- Type handlers as `React.KeyboardEvent<HTMLElement>` for element handlers or `KeyboardEvent` for window/document listeners.
- Normalize key checks with `event.key` values (for example, `Enter`, `Escape`, `Backspace`) and avoid deprecated keyCode usage.
- Guard side effects by context so shortcuts do not trigger while focus is in unrelated inputs.
- Register global listeners inside `useEffect` and always remove them in cleanup.
- Avoid implicit `any`, non-null assertions, and unsafe casts when reading target, focus, or selection state.

## Patterns

- Element-scoped key handling:
  - Prefer `onKeyDown` on the specific interactive element for local behavior.
  - Keep handler logic small and delegate complex actions to named functions.
- Global shortcut handling:
  - Use `useEffect` to attach `window.addEventListener("keydown", handler)` only when feature requirements justify global scope.
  - Return a cleanup function that removes the exact same handler reference.
- Modifier-aware shortcuts:
  - Gate combinations explicitly (for example, `event.ctrlKey && event.key === "Enter"`).
  - Call `event.preventDefault()` only when overriding native behavior is intentional.
- Focus-sensitive behavior:
  - Exit early when `document.activeElement` indicates text entry contexts that should not be intercepted.

## Validation Checklist

- Keyboard handling exists only in client-marked component files under `src/components/**/*.tsx`.
- All keydown handlers are strongly typed and TypeScript strict-safe.
- `event.key` is used instead of deprecated keyCode APIs.
- Global listeners are attached and removed via `useEffect` cleanup.
- Shortcut logic avoids accidental triggers while users are typing in inputs.
- Prevent-default behavior is intentional and limited to required keys.

## Common Pitfalls

- Adding keydown logic in server components or route files that do not run in the browser.
- Forgetting to remove window/document listeners, causing duplicate handlers after re-renders.
- Using deprecated `keyCode` or locale-fragile assumptions for key matching.
- Capturing all key presses globally without focus checks.
- Overusing `preventDefault()` and breaking expected browser or assistive-technology behavior.
