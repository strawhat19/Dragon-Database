import type { PageLoaderProps } from './types';
import { useReducedMotion } from '../../shared/motion';
import { useCallback, useEffect, useRef, useState } from 'react';

type LoaderPhase = `loading` | `settling` | `exiting`;
type ProgressFrame = (value: number, velocity: number) => void;

const clampProgress = (value: number) => Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 0;

export const usePageLoader = (props: PageLoaderProps, onFrame?: ProgressFrame) => {
  const reducedMotion = useReducedMotion();
  const [percentage, setPercentage] = useState(0);
  const [phase, setPhase] = useState<LoaderPhase>(`loading`);
  const propsRef = useRef(props);
  const frameRef = useRef(onFrame);
  const valueRef = useRef(0);
  const startedRef = useRef<number | null>(null);
  const settledRef = useRef<number | null>(null);
  const completedRef = useRef(false);
  const exitStartedRef = useRef(false);
  propsRef.current = props;
  frameRef.current = onFrame;

  const complete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    propsRef.current.onComplete();
  }, []);

  useEffect(() => {
    let frame = 0;
    let previousTime: number | null = null;

    const update = (time: number) => {
      if (completedRef.current || exitStartedRef.current) return;
      startedRef.current ??= time;

      const { ready, progress } = propsRef.current;
      const elapsed = previousTime === null ? 16 : Math.min(64, Math.max(1, time - previousTime));
      const target = ready ? 100 : Math.min(99, clampProgress(progress));
      const previousValue = valueRef.current;
      const blend = 1 - Math.exp(-elapsed / 190);
      let value = reducedMotion ? target : Math.min(target, previousValue + (target - previousValue) * blend);
      previousTime = time;

      if (ready && value >= 99.8) {
        value = 100;
        if (settledRef.current === null) {
          settledRef.current = time;
          setPhase(`settling`);
        }
      }

      valueRef.current = value;
      const displayed = Math.floor(value);
      setPercentage(current => current === displayed ? current : displayed);
      frameRef.current?.(value, reducedMotion ? 0 : Math.abs(value - previousValue) / (elapsed / 1000));

      const presentationReady = reducedMotion || time - startedRef.current >= 1400;
      const holdReady = reducedMotion || settledRef.current !== null && time - settledRef.current >= 180;
      if (ready && value === 100 && presentationReady && holdReady) {
        exitStartedRef.current = true;
        setPhase(`exiting`);
        return;
      }

      frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion]);

  useEffect(() => {
    if (phase !== `exiting`) return;
    propsRef.current.onReveal?.();
    // Animation completion is primary; this also releases the page if an animation event is unavailable.
    const timer = setTimeout(complete, reducedMotion ? 220 : 920);
    return () => clearTimeout(timer);
  }, [phase, complete, reducedMotion]);

  return { phase, complete, percentage, reducedMotion };
};
