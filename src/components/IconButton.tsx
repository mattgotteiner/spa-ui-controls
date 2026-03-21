import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cx } from '../utils/cx'

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  label: string
}

export function IconButton({
  children,
  className,
  label,
  type = 'button',
  ...props
}: IconButtonProps) {
  return (
    <button
      aria-label={label}
      className={cx('spa-icon-button', className)}
      title={label}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}
