import './styles.scss';

import type { PageLoaderProps } from './types';
import { usePageLoader } from './usePageLoader';
import { brandMarkXml } from '../../shared/artwork';
import { flameHeights, flameImageSource } from './artwork';
import { wordmarkSwordXml } from '../../shared/landingArtwork';
import { useEffect, useId, useRef, type CSSProperties } from 'react';
import { useThemedArtwork } from '../../shared/themeContext/ThemeContext';

const PageLoader = (props: PageLoaderProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const markXml = useThemedArtwork(brandMarkXml);
  const swordXml = useThemedArtwork(wordmarkSwordXml);
  const swordImageSource = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(swordXml)}`;
  const blurRef = useRef<SVGFEGaussianBlurElement>(null);
  const blurAmountRef = useRef(0);
  const filterId = `page-loader-digit-blur-${useId().replaceAll(`:`, ``)}`;
  const { phase, complete, percentage, reducedMotion } = usePageLoader(props, (value, velocity) => {
    const desired = value === 100 ? 0 : Math.min(7, velocity * 0.045);
    blurAmountRef.current = value === 100 ? 0 : blurAmountRef.current + (desired - blurAmountRef.current) * 0.3;
    blurRef.current?.setAttribute(`stdDeviation`, `${blurAmountRef.current.toFixed(2)} ${desired ? `0.35` : `0`}`);
    rootRef.current?.style.setProperty(`--loader-progress`, `${value}%`);
    rootRef.current?.style.setProperty(`--loader-flame-opacity`, value > 0 && value < 100 ? `1` : `0`);
  });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const previousFocus = document.activeElement;
    const rootOverflow = document.documentElement.style.overflow;
    const bodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = `hidden`;
    document.body.style.overflow = `hidden`;
    root.focus({ preventScroll: true });

    return () => {
      document.documentElement.style.overflow = rootOverflow;
      document.body.style.overflow = bodyOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected && document.activeElement === root) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, []);

  return (
    <div
      ref={rootRef}
      tabIndex={-1}
      id={`dragon-page-loader`}
      role={`progressbar`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percentage}
      aria-busy={phase === `loading`}
      aria-label={`Preparing ${props.pageName}`}
      aria-valuetext={`${percentage}%${phase === `loading` ? `` : `, ready`}`}
      className={`page-loader page-loader--${phase}${reducedMotion ? ` page-loader--reduced` : ``}`}
      onAnimationEnd={event => {
        if (event.target === event.currentTarget && phase === `exiting`) complete();
      }}
      onKeyDown={event => {
        if (event.key !== `Tab`) return;
        event.preventDefault();
        rootRef.current?.focus({ preventScroll: true });
      }}
    >
      <div id={`dragon-page-loader-backdrop`} className={`page-loader__backdrop`} aria-hidden={true} />
      <div id={`dragon-page-loader-frame`} className={`page-loader__frame`}>
        <span id={`dragon-page-loader-eyebrow`} className={`page-loader__eyebrow`}>{props.pageName}</span>
        <div id={`dragon-page-loader-content`} className={`page-loader__content`}>
          <div
            aria-hidden={`true`}
            id={`dragon-page-loader-mark`}
            className={`page-loader__mark`}
            dangerouslySetInnerHTML={{ __html: markXml }}
          />
          <div id={`dragon-page-loader-readout`} className={`page-loader__readout`}>
            <p id={`dragon-page-loader-title`} className={`page-loader__title`}>{`Dragon Database`}</p>
            <div id={`dragon-page-loader-percent`} className={`page-loader__percent`} aria-hidden={`true`}>
              <svg id={`dragon-page-loader-filter`} className={`page-loader__filter`} aria-hidden={`true`} focusable={`false`}>
                <defs>
                  <filter id={filterId} x={`-60%`} y={`-60%`} width={`220%`} height={`220%`} colorInterpolationFilters={`sRGB`}>
                    <feGaussianBlur ref={blurRef} in={`SourceGraphic`} stdDeviation={`0 0`} />
                  </filter>
                </defs>
              </svg>
              <span
                id={`dragon-page-loader-number`}
                className={`page-loader__number`}
                style={{ filter: reducedMotion ? `none` : `url(#${filterId})` } as CSSProperties}
              >
                {String(percentage).padStart(2, `0`)}
              </span>
              <span id={`dragon-page-loader-unit`} className={`page-loader__unit`}>{`%`}</span>
            </div>
            <p id={`dragon-page-loader-status`} className={`page-loader__status`}>
              {phase === `loading` ? `Preparing the archive` : `Ready to explore`}
            </p>
          </div>
        </div>
        <div id={`dragon-page-loader-sword`} className={`page-loader__sword`} aria-hidden={true}>
          <img id={`dragon-page-loader-sword-base`} className={`page-loader__sword-base`} src={swordImageSource} alt={``} draggable={false} />
          <img id={`dragon-page-loader-sword-fill`} className={`page-loader__sword-fill`} src={swordImageSource} alt={``} draggable={false} />
          <span id={`dragon-page-loader-progress-flame`} className={`page-loader__progress-flame`}>
            <img id={`dragon-page-loader-progress-flame-artwork`} className={`page-loader__progress-flame-artwork`} src={flameImageSource} alt={``} draggable={false} />
          </span>
        </div>
        <span id={`dragon-page-loader-credit`} className={`page-loader__credit`}>{`Forms · Traits · Lore`}</span>
      </div>
      {!reducedMotion ? (
        <div id={`dragon-page-loader-flame-curtain`} className={`page-loader__flame-curtain`} aria-hidden={true}>
          <div id={`dragon-page-loader-flame-curtain-body`} className={`page-loader__flame-curtain-body`} />
          {[`top`, `bottom`].map(edge => (
            <div key={edge} id={`dragon-page-loader-flame-edge-${edge}`} className={`page-loader__flame-edge page-loader__flame-edge--${edge}`}>
              {flameHeights.map((height, index) => (
                <img
                  alt={``}
                  key={index}
                  draggable={false}
                  src={flameImageSource}
                  style={{ height: `${height * 100}%` }}
                  id={`dragon-page-loader-exit-flame-${edge}-${index}`}
                  className={`page-loader__exit-flame`}
                />
              ))}
            </div>
          ))}
        </div>
      ) : null}
      <span id={`dragon-page-loader-announcement`} className={`page-loader__announcement`} role={`status`} aria-live={`polite`}>
        {phase === `loading` ? `Preparing ${props.pageName}` : `${props.pageName} is ready`}
      </span>
    </div>
  );
};

export default PageLoader;
