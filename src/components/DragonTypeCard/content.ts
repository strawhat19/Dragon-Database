import { dragonTypeIcons } from '../../shared/dragonTypeIcons';
import { getDragonTypeDisplayNumber, type DragonTypeRecord } from '../../shared/models/dragons/DragonType';

export const getDragonTypeCardContent = (type: DragonTypeRecord) => ({
  iconXml: dragonTypeIcons[type.kind],
  traits: type.traits.join(` · `),
  formNumber: String(getDragonTypeDisplayNumber(type.kind)).padStart(2, `0`),
});
