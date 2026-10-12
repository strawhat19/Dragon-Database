import type { DragonExampleFilterKey, DragonExampleFilterState, DragonExampleFilterGroup } from '../../shared/dragonExamples';

export type DragonExampleFiltersProps = {
  id: string;
  query: string;
  totalCount: number;
  resultCount: number;
  onReset: () => void;
  filters: DragonExampleFilterState;
  groups: readonly DragonExampleFilterGroup[];
  onQueryChange: (query: string) => void;
  onToggle: (key: DragonExampleFilterKey, value: string) => void;
};
