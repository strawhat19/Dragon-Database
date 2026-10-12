import type { DragonExample } from '../../shared/models/dragons/DragonForm';

export type DragonExampleCardProps = {
  id: string;
  iconXml: string;
  wide?: boolean;
  example: DragonExample;
  onOpenDetails?: () => void;
  onOpenSource?: (url: string) => Promise<void>;
};
