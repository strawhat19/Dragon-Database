import './styles.scss';

import type { RevealProps } from './types';
import { useReducedMotion } from '../../shared/motion';
import { useEffect, useRef, useState, type CSSProperties } from 'react';

const Reveal = ({ id, children, delay = 0, className = `` }: RevealProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(reducedMotion);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (reducedMotion || typeof IntersectionObserver === `undefined`) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      setVisible(true);
      observer.disconnect();
    }, { threshold: 0.12, rootMargin: `0px 0px -6% 0px` });

    observer.observe(root);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div
      id={id}
      ref={rootRef}
      className={`reveal${visible ? ` reveal--visible` : ``}${reducedMotion ? ` reveal--reduced` : ``} ${className}`.trim()}
      style={{ [`--reveal-delay`]: `${Math.max(0, delay)}s` } as CSSProperties}
    >
      {children}
    </div>
  );
};

export default Reveal;
