# TanStack Start Patterns

## Routing

- Routes are file-based in `src/routes/`.
- Route files should export `Route` using `createFileRoute(...)` (or root helpers where appropriate).
- Keep loaders/actions colocated with route files unless there is a clear reuse boundary.

## Server Functions

- Use `createServerFn` for server-only logic.
- Always call server functions with `await` (or explicit `.then()` handling).
- For data refresh after mutations, prefer router invalidation patterns (for example `router.invalidate()` when needed).

## Types and Safety

- Keep route params/search typing explicit through TanStack Router APIs.
- Preserve strict TypeScript behavior; avoid `any` unless unavoidable and justified.
