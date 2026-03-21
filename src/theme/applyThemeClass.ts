import type { ThemeMode } from './types'

export function applyThemeClass(element: HTMLElement, theme: ThemeMode): void {
  element.classList.remove('theme-light', 'theme-dark')

  if (theme === 'light') {
    element.classList.add('theme-light')
  } else if (theme === 'dark') {
    element.classList.add('theme-dark')
  }
}
