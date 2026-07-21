---
name: create-developer-guide
description: Create a complete developer guide with setup instructions and local workflows for this repository.
tags: ["documentation", "developer-guide", "onboarding", "workflows"]
ai_generated: true
model: "openai/gpt-5.3-codex@unknown"
operator: "johnmillerATcodemag-com"
chat_id: "create-developer-guide-prompt-20260721"
prompt: |
  create a prompt file that creates a developers guide that contains setup instructions, and local workflows.
started: "2026-07-21T00:00:00Z"
ended: "2026-07-21T00:00:00Z"
task_durations:
  - task: "analyze prompt conventions"
    duration: "00:10:00"
  - task: "draft developer guide prompt"
    duration: "00:10:00"
total_duration: "00:20:00"
ai_log: "ai-logs/2026/07/21/create-developer-guide-prompt-20260721/conversation.md"
source: "user-request"
---

# Create Developer Guide

Create or update docs/developer-guide.md as a complete markdown guide for contributors.

Requirements:

- Include a clear project overview and prerequisites.
- Include setup instructions for Windows, macOS, and Linux where commands differ.
- Include Node.js and npm version guidance based on package.json engines if present, otherwise document how to check local versions.
- Include dependency installation and verification steps.
- Include environment configuration instructions (for example .env.local), including required variables, optional variables, and safe defaults.
- Include local workflows for daily development:
  - start dev server
  - run lint
  - run tests
  - run build
  - preview production build locally when applicable
- Include troubleshooting for common local issues (dependency install failures, port conflicts, missing environment variables, and cache problems).
- Include a section on recommended commit and pull request workflow for this repository.
- Include a quick command reference table.
- Keep guidance practical, explicit, and aligned to this repository's scripts and tooling.
- Avoid speculative or unverified claims.

Output:

- Return only the final markdown content for docs/developer-guide.md.
