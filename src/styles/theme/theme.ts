export const palette = {
  ink: `#101115`,
  red: `#8d3038`,
  line: `#c7cdd5`,
  paper: `#f4f5f7`,
  steel: `#bec6d0`,
  muted: `#626b77`,
  silver: `#e8ebef`,
};

export type ThemePalette = typeof palette;
export type ThemeMode = `light` | `dark`;

export const themePalettes: Record<ThemeMode, ThemePalette> = {
  light: palette,
  dark: {
    ink: `#e5e9ef`,
    red: `#d16a71`,
    line: `#35404e`,
    paper: `#151a22`,
    steel: `#343e4d`,
    muted: `#aab4c2`,
    silver: `#0e1219`,
  },
};
