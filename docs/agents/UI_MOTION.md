# UI and Motion Guidelines

## UI Styling

- Use Tailwind utility classes.
- Use theme tokens/CSS variables (`bg-background`, `text-foreground`, etc.) instead of ad-hoc colors.
- Dark mode is controlled by the `dark` class on `html`.

## Motion

- Use Motion library imports from `motion/react` (do not use Framer Motion in this repo).
- Keep motion subtle and fast: usually <= 300ms with easing appropriate to the interaction.
- Avoid animating from `scale(0)`; start near `0.9+` for better perceived continuity.
- Apply `will-change: transform` on animated elements when needed to reduce visual jitter.
- Keep hover motion minimal for touch-heavy interactions.

## Icons

- Import icons from `@/components/icons`.
- Use the shared `Icon` wrapper for consistent size/stroke behavior.
