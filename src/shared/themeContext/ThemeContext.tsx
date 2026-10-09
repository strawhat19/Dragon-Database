import type { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import type { ViewStyle } from 'react-native';
import { palette, themePalettes } from './theme';
import type { ThemeMode, ThemePalette } from './theme';
import { readThemePreference, saveThemePreference } from './theme';
import { useRef, useMemo, useState, useEffect, useContext, useCallback, createContext } from 'react';

type ThemeContextValue = ThemePalette & {
  isDark: boolean;
  mode: ThemeMode;
  palette: ThemePalette;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
  themeArtwork: (xml: string) => string;
};

const artworkColorKeys: Record<string, keyof ThemePalette> = {
  '#0c0d10': `ink`,
  '#b9c1cc': `steel`,
  '#c5cbd3': `steel`,
  '#e4e7eb': `silver`,
  ...Object.fromEntries(Object.entries(palette).map(([key, value]) => [value, key])) as Record<string, keyof ThemePalette>,
};

const colorForTheme = (value: string, currentPalette: ThemePalette) => {
  const key = artworkColorKeys[value.toLowerCase()];
  if (key) return currentPalette[key];
  if (value === `rgba(229, 232, 237, 0.86)` && currentPalette === themePalettes.dark) return `rgba(14, 18, 25, 0.86)`;
  return value;
};

const recolorArtwork = (xml: string, currentPalette: ThemePalette) => xml.replace(
  /<mask\b[\s\S]*?<\/mask>|#[\da-f]{6}\b/gi,
  (value) => value.startsWith(`<`) ? value : colorForTheme(value, currentPalette),
);

const recolorStyle = (value: unknown, currentPalette: ThemePalette): unknown => {
  if (typeof value === `string`) return colorForTheme(value, currentPalette);
  if (Array.isArray(value)) return value.map((item) => recolorStyle(item, currentPalette));
  if (value && typeof value === `object`) return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, recolorStyle(item, currentPalette)]));
  return value;
};

const ThemeContext = createContext<ThemeContextValue>({
  ...palette,
  palette,
  isDark: false,
  mode: `light`,
  setTheme: () => {},
  toggleTheme: () => {},
  themeArtwork: (xml) => xml,
});

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const selected = useRef(false);
  const [mode, setMode] = useState<ThemeMode>(`light`);
  const currentPalette = themePalettes[mode];
  const setTheme = useCallback((nextMode: ThemeMode) => {
    selected.current = true;
    setMode(nextMode);
    void saveThemePreference(nextMode).catch((error: unknown) => console.warn(`Theme Preference Could Not Be Saved`, error));
  }, []);
  const toggleTheme = useCallback(() => setTheme(mode === `light` ? `dark` : `light`), [mode, setTheme]);
  const themeArtwork = useCallback((xml: string) => recolorArtwork(xml, currentPalette), [currentPalette]);

  useEffect(() => {
    let mounted = true;
    void readThemePreference().then((savedMode) => {
      if (mounted && savedMode && !selected.current) setMode(savedMode);
    }).catch((error: unknown) => console.warn(`Theme Preference Could Not Be Read`, error));
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (typeof document === `undefined`) return;
    document.documentElement.dataset.theme = mode;
    Object.entries(currentPalette).forEach(([key, value]) => document.documentElement.style.setProperty(`--${key}`, value));
  }, [mode, currentPalette]);

  const value = useMemo(() => ({
    mode,
    setTheme,
    toggleTheme,
    themeArtwork,
    ...currentPalette,
    isDark: mode === `dark`,
    palette: currentPalette,
  }), [mode, setTheme, toggleTheme, themeArtwork, currentPalette]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);

export const useThemedArtwork = (xml: string) => {
  const { themeArtwork } = useTheme();
  return useMemo(() => themeArtwork(xml), [xml, themeArtwork]);
};

export const useThemedStyles = <T extends Record<string, unknown>>(styles: T): T => {
  const { palette: currentPalette } = useTheme();
  return useMemo(() => Object.fromEntries(Object.entries(styles).map(([key, value]) => [
    key,
    recolorStyle(StyleSheet.flatten(value as ViewStyle), currentPalette),
  ])) as T, [styles, currentPalette]);
};
