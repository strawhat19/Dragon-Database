import { useEffect, useState } from 'react';
import { useReducedMotion } from '../../shared/motion';

export const useTextReveal = (text: string) => {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(reducedMotion);

  useEffect(() => {
    let active = true;
    if (reducedMotion) {
      setVisible(true);
      return;
    }

    setVisible(false);
    const fontsReady = typeof document === `undefined` ? Promise.resolve() : document.fonts?.ready ?? Promise.resolve();
    void fontsReady.then(() => {
      if (active) setVisible(true);
    }).catch(() => {
      if (active) setVisible(true);
    });

    return () => { active = false; };
  }, [text, reducedMotion]);

  return { visible, reducedMotion };
};
