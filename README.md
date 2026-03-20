# typling

A keyboard-driven memorization tool. Type text to build muscle memory and recall. Built for memorizing scripture, quotes, code, or anything you want to internalize.

## How it works

1. Add text you want to memorize (with a title, organized in folders)
2. Practice typing it in **full** mode (all text visible)
3. Switch to **partial** mode (random words hidden each attempt)
4. Graduate to **recall** mode (no text shown, pure memory)
5. Press **Tab** to cycle modes, **Enter** to restart

All data lives in **localStorage** — nothing leaves your browser.

## Features

- On-screen keyboard with real-time key highlighting
- Telemetry panel (WPM, accuracy, timer) with CRT boot-up animation on completion
- 6 themes (3 light, 3 dark) persisted to localStorage
- Library sidebar with folders, titles, inline editing
- Built-in presets (pangrams, quotes, code, symbols)
- Departure Mono typeface throughout

## Stack

TanStack Start, React 19, Tailwind v4, Motion, TypeScript, Vite

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run check      # format + lint + typecheck + tests
```

## License

MIT
