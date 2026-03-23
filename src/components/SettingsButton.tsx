import type { ComponentPropsWithoutRef } from 'react'
import { cx } from '../utils/cx'
import { SettingsIcon } from '../icons/SettingsIcon'
import { IconButton } from './IconButton'

export interface SettingsButtonProps
  extends Omit<ComponentPropsWithoutRef<typeof IconButton>, 'children' | 'label'> {
  label?: string
  showBadge?: boolean
  variant?: 'default' | 'topbar'
}

export function SettingsButton({
  className,
  label = 'Open settings',
  showBadge = false,
  variant = 'default',
  ...props
}: SettingsButtonProps) {
  return (
    <IconButton
      className={cx(
        'spa-settings-button',
        variant === 'topbar' && 'spa-settings-button--topbar',
        className,
      )}
      label={label}
      {...props}
    >
      <SettingsIcon className="spa-settings-button__icon" />
      {showBadge ? <span aria-hidden="true" className="spa-settings-button__badge" /> : null}
    </IconButton>
  )
}
