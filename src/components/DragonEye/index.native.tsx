import styles from './styles.native';
import { View, Animated } from 'react-native';
import type { DragonEyeProps } from './types';
import { useDragonEye } from './useDragonEye.native';
import { useTheme } from '../../shared/themeContext/ThemeContext';
import { dragonEyeColors, dragonEyeGeometry } from './geometry';
import Svg, { G, Defs, Path, Rect, Stop, ClipPath, LinearGradient, RadialGradient } from 'react-native-svg';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const DragonEye = ({ fontSize = 64, lineHeight = fontSize * 1.08 }: DragonEyeProps) => {
  const { red } = useTheme();
  const blink = useDragonEye();
  const { ascent, descent, centerY, eyePath, lidPath, irisPath, browPath, glintPath, pupilPath, blinkHeight, counterPath, unitsPerEm, counterLeft, counterWidth } = dragonEyeGeometry;
  const { scalePaths, lowerLidPath, glintEchoPath, irisGlowPath, irisFiberPath, irisRidgePath, lowerScalePath, scaleHighlightPath } = dragonEyeGeometry;
  const colors = { ...dragonEyeColors, irisRed: red };
  const heightUnits = lineHeight / fontSize * unitsPerEm;
  const baselineUnits = ascent + (heightUnits - ascent - descent) / 2;
  const openingHeight = blink.interpolate({ inputRange: [0, 1], outputRange: [0, blinkHeight] });
  const openingY = blink.interpolate({ inputRange: [0, 1], outputRange: [centerY, centerY - blinkHeight / 2] });

  return (
    <View
      accessible={false}
      pointerEvents={`none`}
      accessibilityElementsHidden
      nativeID={`landing-database-dragon-eye`}
      importantForAccessibility={`no-hide-descendants`}
      style={[styles.root, { width: fontSize, height: lineHeight }]}
    >
      <Svg
        width={fontSize}
        height={lineHeight}
        accessible={false}
        viewBox={`0 0 ${unitsPerEm} ${heightUnits}`}
        nativeID={`landing-database-dragon-eye-visual`}
      >
        <Defs>
          <LinearGradient id={`landing-database-dragon-eye-sclera`} x1={`0%`} y1={`0%`} x2={`0%`} y2={`100%`}>
            <Stop offset={`0%`} stopColor={colors.scleraDeep} />
            <Stop offset={`50%`} stopColor={colors.scleraLight} />
            <Stop offset={`100%`} stopColor={colors.scleraDeep} />
          </LinearGradient>
          <LinearGradient id={`landing-database-dragon-eye-scales`} x1={`0%`} y1={`0%`} x2={`100%`} y2={`100%`}>
            <Stop offset={`0%`} stopColor={colors.scaleDeep} />
            <Stop offset={`55%`} stopColor={colors.scaleCopper} />
            <Stop offset={`100%`} stopColor={colors.scaleDeep} />
          </LinearGradient>
          <RadialGradient id={`landing-database-dragon-eye-red`} cx={`50%`} cy={`48%`} r={`58%`}>
            <Stop offset={`0%`} stopColor={colors.irisLight} />
            <Stop offset={`36%`} stopColor={colors.irisRed} />
            <Stop offset={`72%`} stopColor={colors.irisShade} />
            <Stop offset={`100%`} stopColor={colors.irisDeep} />
          </RadialGradient>
          <ClipPath id={`landing-database-dragon-eye-counter`}>
            <Path d={counterPath} />
          </ClipPath>
          <ClipPath id={`landing-database-dragon-eye-opening`}>
            <Path d={eyePath} />
          </ClipPath>
          <ClipPath id={`landing-database-dragon-eye-blink`} clipPathUnits={`userSpaceOnUse`}>
            <AnimatedRect x={counterLeft} y={openingY} width={counterWidth} height={openingHeight} />
          </ClipPath>
        </Defs>
        <G transform={`translate(0 ${baselineUnits}) scale(1 -1)`}>
          <G clipPath={`url(#landing-database-dragon-eye-counter)`}>
            <Path id={`landing-database-eye-brow`} d={browPath} fill={colors.socket} />
            <Path id={`landing-database-eye-lower-scales`} d={lowerScalePath} fill={`url(#landing-database-dragon-eye-scales)`} />
            {scalePaths.map((path, index) => (
              <Path
                d={path}
                key={index}
                strokeWidth={3}
                stroke={colors.socket}
                id={`landing-database-eye-brow-scale-${index}`}
                fill={`url(#landing-database-dragon-eye-scales)`}
              />
            ))}
            <Path id={`landing-database-eye-scale-highlights`} d={scaleHighlightPath} fill={`none`} opacity={0.55} strokeWidth={2} stroke={colors.scaleLight} />
            <G clipPath={`url(#landing-database-dragon-eye-blink)`}>
              <Path id={`landing-database-eye-shape`} d={eyePath} fill={`url(#landing-database-dragon-eye-sclera)`} stroke={colors.socket} strokeWidth={5} />
              <G clipPath={`url(#landing-database-dragon-eye-opening)`}>
                <Path id={`landing-database-eye-iris`} d={irisPath} fill={`url(#landing-database-dragon-eye-red)`} stroke={colors.irisRim} strokeWidth={4} />
                <Path id={`landing-database-eye-iris-fibers`} d={irisFiberPath} fill={`none`} opacity={0.5} strokeWidth={3} stroke={colors.irisFiber} />
                <Path id={`landing-database-eye-iris-rays`} d={irisGlowPath} fill={`none`} opacity={0.65} strokeWidth={2} stroke={colors.irisLight} />
                <Path id={`landing-database-eye-iris-ridge`} d={irisRidgePath} fill={`none`} opacity={0.4} strokeWidth={2} stroke={colors.irisRed} />
                <Path id={`landing-database-eye-pupil`} d={pupilPath} fill={colors.pupil} />
                <Path id={`landing-database-eye-glint`} d={glintPath} fill={colors.glint} opacity={0.7} />
                <Path id={`landing-database-eye-glint-echo`} d={glintEchoPath} fill={colors.glint} opacity={0.25} />
              </G>
              <Path id={`landing-database-eye-upper-lid`} d={lidPath} fill={`none`} stroke={colors.socket} strokeWidth={8} />
              <Path id={`landing-database-eye-lower-lid`} d={lowerLidPath} fill={`none`} stroke={colors.scaleCopper} strokeWidth={5} />
            </G>
          </G>
        </G>
      </Svg>
    </View>
  );
};

export default DragonEye;
