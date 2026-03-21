import type { HTMLAttributes } from 'react'
import { cx } from '../utils/cx'

export interface PanelProps extends HTMLAttributes<HTMLElement> {
  as?: 'article' | 'div' | 'section'
}

export function Panel({
  as: Component = 'section',
  children,
  className,
  ...props
}: PanelProps) {
  return (
    <Component className={cx('spa-panel', className)} {...props}>
      {children}
    </Component>
  )
}
