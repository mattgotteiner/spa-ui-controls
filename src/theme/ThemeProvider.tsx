import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { applyThemeClass } from './applyThemeClass'
import { ThemeContext } from './ThemeContext'
import type { ResolvedTheme, ThemeMode } from './types'

const DEFAULT_STORAGE_KEY = 'spa-ui-controls-theme'

function isThemeMode(value: unknown): value is ThemeMode {
  return value === 'light' || value === 'dark' || value === 'system'
}

function resolveSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') {
    return 'light'
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getInitialTheme(initialTheme: ThemeMode, storageKey: string, persist: boolean): ThemeMode {
  if (!persist || typeof window === 'undefined') {
    return initialTheme
  }

  const storedValue = window.localStorage.getItem(storageKey)
  return isThemeMode(storedValue) ? storedValue : initialTheme
}

export interface ThemeProviderProps {
  children: ReactNode
  initialTheme?: ThemeMode
  persist?: boolean
  storageKey?: string
}

export function ThemeProvider({
  children,
  initialTheme = 'system',
  persist = true,
  storageKey = DEFAULT_STORAGE_KEY,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeMode>(() =>
    getInitialTheme(initialTheme, storageKey, persist)
  )
  const [systemTheme, setSystemTheme] = useState(resolveSystemTheme)

  const resolvedTheme = useMemo(
    () => (theme === 'system' ? systemTheme : theme),
    [systemTheme, theme]
  )

  useEffect(() => {
    applyThemeClass(document.documentElement, theme)

    if (persist) {
      window.localStorage.setItem(storageKey, theme)
    } else {
      window.localStorage.removeItem(storageKey)
    }
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
    [resolvedTheme, theme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
