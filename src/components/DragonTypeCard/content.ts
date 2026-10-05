import type { DragonTypeRecord } from '../../shared/models/dragons/DragonType';

export const getDragonTypeCardContent = (type: DragonTypeRecord) => ({
  traits: type.traits.join(` · `),
  specimen: `Specimen ${String(type.number).padStart(2, `0`)}`,
});
