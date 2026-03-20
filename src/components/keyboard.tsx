import { cn } from '@/lib/utils'

interface KeyDef {
  code: string
  label: string
  shiftLabel?: string
  width?: number
}

const ROWS: KeyDef[][] = [
  [
    { code: 'Backquote', label: '`', shiftLabel: '~' },
    { code: 'Digit1', label: '1', shiftLabel: '!' },
    { code: 'Digit2', label: '2', shiftLabel: '@' },
    { code: 'Digit3', label: '3', shiftLabel: '#' },
    { code: 'Digit4', label: '4', shiftLabel: '$' },
    { code: 'Digit5', label: '5', shiftLabel: '%' },
    { code: 'Digit6', label: '6', shiftLabel: '^' },
    { code: 'Digit7', label: '7', shiftLabel: '&' },
    { code: 'Digit8', label: '8', shiftLabel: '*' },
    { code: 'Digit9', label: '9', shiftLabel: '(' },
    { code: 'Digit0', label: '0', shiftLabel: ')' },
    { code: 'Minus', label: '-', shiftLabel: '_' },
    { code: 'Equal', label: '=', shiftLabel: '+' },
    { code: 'Backspace', label: 'delete', width: 2 },
  ],
  [
    { code: 'Tab', label: 'tab', width: 1.5 },
    { code: 'KeyQ', label: 'Q' },
    { code: 'KeyW', label: 'W' },
    { code: 'KeyE', label: 'E' },
    { code: 'KeyR', label: 'R' },
    { code: 'KeyT', label: 'T' },
    { code: 'KeyY', label: 'Y' },
    { code: 'KeyU', label: 'U' },
    { code: 'KeyI', label: 'I' },
    { code: 'KeyO', label: 'O' },
    { code: 'KeyP', label: 'P' },
    { code: 'BracketLeft', label: '[', shiftLabel: '{' },
    { code: 'BracketRight', label: ']', shiftLabel: '}' },
    { code: 'Backslash', label: '\\', shiftLabel: '|', width: 1.5 },
  ],
  [
    { code: 'CapsLock', label: 'caps lock', width: 1.75 },
    { code: 'KeyA', label: 'A' },
    { code: 'KeyS', label: 'S' },
    { code: 'KeyD', label: 'D' },
    { code: 'KeyF', label: 'F' },
    { code: 'KeyG', label: 'G' },
    { code: 'KeyH', label: 'H' },
    { code: 'KeyJ', label: 'J' },
    { code: 'KeyK', label: 'K' },
    { code: 'KeyL', label: 'L' },
    { code: 'Semicolon', label: ';', shiftLabel: ':' },
    { code: 'Quote', label: "'", shiftLabel: '"' },
    { code: 'Enter', label: 'return', width: 2.25 },
  ],
  [
    { code: 'ShiftLeft', label: 'shift', width: 2.25 },
    { code: 'KeyZ', label: 'Z' },
    { code: 'KeyX', label: 'X' },
    { code: 'KeyC', label: 'C' },
    { code: 'KeyV', label: 'V' },
    { code: 'KeyB', label: 'B' },
    { code: 'KeyN', label: 'N' },
    { code: 'KeyM', label: 'M' },
    { code: 'Comma', label: ',', shiftLabel: '<' },
    { code: 'Period', label: '.', shiftLabel: '>' },
    { code: 'Slash', label: '/', shiftLabel: '?' },
    { code: 'ShiftRight', label: 'shift', width: 2.75 },
  ],
  [
    { code: 'Fn', label: 'fn', width: 1 },
    { code: 'ControlLeft', label: 'ctrl', width: 1.25 },
    { code: 'AltLeft', label: 'opt', width: 1.25 },
    { code: 'MetaLeft', label: 'cmd', width: 1.5 },
    { code: 'Space', label: '', width: 7.25 },
    { code: 'MetaRight', label: 'cmd', width: 1.5 },
    { code: 'AltRight', label: 'opt', width: 1.25 },
  ],
]

function Key({ keyDef, isPressed }: { keyDef: KeyDef; isPressed: boolean }) {
  const { label, shiftLabel, width = 1 } = keyDef
  const isLetter = /^[A-Z]$/.test(label)

  return (
    <div
      style={{ flex: width }}
      className={cn(
        'relative flex flex-col h-[52px] border px-2.5 py-1.5 rounded-[4px]',
        'select-none text-[13px] leading-none',
        'transition-[background-color,color,border-color] duration-[50ms] ease-out',
        isPressed
          ? 'bg-foreground text-background border-foreground'
          : 'bg-background text-foreground border-foreground/15',
        shiftLabel
          ? 'justify-between items-start'
          : isLetter
            ? 'justify-center items-center'
            : 'justify-end items-start'
      )}
    >
      {shiftLabel && (
        <span
          className={cn('text-[10px]', isPressed ? 'opacity-60' : 'opacity-35')}
        >
          {shiftLabel}
        </span>
      )}
      <span className={isLetter ? 'text-[15px]' : ''}>{label}</span>
    </div>
  )
}

export function Keyboard({ pressedKeys }: { pressedKeys: Set<string> }) {
  return (
    <div className="flex flex-col gap-[4px] w-full max-w-[860px]">
      {ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-[4px]">
          {row.map((keyDef) => (
            <Key
              key={keyDef.code}
              keyDef={keyDef}
              isPressed={pressedKeys.has(keyDef.code)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
