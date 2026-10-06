import { useLocalStorage } from '../config';
import type { ThemeMode } from '../../styles/theme/theme';
import { storageKey, readSnapshot, writeSnapshot, withStorageLock } from '../common/storage';

export { palette, themePalettes } from '../../styles/theme/theme';
export type { ThemeMode, ThemePalette } from '../../styles/theme/theme';
const preferenceKey = storageKey(`theme`);
const preferenceLabel = `Theme Preference`;

export const readThemePreference = () => useLocalStorage ? readSnapshot(preferenceKey, (value): ThemeMode => {
  if (value !== `light` && value !== `dark`) throw new Error(`Theme Preference Is Invalid`);
  return value;
}, preferenceLabel) : Promise.resolve(null);

export const saveThemePreference = (mode: ThemeMode) => useLocalStorage
  ? withStorageLock(preferenceKey, () => writeSnapshot(preferenceKey, mode, preferenceLabel))
  : Promise.resolve();
