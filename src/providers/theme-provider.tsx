'use client';

import {
  useEffect,
  useState,
  useCallback,
  type ReactNode
} from 'react';
import { ThemeContext } from '@/shared/hooks/useTheme';
import {
  getTheme,
  getPrefersColorScheme
} from '@/shared/utils/theme';
import { Theme } from '@/shared/types/theme';

const ThemeProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [prefersColorScheme, setPrefersColorScheme] =
    useState<Theme>('light');

  useEffect(() => {
    const t = getTheme();
    setTheme(t);
    setPrefersColorScheme(getPrefersColorScheme(t));
  }, []);

  const onChangePrefersColorScheme = useCallback(
    () =>
      setPrefersColorScheme(() =>
        getPrefersColorScheme(theme)
      ),
    [theme]
  );

  useEffect(() => {
    const isLightColorScheme = window.matchMedia(
      '(prefers-color-scheme: light)'
    );

    isLightColorScheme.addEventListener(
      'change',
      onChangePrefersColorScheme
    );

    return () => {
      isLightColorScheme.removeEventListener(
        'change',
        onChangePrefersColorScheme
      );
    };
  }, [onChangePrefersColorScheme]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const switchTheme = (theme: Theme) => {
    setTheme(theme);
  };

  const value = { prefersColorScheme, theme, switchTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
