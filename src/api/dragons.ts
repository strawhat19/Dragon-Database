import { useSampleData } from '../shared/config';
import { isRecord, dataError } from '../shared/common/values';
import { parseCollection, type CollectionSnapshot } from '../shared/common/collection';
import { parseDragonType, type DragonTypeRecord } from '../shared/models/dragons/DragonType';
import { storageKey, readSnapshot, writeSnapshot, withStorageLock } from '../shared/common/storage';
import {
  sampleDragonTypes,
  createSampleDragonType,
  isOriginalSampleCatalogue,
  sampleDragonTypesRevision,
  additionalSampleDragonTypes,
} from '../shared/models/dragons/sampleDragonTypes';

export const dragonTypesStorageKey = storageKey(`dragon-types`);
export const searchQueryStorageKey = storageKey(`search-query`);

interface DragonTypeSnapshot extends CollectionSnapshot<DragonTypeRecord> {
  demoRevision?: number;
}

const parseDragonTypesSnapshot = (value: unknown): DragonTypeSnapshot => {
  const snapshot = parseCollection(value, parseDragonType, `Saved Dragon Types`);
  if (!isRecord(value)) throw dataError(`Saved Dragon Types`);
  if (value.demoRevision === undefined) return snapshot;
  if (!Number.isSafeInteger(value.demoRevision) || Number(value.demoRevision) < 1) throw dataError(`Saved Dragon Types`);
  return { ...snapshot, demoRevision: Number(value.demoRevision) };
};

const parseSearch = (value: unknown) => {
  if (!isRecord(value) || value.version !== 1 || typeof value.query !== `string`) throw dataError(`Saved Search`);
  return value.query;
};

export const getDragonTypes = () => withStorageLock(dragonTypesStorageKey, async () => {
  const saved = await readSnapshot(dragonTypesStorageKey, parseDragonTypesSnapshot, `Saved Dragon Types`);
  if (saved !== null) {
    if (!useSampleData || !saved.records.length || (saved.demoRevision ?? 0) >= sampleDragonTypesRevision
      || (saved.demoRevision === undefined && !isOriginalSampleCatalogue(saved.records))) return saved.records;

    // Mark the demo update once so a later removal stays removed.
    const missing = additionalSampleDragonTypes.filter((sample) => !saved.records.some((record) => record.kind === sample.kind));
    const nextNumber = saved.nextNumber + missing.length;
    if (!Number.isSafeInteger(nextNumber)) throw new Error(`Dragon Type Number Limit Reached`);
    const created = new Date().toISOString();
    const additions = await Promise.all(missing.map((sample, index) => createSampleDragonType(sample, saved.nextNumber + index, created)));
    const records = [...saved.records, ...additions];
    await writeSnapshot(dragonTypesStorageKey, { version: 1, records, nextNumber, demoRevision: sampleDragonTypesRevision }, `Dragon Types`);
    return records;
  }

  const records = useSampleData ? await sampleDragonTypes() : [];
  const snapshot: DragonTypeSnapshot = { version: 1, records, nextNumber: records.length + 1 };
  if (useSampleData) snapshot.demoRevision = sampleDragonTypesRevision;
  await writeSnapshot(dragonTypesStorageKey, snapshot, `Dragon Types`);
  return records;
});

export const getSearchQuery = () => withStorageLock(searchQueryStorageKey, async () =>
  await readSnapshot(searchQueryStorageKey, parseSearch, `Saved Search`) ?? ``);

export const saveSearchQuery = (query: string) => withStorageLock(searchQueryStorageKey, async () => {
  if (typeof query !== `string`) throw new Error(`Search Query Must Be Text`);
  await readSnapshot(searchQueryStorageKey, parseSearch, `Saved Search`);
  await writeSnapshot(searchQueryStorageKey, { version: 1, query }, `Search Query`);
});

export const dragonAPI = { getDragonTypes, getSearchQuery, saveSearchQuery };
