import baseStyles from './styles.native';
import { SvgXml } from 'react-native-svg';
import type { PageLoaderProps } from './types';
import { usePageLoader } from './usePageLoader';
import { brandMarkXml } from '../../shared/artwork';
import { useEffect, useRef, useState } from 'react';
import { Animated, Text, View, useWindowDimensions } from 'react-native';
import { flameHeights, swordAspectRatio, flameAspectRatio } from './artwork';
import { blackFlameXml, wordmarkSwordXml } from '../../shared/landingArtwork';
import { useTheme, useThemedStyles } from '../../shared/themeContext/ThemeContext';

const PageLoader = (props: PageLoaderProps) => {
  const { themeArtwork } = useTheme();
  const styles = useThemedStyles(baseStyles);
  const { width, height } = useWindowDimensions();
  const exit = useRef(new Animated.Value(0)).current;
  const digitTrail = useRef(new Animated.Value(0)).current;
  const flamePulse = useRef(new Animated.Value(0)).current;
  const [swordWidth, setSwordWidth] = useState(Math.min(1100, width * 0.88));
  const { phase, complete, percentage, reducedMotion } = usePageLoader(props, (value, velocity) => {
    digitTrail.setValue(value === 100 ? 0 : Math.min(0.16, velocity * 0.0008));
  });
  const wide = width >= 800;
  const markSize = wide ? 290 : Math.min(210, width * 0.5);
  const swordHeight = swordWidth / swordAspectRatio;
  const flameHeight = wide ? 76 : 46;
  const flameWidth = flameHeight * flameAspectRatio;
  const fringeHeight = Math.min(240, Math.max(120, height * 0.24));

  useEffect(() => {
    if (reducedMotion || phase !== `loading`) {
      flamePulse.setValue(0);
      return;
    }
    const animation = Animated.loop(Animated.sequence([
      Animated.timing(flamePulse, { toValue: 1, duration: 320, useNativeDriver: true }),
      Animated.timing(flamePulse, { toValue: 0, duration: 320, useNativeDriver: true }),
    ]));
    animation.start();
    return () => animation.stop();
  }, [phase, flamePulse, reducedMotion]);

  useEffect(() => {
    if (phase !== `exiting`) return;
    const animation = Animated.timing(exit, {
      toValue: 1,
      duration: reducedMotion ? 120 : 820,
      useNativeDriver: true,
    });
    animation.start(({ finished }) => {
      if (finished) complete();
    });
    return () => animation.stop();
  }, [exit, phase, complete, reducedMotion]);

  return (
    <Animated.View
      nativeID={`dragon-page-loader`}
      accessibilityRole={`progressbar`}
      accessibilityViewIsModal
      accessibilityLabel={`Preparing ${props.pageName}`}
      accessibilityValue={{ min: 0, max: 100, now: percentage, text: `${percentage}%` }}
      style={[styles.root, {
        opacity: exit.interpolate({ inputRange: reducedMotion ? [0, 1] : [0, 0.94, 1], outputRange: reducedMotion ? [1, 0] : [1, 1, 0] }),
      }]}
    >
      <Animated.View nativeID={`dragon-page-loader-backdrop`} style={[styles.backdrop, {
        opacity: reducedMotion ? 1 : exit.interpolate({ inputRange: [0, 0.38, 0.4, 1], outputRange: [1, 1, 0, 0] }),
      }]} />
      <Animated.View nativeID={`dragon-page-loader-frame`} style={[styles.frame, wide && styles.frameWide, {
        opacity: reducedMotion ? 1 : exit.interpolate({ inputRange: [0, 0.28, 1], outputRange: [1, 0, 0] }),
        transform: [{ translateY: reducedMotion ? 0 : exit.interpolate({ inputRange: [0, 0.28, 1], outputRange: [0, -14, -14] }) }],
      }]}>
        <Text nativeID={`dragon-page-loader-eyebrow`} style={styles.eyebrow}>{props.pageName}</Text>
        <View nativeID={`dragon-page-loader-content`} style={[styles.content, wide && styles.contentWide]}>
          <View nativeID={`dragon-page-loader-mark`} style={{ width: markSize, height: markSize }} accessibilityElementsHidden importantForAccessibility={`no-hide-descendants`}>
            {!reducedMotion ? <View nativeID={`dragon-page-loader-trail`} style={styles.markTrail}><SvgXml xml={themeArtwork(brandMarkXml)} width={markSize} height={markSize} /></View> : null}
            <SvgXml xml={themeArtwork(brandMarkXml)} width={markSize} height={markSize} />
          </View>
          <View nativeID={`dragon-page-loader-readout`} style={[styles.readout, wide && styles.readoutWide]}>
            <Text nativeID={`dragon-page-loader-title`} style={[styles.title, wide && styles.titleWide]}>{`Dragon Database`}</Text>
            <View nativeID={`dragon-page-loader-percent`} style={[styles.percent, wide && styles.percentWide]}>
              <View nativeID={`dragon-page-loader-digits`} style={styles.digits}>
                <Animated.Text
                  accessible={false}
                  accessibilityElementsHidden
                  importantForAccessibility={`no-hide-descendants`}
                  nativeID={`dragon-page-loader-digit-trail`}
                  style={[styles.number, wide && styles.numberWide, styles.digitTrail, { opacity: digitTrail }]}
                >
                  {String(percentage).padStart(2, `0`)}
                </Animated.Text>
                <Text nativeID={`dragon-page-loader-number`} style={[styles.number, wide && styles.numberWide]}>{String(percentage).padStart(2, `0`)}</Text>
              </View>
              <Text nativeID={`dragon-page-loader-unit`} style={styles.unit}>{`%`}</Text>
            </View>
            <Text nativeID={`dragon-page-loader-status`} accessibilityLiveRegion={`polite`} style={styles.status}>
              {phase === `loading` ? `Preparing the archive` : `Ready to explore`}
            </Text>
          </View>
        </View>
        <View
          nativeID={`dragon-page-loader-sword`}
          accessibilityElementsHidden
          importantForAccessibility={`no-hide-descendants`}
          style={[styles.sword, { height: swordHeight }]}
          onLayout={({ nativeEvent }) => setSwordWidth(nativeEvent.layout.width)}
        >
          <View nativeID={`dragon-page-loader-sword-base`} style={styles.swordBase}>
            <SvgXml xml={themeArtwork(wordmarkSwordXml)} width={swordWidth} height={swordHeight} />
          </View>
          <View nativeID={`dragon-page-loader-sword-fill`} style={[styles.swordFill, { width: swordWidth * percentage / 100, height: swordHeight }]}>
            <SvgXml xml={themeArtwork(wordmarkSwordXml)} width={swordWidth} height={swordHeight} />
          </View>
          {!reducedMotion ? (
            <Animated.View nativeID={`dragon-page-loader-progress-flame`} style={[styles.progressFlame, {
              width: flameWidth,
              height: flameHeight,
              top: swordHeight * 0.5 - flameHeight * 0.86,
              left: swordWidth * percentage / 100 - flameWidth * 0.5,
              opacity: phase === `loading` && percentage > 0 && percentage < 100 ? 1 : 0,
              transform: [
                { scaleY: flamePulse.interpolate({ inputRange: [0, 1], outputRange: [0.88, 1.04] }) },
                { rotate: flamePulse.interpolate({ inputRange: [0, 1], outputRange: [`-5deg`, `4deg`] }) },
              ],
            }]}>
              <SvgXml xml={blackFlameXml} width={flameWidth} height={flameHeight} />
            </Animated.View>
          ) : null}
        </View>
        <Text nativeID={`dragon-page-loader-credit`} style={styles.credit}>{`Forms · Traits · Lore`}</Text>
      </Animated.View>
      {!reducedMotion ? (
        <Animated.View
          pointerEvents={`none`}
          accessibilityElementsHidden
          nativeID={`dragon-page-loader-flame-curtain`}
          importantForAccessibility={`no-hide-descendants`}
          style={[styles.flameCurtain, {
            height: height + fringeHeight * 2,
            transform: [{ translateY: exit.interpolate({
              inputRange: [0, 0.38, 0.5, 1],
              outputRange: [height, -fringeHeight, -fringeHeight, -height - fringeHeight * 2],
            }) }],
          }]}
        >
          <View nativeID={`dragon-page-loader-flame-curtain-body`} style={[styles.flameCurtainBody, { top: fringeHeight - 1, bottom: fringeHeight - 1, backgroundColor: `#0C0D10` }]} />
          {[`top`, `bottom`].map(edge => (
            <View
              key={edge}
              nativeID={`dragon-page-loader-flame-edge-${edge}`}
              style={[styles.flameEdge, { height: fringeHeight }, edge === `top` ? { top: 1 } : { bottom: 1, transform: [{ rotate: `180deg` }] }]}
            >
              {flameHeights.map((relativeHeight, index) => (
                <View key={index} nativeID={`dragon-page-loader-exit-flame-${edge}-${index}`} style={[styles.exitFlame, { height: fringeHeight * relativeHeight }]}>
                  <SvgXml xml={blackFlameXml} width={`100%`} height={`100%`} preserveAspectRatio={`none`} />
                </View>
              ))}
            </View>
          ))}
        </Animated.View>
      ) : null}
    </Animated.View>
  );
};

export default PageLoader;
