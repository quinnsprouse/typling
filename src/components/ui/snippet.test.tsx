import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { Snippet } from './snippet'

function setClipboardMock(writeText: (value: string) => Promise<void>) {
  Object.defineProperty(globalThis.navigator, 'clipboard', {
    value: { writeText },
    configurable: true,
  })
}

describe('Snippet', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('copies multiline text, calls onCopy, and resets copied state after timeout', async () => {
    const writeText = vi.fn(() => Promise.resolve())
    const onCopy = vi.fn()
    setClipboardMock(writeText)

    render(<Snippet text={['npm run dev', 'npm run test']} onCopy={onCopy} />)

    const copyButton = screen.getByRole('button', { name: 'Copy to clipboard' })
    fireEvent.click(copyButton)

    await act(async () => {
      await Promise.resolve()
    })

    expect(writeText).toHaveBeenCalledWith('npm run dev\nnpm run test')
    expect(onCopy).toHaveBeenCalledTimes(1)
    expect(screen.getByRole('button', { name: 'Copied' })).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(1500)
    })

    expect(
      screen.getByRole('button', { name: 'Copy to clipboard' })
    ).toBeInTheDocument()
  })

  it('does nothing when clipboard API is unavailable', () => {
    Object.defineProperty(globalThis.navigator, 'clipboard', {
      value: undefined,
      configurable: true,
    })

    render(<Snippet text="echo hello" />)

    const copyButton = screen.getByRole('button', { name: 'Copy to clipboard' })
    fireEvent.click(copyButton)

    expect(copyButton).toHaveAccessibleName('Copy to clipboard')
  })
})
