import './styles.scss';
import type { DragonEyeProps } from './types';
import { useDragonEye } from './useDragonEye';
import { dragonEyeGeometry } from './geometry';

const DragonEye = (_props: DragonEyeProps) => {
  const { eyeRef, blinkRef, pupilRef, reducedMotion } = useDragonEye();
  const { eyePath, lidPath, irisPath, browPath, glintPath, pupilPath, counterPath, unitsPerEm } = dragonEyeGeometry;
  const { centerY, blinkHeight, counterLeft, counterWidth } = dragonEyeGeometry;

  return (
    <span
      aria-hidden={true}
      className={`dragon-eye`}
      data-reduced-motion={reducedMotion}
      id={`landing-database-dragon-eye`}
    >
      <svg
        ref={eyeRef}
        focusable={false}
        className={`dragon-eye-canvas`}
        id={`landing-database-eye-canvas`}
        viewBox={`0 0 ${unitsPerEm} ${unitsPerEm}`}
      >
        <defs id={`landing-database-eye-definitions`}>
          <linearGradient id={`landing-database-eye-steel`} x1={0} y1={0} x2={0} y2={1}>
            <stop offset={0} stopColor={`var(--paper)`} />
            <stop offset={0.5} stopColor={`var(--steel)`} />
            <stop offset={1} stopColor={`var(--silver)`} />
          </linearGradient>
          <clipPath id={`landing-database-eye-counter`} clipPathUnits={`userSpaceOnUse`}>
            <path id={`landing-database-eye-counter-path`} d={counterPath} />
          </clipPath>
          <clipPath id={`landing-database-eye-opening`} clipPathUnits={`userSpaceOnUse`}>
            <path id={`landing-database-eye-opening-path`} d={eyePath} />
          </clipPath>
          <clipPath id={`landing-database-eye-aperture`} clipPathUnits={`userSpaceOnUse`}>
            <rect
              ref={blinkRef}
              x={counterLeft}
              width={counterWidth}
              height={blinkHeight}
              y={centerY - blinkHeight / 2}
              id={`landing-database-eye-blink-mask`}
            />
          </clipPath>
        </defs>
        <g id={`landing-database-eye-coordinate-space`} transform={`translate(0 ${unitsPerEm}) scale(1 -1)`}>
          <g id={`landing-database-eye-clip`} clipPath={`url(#landing-database-eye-counter)`}>
            <path id={`landing-database-eye-brow`} d={browPath} fill={`var(--ink)`} />
            <g id={`landing-database-eye-lids`} clipPath={`url(#landing-database-eye-aperture)`}>
              <path id={`landing-database-eye-shape`} d={eyePath} fill={`url(#landing-database-eye-steel)`} />
              <g id={`landing-database-eye-pupil-clip`} clipPath={`url(#landing-database-eye-opening)`}>
                <g ref={pupilRef} id={`landing-database-eye-gaze`} className={`dragon-eye-gaze`}>
                  <path id={`landing-database-eye-iris`} d={irisPath} fill={`var(--red)`} />
                  <path id={`landing-database-eye-pupil`} d={pupilPath} fill={`var(--control-background)`} />
                  <path id={`landing-database-eye-iris-ridge`} d={glintPath} fill={`none`} stroke={`var(--paper)`} strokeWidth={3} />
                </g>
              </g>
              <path id={`landing-database-eye-upper-lid`} d={lidPath} fill={`none`} stroke={`var(--ink)`} strokeWidth={8} />
            </g>
          </g>
        </g>
      </svg>
    </span>
  );
};

export default DragonEye;
