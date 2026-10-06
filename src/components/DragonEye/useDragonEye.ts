import { useRef, useEffect } from 'react';
import { dragonEyeGeometry } from './geometry';
import { useReducedMotion } from '../../shared/motion/useReducedMotion';

export const useDragonEye = () => {
  const eyeRef = useRef<SVGSVGElement>(null);
  const blinkRef = useRef<SVGRectElement>(null);
  const pupilRef = useRef<SVGGElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const { centerX, centerY, travelX, travelY, blinkHeight, unitsPerEm } = dragonEyeGeometry;
    const setAperture = (openness: number) => {
      const height = blinkHeight * openness;
      blinkRef.current?.setAttribute(`height`, `${height}`);
      blinkRef.current?.setAttribute(`y`, `${centerY - height / 2}`);
    };
    setAperture(1);
    pupilRef.current?.setAttribute(`transform`, `translate(0 0)`);
    if (reducedMotion) return;

    let frame = 0;
    let blinkFrame = 0;
    let blinkTimer = 0;
    let cursor: { x: number; y: number } | undefined;

    const updateGaze = () => {
      frame = 0;
      const bounds = eyeRef.current?.getBoundingClientRect();
      if (!cursor || !bounds?.width || document.hidden) {
        pupilRef.current?.setAttribute(`transform`, `translate(0 0)`);
        return;
      }
      const x = cursor.x - (bounds.left + centerX / unitsPerEm * bounds.width);
      const y = cursor.y - (bounds.bottom - centerY / unitsPerEm * bounds.height);
      const distance = Math.hypot(x, y);
      const strength = Math.min(1, distance / 180) / (distance || 1);
      pupilRef.current?.setAttribute(`transform`, `translate(${x * strength * travelX} ${-y * strength * travelY})`);
    };
    const queueGaze = () => {
      if (!frame) frame = window.requestAnimationFrame(updateGaze);
    };
    const followCursor = (event: PointerEvent) => {
      if (event.pointerType === `touch`) return;
      cursor = { x: event.clientX, y: event.clientY };
      queueGaze();
    };
    const resetGaze = () => {
      cursor = undefined;
      queueGaze();
    };
    const leaveWindow = (event: MouseEvent) => {
      if (!event.relatedTarget) resetGaze();
    };
    const startBlink = () => {
      const started = performance.now();
      const animateBlink = (now: number) => {
        const elapsed = now - started;
        let openness = 0.015;
        if (elapsed < 100) {
          openness = 1 - 0.985 * (1 - Math.cos(elapsed / 100 * Math.PI)) / 2;
        } else if (elapsed > 155) {
          const progress = Math.min(1, (elapsed - 155) / 160);
          openness = 0.015 + 0.985 * (1 - Math.cos(progress * Math.PI)) / 2;
        }
        setAperture(openness);
        if (elapsed < 315) blinkFrame = window.requestAnimationFrame(animateBlink);
        else {
          blinkFrame = 0;
          scheduleBlink();
        }
      };
      blinkFrame = window.requestAnimationFrame(animateBlink);
    };
    const scheduleBlink = () => {
      blinkTimer = window.setTimeout(() => {
        if (document.hidden) {
          scheduleBlink();
          return;
        }
        startBlink();
      }, 4000 + Math.random() * 5000);
    };
    scheduleBlink();
    window.addEventListener(`blur`, resetGaze);
    window.addEventListener(`resize`, queueGaze);
    document.addEventListener(`mouseout`, leaveWindow);
    document.addEventListener(`visibilitychange`, resetGaze);
    window.addEventListener(`pointermove`, followCursor, { passive: true });
    window.addEventListener(`scroll`, queueGaze, { capture: true, passive: true });

    return () => {
      window.clearTimeout(blinkTimer);
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(blinkFrame);
      setAperture(1);
      window.removeEventListener(`blur`, resetGaze);
      window.removeEventListener(`resize`, queueGaze);
      window.removeEventListener(`scroll`, queueGaze, true);
      document.removeEventListener(`mouseout`, leaveWindow);
      window.removeEventListener(`pointermove`, followCursor);
      document.removeEventListener(`visibilitychange`, resetGaze);
    };
  }, [reducedMotion]);

  return { eyeRef, blinkRef, pupilRef, reducedMotion };
};
