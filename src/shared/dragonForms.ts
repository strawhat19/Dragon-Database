import type { DragonKind } from '../types/types';

export const dragonFormKinds = [`dragon`, `wyvern`, `wyrm`, `leviathan`, `hydra`, `dragonoid`, `drake`, `eastern`, `amphiptere`] as const satisfies readonly DragonKind[];
export const dragonFormRoutes = {
  wyrm: { path: `/wyrms`, label: `Wyrms`, icon: `flame` },
  drake: { path: `/drakes`, label: `Drakes`, icon: `flame` },
  hydra: { path: `/hydras`, label: `Hydras`, icon: `flame` },
  dragon: { path: `/dragons`, label: `Dragons`, icon: `flame` },
  wyvern: { path: `/wyverns`, label: `Wyverns`, icon: `flame` },
  leviathan: { path: `/leviathans`, label: `Leviathans`, icon: `flame` },
  dragonoid: { path: `/dragonoids`, label: `Dragonoids`, icon: `flame` },
  amphiptere: { path: `/amphipteres`, label: `Amphipteres`, icon: `flame` },
  eastern: { path: `/eastern-dragons`, label: `Eastern`, icon: `flame` },
} as const satisfies Record<DragonKind, { path: `/${string}`; label: string; icon: `flame` }>;

export const getDragonFormName = (kind: DragonKind) => dragonFormRoutes[kind].label;
export const dragonFormPath = (kind: DragonKind) => dragonFormRoutes[kind].path;
export const isDragonFormKind = (value: unknown): value is DragonKind => dragonFormKinds.some(kind => kind === value);
export const resolveDragonFormKind = (path: string): DragonKind | undefined => {
  const normalizedPath = path.replace(/\/+$/, ``) || `/`;
  const canonicalKind = dragonFormKinds.find(kind => dragonFormPath(kind) === normalizedPath);
  if (canonicalKind) return canonicalKind;
  const legacyKind = normalizedPath.match(/^\/forms\/([^/]+)$/)?.[1];
  return isDragonFormKind(legacyKind) ? legacyKind : undefined;
};
export const resolveDragonFormName = (path: string) => {
  const kind = resolveDragonFormKind(path);
  return kind ? getDragonFormName(kind) : undefined;
};
