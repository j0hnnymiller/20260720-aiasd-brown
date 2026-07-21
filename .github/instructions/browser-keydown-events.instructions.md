---
ai_generated: true
model: "openai/gpt-5.3-codex@unknown"
operator: "johnmillerATcodemag-com"
chat_id: "tech-inventory-prompts-20260720"
prompt: |
  #file:create-browser-keydown-events-instruction-file.prompt.md
started: "2026-07-20T00:00:00Z"
ended: "2026-07-20T00:00:00Z"
task_durations:
  - task: "analyze repository scope and conventions"
    duration: "00:00:00"
  - task: "create browser keydown events instruction file"
    duration: "00:00:00"
total_duration: "00:00:00"
ai_log: "ai-logs/2026/07/20/tech-inventory-prompts-20260720/conversation.md"
source: ".github/prompts/create-browser-keydown-events-instruction-file.prompt.md"
name: browser-keydown-events
description: Practical guidance for using Browser keydown events in this codebase
applyTo: "src/components/**/*.tsx"
version: "1.0.0"
author: "Development Team"
tags: ["browser-events", "keydown", "react", "nextjs", "typescript"]
owner: "Development Team"
reviewedDate: "2026-07-21"
nextReview: "2026-10-21"
---

# Browser keydown events

## Overview

Use browser `keydown` handling only in explicit Client Components and keep keyboard behavior scoped to interactive UI concerns.

- Register keyboard listeners inside React lifecycle boundaries (`useEffect`) and clean them up on unmount.
- Keep keyboard logic close to the feature that owns the state (`src/components/Calculator.tsx` in current scope).
- Prefer predictable, testable key mappings over implicit or global behavior.
- Preserve compatibility with Next.js App Router by avoiding browser APIs in Server Components.

## Standards

- Add `"use client"` in any file that directly uses `window`, `document`, or browser keyboard events.
- Use strict TypeScript event typing for handlers (`KeyboardEvent` for `window` listeners, `React.KeyboardEvent<T>` for element handlers).
- Normalize and compare against `event.key` values (for example, `"Enter"`, `"Escape"`, digits, operators) rather than deprecated key APIs.
- Prevent default behavior only when required for feature correctness.
- Ignore or gate key input when focus is in editable controls (`input`, `textarea`, content editable) unless the feature explicitly requires interception.
- Keep key-to-action mapping declarative and centralized to reduce branching complexity.
- Ensure effect dependencies are complete and stable to avoid stale closures or duplicate listener registration.

## Patterns

- Window-level listener in a client component:
  - Define a stable key handler function that reads current component state safely.
  - Attach listener in `useEffect` and remove it in the cleanup function.
- Element-level keyboard handling:
  - Use `onKeyDown` for scoped interactions where focus ownership is explicit.
  - Keep accessibility semantics intact for native controls.
- Mapping approach:
  - Route accepted keys through a lookup map or small parser function.
  - Reject unsupported keys early and no-op safely.
- State updates:
  - Use functional state updates when new values depend on previous state.
  - Keep keyboard command handlers pure where practical, delegating side effects to controlled boundaries.

## Validation Checklist

- Keyboard logic exists only in Client Components and does not leak into App Router server modules.
- All listeners added in effects are cleaned up correctly.
- TypeScript checks pass with no new unsafe assertions around event objects.
- Supported key behavior is deterministic across repeated presses and edge inputs.
- Editable-field focus cases are handled intentionally (intercepted or ignored by design).
- Current calculator behavior remains consistent with existing UI interactions.

## Common Pitfalls

- Registering global listeners outside `useEffect`, causing duplicate handlers across renders.
- Missing cleanup for `window` listeners, leading to memory leaks or repeated actions.
- Using deprecated key properties (`keyCode`, `which`) instead of `event.key`.
- Intercepting all key presses globally and breaking typing in form fields.
- Mixing keyboard parsing, state mutation, and UI formatting in one large handler function.
