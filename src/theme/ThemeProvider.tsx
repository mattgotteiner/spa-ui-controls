import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { applyThemeClass } from './applyThemeClass'
import { ThemeContext } from './ThemeContext'
import {
  DEFAULT_THEME_STORAGE_KEY,
  getInitialTheme,
  syncStoredTheme,
} from './themeStorage'
import type { ResolvedTheme, ThemeMode } from './types'

function resolveSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') {
    return 'light'
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export interface ThemeProviderProps {
  children: ReactNode
  initialTheme?: ThemeMode
  onThemeChange?: (theme: ThemeMode) => void
  persist?: boolean
  storageKey?: string
  theme?: ThemeMode
}

export function ThemeProvider({
  children,
  initialTheme = 'system',
  onThemeChange,
  persist = true,
  storageKey = DEFAULT_THEME_STORAGE_KEY,
  theme: controlledTheme,
}: ThemeProviderProps) {
  const [uncontrolledTheme, setUncontrolledTheme] = useState<ThemeMode>(() =>
    getInitialTheme(initialTheme, storageKey, persist)
  )
  const [systemTheme, setSystemTheme] = useState(resolveSystemTheme)
  const theme = controlledTheme ?? uncontrolledTheme

  const resolvedTheme = useMemo(
    () => (theme === 'system' ? systemTheme : theme),
    [systemTheme, theme]
  )

  const setTheme = useCallback(
    (nextTheme: ThemeMode) => {
      if (controlledTheme === undefined) {
        setUncontrolledTheme(nextTheme)
      }

      onThemeChange?.(nextTheme)
    },
    [controlledTheme, onThemeChange]
  )

  useEffect(() => {
    applyThemeClass(document.documentElement, theme)
    syncStoredTheme(theme, storageKey, persist)
  }, [persist, storageKey, theme])

  useEffect(() => {
    if (theme !== 'system') {
      return undefined
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (): void => {
      setSystemTheme(mediaQuery.matches ? 'dark' : 'light')
    }

    handleChange()
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
    }),
    [resolvedTheme, setTheme, theme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
