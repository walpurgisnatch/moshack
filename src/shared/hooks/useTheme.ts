import { createContext, useContext } from 'react';
import { IThemeContext } from '../types/theme';

export const ThemeContext = createContext<IThemeContext>({
  theme: 'system',
  prefersColorScheme: 'system',
  switchTheme: () => {}
});

export const useTheme = () => useContext(ThemeContext);
