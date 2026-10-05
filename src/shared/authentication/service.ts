import { isUserId, userScope } from './userScope';
import { createRecordId } from '../common/ids';
import { isRecord, isIsoDate, dataError } from '../common/values';
import { Types, Providers, ProfilePrivacy } from '../../types/types';
import { mockSessionDuration } from '../config';
import { emptyCollection, readCollection } from '../common/collection';
import { User, parseUser, publicUser } from '../models/users/User';
import type { MockSession, MockGoogleProfile, AuthenticationResult } from './types';
import { storageKey, readSnapshot, writeSnapshot, removeSnapshot, withStorageLock } from '../common/storage';

export const usersStorageKey = storageKey(`users`);
export const activeSessionKey = storageKey(`auth:active-account`);
const authLockKey = storageKey(`auth:operations`);

const parseActiveAccount = (value: unknown) => {
  if (!isRecord(value) || value.version !== 1 || !isUserId(value.userId)) throw dataError(`Saved Demo Session`);
  return value.userId;
};

const parseSession = (value: unknown): MockSession => {
  if (!isRecord(value) || value.version !== 1 || value.demo !== true || !isUserId(value.userId)
    || value.provider !== Providers.GoogleMock || !isIsoDate(value.createdAt)
    || !Number.isSafeInteger(value.expiresAt) || Number(value.expiresAt) <= Date.parse(value.createdAt)) {
    throw dataError(`Saved Demo Session`);
  }
  return { demo: true, version: 1, userId: value.userId, createdAt: value.createdAt, expiresAt: Number(value.expiresAt), provider: Providers.GoogleMock };
};

const readUsers = async () => {
  const snapshot = await readCollection(usersStorageKey, parseUser, `Saved Users`) ?? emptyCollection<ReturnType<typeof parseUser>>();
  const emails = new Set(snapshot.records.map((user) => user.email.trim().toLowerCase()));
  if (emails.size !== snapshot.records.length) throw dataError(`Saved Users`);
  return snapshot;
};

const readAccountSession = async (userId: string) => {
  const session = await readSnapshot(userScope(userId, `mock-session`), parseSession, `Saved Demo Session`);
  if (session && session.userId !== userId) throw dataError(`Saved Demo Session`);
  return session;
};

const restore = async (): Promise<AuthenticationResult | null> => {
  const userId = await readSnapshot(activeSessionKey, parseActiveAccount, `Saved Demo Session`);
  if (userId === null) return null;
  const session = await readAccountSession(userId);
  if (!session) throw new Error(`The Saved Demo Session Is Missing. Saved Account Data Was Preserved`);
  if (session.expiresAt <= Date.now()) {
    await removeSnapshot(userScope(userId, `mock-session`), `Expired Demo Session`);
    await removeSnapshot(activeSessionKey, `Expired Demo Session`);
    return null;
  }
  const user = (await readUsers()).records.find((record) => record.id === userId);
  if (!user) throw new Error(`The Saved Demo Account Is Missing. Saved Data Was Preserved`);
  return { user, expiresAt: session.expiresAt };
};

export const hydrateSession = () => withStorageLock(authLockKey, restore);

export const signInWithGoogleMock = (profile: MockGoogleProfile = {}): Promise<AuthenticationResult> => withStorageLock(authLockKey, async () => {
  const previous = await restore();
  const name = (profile.name ?? `Local Explorer`).trim().replace(/\s+/g, ` `);
  const email = (profile.email ?? `explorer@local.demo`).trim().toLowerCase();
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    || (profile.photoURL !== undefined && !/^https:\/\//i.test(profile.photoURL))) {
    throw new Error(`Enter A Valid Demo Name And Email`);
  }

  const snapshot = await readUsers();
  const existing = snapshot.records.find((record) => record.email.trim().toLowerCase() === email);
  const created = new Date().toISOString();
  const record = new User(existing ? { ...existing, name, updated: created, ...(profile.photoURL === undefined ? {} : { photoURL: profile.photoURL }) } : {
    name,
    email,
    created,
    updated: created,
    photoURL: profile.photoURL,
    number: snapshot.nextNumber,
    id: await createRecordId(Types.User, snapshot.nextNumber, name, created),
  }).toRecord();
  await readAccountSession(record.id);
  const session: MockSession = { demo: true, version: 1, userId: record.id, createdAt: created, expiresAt: Date.now() + mockSessionDuration, provider: Providers.GoogleMock };
  const records = existing ? snapshot.records.map((item) => item.id === record.id ? record : item) : [...snapshot.records, record];
  await writeSnapshot(usersStorageKey, { version: 1, records, nextNumber: existing ? snapshot.nextNumber : record.number + 1 }, `Saved Users`);
  await writeSnapshot(userScope(record.id, `mock-session`), session, `Demo Session`);
  await writeSnapshot(activeSessionKey, { version: 1, userId: record.id }, `Active Demo Account`);
  if (previous && previous.user.id !== record.id) await removeSnapshot(userScope(previous.user.id, `mock-session`), `Previous Demo Session`);
  return { user: record, expiresAt: session.expiresAt };
});

export const signOut = () => withStorageLock(authLockKey, async () => {
  const userId = await readSnapshot(activeSessionKey, parseActiveAccount, `Saved Demo Session`);
  if (userId === null) return;
  await readAccountSession(userId);
  await removeSnapshot(userScope(userId, `mock-session`), `Demo Session`);
  await removeSnapshot(activeSessionKey, `Active Demo Account`);
});

export const getPublicUsers = async () => (await readUsers()).records
  .filter((user) => user.profilePrivacy === ProfilePrivacy.Public && user.publicSharing)
  .map(publicUser);

