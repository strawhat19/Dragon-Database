import { Types, type DragonKind } from '../../../types/types';
import { isRecord, dataError } from '../../common/values';
import { Data, parseData, type DataRecord } from '../Data';

export interface DragonTypeRecord extends DataRecord {
  kind: DragonKind;
  traits: string[];
  description: string;
  searchTerms: string[];
}

export class DragonType extends Data {
  kind: DragonKind;
  traits: string[];
  description: string;
  searchTerms: string[];

  constructor(record: DragonTypeRecord) {
    super(record);
    this.kind = record.kind;
    this.traits = [...record.traits];
    this.description = record.description;
    this.searchTerms = [...record.searchTerms];
  }

  toRecord(): DragonTypeRecord {
    return { ...super.toRecord(), kind: this.kind, traits: [...this.traits], description: this.description, searchTerms: [...this.searchTerms] };
  }
}

export const parseDragonType = (value: unknown): DragonTypeRecord => {
  const data = parseData(value, Types.DragonType, `Saved Dragon Types`);
  if (!isRecord(value) || ![`wyrm`, `drake`, `wyvern`, `dragon`, `leviathan`, `dragonoid`, `amphiptere`].includes(String(value.kind))
    || typeof value.description !== `string` || !Array.isArray(value.traits) || !Array.isArray(value.searchTerms)
    || !value.traits.every((item) => typeof item === `string`) || !value.searchTerms.every((item) => typeof item === `string`)) {
    throw dataError(`Saved Dragon Types`);
  }
  return new DragonType({ ...data, kind: value.kind as DragonKind, traits: value.traits, description: value.description, searchTerms: value.searchTerms }).toRecord();
};
