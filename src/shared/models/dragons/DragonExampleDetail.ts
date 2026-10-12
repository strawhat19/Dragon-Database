import type { DragonExample } from './DragonForm';
import type { DragonKind } from '../../../types/types';

export interface DragonExampleDetail extends DragonExample {
  kind: DragonKind;
  formName: string;
  formNote: string;
  colors: readonly string[];
  mediums: readonly string[];
  elements: readonly string[];
  anatomy: readonly string[];
}
