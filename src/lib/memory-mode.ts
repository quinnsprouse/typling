export type MemoryMode = 'full' | 'partial' | 'recall'

/**
 * Randomly selects ~40% of words to hide.
 * Always keeps the first word visible as an anchor for context.
 */
function pickHiddenWords(wordCount: number): Set<number> {
  const hidden = new Set<number>()

  for (let i = 1; i < wordCount; i++) {
    if (Math.random() < 0.4) hidden.add(i)
  }

  // Guarantee at least one word is hidden (otherwise partial = full)
  if (hidden.size === 0 && wordCount > 1) {
    hidden.add(1 + Math.floor(Math.random() * (wordCount - 1)))
  }

  return hidden
}

/**
 * Returns a boolean[] where true = character should be hidden.
 * Uses Math.random(), so call this when you want a fresh set of blanks
 * (mode change, reset, new prompt). Pass the result into state.
 */
export function computeHiddenChars(
  prompt: string,
  mode: MemoryMode
): boolean[] {
  if (mode === 'full') return new Array(prompt.length).fill(false) as boolean[]
  if (mode === 'recall') return new Array(prompt.length).fill(true) as boolean[]

  // Partial: randomly hide words, keep spaces visible
  const words = prompt.split(' ')
  const hiddenWords = pickHiddenWords(words.length)
  const result: boolean[] = []
  let wordIndex = 0
  let inWord = false

  for (const char of prompt) {
    if (char === ' ') {
      result.push(false)
      if (inWord) {
        wordIndex++
        inWord = false
      }
    } else {
      if (!inWord) inWord = true
      result.push(hiddenWords.has(wordIndex))
    }
  }

  return result
}
