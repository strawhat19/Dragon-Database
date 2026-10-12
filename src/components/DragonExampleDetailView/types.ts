import type { DragonExampleDetail } from '../../shared/models/dragons/DragonExampleDetail';

export type DragonExampleDetailViewProps = {
  id: string;
  modal?: boolean;
  onClose?: () => void;
  example: DragonExampleDetail;
  onSelect: (id: string) => void;
  examples: readonly DragonExampleDetail[];
  onOpenSource?: (url: string) => Promise<void>;
};
