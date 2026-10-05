import { useRef, useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Animated,
  Keyboard,
  useWindowDimensions,
  type View,
  type ScrollView,
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { useReducedMotion } from '../../shared/motion';

const usePageLayout = () => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const reducedMotion = useReducedMotion();
  const scrollRef = useRef<ScrollView>(null);
  const blurTarget = useRef<View>(null);
  const headerHeight = useRef(86 + insets.top);
  const heroLayout = useRef({ y: 16, height: 240 });
  const heroEnd = useRef(342 + insets.top);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const topOpacity = useRef(new Animated.Value(0)).current;
  const wide = width >= 760;
  const gutter = wide ? 40 : 24;
  const titleSize = wide ? 64 : Math.min(44, (width - 48) / 7.5);

  useEffect(() => {
    const transition = Animated.timing(topOpacity, {
      toValue: pastHero && !keyboardVisible ? 1 : 0,
      duration: reducedMotion ? 0 : 200,
      useNativeDriver: true,
      isInteraction: false,
    });
    transition.start();
    return () => transition.stop();
  }, [pastHero, keyboardVisible, reducedMotion, topOpacity]);

  useEffect(() => {
    const show = Keyboard.addListener(`keyboardDidShow`, () => setKeyboardVisible(true));
    const hide = Keyboard.addListener(`keyboardDidHide`, () => setKeyboardVisible(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const scrollToTop = () => scrollRef.current?.scrollTo({ y: 0, animated: !reducedMotion });
  const onScroll = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const position = nativeEvent.contentOffset.y;
    setScrolled(position > 12);
    setPastHero(position > heroEnd.current - headerHeight.current);
  };
  const onHeaderLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    headerHeight.current = nativeEvent.layout.height;
    heroEnd.current = headerHeight.current + heroLayout.current.y + heroLayout.current.height;
  };
  const onHeroLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    heroLayout.current = { y: nativeEvent.layout.y, height: nativeEvent.layout.height };
    heroEnd.current = headerHeight.current + heroLayout.current.y + heroLayout.current.height;
  };

  return {
    wide,
    gutter,
    insets,
    scrolled,
    pastHero,
    onScroll,
    titleSize,
    scrollRef,
    blurTarget,
    topOpacity,
    scrollToTop,
    onHeroLayout,
    onHeaderLayout,
    keyboardVisible,
  };
};

export default usePageLayout;
