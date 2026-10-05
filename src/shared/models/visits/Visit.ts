import { Types } from '../../../types/types';
import { isRecord, dataError } from '../../common/values';
import { Data, parseData, type DataRecord } from '../Data';

export interface VisitRecord extends DataRecord { path: string; }
export class Visit extends Data {
  path: string;
  constructor(record: VisitRecord) { super(record); this.path = record.path; }
  toRecord(): VisitRecord { return { ...super.toRecord(), path: this.path }; }
}

export const parseVisit = (value: unknown): VisitRecord => {
  const data = parseData(value, Types.Visit, `Saved Visits`);
  if (!isRecord(value) || typeof value.path !== `string` || !value.path.startsWith(`/`)) throw dataError(`Saved Visits`);
  return new Visit({ ...data, path: value.path }).toRecord();
};

