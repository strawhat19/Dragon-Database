import { Types } from '../../types/types';
import { storageKey } from '../common/storage';
import { matchesRecordId } from '../common/ids';

export const isUserId = (value: unknown): value is string => {
  if (typeof value !== `string`) return false;
  const number = Number(/^User_(\d+)_/.exec(value)?.[1]);
  return matchesRecordId(value, Types.User, number);
};

export const userScope = (userId: string, scope: string) => {
  if (!isUserId(userId)) throw new Error(`Account Identity Is Invalid`);
  return storageKey(`account:${userId}:${scope}`);
};

