import { steelTextureXml } from './artwork';

const blackSteelColors: Record<string, string> = {
  '#aab3bf': `#0b0c10`,
  '#e1e5ea': `#272c32`,
  '#f3f4f6': `#30343b`,
  '#bac3ce': `#15191f`,
  '#d6dce4': `#111318`,
  '#a2adb9': `#11151a`,
  '#67717d': `#d1d8df`,
  '#f4f6f8': `#747e89`,
};

export const blackSteelTextureXml = steelTextureXml.replace(/#[\da-f]{6}/gi, color => blackSteelColors[color.toLowerCase()] ?? color);
