import './styles.scss';

import type { CSSProperties } from 'react';
import type { TextRevealProps } from './types';
import { useTextReveal } from './useTextReveal';

const TextReveal = ({ id, text, delay = 0, mode = `words`, className = ``, renderDecoration }: TextRevealProps) => {
  const { visible, reducedMotion } = useTextReveal(text);
  const pieces = mode === `chars` ? Array.from(text) : text.split(/(\s+)/);
  let animatedIndex = 0;

  return (
    <span
      id={id}
      data-text={text}
      className={`text-reveal text-reveal--${mode}${visible ? ` text-reveal--visible` : ``}${reducedMotion ? ` text-reveal--reduced` : ``} ${className}`.trim()}
      style={{ [`--text-reveal-delay`]: `${Math.max(0, delay)}s` } as CSSProperties}
    >
      <span id={`${id}-accessible`} className={`text-reveal__accessible`}>{text}</span>
      <span id={`${id}-visual`} className={`text-reveal__visual`} aria-hidden={`true`}>
        {pieces.map((piece, index) => {
          if (/^\s*$/.test(piece)) return piece;
          const order = animatedIndex++;

          return (
            <span id={`${id}-mask-${index}`} className={`text-reveal__mask`} key={`${id}-${index}`}>
              <span
                id={`${id}-piece-${index}`}
                className={`text-reveal__piece`}
                style={{ [`--text-reveal-index`]: order } as CSSProperties}
              >
                {renderDecoration?.(piece, index)}
                {piece}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
};

export default TextReveal;
