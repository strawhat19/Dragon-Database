import styles from './styles.native';
import { useRef, useEffect } from 'react';
import { ChevronUp } from 'lucide-react-native';
import { View, Animated, Pressable } from 'react-native';
import { useReducedMotion } from '../../shared/motion';
import AngledSurface from '../AngledSurface/index.native';
import { useTheme } from '../../shared/themeContext/ThemeContext';

type ScrollTopButtonProps = {
  id: string;
  disabled?: boolean;
  inverted?: boolean;
  onPress: () => void;
};

const ScrollTopButton = ({ id, onPress, disabled = false, inverted = false }: ScrollTopButtonProps) => {
  const { palette, isDark } = useTheme();
  const reducedMotion = useReducedMotion();
  const lightSurface = isDark || inverted;
  const darkColor = isDark ? palette.paper : palette.ink;
  const lightColor = isDark ? palette.ink : palette.paper;
  const lightOpacity = useRef(new Animated.Value(lightSurface ? 1 : 0)).current;

  useEffect(() => {
    const transition = Animated.timing(lightOpacity, {
      toValue: lightSurface ? 1 : 0,
      duration: reducedMotion ? 0 : 220,
      useNativeDriver: true,
      isInteraction: false,
    });
    transition.start();
    return () => transition.stop();
  }, [lightSurface, reducedMotion, lightOpacity]);

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      nativeID={id}
      testID={id}
      accessibilityRole={`button`}
      accessibilityLabel={`Scroll to top`}
      style={({ pressed }) => [styles.action, pressed && styles.pressed]}
    >
      <View
        accessible={false}
        style={styles.layer}
        pointerEvents={`none`}
        accessibilityElementsHidden
        nativeID={`${id}-dark-layer`}
        importantForAccessibility={`no-hide-descendants`}
      >
        <AngledSurface id={`${id}-surface`} fill={darkColor} />
        <ChevronUp size={24} color={lightColor} nativeID={`${id}-icon`} testID={`${id}-icon`} accessibilityElementsHidden />
      </View>
      <Animated.View
        accessible={false}
        pointerEvents={`none`}
        accessibilityElementsHidden
        nativeID={`${id}-light-layer`}
        style={[styles.layer, { opacity: lightOpacity }]}
        importantForAccessibility={`no-hide-descendants`}
      >
        <AngledSurface id={`${id}-light-surface`} fill={lightColor} />
        <ChevronUp size={24} color={darkColor} nativeID={`${id}-light-icon`} testID={`${id}-light-icon`} accessibilityElementsHidden />
      </Animated.View>
    </Pressable>
  );
};

export default ScrollTopButton;
