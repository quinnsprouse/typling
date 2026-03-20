interface ThemeDef {
  id: string
  label: string
  isDark: boolean
  preview: { bg: string; fg: string }
}

export const THEMES: ThemeDef[] = [
  {
    id: 'snow',
    label: 'Snow',
    isDark: false,
    preview: { bg: '#ffffff', fg: '#1a1a1a' },
  },
  {
    id: 'bone',
    label: 'Solarized',
    isDark: false,
    preview: { bg: '#F5E8C8', fg: '#2B4A6F' },
  },
  {
    id: 'fog',
    label: 'Lavender',
    isDark: false,
    preview: { bg: '#EBE0F5', fg: '#2D1A56' },
  },
  {
    id: 'midnight',
    label: 'Midnight',
    isDark: true,
    preview: { bg: '#1a1a1a', fg: '#e0e0e0' },
  },
  {
    id: 'terminal',
    label: 'Terminal',
    isDark: true,
    preview: { bg: '#0A1A0D', fg: '#44E858' },
  },
  {
    id: 'ember',
    label: 'Ember',
    isDark: true,
    preview: { bg: '#1C120A', fg: '#E8A855' },
  },
]

const DARK_THEME_IDS = new Set(
  THEMES.filter((t) => t.isDark).map((t) => t.id),
)

export const DEFAULT_THEME = 'snow'

export function applyTheme(themeId: string) {
  const html = document.documentElement
  html.classList.add('no-transitions')
  html.setAttribute('data-theme', themeId)

  if (DARK_THEME_IDS.has(themeId)) {
    html.classList.add('dark')
  } else {
    html.classList.remove('dark')
  }

  localStorage.setItem('theme', themeId)

  // Force reflow then re-enable transitions
  void html.offsetHeight
  html.classList.remove('no-transitions')
}

export function getStoredTheme(): string {
  if (typeof window === 'undefined') return DEFAULT_THEME
  return localStorage.getItem('theme') ?? DEFAULT_THEME
}

// Inline script to run before first paint (prevents flash)
export const themeInitScript = `(function(){var t=localStorage.getItem('theme')||'${DEFAULT_THEME}';document.documentElement.setAttribute('data-theme',t);if(${JSON.stringify([...DARK_THEME_IDS])}.includes(t))document.documentElement.classList.add('dark')})();`
