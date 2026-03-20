# Testing and Feedback Loops

## Feedback Loop Order

Run this loop for all non-trivial changes:

1. `npm run format`
2. `npm run lint:strict`
3. `npm run typecheck`
4. `npm run test`
5. `npm run test:e2e` for critical UI flows
6. `npm run build` for release-critical changes

Use `npm run check` for steps 2-4 in one command plus format checking.

## Test Scope Policy

- Do not write tests for issues already caught by static analysis.
- ESLint + TypeScript own:
  - hook dependency mistakes
  - type errors and unsafe patterns
  - unused variables/imports
  - formatting and style consistency
- Tests should focus on runtime behavior through public interfaces.

## Test Design Rules

- Prefer vertical slices: one failing test, minimal implementation, repeat.
- Test observable outcomes (rendered UI, returned values, side effects at boundaries).
- Avoid implementation-coupled tests (private helpers, internal call counts, brittle mocks).

## Pre-commit Guardrails

- Husky pre-commit runs:
  - `npx lint-staged` (fast staged-file format/lint)
- Husky pre-push runs:
  - `npm run check:push` (`check` + Playwright smoke)

## TDD Skill

- Installed local skill: [`$tdd`](/Users/quinnsprouse/.codex/skills/tdd/SKILL.md)
- Use it when implementing behavior-heavy logic to keep tests honest and iterative.
