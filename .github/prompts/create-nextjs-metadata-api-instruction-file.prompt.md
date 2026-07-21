---
name: create-nextjs-metadata-api-instruction-file
description: Create or refresh the instruction file for Next.js metadata API in this repository.
tags: ["instructions", "technology-inventory"]
ai_generated: true
model: "openai/gpt-5.3-codex@unknown"
operator: "johnmillerATcodemag-com"
chat_id: "tech-inventory-prompts-20260720"
prompt: |
  for each technology in the inventory create a prompt file that creates an instruction file for that technology.
started: "2026-07-20T00:00:00Z"
ended: "2026-07-20T00:00:00Z"
task_durations:
  - task: "inventory-to-prompt mapping"
    duration: "00:10:00"
  - task: "prompt file generation"
    duration: "00:20:00"
total_duration: "00:30:00"
ai_log: "ai-logs/2026/07/20/tech-inventory-prompts-20260720/conversation.md"
source: "TECHNOLOGY_INVENTORY.md"
---

# Create Next.js metadata API Instruction File

Create or update .github/instructions/nextjs-metadata-api.instructions.md as a complete markdown instruction file with YAML front matter.

Requirements:
- Set name to the technology name.
- Set description to practical guidance for using Next.js metadata API in this codebase.
- Set applyTo to: src/app/layout.tsx|src/app/**/*.tsx.
- Keep guidance actionable, concise, and maintainable.
- Include sections for Overview, Standards, Patterns, Validation Checklist, and Common Pitfalls.
- Prioritize repository alignment with Next.js App Router, TypeScript strictness, and current project scope.
- Avoid speculative or unverified claims.

Output:
- Return only the final markdown content for .github/instructions/nextjs-metadata-api.instructions.md.
