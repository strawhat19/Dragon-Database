import type { DataRecord } from '../models/Data';
import { isRecord, dataError } from './values';
import { readSnapshot } from './storage';

export interface CollectionSnapshot<T extends DataRecord> {
  version: 1;
  records: T[];
  nextNumber: number;
}

export const emptyCollection = <T extends DataRecord>(): CollectionSnapshot<T> => ({ version: 1, records: [], nextNumber: 1 });

export const parseCollection = <T extends DataRecord>(value: unknown, parse: (record: unknown) => T, label: string): CollectionSnapshot<T> => {
  if (!isRecord(value) || value.version !== 1 || !Array.isArray(value.records)
    || !Number.isSafeInteger(value.nextNumber) || Number(value.nextNumber) < 1) throw dataError(label);
  const records = value.records.map(parse);
  const ids = new Set(records.map((record) => record.id));
  const numbers = new Set(records.map((record) => record.number));
  if (ids.size !== records.length || numbers.size !== records.length
    || records.some((record) => record.number >= Number(value.nextNumber))) throw dataError(label);
  return { version: 1, records, nextNumber: Number(value.nextNumber) };
};

export const readCollection = <T extends DataRecord>(key: string, parse: (record: unknown) => T, label: string) =>
  readSnapshot(key, (value) => parseCollection(value, parse, label), label);

