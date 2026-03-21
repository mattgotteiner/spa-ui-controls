import {
  useEffect,
  useId,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from 'react'
import { cx } from '../utils/cx'
import { IconButton } from './IconButton'

export interface DrawerProps {
  children: ReactNode
  closeLabel?: string
  description?: ReactNode
  footer?: ReactNode
  isOpen: boolean
  onClose?: () => void
  side?: 'left' | 'right'
  title?: ReactNode
  width?: number | string
}

export function Drawer({
  children,
  closeLabel = 'Close panel',
  description,
  footer,
  isOpen,
  onClose,
  side = 'right',
  title,
  width = 380,
}: DrawerProps) {
  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    if (!isOpen || !onClose) {
      return undefined
    }

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  const style: CSSProperties = {
    '--spa-drawer-width': typeof width === 'number' ? `${width}px` : width,
  } as CSSProperties

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>): void => {
    if (event.target === event.currentTarget) {
      onClose?.()
    }
  }

  return (
    <div className="spa-drawer-overlay" onClick={handleOverlayClick}>
      <aside
        aria-describedby={description ? descriptionId : undefined}
        aria-labelledby={title ? titleId : undefined}
        aria-modal="true"
        className={cx('spa-drawer', `spa-drawer--${side}`)}
        role="dialog"
        style={style}
      >
        <div className="spa-drawer__header">
          <div className="spa-drawer__heading">
            {title ? (
              <h2 className="spa-drawer__title" id={titleId}>
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="spa-drawer__description" id={descriptionId}>
                {description}
              </p>
            ) : null}
          </div>
          <IconButton label={closeLabel} onClick={onClose}>
            X
          </IconButton>
        </div>
        <div className="spa-drawer__content">{children}</div>
        {footer ? <div className="spa-drawer__footer">{footer}</div> : null}
      </aside>
    </div>
  )
}
