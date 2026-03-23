import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ThemeProvider } from './ThemeProvider'
import { useTheme } from './useTheme'

function ThemeProbe() {
  const { setTheme, theme } = useTheme()

  return (
    <>
      <div>{theme}</div>
      <button type="button" onClick={() => setTheme('dark')}>
        Switch theme
      </button>
    </>
  )
}

describe('ThemeProvider', () => {
  it('supports controlled theme state', () => {
    const { rerender } = render(
      <ThemeProvider persist={false} theme="light">
        <ThemeProbe />
      </ThemeProvider>
    )

    expect(screen.getByText('light')).toBeInTheDocument()

    rerender(
      <ThemeProvider persist={false} theme="dark">
        <ThemeProbe />
      </ThemeProvider>
    )

    expect(screen.getByText('dark')).toBeInTheDocument()
  })

  it('calls onThemeChange when context updates request a new theme', () => {
    const onThemeChange = vi.fn()

    render(
      <ThemeProvider onThemeChange={onThemeChange} persist={false} theme="light">
        <ThemeProbe />
      </ThemeProvider>
    )

    fireEvent.click(screen.getByRole('button', { name: 'Switch theme' }))
    expect(onThemeChange).toHaveBeenCalledWith('dark')
  })
})
