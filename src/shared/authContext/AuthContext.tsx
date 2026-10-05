import {
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
  createContext,
  type PropsWithChildren,
} from 'react';
import { AppState } from 'react-native';
import { authAPI, type MockGoogleProfile } from '../../api/auth';
import { errorMessage } from '../common/values';
import type { UserRecord } from '../models/users/User';
import type { AuthenticationResult } from '../authentication/types';
import { activeSessionKey, usersStorageKey } from '../authentication/service';

export interface AuthContextValue {
  user: UserRecord | null;
  error: string | null;
  isHydrated: boolean;
  signOut: () => Promise<void>;
  signInWithGoogleMock: (profile?: MockGoogleProfile) => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const mounted = useRef(false);
  const revision = useRef(0);
  const [user, setUser] = useState<UserRecord | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);

  const apply = useCallback((result: AuthenticationResult | null) => {
    setUser(result?.user ?? null);
    setExpiresAt(result?.expiresAt ?? null);
  }, []);

  const hydrate = useCallback(async () => {
    const current = ++revision.current;
    try {
      const result = await authAPI.hydrateSession();
      if (mounted.current && current === revision.current) { apply(result); setError(null); }
    } catch (failure) {
      if (mounted.current && current === revision.current) { apply(null); setError(errorMessage(failure)); }
    } finally {
      if (mounted.current && current === revision.current) setIsHydrated(true);
    }
  }, [apply]);

  useEffect(() => {
    mounted.current = true;
    void hydrate();
    const resume = () => { void hydrate(); };
    const sync = (event: StorageEvent) => {
      if (event.key === null || event.key === activeSessionKey || event.key === usersStorageKey || event.key.endsWith(`:mock-session`)) resume();
    };
    const subscription = AppState.addEventListener(`change`, (state) => { if (state === `active`) resume(); });
    if (typeof window !== `undefined`) {
      window.addEventListener(`focus`, resume);
      window.addEventListener(`storage`, sync);
    }
    return () => {
      mounted.current = false;
      revision.current += 1;
      subscription.remove();
      if (typeof window !== `undefined`) {
        window.removeEventListener(`focus`, resume);
        window.removeEventListener(`storage`, sync);
      }
    };
  }, [hydrate]);

  useEffect(() => {
    if (expiresAt === null) return;
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      const remaining = expiresAt - Date.now();
      if (remaining <= 0) { void hydrate(); return; }
      timer = setTimeout(schedule, Math.min(remaining, 2_147_483_647));
    };
    schedule();
    return () => clearTimeout(timer);
  }, [expiresAt, hydrate]);

  const signInWithGoogleMock = useCallback(async (profile?: MockGoogleProfile) => {
    if (!isHydrated) throw new Error(`Please Wait While The Demo Session Loads`);
    const current = ++revision.current;
    setError(null);
    try {
      const result = await authAPI.signInWithGoogleMock(profile);
      if (mounted.current && current === revision.current) apply(result);
    } catch (failure) {
      if (mounted.current && current === revision.current) { apply(null); setError(errorMessage(failure)); }
      throw failure;
    }
  }, [apply, isHydrated]);

  const signOut = useCallback(async () => {
    if (!isHydrated) throw new Error(`Please Wait While The Demo Session Loads`);
    const current = ++revision.current;
    apply(null);
    setError(null);
    try {
      await authAPI.signOut();
    } catch (failure) {
      if (mounted.current && current === revision.current) setError(errorMessage(failure));
      throw failure;
    }
  }, [apply, isHydrated]);

  const value = useMemo(() => ({ user, error, signOut, isHydrated, signInWithGoogleMock }), [user, error, signOut, isHydrated, signInWithGoogleMock]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
