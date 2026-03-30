import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { SettingsButton } from './SettingsButton'

describe('SettingsButton', () => {
  it('renders an icon button with the default label', () => {
    render(<SettingsButton />)

    expect(screen.getByRole('button', { name: 'Open settings' })).toHaveClass(
      'spa-settings-button',
    )
  })

  it('calls onClick when pressed', () => {
    const onClick = vi.fn()
    render(<SettingsButton onClick={onClick} />)

    fireEvent.click(screen.getByRole('button', { name: 'Open settings' }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('renders a badge when requested', () => {
    const { container } = render(<SettingsButton showBadge />)

    expect(container.querySelector('.spa-settings-button__badge')).toBeInTheDocument()
  })

  it('does not render a badge by default', () => {
    const { container } = render(<SettingsButton />)

    expect(container.querySelector('.spa-settings-button__badge')).not.toBeInTheDocument()
  })

})
