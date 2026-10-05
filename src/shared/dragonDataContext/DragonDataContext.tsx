import {
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
  createContext,
  type PropsWithChildren,
} from 'react';
import { dragonAPI } from '../../api/dragons';
import { errorMessage } from '../common/values';
import type { DragonTypeRecord } from '../models/dragons/DragonType';

export interface DragonDataContextValue {
  query: string;
  error: string | null;
  isHydrated: boolean;
  types: DragonTypeRecord[];
  reload: () => Promise<void>;
  setQuery: (query: string) => void;
  filteredTypes: DragonTypeRecord[];
}

export const DragonDataContext = createContext<DragonDataContextValue | undefined>(undefined);

export const DragonDataProvider = ({ children }: PropsWithChildren) => {
  const mounted = useRef(false);
  const dirtyQuery = useRef(false);
  const loadRevision = useRef(0);
  const queryRevision = useRef(0);
  const [query, updateQuery] = useState(``);
  const [isHydrated, setIsHydrated] = useState(false);
  const [saveAttempt, setSaveAttempt] = useState(0);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [types, setTypes] = useState<DragonTypeRecord[]>([]);

  const reload = useCallback(async () => {
    const currentLoad = ++loadRevision.current;
    setIsHydrated(false);
    const currentQuery = queryRevision.current;
    const [catalog, search] = await Promise.allSettled([dragonAPI.getDragonTypes(), dragonAPI.getSearchQuery()]);
    if (!mounted.current || currentLoad !== loadRevision.current) return;
    const errors: string[] = [];
    if (catalog.status === `fulfilled`) setTypes(catalog.value);
    else { setTypes([]); errors.push(errorMessage(catalog.reason)); }
    if (search.status === `fulfilled`) {
      if (!dirtyQuery.current && currentQuery === queryRevision.current) updateQuery(search.value);
    } else errors.push(errorMessage(search.reason));
    setLoadError(errors.length ? errors.join(`; `) : null);
    setIsHydrated(true);
    if (dirtyQuery.current) setSaveAttempt((current) => current + 1);
    if (errors.length) throw new Error(errors.join(`; `));
  }, []);

  useEffect(() => {
    mounted.current = true;
    void reload().catch(() => undefined);
    return () => { mounted.current = false; loadRevision.current += 1; };
  }, [reload]);

  const setQuery = useCallback((value: string) => {
    queryRevision.current += 1;
    dirtyQuery.current = true;
    updateQuery(value);
  }, []);

  useEffect(() => {
    if (!isHydrated || !dirtyQuery.current) return;
    const current = queryRevision.current;
    const timer = setTimeout(() => {
      void dragonAPI.saveSearchQuery(query).then(() => {
        if (mounted.current && current === queryRevision.current) { dirtyQuery.current = false; setSearchError(null); }
      }).catch((failure) => {
        if (mounted.current && current === queryRevision.current) setSearchError(errorMessage(failure));
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [query, isHydrated, saveAttempt]);

  const filteredTypes = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return types.filter((type) => {
      const text = [type.name, type.description, ...type.traits, ...type.searchTerms].join(` `).toLowerCase();
      return terms.every((term) => text.includes(term));
    });
  }, [types, query]);
  const error = [loadError, searchError].filter(Boolean).join(`; `) || null;
  const value = useMemo(() => ({ types, query, error, reload, setQuery, isHydrated, filteredTypes }), [types, query, error, reload, setQuery, isHydrated, filteredTypes]);
  return <DragonDataContext.Provider value={value}>{children}</DragonDataContext.Provider>;
};
