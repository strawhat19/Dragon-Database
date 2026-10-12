import { dragonAPI } from '../../api/dragons';
import type { DragonKind } from '../../types/types';
import { errorMessage } from '../../shared/common/values';
import { useMemo, useState, useEffect, useCallback } from 'react';
import type { DragonExampleDetail } from '../../shared/models/dragons/DragonExampleDetail';
import { filterDragonExamples, createDragonExampleFilters, getDragonExampleFilterGroups, type DragonExampleFilterKey, type DragonExampleFilterState } from '../../shared/dragonExamples';

type CollectionState = { kind?: DragonKind; loading: boolean; error: string | null; examples: readonly DragonExampleDetail[] };
const useDragonExampleCollection = (kind?: DragonKind) => {
  const [revision, setRevision] = useState(0);
  const [selection, setSelection] = useState<{ kind?: DragonKind; id: string }>();
  const [filterState, setFilterState] = useState<{ kind?: DragonKind; query: string; values: DragonExampleFilterState }>({ kind, query: ``, values: createDragonExampleFilters() });
  const [state, setState] = useState<CollectionState>({ loading: true, error: null, examples: [] });
  useEffect(() => {
    let active = true;
    setState({ kind, loading: true, error: null, examples: [] });
    void dragonAPI.getDragonExamples(kind).then(examples => {
      if (active) setState({ kind, examples, loading: false, error: null });
    }).catch(failure => {
      if (active) setState({ kind, examples: [], loading: false, error: errorMessage(failure) });
    });
    return () => { active = false; };
  }, [kind, revision]);
  const examples = useMemo(() => state.kind === kind ? state.examples : [], [kind, state.kind, state.examples]);
  const query = filterState.kind === kind ? filterState.query : ``;
  const filters = useMemo(() => filterState.kind === kind ? filterState.values : createDragonExampleFilters(), [filterState, kind]);
  const groups = useMemo(() => getDragonExampleFilterGroups(examples), [examples]);
  const filteredExamples = useMemo(() => filterDragonExamples(examples, filters, query), [examples, filters, query]);
  const selectedExample = selection && selection.kind === kind ? filteredExamples.find(example => example.id === selection.id) : undefined;
  const retry = useCallback(() => setRevision(current => current + 1), []);
  const closeExample = useCallback(() => setSelection(undefined), []);
  const selectExample = useCallback((id: string) => setSelection({ kind, id }), [kind]);
  const resetFilters = useCallback(() => setFilterState({ kind, query: ``, values: createDragonExampleFilters() }), [kind]);
  const setQuery = useCallback((query: string) => setFilterState(current => ({ kind, query, values: current.kind === kind ? current.values : createDragonExampleFilters() })), [kind]);
  const toggleFilter = useCallback((key: DragonExampleFilterKey, value: string) => {
    setFilterState(current => {
      const values = current.kind === kind ? current.values : createDragonExampleFilters();
      const selected = values[key];
      return { kind, query: current.kind === kind ? current.query : ``, values: { ...values, [key]: selected.includes(value) ? selected.filter(item => item !== value) : [...selected, value] } };
    });
  }, [kind]);
  return { query, setQuery, groups, filters, examples, filteredExamples, selectedExample, retry, closeExample, selectExample, resetFilters, toggleFilter, error: state.kind === kind ? state.error : null, loading: state.kind !== kind || state.loading };
};
export default useDragonExampleCollection;
