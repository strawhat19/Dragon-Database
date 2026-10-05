import type { dragonSymbols } from '../../shared/artwork';

type AboutValue = {
  id: string;
  title: string;
  kind: keyof typeof dragonSymbols;
  description: string;
};

export const aboutIntroduction = [
  `Dragon Database brings dragon forms, defining traits, and their lore into one focused place to explore. The Scaling Collection starts with familiar silhouettes and invites a closer look at their differences and the stories behind them.`,
];

export const aboutValues: AboutValue[] = [
  {
    id: `forms`,
    title: `Forms`,
    kind: `wyvern`,
    description: `Start with the shape: wings, limbs, and the outline of the body. A clear silhouette makes a useful first comparison.`,
  },
  {
    id: `traits`,
    title: `Traits`,
    kind: `wyrm`,
    description: `Look at the details that distinguish one dragon form from another, from its movement to its defining features.`,
  },
  {
    id: `lore`,
    title: `Lore`,
    kind: `drake`,
    description: `Consider the stories behind each form. Different tellings can give a familiar creature a different character.`,
  },
];

export const aboutContact = {
  title: `Help shape the collection`,
  description: `Share a question, a correction, or an idea for Dragon Database.`,
};
