import type { ReactNode } from 'react'
import { cx } from '../utils/cx'

export interface FormFieldProps {
  children: ReactNode
  error?: ReactNode
  hint?: ReactNode
  htmlFor?: string
  label?: ReactNode
  className?: string
}

export function FormField({
  children,
  className,
  error,
  hint,
  htmlFor,
  label,
}: FormFieldProps) {
  return (
    <div className={cx('spa-field', className)}>
      {label ? (
        <label className="spa-field__label" htmlFor={htmlFor}>
          {label}
        </label>
      ) : null}
      <div className="spa-field__control">{children}</div>
      {hint ? <div className="spa-field__hint">{hint}</div> : null}
      {error ? <div className="spa-field__error">{error}</div> : null}
    </div>
  )
}
