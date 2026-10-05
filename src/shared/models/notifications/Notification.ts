import { Types } from '../../../types/types';
import { isRecord, dataError } from '../../common/values';
import { Data, parseData, type DataRecord } from '../Data';

export interface NotificationRecord extends DataRecord {
  read: boolean;
  message: string;
}

export class Notification extends Data {
  read: boolean;
  message: string;
  constructor(record: NotificationRecord) { super(record); this.read = record.read; this.message = record.message; }
  toRecord(): NotificationRecord { return { ...super.toRecord(), read: this.read, message: this.message }; }
}

export const parseNotification = (value: unknown): NotificationRecord => {
  const data = parseData(value, Types.Notification, `Saved Notifications`);
  if (!isRecord(value) || typeof value.read !== `boolean` || typeof value.message !== `string`) throw dataError(`Saved Notifications`);
  return new Notification({ ...data, read: value.read, message: value.message }).toRecord();
};

