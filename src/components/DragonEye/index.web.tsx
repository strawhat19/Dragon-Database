import './styles.scss';
import type { DragonEyeProps } from './types';
import { useDragonEye } from './useDragonEye';
import { dragonEyeColors, dragonEyeGeometry } from './geometry';

const DragonEye = (_props: DragonEyeProps) => {
  const { eyeRef, blinkRef, pupilRef, reducedMotion } = useDragonEye();
  const { eyePath, lidPath, irisPath, browPath, glintPath, pupilPath, counterPath, unitsPerEm } = dragonEyeGeometry;
  const { centerY, blinkHeight, counterLeft, counterWidth } = dragonEyeGeometry;
  const { scalePaths, lowerLidPath, glintEchoPath, irisGlowPath, irisFiberPath, irisRidgePath, lowerScalePath, scaleHighlightPath } = dragonEyeGeometry;
  const colors = dragonEyeColors;

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
          <linearGradient id={`landing-database-eye-sclera`} x1={0} y1={0} x2={0} y2={1}>
            <stop offset={0} stopColor={colors.scleraDeep} />
            <stop offset={0.5} stopColor={colors.scleraLight} />
            <stop offset={1} stopColor={colors.scleraDeep} />
          </linearGradient>
          <linearGradient id={`landing-database-eye-scales`} x1={0} y1={0} x2={1} y2={1}>
            <stop offset={0} stopColor={colors.scaleDeep} />
            <stop offset={0.55} stopColor={colors.scaleCopper} />
            <stop offset={1} stopColor={colors.scaleDeep} />
          </linearGradient>
          <radialGradient id={`landing-database-eye-amber`} cx={`50%`} cy={`48%`} r={`58%`}>
            <stop offset={0} stopColor={colors.irisLight} />
            <stop offset={0.36} stopColor={colors.irisGold} />
            <stop offset={0.72} stopColor={colors.irisCopper} />
            <stop offset={1} stopColor={colors.irisDeep} />
          </radialGradient>
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
            <path id={`landing-database-eye-brow`} d={browPath} fill={colors.socket} />
            <path id={`landing-database-eye-lower-scales`} d={lowerScalePath} fill={`url(#landing-database-eye-scales)`} />
            {scalePaths.map((path, index) => (
              <path
                d={path}
                key={index}
                strokeWidth={3}
                stroke={colors.socket}
                fill={`url(#landing-database-eye-scales)`}
                id={`landing-database-eye-brow-scale-${index}`}
              />
            ))}
            <path id={`landing-database-eye-scale-highlights`} d={scaleHighlightPath} fill={`none`} opacity={0.55} strokeWidth={2} stroke={colors.scaleLight} />
            <g id={`landing-database-eye-lids`} clipPath={`url(#landing-database-eye-aperture)`}>
              <path id={`landing-database-eye-shape`} d={eyePath} fill={`url(#landing-database-eye-sclera)`} stroke={colors.socket} strokeWidth={5} />
              <g id={`landing-database-eye-pupil-clip`} clipPath={`url(#landing-database-eye-opening)`}>
                <g ref={pupilRef} id={`landing-database-eye-gaze`} className={`dragon-eye-gaze`}>
                  <path id={`landing-database-eye-iris`} d={irisPath} fill={`url(#landing-database-eye-amber)`} stroke={colors.irisRim} strokeWidth={4} />
                  <path id={`landing-database-eye-iris-fibers`} d={irisFiberPath} fill={`none`} opacity={0.5} strokeWidth={3} stroke={colors.irisFiber} />
                  <path id={`landing-database-eye-iris-rays`} d={irisGlowPath} fill={`none`} opacity={0.65} strokeWidth={2} stroke={colors.irisLight} />
                  <path id={`landing-database-eye-iris-ridge`} d={irisRidgePath} fill={`none`} opacity={0.4} strokeWidth={2} stroke={colors.irisGold} />
                  <path id={`landing-database-eye-pupil`} d={pupilPath} fill={colors.pupil} />
                  <path id={`landing-database-eye-glint`} d={glintPath} fill={colors.glint} opacity={0.7} />
                  <path id={`landing-database-eye-glint-echo`} d={glintEchoPath} fill={colors.glint} opacity={0.25} />
                </g>
              </g>
              <path id={`landing-database-eye-upper-lid`} d={lidPath} fill={`none`} stroke={colors.socket} strokeWidth={8} />
              <path id={`landing-database-eye-lower-lid`} d={lowerLidPath} fill={`none`} stroke={colors.scaleCopper} strokeWidth={5} />
            </g>
          </g>
        </g>
      </svg>
    </span>
  );
};

export default DragonEye;
