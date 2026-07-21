---
ai_generated: true
model: "gpt-5.4-mini"
operator: "johnmillerATcodemag-com"
chat_id: "create-evergreen-software-development-instruction-20260720"
prompt: |
  create an instruction file for evergreen software development
started: "2026-07-20T00:00:00Z"
ended: "2026-07-20T00:00:00Z"
task_durations:
  - task: "define evergreen principles"
    duration: "00:00:00"
  - task: "draft instruction file"
    duration: "00:00:00"
total_duration: "00:00:00"
ai_log: "ai-logs/2026/07/20/create-evergreen-software-development-instruction-20260720/conversation.md"
source: ".github/prompts/meta/create-instruction-files-instructions.prompt.md"
name: evergreen-software-development
description: Guidance for building maintainable, secure, and adaptable software
applyTo: "**/*"
version: "1.0.0"
author: "Development Team"
tags: ["engineering", "maintainability", "quality", "architecture"]
owner: "Development Team"
reviewedDate: "2026-07-20"
nextReview: "2026-10-20"
---

# Evergreen Software Development

## Overview

Evergreen software stays useful over time because it is easy to understand, safe to change, and cheap to operate. Follow these instructions when writing, reviewing, or refactoring code so the system remains maintainable as requirements, frameworks, and teams evolve.

**Target Audience**: AI assistants, developers, reviewers
**Scope**: Code, tests, architecture, documentation, and delivery practices that affect long-term maintainability
**Related Documentation**:

- [Creating New Instruction Files](instruction-files.instructions.md)
- [GitHub CLI Instructions](github-cli.instructions.md)
- [Business Rules to Vertical Slices](business-rules-to-slices.instructions.md)

## Table of Contents

- [Core Principles](#core-principles)
- [Change Strategy](#change-strategy)
- [Code Quality Standards](#code-quality-standards)
- [Testing and Verification](#testing-and-verification)
- [Operational Resilience](#operational-resilience)
- [Documentation and Communication](#documentation-and-communication)
- [Decision Making](#decision-making)
- [Validation Checklist](#validation-checklist)
- [Common Anti-Patterns](#common-anti-patterns)
- [Summary](#summary)

## Core Principles

Build software that is easy to replace, easy to observe, and easy to reason about.

- Prefer simple designs that solve the current problem cleanly.
- Optimize for readability before cleverness.
- Keep dependencies minimal and deliberate.
- Favor explicit control flow over hidden behavior.
- Preserve stable public contracts unless a change is clearly justified.
- Reduce coupling between modules, layers, and features.
- Make the happy path obvious and the failure path safe.

## Change Strategy

Make the smallest change that meaningfully improves the system.

- Start from the narrowest relevant file, symbol, or workflow.
- Preserve existing behavior unless the change intentionally alters it.
- Refactor only when the refactor reduces complexity, duplication, or risk.
- Split large changes into reversible steps when possible.
- Remove dead code, obsolete docs, and unused abstractions instead of carrying them forward.
- Prefer composition over inheritance when it reduces rigidity.
- Choose patterns that the team can maintain without specialist knowledge.

## Code Quality Standards

Write code that remains understandable after the original context is forgotten.

- Use descriptive names that explain intent.
- Keep functions, components, and modules focused on one responsibility.
- Avoid over-abstracting early; introduce abstractions only when repetition or variation is real.
- Treat configuration as data and logic as code.
- Use types, interfaces, schemas, or validation where they prevent drift.
- Keep error messages actionable and specific.
- Centralize shared rules only when they are genuinely shared.
- Prefer boring, proven implementations over novel ones.

## Testing and Verification

Prove that important behavior works and stays working.

- Add or update tests whenever behavior changes.
- Prefer tests that verify outcomes over implementation details.
- Cover edge cases, failure paths, and regression risks.
- Run the cheapest relevant validation first, then expand only if needed.
- Keep tests deterministic and isolated.
- Use fixtures and helpers to reduce duplication in tests.
- Delete tests that no longer reflect current behavior.

## Operational Resilience

Design for long-lived operation, not just first release success.

- Fail fast on invalid input and fail safely on external dependency errors.
- Use timeouts, retries, and fallbacks deliberately, not by default everywhere.
- Log enough to diagnose issues without leaking sensitive data.
- Make deployments repeatable and reversible.
- Keep configuration externalized where operational variation is expected.
- Monitor the system for the signals that indicate user impact.
- Prefer backwards-compatible migrations and staged rollouts.

## Documentation and Communication

Keep documentation aligned with the code and the decisions behind it.

- Document why a decision exists when the reason is not obvious from the code.
- Update README files, runbooks, and architecture notes when behavior changes.
- Record tradeoffs when choosing a non-obvious approach.
- Keep comments short and reserved for intent that code cannot express clearly.
- Avoid stale examples, copied boilerplate, and duplicated guidance.
- Call out breaking changes explicitly.

## Decision Making

Use judgment that keeps the codebase adaptable over time.

- Prefer changes that reduce future cost, not just current effort.
- When choosing between options, favor the one that is simpler to operate and easier to replace.
- Identify the real source of truth before adding a second one.
- If a change introduces new complexity, explain why the tradeoff is worth it.
- When uncertain, choose the option that is easier to test and easier to undo.
- Avoid framework lock-in unless the benefit is strong and specific.

## Validation Checklist

Before shipping a change, confirm that the result is maintainable and safe.

- The change is as small as practical.
- The code is readable without extra explanation.
- Tests cover the changed behavior.
- Error handling is intentional and visible.
- Documentation or comments were updated where needed.
- No unnecessary dependencies, abstractions, or duplication were added.
- Existing behavior was preserved unless the change explicitly required otherwise.
- The change can be reverted without excessive risk.

## Common Anti-Patterns

Avoid patterns that age badly.

- Large opaque functions that hide domain logic.
- Deep inheritance trees or framework-heavy indirection.
- Duplicate sources of truth.
- Premature generalization.
- Silent failure paths.
- Hard-coded environment assumptions.
- Unchecked changes to public APIs or data shapes.
- Tests that only confirm implementation details.

## Summary

Evergreen software is simple, testable, observable, and intentionally changeable. Make the smallest safe improvement, keep behavior clear, and leave the codebase easier to maintain than you found it.

---

**Document Version**: 1.0.0
**Last Updated**: 2026-07-20
**Maintainer**: Development Team
**Related Instructions**: [instruction-files.instructions.md](instruction-files.instructions.md)
