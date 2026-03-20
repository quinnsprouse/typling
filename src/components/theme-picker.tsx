import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { THEMES, applyTheme, getStoredTheme } from '@/lib/themes'
import { cn } from '@/lib/utils'

export function ThemePicker() {
  const [open, setOpen] = useState(false)
  const [activeTheme, setActiveTheme] = useState(getStoredTheme)
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  function handleSelectTheme(themeId: string) {
    applyTheme(themeId)
    setActiveTheme(themeId)
    setOpen(false)
  }

  return (
    <div ref={containerRef} className="fixed top-5 right-5 z-10">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'flex items-center justify-center',
          'h-11 px-3 rounded-md',
          'text-[11px] uppercase tracking-[0.15em] text-muted-foreground',
          'transition-[color] duration-150 ease',
          'hover:text-foreground'
        )}
        aria-label="Change theme"
        aria-expanded={open}
      >
        theme
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute top-full right-0 mt-1 flex gap-2 rounded-lg border bg-background p-2"
            role="radiogroup"
            aria-label="Theme selection"
          >
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleSelectTheme(theme.id)}
                className={cn(
                  'group relative flex h-11 w-11 items-center justify-center rounded-md',
                  'transition-[box-shadow] duration-100 ease-out',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                )}
                role="radio"
                aria-checked={activeTheme === theme.id}
                aria-label={theme.label}
                title={theme.label}
              >
                <div
                  className={cn(
                    'h-7 w-7 rounded-full border-[2px]',
                    'transition-[transform] duration-100 ease-out',
                    activeTheme === theme.id
                      ? 'scale-100 ring-2 ring-foreground/20 ring-offset-2 ring-offset-background'
                      : 'scale-90 opacity-70'
                  )}
                  style={{
                    backgroundColor: theme.preview.bg,
                    borderColor: theme.preview.fg,
                  }}
                />
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
