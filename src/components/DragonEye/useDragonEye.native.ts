import { Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../shared/motion';

export const useDragonEye = () => {
  const blink = useRef(new Animated.Value(1)).current;
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    blink.stopAnimation();
    blink.setValue(1);
    if (reducedMotion) return;

    let active = true;
    let animation: Animated.CompositeAnimation | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const scheduleBlink = () => {
      timer = setTimeout(() => {
        animation = Animated.sequence([
          Animated.timing(blink, { toValue: 0.015, duration: 100, useNativeDriver: false }),
          Animated.delay(55),
          Animated.timing(blink, { toValue: 1, duration: 160, useNativeDriver: false }),
        ]);
        animation.start(({ finished }) => {
          if (active && finished) scheduleBlink();
        });
      }, 4000 + Math.random() * 5000);
    };
    scheduleBlink();

    return () => {
      active = false;
      clearTimeout(timer);
      animation?.stop();
      blink.stopAnimation();
    };
  }, [blink, reducedMotion]);

  return blink;
};
