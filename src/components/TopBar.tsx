import type { ReactNode } from 'react'
import { cx } from '../utils/cx'

export interface TopBarProps {
  title: ReactNode
  subtitle?: ReactNode
  leading?: ReactNode
  trailing?: ReactNode
  className?: string
}

export function TopBar({
  title,
  subtitle,
  leading,
  trailing,
  className,
}: TopBarProps) {
  return (
    <header className={cx('spa-topbar', className)}>
      <div className="spa-topbar__leading">{leading}</div>
      <div className="spa-topbar__title-group">
        <div className="spa-topbar__title">{title}</div>
        {subtitle ? <div className="spa-topbar__subtitle">{subtitle}</div> : null}
      </div>
      <div className="spa-topbar__trailing">{trailing}</div>
    </header>
  )
}
