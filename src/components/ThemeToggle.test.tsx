import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ThemeToggle } from './ThemeToggle'

describe('ThemeToggle', () => {
  it('renders all theme options', () => {
    render(<ThemeToggle onChange={vi.fn()} value="system" />)

    expect(screen.getByLabelText('Light')).toBeInTheDocument()
    expect(screen.getByLabelText('Dark')).toBeInTheDocument()
    expect(screen.getByLabelText('System')).toBeInTheDocument()
  })

  it('calls onChange with the selected theme', () => {
    const onChange = vi.fn()
    render(<ThemeToggle onChange={onChange} value="system" />)

    fireEvent.click(screen.getByLabelText('Dark'))
    expect(onChange).toHaveBeenCalledWith('dark')
  })
})
