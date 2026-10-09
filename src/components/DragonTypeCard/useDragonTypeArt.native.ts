import { Animated } from 'react-native';
import { useRef, useState, useEffect } from 'react';
import { useReducedMotion } from '../../shared/motion';

const useDragonTypeArt = (alternateSource: number) => {
  const reducedMotion = useReducedMotion();
  const [pressed, setPressed] = useState(false);
  const [loadedAlternate, setLoadedAlternate] = useState<number>();
  const reveal = useRef(new Animated.Value(0)).current;
  const alternateReady = loadedAlternate === alternateSource;

  useEffect(() => {
    const animation = Animated.timing(reveal, {
      isInteraction: false,
      useNativeDriver: true,
      duration: reducedMotion ? 0 : 450,
      toValue: pressed && alternateReady ? 1 : 0,
    });
    animation.start();
    return () => animation.stop();
  }, [pressed, alternateReady, reducedMotion, reveal]);

  return {
    onPressIn: () => setPressed(true),
    onPressOut: () => setPressed(false),
    onAlternateLoad: () => setLoadedAlternate(alternateSource),
    baseArtStyle: {
      opacity: reveal.interpolate({ inputRange: [0, 1], outputRange: [1, 0.5] }),
      transform: [{ scale: reducedMotion ? 1 : reveal.interpolate({ inputRange: [0, 1], outputRange: [1, 1.025] }) }],
    },
    alternateArtStyle: {
      opacity: reveal,
      transform: [{ scale: reducedMotion ? 1 : reveal.interpolate({ inputRange: [0, 1], outputRange: [1.08, 1] }) }],
    },
  };
};

export default useDragonTypeArt;
