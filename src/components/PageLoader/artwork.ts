import { blackFlameXml, wordmarkSwordXml } from '../../shared/landingArtwork';

export const swordAspectRatio = 540 / 56;
export const flameAspectRatio = 200 / 280;
export const flameHeights = [1, 0.78, 0.94, 0.84, 1, 0.73, 0.9];
export const flameImageSource = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(blackFlameXml)}`;
export const swordImageSource = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(wordmarkSwordXml)}`;
