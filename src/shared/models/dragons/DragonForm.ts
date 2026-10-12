import type { DragonKind } from '../../../types/types';
import type { ImageRequireSource } from 'react-native';

export type DragonExample = {
  id: string;
  name: string;
  franchise: string;
  sourceUrl: string;
  description: string;
  canonLabel: string;
  imageUrl?: string;
  imageCredit?: string;
  anatomySourceUrl?: string;
};
export type DragonFormArtwork = {
  id: string;
  alt: string;
  title: string;
  source: ImageRequireSource;
};
export type DragonFormDetail = {
  kind: DragonKind;
  name: string;
  note: string;
  overview: string;
  description: string;
  anatomy: readonly string[];
  examples: readonly DragonExample[];
  gallery: readonly DragonFormArtwork[];
};
