import { Animated } from 'react-native';
import { useRef, useState, useEffect } from 'react';
import type { HeaderProps } from './types';
import { useReducedMotion } from '../../shared/motion/useReducedMotion';

const useSiteHeader = ({ sticky = true, scrolled = false }: HeaderProps) => {
  const reducedMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const blurOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const transition = Animated.timing(blurOpacity, {
      toValue: sticky && scrolled ? 1 : 0,
      duration: reducedMotion ? 0 : 220,
      useNativeDriver: true,
      isInteraction: false,
    });
    transition.start();
    return () => transition.stop();
  }, [blurOpacity, reducedMotion, scrolled, sticky]);

  const toggleMenu = () => setMenuOpen((open) => !open);
  const closeMenu = () => setMenuOpen(false);

  return { menuOpen, closeMenu, toggleMenu, blurOpacity };
};

export default useSiteHeader;
