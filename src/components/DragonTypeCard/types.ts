import type { DragonTypeRecord } from '../../shared/models';

export type DragonTypeCardProps = {
  type: DragonTypeRecord;
  onSelect?: () => void;
};
