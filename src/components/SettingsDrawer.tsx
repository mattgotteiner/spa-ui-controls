import type { ReactNode } from 'react'
import { Drawer } from './Drawer'

export interface SettingsDrawerProps {
  children: ReactNode
  description?: ReactNode
  footer?: ReactNode
  isOpen: boolean
  onClose?: () => void
  title?: ReactNode
  width?: number | string
}

export function SettingsDrawer({
  children,
  description = 'Configure app-level settings and preferences.',
  footer,
  isOpen,
  onClose,
  title = 'Settings',
  width = 400,
}: SettingsDrawerProps) {
  return (
    <Drawer
      description={description}
      footer={footer}
      isOpen={isOpen}
      onClose={onClose}
      side="right"
      title={title}
      width={width}
    >
      {children}
    </Drawer>
  )
}
