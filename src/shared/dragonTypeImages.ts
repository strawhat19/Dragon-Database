import type { DragonKind } from '../types/types';
import type { ImageRequireSource } from 'react-native';

type DragonTypeImage = {
  alt: string;
  hoverAlt: string;
  source: ImageRequireSource;
  hoverSource: ImageRequireSource;
};

export const dragonTypeImages: Record<DragonKind, DragonTypeImage> = {
  dragon: {
    source: require('../../assets/dragons/storybook/dragon-fire.png'),
    hoverSource: require('../../assets/dragons/storybook/dragon-emerald-scene.png'),
    alt: `An indigo dragon with ruby wings breathing a powerful orange-gold fire jet over dawn mountains`,
    hoverAlt: `A ferocious platinum dragon with scarlet wings lunging above a deep emerald waterfall gorge`,
  },
  wyvern: {
    source: require('../../assets/dragons/storybook/wyvern-soaring.png'),
    hoverSource: require('../../assets/dragons/storybook/wyvern-fury-alternate.png'),
    alt: `An enormous emerald-black two-legged wyvern soaring with spread wings through pale coral-blue clouds`,
    hoverAlt: `An ivory and blue-steel wyvern diving with extended talons through an amber autumn forest canyon`,
  },
  drake: {
    source: require('../../assets/dragons/storybook/drake-focused.png'),
    hoverSource: require('../../assets/dragons/storybook/drake-fury.png'),
    alt: `An ivory, four-legged, wingless drake keeping watch in a deep green pine forest`,
    hoverAlt: `A ferocious coal-blue and bronze wingless drake charging through a golden canyon with bared fangs`,
  },
  wyrm: {
    source: require('../../assets/dragons/storybook/wyrm-fury.png'),
    hoverSource: require('../../assets/dragons/storybook/wyrm-fury-alternate.png'),
    alt: `A black-violet and acid-gold armored legless wyrm lunging through pale ochre desert ruins`,
    hoverAlt: `An ice-blue and ivory saber-fanged wyrm striking through a deep emerald flooded cavern`,
  },
  amphiptere: {
    source: require('../../assets/dragons/storybook/amphiptere-moonstorm.png'),
    hoverSource: require('../../assets/dragons/storybook/amphiptere-fury-alternate.png'),
    alt: `A black-plum and silver horned serpent with silver-ivory feathered wings rising above a moonlit indigo gorge`,
    hoverAlt: `A navy and bronze legless serpent with jagged bat wings diving above a snowy mountain temple`,
  },
  leviathan: {
    source: require('../../assets/dragons/storybook/leviathan-jade.png'),
    hoverSource: require('../../assets/dragons/storybook/leviathan-fury.png'),
    alt: `A jade and turquoise finned leviathan with silver ventral scales snarling beneath a violet-gold coastal sunset`,
    hoverAlt: `A vermillion and pearl-ivory finned leviathan breaching a dark stormy sea with a furious fang-lined snarl`,
  },
  dragonoid: {
    source: require('../../assets/dragons/storybook/dragonoid-draconic-alternate.png'),
    hoverSource: require('../../assets/dragons/storybook/dragonoid-battlewear-alternate.png'),
    alt: `An obsidian and crimson winged dragonoid with a reptilian muzzle and swept horns wearing leather battlewear on an icy moonlit cliff`,
    hoverAlt: `An ivory and indigo winged dragonoid warrior wearing fitted leather shorts, a belt and chest harness in an ember-lit ruined temple`,
  },
  hydra: {
    source: require('../../assets/dragons/storybook/hydra-fury.png'),
    hoverSource: require('../../assets/dragons/storybook/hydra-sandstorm-alternate.png'),
    alt: `A ferocious five-headed cobalt and crimson hydra with four legs and broad wings on a misty swamp causeway`,
    hoverAlt: `An onyx and emerald three-headed winged hydra with brass crown horns attacking through golden desert sandstorm ruins`,
  },
  eastern: {
    source: require('../../assets/dragons/storybook/eastern-focused.png'),
    hoverSource: require('../../assets/dragons/storybook/eastern-encounter.png'),
    alt: `A peaceful ivory and silver Eastern dragon floating above a deep crimson canyon`,
    hoverAlt: `An obsidian and emerald Eastern dragon with golden whiskers coiling through an autumn bamboo river`,
  },
};
