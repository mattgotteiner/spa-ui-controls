import type { ReactNode } from 'react'
import { Drawer } from './Drawer'

export interface SidebarProps {
  children: ReactNode
  description?: ReactNode
  isOpen: boolean
  onClose?: () => void
  side?: 'left' | 'right'
  title?: ReactNode
  width?: number | string
}

export function Sidebar({
  children,
  description,
  isOpen,
  onClose,
  side = 'left',
  title,
  width = 320,
}: SidebarProps) {
  return (
    <Drawer
      description={description}
      isOpen={isOpen}
      onClose={onClose}
      side={side}
      title={title}
      width={width}
    >
      {children}
    </Drawer>
  )
}
