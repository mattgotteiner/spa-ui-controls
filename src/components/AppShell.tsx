import type { ReactNode } from 'react'
import { cx } from '../utils/cx'

export interface AppShellProps {
  children: ReactNode
  header?: ReactNode
  className?: string
  contentClassName?: string
}

export function AppShell({
  children,
  header,
  className,
  contentClassName,
}: AppShellProps) {
  return (
    <div className={cx('spa-shell', className)}>
      {header ? <div className="spa-shell__header">{header}</div> : null}
      <main className={cx('spa-shell__content', contentClassName)}>{children}</main>
    </div>
  )
}
