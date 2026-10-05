import styles from './styles.native';
import type { RevealProps } from './types';
import { useReducedMotion } from '../../shared/motion';
import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

const Reveal = ({ id, children, delay = 0 }: RevealProps) => {
  const reducedMotion = useReducedMotion();
  const reveal = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (reducedMotion) {
      reveal.setValue(1);
      return;
    }

    const animation = Animated.sequence([
      Animated.delay(Math.max(0, delay) * 1000),
      Animated.timing(reveal, { toValue: 1, duration: 700, useNativeDriver: true }),
    ]);
    animation.start();
    return () => animation.stop();
  }, [reveal, reducedMotion, delay]);

  return (
    <Animated.View
      nativeID={id}
      style={[styles.root, {
        opacity: reveal,
        transform: [{ translateY: reveal.interpolate({ inputRange: [0, 1], outputRange: [18, 0] }) }],
      }]}
    >
      {children}
    </Animated.View>
  );
};

export default Reveal;
