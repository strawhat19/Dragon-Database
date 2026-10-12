import type { DragonExampleDetail } from '../../shared/models/dragons/DragonExampleDetail';

export type DragonExampleLightboxProps = {
  id: string;
  onClose: () => void;
  example?: DragonExampleDetail;
  onSelect: (id: string) => void;
  examples: readonly DragonExampleDetail[];
};
