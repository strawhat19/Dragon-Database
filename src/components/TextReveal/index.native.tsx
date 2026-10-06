import baseStyles from './styles.native';
import { useEffect, useMemo } from 'react';
import type { TextRevealProps } from './types';
import { useTextReveal } from './useTextReveal';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { useThemedStyles } from '../../shared/themeContext/ThemeContext';

const TextReveal = ({
  id,
  text,
  delay = 0,
  textStyle,
  mode = `words`,
  renderDecoration,
  accessibilityRole = `text`,
}: TextRevealProps) => {
  const styles = useThemedStyles(baseStyles);
  const { visible, reducedMotion } = useTextReveal(text);
  const pieces = useMemo(() => mode === `chars` ? Array.from(text) : text.split(/(\s+)/), [text, mode]);
  const values = useMemo(() => pieces.filter(piece => !/^\s*$/.test(piece)).map(() => new Animated.Value(0)), [pieces]);
  const typography = StyleSheet.flatten(textStyle);
  const fontSize = typography?.fontSize ?? 22;
  const lineHeight = typography?.lineHeight ?? Math.ceil(fontSize * 1.2);
  const alignment = typography?.textAlign === `center` ? `center` : typography?.textAlign === `right` ? `flex-end` : `flex-start`;
  let animatedIndex = 0;

  useEffect(() => {
    values.forEach(value => value.stopAnimation());
    if (reducedMotion) {
      values.forEach(value => value.setValue(1));
      return;
    }
    values.forEach(value => value.setValue(0));
    if (!visible) {
      return;
    }

    const animation = Animated.parallel(values.map((value, index) => Animated.sequence([
      Animated.delay(Math.max(0, delay) * 1000 + index * (mode === `chars` ? 22 : 65)),
      Animated.timing(value, {
        toValue: 1,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
        duration: mode === `chars` ? 720 : 820,
      }),
    ])));
    animation.start();
    return () => {
      animation.stop();
      values.forEach(value => value.stopAnimation());
    };
  }, [values, visible, reducedMotion, delay, mode]);

  return (
    <View
      accessible
      nativeID={id}
      accessibilityLabel={text}
      accessibilityRole={accessibilityRole}
    >
      <View
        accessible={false}
        accessibilityElementsHidden
        nativeID={`${id}-visual`}
        importantForAccessibility={`no-hide-descendants`}
        style={[styles.visual, mode === `chars` ? styles.characters : styles.words, { justifyContent: alignment }]}
      >
        {pieces.map((piece, index) => {
          if (/^\s*$/.test(piece)) {
            return <Text key={`${id}-${index}`} nativeID={`${id}-space-${index}`} style={[styles.text, textStyle, { lineHeight }]}>{piece}</Text>;
          }
          const reveal = values[animatedIndex++];

          return (
            <View key={`${id}-${index}`} nativeID={`${id}-mask-${index}`} style={styles.mask}>
              <Animated.View
                nativeID={`${id}-piece-${index}`}
                style={{
                  opacity: reducedMotion ? 1 : reveal,
                  transform: reducedMotion ? [] : [
                    { perspective: 600 },
                    { translateY: reveal.interpolate({ inputRange: [0, 1], outputRange: [lineHeight * 1.1, 0] }) },
                    { rotateX: reveal.interpolate({ inputRange: [0, 1], outputRange: [mode === `chars` ? `-58deg` : `-42deg`, `0deg`] }) },
                  ],
                }}
              >
                {renderDecoration?.(piece, index)}
                <Text nativeID={`${id}-text-${index}`} style={[styles.text, textStyle, { lineHeight }]}>{piece}</Text>
              </Animated.View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default TextReveal;
