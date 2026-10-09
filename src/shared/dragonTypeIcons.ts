import { dragonSymbols } from './artwork';
import type { DragonKind } from '../types/types';
import { palette } from '../styles/theme/theme';
import { dragonTypeGraphics } from './landingArtwork';

const originalMetadata = `<metadata>Original Dragon Database vector artwork. Simplified dragon form silhouette.</metadata>`;

const createIcon = (kind: DragonKind, viewBox: string, paths: string, metadata = originalMetadata) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="none"><title>${kind[0].toUpperCase()}${kind.slice(1)} dragon form icon</title>${metadata}<g id="${kind}-form-icon" class="dragon-form-icon dragon-form-icon-${kind}">${paths}</g></svg>`;

const silhouetteIcon = (kind: DragonKind, markup: string, viewBox: string, pathIds?: string[]) => {
  const paths = (markup.match(/<path\b[^>]*\/>/g) ?? [])
    .filter((path) => pathIds
      ? pathIds.includes(path.match(/\bid="([^"]+)"/)?.[1] ?? ``)
      : !path.includes(`#d8dde4`))
    .map((path, index) => path
      .replace(/\s+id="[^"]+"/, ``)
      .replace(`<path`, `<path id="${kind}-form-icon-path-${index}"`)
      .replace(/\b(fill|stroke)="(?!none")[^"]+"/g, (_, attribute: string) => `${attribute}="${palette.red}"`))
    .join(``);

  return createIcon(kind, viewBox, paths, markup.match(/<metadata>[\s\S]*?<\/metadata>/)?.[0] ?? originalMetadata);
};

const hydraIcon = createIcon(`hydra`, `0 0 172 116`, `
  <path id="hydra-form-icon-body" fill="${palette.red}" d="M58 80C55 68 70 61 92 66L112 70L116 83L107 94L80 93L55 88C32 90 16 83 9 68C22 79 39 80 58 80Z" />
  <path id="hydra-form-icon-left-head" fill="${palette.red}" d="M70 74C68 59 58 59 51 48L50 38L39 35L33 25L32 38L23 42L25 49L40 53C44 66 46 76 61 83Z" />
  <path id="hydra-form-icon-middle-head" fill="${palette.red}" d="M79 72C82 51 73 48 76 34L77 27L72 16L83 20L90 9L90 25L106 30L111 39L97 42L89 40C88 51 98 61 93 75Z" />
  <path id="hydra-form-icon-right-head" fill="${palette.red}" d="M101 79C113 67 105 57 113 49L119 42L117 27L129 35L138 22L138 39L154 45L161 53L146 58L134 55C130 63 133 80 116 89Z" />
  <path id="hydra-form-icon-four-legs" fill="${palette.red}" d="M56 82L48 100H59L70 90ZM66 84L61 105H75L80 91ZM84 88L86 107H101L96 90ZM108 84L122 102H137L123 90L119 80Z" />
`);

const easternIcon = createIcon(`eastern`, `0 0 180 124`, `
  <path id="eastern-form-icon-coiling-body" fill="none" stroke="${palette.red}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" d="M143 42C116 29 95 41 106 59C126 83 95 105 71 84C50 63 72 39 53 32C32 22 17 44 24 62C30 81 50 85 53 100C56 114 25 114 11 102" />
  <path id="eastern-form-icon-horned-head" fill="${palette.red}" d="M132 41L133 28L127 19L138 23L141 13L146 29L156 30L169 40L160 47L149 48L144 58L138 49Z" />
  <path id="eastern-form-icon-four-legs" fill="${palette.red}" d="M121 48L125 68L143 76V85L134 79L130 84L124 76L112 59ZM119 68L137 59L149 62L157 68L146 67L149 75L137 69L124 80ZM62 46L79 31H94L90 37L95 43L83 39L71 56ZM48 72L35 88L21 85L14 91L21 93L19 100L32 96L47 88L57 77Z" />
  <path id="eastern-form-icon-whiskers" fill="none" stroke="${palette.red}" stroke-width="4" stroke-linecap="round" d="M157 42C169 36 168 31 174 28M158 46C171 48 174 54 174 61" />
`);

export const dragonTypeIcons: Record<DragonKind, string> = {
  wyrm: silhouetteIcon(`wyrm`, dragonSymbols.wyrm, `4 6 180 88`),
  drake: silhouetteIcon(`drake`, dragonSymbols.drake, `7 16 178 80`),
  hydra: hydraIcon,
  dragon: silhouetteIcon(`dragon`, dragonTypeGraphics.dragon, `31 15 325 200`, [
    `dragon-body`,
    `dragon-head`,
    `dragon-legs`,
    `dragon-far-wing`,
    `dragon-near-wing`,
  ]),
  wyvern: silhouetteIcon(`wyvern`, dragonSymbols.wyvern, `10 8 170 92`),
  eastern: easternIcon,
  dragonoid: silhouetteIcon(`dragonoid`, dragonTypeGraphics.dragonoid, `61 23 278 197`, [
    `dragonoid-arms`,
    `dragonoid-legs`,
    `dragonoid-tail`,
    `dragonoid-torso`,
    `dragonoid-left-wing`,
    `dragonoid-right-wing`,
    `dragonoid-horned-head`,
  ]),
  leviathan: silhouetteIcon(`leviathan`, dragonTypeGraphics.leviathan, `17 53 336 167`, [
    `leviathan-body`,
    `leviathan-fins`,
    `leviathan-head`,
    `leviathan-dorsal-crest`,
  ]),
  amphiptere: silhouetteIcon(`amphiptere`, dragonTypeGraphics.amphiptere, `26 14 313 214`, [
    `amphiptere-body`,
    `amphiptere-head`,
    `amphiptere-tail`,
    `amphiptere-left-wing`,
    `amphiptere-right-wing`,
  ]),
};
