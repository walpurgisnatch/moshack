export const THEMES = {
  dark: 'dark',
  light: 'light',
  system: 'system'
} as const;

export type Theme = (typeof THEMES)[keyof typeof THEMES];

export interface IThemeContext {
  prefersColorScheme: Theme;
  theme: Theme;
  switchTheme: (theme: Theme) => void;
}
