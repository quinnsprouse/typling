import { cn } from '@/lib/utils'

const BAR_WIDTH = 16

function Bar({ value, max }: { value: number; max: number }) {
  const clamped = Math.max(0, Math.min(value, max))
  const filled = Math.round((clamped / max) * BAR_WIDTH)
  const empty = BAR_WIDTH - filled

  return (
    <span className="whitespace-pre" aria-hidden="true">
      <span className="text-foreground">{'█'.repeat(filled)}</span>
      <span className="text-foreground/10">{'░'.repeat(empty)}</span>
    </span>
  )
}

function pad3(n: number): string {
  return String(Math.round(n)).padStart(3, '0')
}

interface SpeedGaugeProps {
  wpm: number
  accuracy: number
  elapsedSeconds: number
  charCount: number
  totalChars: number
  isComplete: boolean
  completionKey: number
}

export function SpeedGauge({
  wpm,
  accuracy,
  elapsedSeconds,
  charCount,
  totalChars,
  isComplete,
  completionKey,
}: SpeedGaugeProps) {
  const isActive = charCount > 0
  const progress =
    totalChars > 0 ? Math.round((charCount / totalChars) * 100) : 0
  const minutes = Math.floor(elapsedSeconds / 60)
  const seconds = Math.floor(elapsedSeconds % 60)

  return (
    <div
      key={isComplete ? `boot-${completionKey}` : 'idle'}
      className={cn(
        'w-full border rounded-[4px] relative crt-scanlines',
        'transition-[opacity,border-color] duration-300 ease-out',
        !isActive && 'opacity-25 border-foreground/10',
        isActive && !isComplete && 'opacity-40 border-foreground/10',
        isComplete && 'opacity-100 border-foreground/20 crt-boot-anim',
      )}
      role="status"
      aria-label={`Speed: ${Math.round(wpm)} words per minute, Accuracy: ${Math.round(accuracy)} percent`}
    >
      {/* Legend label on the border */}
      <span className="absolute -top-[9px] left-3 px-1.5 bg-background text-[9px] uppercase tracking-[0.25em] text-muted-foreground select-none">
        telemetry
      </span>

      <div className="px-4 py-3 flex flex-wrap items-center gap-x-8 gap-y-1 text-[12px] tabular-nums">
        {/* WPM */}
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground uppercase tracking-[0.1em] w-[3ch]">
            wpm
          </span>
          <Bar value={wpm} max={150} />
          <span className="w-[3ch] text-right text-foreground">
            {pad3(wpm)}
          </span>
        </div>

        {/* Accuracy */}
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground uppercase tracking-[0.1em] w-[3ch]">
            acc
          </span>
          <Bar value={accuracy} max={100} />
          <span className="text-foreground">
            {pad3(accuracy)}
            <span className="text-muted-foreground">%</span>
          </span>
        </div>

        {/* Time */}
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground uppercase tracking-[0.1em] w-[3ch]">
            tmr
          </span>
          <span className="text-foreground">
            {String(minutes).padStart(2, '0')}
            <span className="text-muted-foreground">:</span>
            {String(seconds).padStart(2, '0')}
          </span>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground uppercase tracking-[0.1em] w-[3ch]">
            prg
          </span>
          <span className="text-foreground">
            {pad3(progress)}
            <span className="text-muted-foreground">%</span>
          </span>
        </div>
      </div>
    </div>
  )
}
