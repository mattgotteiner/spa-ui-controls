import { beforeEach, describe, expect, it } from 'vitest'
import { applyThemeClass } from './applyThemeClass'

describe('applyThemeClass', () => {
  beforeEach(() => {
    document.documentElement.className = ''
  })

  it('adds the light theme class', () => {
    applyThemeClass(document.documentElement, 'light')

    expect(document.documentElement.classList.contains('theme-light')).toBe(true)
    expect(document.documentElement.classList.contains('theme-dark')).toBe(false)
  })

  it('removes explicit theme classes for system mode', () => {
    document.documentElement.classList.add('theme-light')

    applyThemeClass(document.documentElement, 'system')

    expect(document.documentElement.classList.contains('theme-light')).toBe(false)
    expect(document.documentElement.classList.contains('theme-dark')).toBe(false)
  })
})
