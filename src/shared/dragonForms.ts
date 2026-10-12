import type { DragonKind } from '../types/types';

export const dragonFormKinds = [`dragon`, `wyvern`, `drake`, `wyrm`, `amphiptere`, `leviathan`, `dragonoid`, `hydra`, `eastern`] as const satisfies readonly DragonKind[];
const dragonFormNames: Record<DragonKind, string> = {
  dragon: `Dragon`,
  wyvern: `Wyvern`,
  drake: `Drake`,
  wyrm: `Wyrm`,
  amphiptere: `Amphiptere`,
  leviathan: `Leviathan`,
  dragonoid: `Dragonoid`,
  hydra: `Hydra`,
  eastern: `Eastern Dragon`,
};
export const getDragonFormName = (kind: DragonKind) => dragonFormNames[kind];
export const dragonFormPath = (kind: DragonKind) => `/forms/${kind}` as const;
export const isDragonFormKind = (value: unknown): value is DragonKind => dragonFormKinds.some(kind => kind === value);
export const resolveDragonFormName = (path: string) => {
  const kind = path.match(/^\/forms\/([^/]+)\/?$/)?.[1];
  return isDragonFormKind(kind) ? getDragonFormName(kind) : undefined;
};
