import { Linking } from 'react-native';
import { usePathname } from 'expo-router';
import { dragonAPI } from '../../api/dragons';
import type { DragonKind } from '../../types/types';
import { useState, useEffect, useCallback } from 'react';
import { errorMessage } from '../../shared/common/values';
import { resolveDragonFormKind } from '../../shared/dragonForms';
import type { DragonFormDetail, DragonFormArtwork } from '../../shared/models/dragons/DragonForm';

type FormState = { kind?: DragonKind; loading: boolean; error: string | null; details: DragonFormDetail | null };
const useDragonFormPage = () => {
  const pathname = usePathname();
  const kind = resolveDragonFormKind(pathname);
  const [revision, setRevision] = useState(0);
  const [sourceError, setSourceError] = useState<string | null>(null);
  const [viewing, setViewing] = useState<{ kind: DragonKind; artwork: DragonFormArtwork }>();
  const [state, setState] = useState<FormState>({ loading: false, error: null, details: null });
  useEffect(() => {
    let cancelled = false;
    if (!kind) return;
    setState({ kind, loading: true, error: null, details: null });
    void dragonAPI.getDragonFormDetails(kind).then(details => {
      if (!cancelled) setState({ kind, details, error: null, loading: false });
    }).catch(failure => {
      if (!cancelled) setState({ kind, details: null, loading: false, error: errorMessage(failure) });
    });
    return () => { cancelled = true; };
  }, [kind, revision]);
  const retry = useCallback(() => setRevision(current => current + 1), []);
  const closeArtwork = () => setViewing(undefined);
  const viewArtwork = (artwork: DragonFormArtwork) => { if (kind) setViewing({ kind, artwork }); };
  const openSource = async (url: string) => {
    setSourceError(null);
    try { await Linking.openURL(url); }
    catch { setSourceError(`Source Could Not Be Opened`); }
  };
  return {
    kind, retry, sourceError, viewArtwork, closeArtwork, openSource,
    loading: Boolean(kind && (state.kind !== kind || state.loading)),
    error: state.kind === kind ? state.error : null,
    details: state.kind === kind ? state.details : null,
    viewedArtwork: viewing?.kind === kind ? viewing?.artwork : undefined,
  };
};
export default useDragonFormPage;
