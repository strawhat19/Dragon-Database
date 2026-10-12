import { getDragonFormName } from '../../shared/dragonForms';
import { dragonTypeIcons } from '../../shared/dragonTypeIcons';
import { getDragonTypeDisplayNumber, type DragonTypeRecord } from '../../shared/models/dragons/DragonType';

export const getDragonTypeCardContent = (type: DragonTypeRecord) => ({
  traits: type.traits.join(` · `),
  iconXml: dragonTypeIcons[type.kind],
  formName: getDragonFormName(type.kind),
  formNumber: String(getDragonTypeDisplayNumber(type.kind)).padStart(2, `0`),
});
