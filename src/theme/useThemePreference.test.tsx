import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DEFAULT_THEME_STORAGE_KEY } from './themeStorage'
import { useThemePreference } from './useThemePreference'

describe('useThemePreference', () => {
  it('reads the stored theme by default', () => {
    window.localStorage.setItem(DEFAULT_THEME_STORAGE_KEY, 'dark')

    const { result } = renderHook(() => useThemePreference())

    expect(result.current.value).toBe('dark')
  })

  it('returns a value/onChange contract and persists updates', () => {
    const { result } = renderHook(() => useThemePreference({ initialTheme: 'light' }))

    act(() => {
      result.current.onChange('dark')
    })

    expect(result.current.value).toBe('dark')
    expect(window.localStorage.getItem(DEFAULT_THEME_STORAGE_KEY)).toBe('dark')
  })

  it('clears persisted state when persistence is disabled', () => {
    window.localStorage.setItem(DEFAULT_THEME_STORAGE_KEY, 'dark')

    const { result } = renderHook(() =>
      useThemePreference({ initialTheme: 'light', persist: false })
    )

    expect(result.current.value).toBe('light')
    expect(window.localStorage.getItem(DEFAULT_THEME_STORAGE_KEY)).toBeNull()
  })

  it('syncs when the stored value changes in another tab', () => {
    const { result } = renderHook(() =>
      useThemePreference({ initialTheme: 'light', storageKey: 'shared-theme' })
    )

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'shared-theme',
          newValue: 'dark',
        })
      )
    })

    expect(result.current.value).toBe('dark')
  })
})
