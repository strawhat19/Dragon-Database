import * as Crypto from 'expo-crypto';
import { isIsoDate } from './values';
import { Types } from '../../types/types';

export const matchesRecordId = (id: unknown, type: Types, number: unknown): id is string =>
  typeof id === `string` && Number.isSafeInteger(number) && Number(number) > 0
  && new RegExp(`^${type}_${number}_[A-Za-z0-9-]+_\\d{4}-\\d{2}-\\d{2}_[a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$`, `i`).test(id);

export const createRecordId = async (type: Types, number: number, name: string, date: string) => {
  if (!Number.isSafeInteger(number) || number < 1 || !isIsoDate(date)) {
    throw new Error(`Record Identity Is Invalid`);
  }

  const bytes = await Crypto.getRandomBytesAsync(16);
  bytes[6] = (bytes[6]! & 0x0f) | 0x40;
  bytes[8] = (bytes[8]! & 0x3f) | 0x80;
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, `0`)).join(``);
  const uuid = `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  const label = name.normalize(`NFKD`).replace(/[^a-z\d]+/gi, `-`).replace(/^-|-$/g, ``) || `Record`;
  return `${type}_${number}_${label}_${date.slice(0, 10)}_${uuid}`;
};
