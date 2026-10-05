import { Types } from '../../types/types';
import { matchesRecordId } from '../common/ids';
import { isRecord, isIsoDate, dataError } from '../common/values';

export interface DataRecord {
  id: string;
  name: string;
  number: number;
  created: string;
  updated: string;
}

export const parseData = (value: unknown, type: Types, label: string): DataRecord => {
  if (!isRecord(value) || !matchesRecordId(value.id, type, value.number)
    || typeof value.name !== `string` || !value.name.trim()
    || !isIsoDate(value.created) || !isIsoDate(value.updated)) throw dataError(label);
  return {
    id: value.id,
    name: value.name,
    number: Number(value.number),
    created: value.created,
    updated: value.updated,
  };
};

export class Data {
  id: string;
  name: string;
  number: number;
  created: string;
  updated: string;

  constructor(record: DataRecord) {
    this.id = record.id;
    this.name = record.name;
    this.number = record.number;
    this.created = record.created;
    this.updated = record.updated;
  }

  toRecord(): DataRecord {
    return { id: this.id, name: this.name, number: this.number, created: this.created, updated: this.updated };
  }
}

