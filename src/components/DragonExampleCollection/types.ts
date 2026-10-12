import type { DragonKind } from '../../types/types';

export type DragonExampleCollectionProps = {
  id: string;
  kind?: DragonKind;
  onOpenSource?: (url: string) => Promise<void>;
};
