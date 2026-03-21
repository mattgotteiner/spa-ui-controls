import { THEME_OPTIONS, type ThemeMode } from '../theme/types'
import { cx } from '../utils/cx'

export interface ThemeToggleProps {
  className?: string
  onChange: (theme: ThemeMode) => void
  value: ThemeMode
}

export function ThemeToggle({ className, onChange, value }: ThemeToggleProps) {
  return (
    <div className={cx('spa-theme-toggle', className)} role="radiogroup" aria-label="Theme">
      {THEME_OPTIONS.map((theme) => (
        <label
          className={cx(
            'spa-theme-toggle__option',
            value === theme && 'spa-theme-toggle__option--active'
          )}
          key={theme}
        >
          <input
            checked={value === theme}
            className="spa-theme-toggle__input"
            name="theme"
            onChange={() => onChange(theme)}
            type="radio"
            value={theme}
          />
          <span className="spa-theme-toggle__label">
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </span>
        </label>
      ))}
    </div>
  )
}
