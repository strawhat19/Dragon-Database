import { dragonAPI } from '../../api/dragons';
import { useState, useEffect, useCallback } from 'react';
import { errorMessage } from '../../shared/common/values';
import { dragonExamplePath } from '../../shared/dragonExamples';
import { resolveDragonFormKind } from '../../shared/dragonForms';
import { useRouter, usePathname, useLocalSearchParams } from 'expo-router';
import type { DragonExampleDetail } from '../../shared/models/dragons/DragonExampleDetail';

type ExamplePageState = { id?: string; form?: string; loading: boolean; error: string | null; example: DragonExampleDetail | null; examples: readonly DragonExampleDetail[] };
const useDragonExamplePage = () => {
  const router = useRouter();
  const pathname = usePathname().replace(/\/+$/, ``);
  const params = useLocalSearchParams<{ id?: string | string[] }>();
  const exampleId = typeof params.id === `string` ? params.id : params.id?.[0];
  const form = pathname.slice(0, pathname.lastIndexOf(`/`));
  const kind = resolveDragonFormKind(form);
  const [revision, setRevision] = useState(0);
  const [state, setState] = useState<ExamplePageState>({ loading: true, error: null, example: null, examples: [] });
  useEffect(() => {
    let active = true;
    if (!exampleId || (!kind && form !== `/examples`)) {
      setState({ form, id: exampleId, loading: false, error: null, example: null, examples: [] });
      return;
    }
    setState({ form, id: exampleId, loading: true, error: null, example: null, examples: [] });
    void Promise.all([dragonAPI.getDragonExample(exampleId), dragonAPI.getDragonExamples()]).then(([example, examples]) => {
      if (active) setState({ form, id: exampleId, example, examples: example ? examples.filter(item => item.kind === example.kind) : [], loading: false, error: null });
    }).catch(failure => {
      if (active) setState({ form, id: exampleId, example: null, examples: [], loading: false, error: errorMessage(failure) });
    });
    return () => { active = false; };
  }, [form, kind, exampleId, revision]);
  const retry = useCallback(() => setRevision(current => current + 1), []);
  const selectExample = useCallback((id: string) => {
    const example = state.examples.find(item => item.id === id);
    if (example) router.replace(dragonExamplePath(example));
  }, [router, state.examples]);
  const current = state.id === exampleId && state.form === form;
  const redirectPath = current && state.example && (form === `/examples` || state.example.kind !== kind) ? dragonExamplePath(state.example) : undefined;
  return { exampleId, redirectPath, retry, selectExample, loading: !current || state.loading, error: current ? state.error : null, example: current ? state.example : null, examples: current ? state.examples : [] };
};
export default useDragonExamplePage;
