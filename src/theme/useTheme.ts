import { useContext } from 'react'
import { ThemeContext, type ThemeContextValue } from './ThemeContext'

/**
 * Hook for reading and updating the shared theme state.
 *
 * @returns The current theme mode, resolved theme, and updater function.
 *
 * @example
 * const { theme, setTheme } = useTheme()
 * return <ThemeToggle value={theme} onChange={setTheme} />
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
