import { DemoApp } from './App'
import { ThemeProvider } from '../theme/ThemeProvider'
import { useThemePreference } from '../theme/useThemePreference'

export function DemoRoot() {
  const themePreference = useThemePreference()

  return (
    <ThemeProvider
      onThemeChange={themePreference.onChange}
      persist={false}
      theme={themePreference.value}
    >
      <DemoApp />
    </ThemeProvider>
  )
}
