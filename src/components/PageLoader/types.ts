export type PageLoaderProps = {
  ready: boolean;
  progress: number;
  pageName: string;
  onReveal?: () => void;
  onComplete: () => void;
};
