import type { ThemeMode } from './types'

export const DEFAULT_THEME_STORAGE_KEY = 'spa-ui-controls-theme'

export function isThemeMode(value: unknown): value is ThemeMode {
  return value === 'light' || value === 'dark' || value === 'system'
}

export function readStoredTheme(storageKey: string): ThemeMode | null {
  if (typeof window === 'undefined') {
    return null
  }

  const storedValue = window.localStorage.getItem(storageKey)
  return isThemeMode(storedValue) ? storedValue : null
}

export function getInitialTheme(
  initialTheme: ThemeMode,
  storageKey: string,
  persist: boolean
): ThemeMode {
  if (!persist) {
    return initialTheme
  }

  return readStoredTheme(storageKey) ?? initialTheme
}

export function syncStoredTheme(theme: ThemeMode, storageKey: string, persist: boolean): void {
  if (typeof window === 'undefined') {
    return
  }

  if (persist) {
    window.localStorage.setItem(storageKey, theme)
    return
  }

  window.localStorage.removeItem(storageKey)
}
