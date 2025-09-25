'use client';

import { THEMES } from '../types/theme';

export const getTheme = () => {
  const theme = localStorage.getItem(
    'theme'
  ) as (typeof THEMES)[keyof typeof THEMES];

  if (Object.values(THEMES).includes(theme)) return theme;
  return THEMES.system;
};

export const getPrefersColorScheme = (
  currentTheme: string
) => {
  const isSystemTheme = currentTheme === THEMES.system;
  const isLightTheme = isSystemTheme
    ? window.matchMedia('(prefers-color-scheme: light)')
        .matches
    : currentTheme === THEMES.light;

  return isLightTheme ? THEMES.light : THEMES.dark;
};
