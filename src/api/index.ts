import { useLocalStorage } from '../shared/config';
import { errorMessage } from '../shared/common/values';
import { storageKey, storageMode, checkStorage } from '../shared/common/storage';
import { readCollection } from '../shared/common/collection';
import { parseVisit } from '../shared/models/visits/Visit';
import { userScope } from '../shared/authentication/userScope';
import { parseNotification } from '../shared/models/notifications/Notification';
import { hydrateSession, getPublicUsers } from '../shared/authentication/service';
import { getDragonTypes, getSearchQuery, saveSearchQuery } from './dragons';

export { authAPI } from './auth';
export { dragonAPI } from './dragons';
export { getDragonTypes, getSearchQuery, saveSearchQuery } from './dragons';

export const capabilities = [
  { path: `/api`, operation: `getDirectory`, scope: `public` },
  { path: `/api/health`, operation: `getHealth`, scope: `public` },
  { path: `/api/status`, operation: `getStatus`, scope: `public` },
  { path: `/api/users`, operation: `getUsers`, scope: `public-profiles` },
  { path: `/api/visits`, operation: `getVisits`, scope: `public` },
  { path: `/api/dragon-types`, operation: `getDragonTypes`, scope: `public` },
  { path: `/api/notifications`, operation: `getNotifications`, scope: `account` },
  { path: `/api/search-query`, operation: `getSearchQuery / saveSearchQuery`, scope: `device` },
  { path: `/api/auth`, operation: `hydrateSession / signInWithGoogleMock / signOut`, scope: `local-demo` },
] as const;

export const getHealth = async () => {
  let error: string | null = null;
  try { await checkStorage(); } catch (failure) { error = errorMessage(failure); }
  return {
    error,
    success: error === null,
    title: `Dragon Database Local API`,
    timestamp: new Date().toISOString(),
    storageMode: useLocalStorage ? storageMode : `connection-needed`,
    message: error ?? `Local Asynchronous Services. No Backend Or Google OAuth Is Connected`,
  };
};

export const getStatus = getHealth;
export const getDirectory = async () => ({ ...await getHealth(), capabilities });
export const getUsers = getPublicUsers;
export const getVisits = async () => (await readCollection(storageKey(`visits`), parseVisit, `Saved Visits`))?.records ?? [];

export const getNotifications = async () => {
  const session = await hydrateSession();
  if (!session) return [];
  return (await readCollection(userScope(session.user.id, `notifications`), parseNotification, `Saved Notifications`))?.records ?? [];
};

export const api = { getUsers, getVisits, getHealth, getStatus, getDirectory, getDragonTypes, getNotifications, getSearchQuery, saveSearchQuery };
