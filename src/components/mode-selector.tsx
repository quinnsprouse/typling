import { cn } from '@/lib/utils'
import type { MemoryMode } from '@/lib/memory-mode'

const MODES: { id: MemoryMode; label: string }[] = [
  { id: 'full', label: 'full' },
  { id: 'partial', label: 'partial' },
  { id: 'recall', label: 'recall' },
]

export function ModeSelector({
  value,
  onChange,
}: {
  value: MemoryMode
  onChange: (mode: MemoryMode) => void
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="flex items-center gap-1 rounded-[4px] border border-foreground/10 p-0.5"
        role="radiogroup"
        aria-label="Memory mode"
      >
        {MODES.map((mode) => {
          const isActive = value === mode.id
          return (
            <button
              key={mode.id}
              onClick={() => onChange(mode.id)}
              className={cn(
                'h-8 px-3 rounded-[3px]',
                'text-[10px] uppercase tracking-[0.15em]',
                'transition-[background-color,color] duration-100 ease-out',
                isActive
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              role="radio"
              aria-checked={isActive}
            >
              {mode.label}
            </button>
          )
        })}
      </div>
      <span className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground/40 select-none">
        tab to cycle
      </span>
    </div>
  )
}
