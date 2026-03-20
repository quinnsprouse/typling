/// <reference types="vite/client" />
import type { ReactNode } from 'react'
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
  Link,
} from '@tanstack/react-router'
import appCss from '@/styles/app.css?url'
import { AgentationDevtool } from '@/components/agentation-devtool'
import { ThemePicker } from '@/components/theme-picker'
import { themeInitScript } from '@/lib/themes'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'typling',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
    scripts: [
      {
        id: 'theme-init',
        children: themeInitScript,
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemePicker />
        {children}
        <AgentationDevtool />
        <Scripts />
      </body>
    </html>
  )
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">404</p>
        <h1 className="text-3xl font-semibold text-balance">Page not found</h1>
        <p className="text-muted-foreground text-pretty">
          The page you are looking for either moved or does not exist.
        </p>
      </div>
      <Link
        to="/"
        className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background shadow hover:opacity-90"
      >
        Back home
      </Link>
    </div>
  )
}
