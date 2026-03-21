import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '../utils/cx'

export interface BannerProps extends HTMLAttributes<HTMLDivElement> {
  actions?: ReactNode
  heading?: ReactNode
  tone?: 'info' | 'success' | 'warning' | 'danger'
}

export function Banner({
  actions,
  children,
  className,
  heading,
  tone = 'info',
  ...props
}: BannerProps) {
  return (
    <div className={cx('spa-banner', `spa-banner--${tone}`, className)} role="status" {...props}>
      <div className="spa-banner__body">
        {heading ? <div className="spa-banner__title">{heading}</div> : null}
        <div className="spa-banner__message">{children}</div>
      </div>
      {actions ? <div className="spa-banner__actions">{actions}</div> : null}
    </div>
  )
}
