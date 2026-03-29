import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  DEFAULT_THEME_STORAGE_KEY,
  getInitialTheme,
  isThemeMode,
  syncStoredTheme,
} from './themeStorage'
import type { ThemeMode } from './types'

export interface UseThemePreferenceOptions {
  initialTheme?: ThemeMode
  persist?: boolean
  storageKey?: string
}

export interface ThemePreferenceValue {
  onChange: (theme: ThemeMode) => void
  value: ThemeMode
}

/**
 * Hook for app-owned theme settings that still use the shared library contract.
 *
 * It exposes a `value` / `onChange` pair that can be passed directly into
 * `ThemeProvider` controlled mode or into UI controls like `ThemeToggle`.
 */
export function useThemePreference({
  initialTheme = 'system',
  persist = true,
  storageKey = DEFAULT_THEME_STORAGE_KEY,
}: UseThemePreferenceOptions = {}): ThemePreferenceValue {
  const [value, setValue] = useState<ThemeMode>(() =>
    getInitialTheme(initialTheme, storageKey, persist)
  )

  const onChange = useCallback((nextTheme: ThemeMode) => {
    setValue(nextTheme)
  }, [])

  useEffect(() => {
    syncStoredTheme(value, storageKey, persist)
  }, [persist, storageKey, value])

  useEffect(() => {
    if (typeof window === 'undefined' || !persist) {
      return undefined
    }

    const handleStorage = (event: StorageEvent): void => {
      if (event.key !== storageKey) {
        return
      }

      if (isThemeMode(event.newValue)) {
        setValue(event.newValue)
        return
      }

      setValue(initialTheme)
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [initialTheme, persist, storageKey])

  return useMemo(
    () => ({
      onChange,
      value,
    }),
    [onChange, value]
  )
}
