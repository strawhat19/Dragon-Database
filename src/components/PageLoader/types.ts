export type PageLoaderProps = {
  ready: boolean;
  progress: number;
  onReveal?: () => void;
  onComplete: () => void;
};
