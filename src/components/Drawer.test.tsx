import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Drawer } from './Drawer'

describe('Drawer', () => {
  it('renders the title and content when open', () => {
    render(
      <Drawer isOpen title="Settings">
        Drawer body
      </Drawer>
    )

    expect(screen.getByRole('dialog', { name: 'Settings' })).toBeInTheDocument()
    expect(screen.getByText('Drawer body')).toBeInTheDocument()
  })

  it('calls onClose when the overlay is clicked', () => {
    const onClose = vi.fn()
    render(
      <Drawer isOpen onClose={onClose} title="Settings">
        Drawer body
      </Drawer>
    )

    fireEvent.click(screen.getByRole('dialog').parentElement as HTMLElement)
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
