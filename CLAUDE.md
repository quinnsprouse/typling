# Agent Instructions

This is a TanStack Start + React 19 TypeScript app using shadcn/ui (Base UI), Tailwind v4, and Vite.

- Package manager: `npm`
- Core commands:
  - `npm run check` (format check + strict lint + typecheck + tests)
  - `npm run check:push` (full push gate: `check` + Playwright smoke test)
  - `npm run build` (typecheck + production build)
  - `npm run dev` (local dev server at `http://localhost:3000`)

## Plan Loop

Use this loop for non-trivial work:

1. Plan
2. Execute
3. Test
4. Commit

## Plan Mode

- Make plans extremely concise. Prioritize scanability over grammar.
- End each plan with unresolved questions. If none, write: `Unresolved questions: none`.

## Progressive Disclosure

Open these docs only when relevant:

- [Project Context](docs/agents/PROJECT_CONTEXT.md)
- [TanStack Start Patterns](docs/agents/TANSTACK_START.md)
- [UI and Motion Guidelines](docs/agents/UI_MOTION.md)
- [Testing and Feedback Loops](docs/agents/TESTING.md)
