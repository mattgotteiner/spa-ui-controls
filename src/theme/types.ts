export type ThemeMode = 'light' | 'dark' | 'system'
export type ResolvedTheme = Exclude<ThemeMode, 'system'>

export const THEME_OPTIONS: ThemeMode[] = ['light', 'dark', 'system']
