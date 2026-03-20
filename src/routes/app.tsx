import { useState, useEffect, useCallback } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { LazyMotion, domAnimation, m, useReducedMotion } from 'motion/react'
import { Keyboard } from '@/components/keyboard'
import { SpeedGauge } from '@/components/speed-gauge'
import { ModeSelector } from '@/components/mode-selector'
import { computeHiddenChars, type MemoryMode } from '@/lib/memory-mode'
import { Sidebar } from '@/components/sidebar'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/app')({
  component: Home,
})

const DEFAULT_PROMPT = 'the quick brown fox jumps over the lazy dog'

const PREVENT_DEFAULT_CODES = new Set([
  'Tab',
  'Space',
  'Backspace',
  'Enter',
  'Quote',
  'Slash',
])

function Home() {
  const prefersReducedMotion = useReducedMotion()
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set())
  const [typedChars, setTypedChars] = useState<string[]>([])
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mode, setMode] = useState<MemoryMode>('full')

  // Hidden chars stored as state so we can regenerate with fresh randomness
  // on every reset, mode change, or prompt change.
  const [hiddenChars, setHiddenChars] = useState(() =>
    computeHiddenChars(DEFAULT_PROMPT, 'full')
  )

  function regenerateHidden(p: string, m: MemoryMode) {
    setHiddenChars(computeHiddenChars(p, m))
  }

  // Telemetry
  const [startTime, setStartTime] = useState<number | null>(null)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [errorCount, setErrorCount] = useState(0)
  const [completionKey, setCompletionKey] = useState(0)

  const isComplete = typedChars.length >= prompt.length

  // Derive WPM
  const wpm =
    elapsedSeconds > 0 && typedChars.length > 0
      ? Math.max(0, typedChars.length / 5 / (elapsedSeconds / 60))
      : 0

  // Accuracy: penalizes errors even if corrected
  const totalKeystrokes = typedChars.length + errorCount
  const accuracy =
    totalKeystrokes > 0
      ? ((totalKeystrokes - errorCount) / totalKeystrokes) * 100
      : 100

  // Timer
  useEffect(() => {
    if (startTime === null || isComplete) return

    const interval = setInterval(() => {
      setElapsedSeconds((Date.now() - startTime) / 1000)
    }, 200)

    return () => clearInterval(interval)
  }, [startTime, isComplete])

  const resetTest = useCallback(() => {
    setTypedChars([])
    setStartTime(null)
    setElapsedSeconds(0)
    setErrorCount(0)
    regenerateHidden(prompt, mode)
  }, [prompt, mode])

  function handleModeChange(newMode: MemoryMode) {
    setMode(newMode)
    setTypedChars([])
    setStartTime(null)
    setElapsedSeconds(0)
    setErrorCount(0)
    regenerateHidden(prompt, newMode)
  }

  const handleCloseSidebar = useCallback(() => setSidebarOpen(false), [])

  const handleSelectPrompt = useCallback(
    (text: string) => {
      setPrompt(text)
      setTypedChars([])
      setStartTime(null)
      setElapsedSeconds(0)
      setErrorCount(0)
      regenerateHidden(text, mode)
    },
    [mode]
  )

  useEffect(() => {
    if (sidebarOpen) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.repeat) return

      if (!e.metaKey && !e.ctrlKey && PREVENT_DEFAULT_CODES.has(e.code)) {
        e.preventDefault()
      }

      setPressedKeys((prev) => new Set(prev).add(e.code))

      if (e.key === 'Tab') {
        // Cycle modes: full → partial → recall → full
        setMode((prev) => {
          const next =
            prev === 'full' ? 'partial' : prev === 'partial' ? 'recall' : 'full'
          setTypedChars([])
          setStartTime(null)
          setElapsedSeconds(0)
          setErrorCount(0)
          setHiddenChars(computeHiddenChars(prompt, next))
          return next
        })
        return
      }

      if (e.key === 'Enter') {
        resetTest()
      } else if (e.key.length === 1 && !e.metaKey && !e.ctrlKey) {
        setStartTime((prev) => prev ?? Date.now())

        setTypedChars((prev) => {
          if (prev.length >= prompt.length) return prev
          const next = [...prev, e.key]

          if (e.key !== prompt[prev.length]) {
            setErrorCount((c) => c + 1)
          }

          if (next.length >= prompt.length) {
            setCompletionKey((k) => k + 1)
          }

          return next
        })
      } else if (e.key === 'Backspace' && !e.metaKey) {
        setTypedChars((prev) => prev.slice(0, -1))
      }
    }

    function handleKeyUp(e: KeyboardEvent) {
      if (e.code === 'MetaLeft' || e.code === 'MetaRight') {
        setPressedKeys(new Set())
        return
      }
      setPressedKeys((prev) => {
        const next = new Set(prev)
        next.delete(e.code)
        return next
      })
    }

    function handleBlur() {
      setPressedKeys(new Set())
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    window.addEventListener('blur', handleBlur)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('blur', handleBlur)
    }
  }, [sidebarOpen, prompt.length, prompt, resetTest])

  return (
    <LazyMotion features={domAnimation}>
      <button
        onClick={() => setSidebarOpen(true)}
        className={cn(
          'fixed top-5 left-5 z-10',
          'flex items-center justify-center',
          'h-11 px-3 rounded-md',
          'text-[11px] uppercase tracking-[0.15em] text-muted-foreground',
          'transition-[color] duration-150 ease',
          'hover:text-foreground'
        )}
        aria-label="Open settings"
      >
        config
      </button>

      <Sidebar
        open={sidebarOpen}
        onClose={handleCloseSidebar}
        onSelectPrompt={handleSelectPrompt}
        activePrompt={prompt}
      />

      <div className="min-h-dvh grid place-items-center px-6 py-12">
        <m.div
          className="w-full max-w-[860px] flex flex-col items-center gap-12"
          initial={
            prefersReducedMotion
              ? false
              : { opacity: 0, y: 12, filter: 'blur(6px)' }
          }
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ type: 'spring', duration: 0.5, bounce: 0.1 }}
        >
          <div className="flex flex-col items-center gap-5">
            <h1 className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              typling
            </h1>
            <ModeSelector value={mode} onChange={handleModeChange} />
          </div>

          <div
            className="w-full max-w-[660px] text-[20px] leading-[1.8] tracking-wide text-center"
            style={{ textWrap: 'balance' }}
            aria-label="Typing prompt"
          >
            {prompt.split('').map((char, i) => {
              const isTyped = i < typedChars.length
              const isCorrect = isTyped && typedChars[i] === char
              const isWrong = isTyped && typedChars[i] !== char
              const isCurrent = i === typedChars.length
              const isHidden = hiddenChars[i]

              // Hidden chars show underscore until typed
              const showBlank = isHidden && !isTyped
              const displayChar = showBlank ? (char === ' ' ? ' ' : '_') : char

              return (
                <span
                  key={i}
                  className={cn(
                    'relative inline',
                    isCorrect && 'text-foreground',
                    isWrong && 'text-destructive',
                    !isTyped &&
                      (isHidden ? 'text-foreground/8' : 'text-foreground/20')
                  )}
                >
                  {isCurrent && (
                    <span
                      className="absolute -bottom-0.5 left-0 w-full h-[2px] bg-foreground animate-pulse"
                      aria-hidden="true"
                    />
                  )}
                  {displayChar}
                </span>
              )
            })}
          </div>

          {isComplete && (
            <m.p
              className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: 'spring',
                duration: 0.3,
                bounce: 0.1,
              }}
            >
              press enter to restart
            </m.p>
          )}

          <Keyboard pressedKeys={pressedKeys} />

          <SpeedGauge
            wpm={wpm}
            accuracy={accuracy}
            elapsedSeconds={elapsedSeconds}
            charCount={typedChars.length}
            totalChars={prompt.length}
            isComplete={isComplete}
            completionKey={completionKey}
          />
        </m.div>
      </div>
    </LazyMotion>
  )
}
