import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cx } from '../utils/cx'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md'
  fullWidth?: boolean
}

export function Button({
  children,
  className,
  fullWidth = false,
  size = 'md',
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cx(
        'spa-button',
        `spa-button--${variant}`,
        `spa-button--${size}`,
        fullWidth && 'spa-button--full-width',
        className
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}
