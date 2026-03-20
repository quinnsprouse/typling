# Project Context

## Stack

- Framework: TanStack Start (SSR full-stack React)
- Language: TypeScript
- Styling: Tailwind CSS v4 with CSS variables in `src/styles/app.css`
- UI: shadcn/ui with Base UI primitives under the hood
- Icons: HugeIcons via `@/components/icons`
- Build tool: Vite

## Repo Conventions

- Prefer existing shadcn/ui components before introducing custom primitives.
- Use `cn()` from `@/lib/utils` for class composition.
- Keep app code in `src/` and follow existing patterns in nearby files.
- Do not edit generated route tree file: `src/routeTree.gen.ts`.

## Operational Commands

- Dev: `npm run dev`
- Quality gate: `npm run check`
- Push gate: `npm run check:push`
- Tests: `npm run test`
- Browser smoke tests: `npm run test:e2e`
- Test coverage: `npm run test:coverage`
- Build: `npm run build`
