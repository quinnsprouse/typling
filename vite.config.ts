import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import tailwindcss from '@tailwindcss/vite'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    port: 3000,
  },
  build: {
    outDir: '.output',
    rollupOptions: {
      onwarn(warning, warn) {
        const warningFromTanStackStartDependency =
          warning.code === 'UNUSED_EXTERNAL_IMPORT' &&
          typeof warning.id === 'string' &&
          warning.id.includes('node_modules/@tanstack/start-')

        if (warningFromTanStackStartDependency) {
          return
        }

        warn(warning)
      },
    },
  },
  plugins: [tsConfigPaths(), tanstackStart(), viteReact(), tailwindcss()],
})
