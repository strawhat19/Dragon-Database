import { createContext, useContext } from 'react';
import type { PropsWithChildren } from 'react';
import { palette } from '../../styles/theme/theme';

const ThemeContext = createContext(palette);

export const ThemeProvider = ({ children }: PropsWithChildren) => (
  <ThemeContext.Provider value={palette}>{children}</ThemeContext.Provider>
);

export const useTheme = () => useContext(ThemeContext);
