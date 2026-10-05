import { dataError } from './values';
import { storageVersion, useLocalStorage, storageNamespace } from '../config';
import { readValue, writeValue, removeValue, withBrowserLock } from './storageAdapter';

export { storageMode } from './storageAdapter';
const queues = new Map<string, Promise<unknown>>();
export const storageKey = (scope: string) => `${storageNamespace}:v${storageVersion}:${scope}`;

const requireStorage = () => {
  if (!useLocalStorage) throw new Error(`Connect A Data Service To Use This Operation`);
};

export const checkStorage = async () => {
  requireStorage();
  try {
    await readValue(storageKey(`health`));
  } catch {
    throw new Error(`Local Storage Is Unavailable`);
  }
};

export const withStorageLock = <T,>(key: string, operation: () => Promise<T>): Promise<T> => {
  const run = () => withBrowserLock(key, operation);
  const result = (queues.get(key) ?? Promise.resolve()).then(run, run);
  const settled = result.then(() => undefined, () => undefined);
  queues.set(key, settled);
  void settled.then(() => { if (queues.get(key) === settled) queues.delete(key); });
  return result;
};

export const readSnapshot = async <T,>(key: string, parse: (value: unknown) => T, label: string): Promise<T | null> => {
  requireStorage();
  let raw: string | null;
  try {
    raw = await readValue(key);
  } catch {
    throw new Error(`${label} Could Not Be Read From Device Storage`);
  }
  if (raw === null) return null;

  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    throw dataError(label);
  }
  return parse(value);
};

export const writeSnapshot = async (key: string, value: unknown, label: string) => {
  requireStorage();
  const serialized = JSON.stringify(value);
  if (serialized === undefined) throw new Error(`${label} Could Not Be Serialized`);
  try {
    await writeValue(key, serialized);
  } catch {
    throw new Error(`${label} Could Not Be Saved To Device Storage`);
  }
};

export const removeSnapshot = async (key: string, label: string) => {
  requireStorage();
  try {
    await removeValue(key);
  } catch {
    throw new Error(`${label} Could Not Be Removed From Device Storage`);
  }
};
