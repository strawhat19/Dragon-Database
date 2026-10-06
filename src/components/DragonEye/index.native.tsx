import styles from './styles.native';
import { View, Animated } from 'react-native';
import type { DragonEyeProps } from './types';
import { dragonEyeGeometry } from './geometry';
import { useDragonEye } from './useDragonEye.native';
import { useTheme } from '../../shared/themeContext/ThemeContext';
import Svg, { G, Defs, Path, Rect, Stop, ClipPath, LinearGradient } from 'react-native-svg';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const DragonEye = ({ fontSize = 64, lineHeight = fontSize * 1.08 }: DragonEyeProps) => {
  const blink = useDragonEye();
  const { palette } = useTheme();
  const { ascent, descent, centerY, eyePath, lidPath, irisPath, browPath, glintPath, pupilPath, blinkHeight, counterPath, unitsPerEm, counterLeft, counterWidth } = dragonEyeGeometry;
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
          <LinearGradient id={`landing-database-dragon-eye-silver`} x1={`0%`} y1={`0%`} x2={`0%`} y2={`100%`}>
            <Stop offset={`0%`} stopColor={palette.paper} />
            <Stop offset={`48%`} stopColor={palette.steel} />
            <Stop offset={`100%`} stopColor={palette.silver} />
          </LinearGradient>
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
            <Path d={browPath} fill={palette.ink} />
            <G clipPath={`url(#landing-database-dragon-eye-blink)`}>
              <Path d={eyePath} fill={`url(#landing-database-dragon-eye-silver)`} />
              <G clipPath={`url(#landing-database-dragon-eye-opening)`}>
                <Path d={irisPath} fill={palette.red} />
                <Path d={pupilPath} fill={`#101115`} />
                <Path d={glintPath} fill={`none`} stroke={palette.paper} strokeWidth={3} />
              </G>
              <Path d={lidPath} fill={`none`} stroke={palette.ink} strokeWidth={8} />
            </G>
          </G>
        </G>
      </Svg>
    </View>
  );
};

export default DragonEye;
