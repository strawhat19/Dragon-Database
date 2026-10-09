import { useRef, useState, useEffect, useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Animated,
  Keyboard,
  useWindowDimensions,
  type View,
  type ScrollView,
  type LayoutRectangle,
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { useReducedMotion } from '../../shared/motion/useReducedMotion';
import { useTheme } from '../../shared/themeContext/ThemeContext';
import type { ScrollTopContrastLayout } from '../ScrollTopButton/types';
import { useDragonData } from '../../shared/dragonDataContext/useDragonData';

const useLandingPage = () => {
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const { width, fontScale } = useWindowDimensions();
  const reducedMotion = useReducedMotion();
  const scrollRef = useRef<ScrollView>(null);
  const blurTarget = useRef<View>(null);
  const headerHeight = useRef(86 + insets.top);
  const heroLayout = useRef({ y: 16, height: 410 });
  const heroEnd = useRef(460);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [topInverted, setTopInverted] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const topOpacity = useRef(new Animated.Value(0)).current;
  const loadingOpacity = useRef(new Animated.Value(1)).current;
  const contrastGeometry = useRef<{
    scrollY: number;
    button?: LayoutRectangle;
    content?: LayoutRectangle;
    sections?: ScrollTopContrastLayout;
  }>({ scrollY: 0 });
  const data = useDragonData();
  const wide = width >= 760;
  const cardGrid = width >= 720;
  const gutter = cardGrid ? Math.max(40, (width - 1280) / 2) : 24;
  const heroHeight = (wide ? 510 : 450) + Math.max(0, fontScale - 1) * 180;
  // Keep the decorative brand within the viewport; body text still follows device text size.
  const titleSize = (wide ? Math.min(110, (width - 96) / 10) : Math.min(54, (width - 48) / 5.6)) / Math.max(1, fontScale);
  const flameWidth = wide ? Math.min(200, width * 0.16) : 42;
  const flameHeight = wide ? 100 : 52;
  const flyingWidth = wide ? 60 : 34;
  const subtitleWidth = Math.min(wide ? 700 : 342, width - 48);
  const columns = width >= 1050 ? 3 : 2;
  const cardWidth = (width - gutter * 2 - 24 * (columns - 1)) / columns;

  const updateTopContrast = useCallback(() => {
    const { button, content, sections, scrollY } = contrastGeometry.current;
    if (isDark || !button || !content || !sections) {
      setTopInverted(false);
      return;
    }
    const x = button.x + button.width / 2 - content.x;
    const y = scrollY + button.y + button.height / 2 - content.y;
    const containsCenter = (bounds?: LayoutRectangle) => !!bounds
      && x >= bounds.x && x <= bounds.x + bounds.width
      && y >= bounds.y && y <= bounds.y + bounds.height;
    setTopInverted(containsCenter(sections.anatomy) && !containsCenter(sections.plate));
  }, [isDark]);

  useEffect(updateTopContrast, [updateTopContrast]);

  useEffect(() => {
    const transition = Animated.timing(topOpacity, {
      toValue: pastHero ? 1 : 0,
      duration: reducedMotion ? 0 : 200,
      useNativeDriver: true,
      isInteraction: false,
    });
    transition.start();
    return () => transition.stop();
  }, [pastHero, reducedMotion, topOpacity]);

  useEffect(() => {
    if (data.isHydrated || reducedMotion) {
      loadingOpacity.setValue(1);
      return;
    }
    const pulse = Animated.loop(Animated.sequence([
      Animated.timing(loadingOpacity, { toValue: 0.45, duration: 850, useNativeDriver: true, isInteraction: false }),
      Animated.timing(loadingOpacity, { toValue: 1, duration: 850, useNativeDriver: true, isInteraction: false }),
    ]));
    pulse.start();
    return () => pulse.stop();
  }, [data.isHydrated, loadingOpacity, reducedMotion]);

  const clearQuery = () => data.setQuery(``);
  const backToTop = () => scrollRef.current?.scrollTo({ y: 0, animated: !reducedMotion });
  const onSearchBlur = () => setSearchFocused(false);
  const onSearchFocus = () => setSearchFocused(true);
  const retryLoad = () => { void data.reload().catch(() => undefined); };
  const submitSearch = () => {
    Keyboard.dismiss();
    scrollRef.current?.scrollTo({ y: Math.max(0, heroEnd.current - headerHeight.current), animated: !reducedMotion });
  };
  const onScroll = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const position = nativeEvent.contentOffset.y;
    contrastGeometry.current.scrollY = position;
    updateTopContrast();
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
  const onContentLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    contrastGeometry.current.content = nativeEvent.layout;
    updateTopContrast();
  };
  const onTopButtonLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    contrastGeometry.current.button = nativeEvent.layout;
    updateTopContrast();
  };
  const onContrastLayout = (layout: ScrollTopContrastLayout) => {
    contrastGeometry.current.sections = layout;
    updateTopContrast();
  };

  return {
    ...data,
    wide,
    gutter,
    insets,
    cardGrid,
    pastHero,
    scrolled,
    onScroll,
    cardWidth,
    titleSize,
    scrollRef,
    blurTarget,
    heroHeight,
    flameWidth,
    flameHeight,
    flyingWidth,
    topOpacity,
    topInverted,
    clearQuery,
    backToTop,
    retryLoad,
    onHeroLayout,
    onContentLayout,
    onSearchBlur,
    onSearchFocus,
    submitSearch,
    onHeaderLayout,
    onContrastLayout,
    onTopButtonLayout,
    searchFocused,
    subtitleWidth,
    loadingOpacity,
  };
};

export default useLandingPage;
