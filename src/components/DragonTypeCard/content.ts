import { getDragonTypeDisplayNumber, type DragonTypeRecord } from '../../shared/models/dragons/DragonType';

export const getDragonTypeCardContent = (type: DragonTypeRecord) => ({
  traits: type.traits.join(` · `),
  form: `Form ${String(getDragonTypeDisplayNumber(type.kind)).padStart(2, `0`)}`,
});
