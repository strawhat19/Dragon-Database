import Reveal from '../Reveal';
import SiteHeader from '../SiteHeader';
import SiteFooter from '../SiteFooter';
import TextReveal from '../TextReveal';
import baseStyles from './styles.native';
import { SvgXml } from 'react-native-svg';
import { BlurTargetView } from 'expo-blur';
import type { PageLayoutProps } from './types';
import usePageLayout from './usePageLayout.native';
import ScrollTopButton from '../ScrollTopButton/index.native';
import { steelTextureXml } from '../../shared/artwork';
import { Text, View, Animated, ScrollView } from 'react-native';
import { useTheme, useThemedStyles } from '../../shared/themeContext/ThemeContext';

const PageLayout = ({ id, title, description, children }: PageLayoutProps) => {
  const styles = useThemedStyles(baseStyles);
  const { palette, isDark, themeArtwork } = useTheme();
  const sticky = true;
  const {
    wide, gutter, insets, scrolled, pastHero, onScroll, titleSize, scrollRef,
    blurTarget, topOpacity, scrollToTop, onHeroLayout, onHeaderLayout, keyboardVisible,
  } = usePageLayout();
  const words = title.split(/\s+/).filter(Boolean);
  const topVisible = pastHero && !keyboardVisible;

  return (
    <View nativeID={`${id}-page`} style={styles.page}>
      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        onScroll={onScroll}
        scrollEventThrottle={16}
        stickyHeaderIndices={[0]}
        automaticallyAdjustKeyboardInsets
        nativeID={`${id}-page-scroll`}
        keyboardShouldPersistTaps={`handled`}
        keyboardDismissMode={`on-drag`}
      >
        <View nativeID={`${id}-sticky-header`} onLayout={onHeaderLayout}>
          <SiteHeader sticky={sticky} scrolled={scrolled} blurTarget={blurTarget} />
        </View>
        <BlurTargetView ref={blurTarget} nativeID={`${id}-blur-target`}>
          <View nativeID={`${id}-hero`} style={styles.hero} onLayout={onHeroLayout}>
            <View nativeID={`${id}-hero-steel`} style={styles.artwork} pointerEvents={`none`} accessibilityElementsHidden importantForAccessibility={`no-hide-descendants`}>
              <SvgXml xml={themeArtwork(steelTextureXml)} width={`100%`} height={`100%`} preserveAspectRatio={`none`} />
              {isDark && <View pointerEvents={`none`} nativeID={`${id}-hero-dark-tint`} style={[styles.artwork, { opacity: 0.76, backgroundColor: palette.silver }]} />}
            </View>
            <View nativeID={`${id}-hero-content`} style={[styles.heroContent, { paddingHorizontal: gutter }]}>
              <Reveal id={`${id}-accent-reveal`}>
                <View nativeID={`${id}-hero-accent`} style={styles.accent} />
              </Reveal>
              <View accessible nativeID={`${id}-title`} accessibilityRole={`header`} accessibilityLabel={title} style={styles.titleContainer}>
                <View nativeID={`${id}-title-visual`} style={styles.titleVisual} accessibilityElementsHidden importantForAccessibility={`no-hide-descendants`}>
                  {words.map((word, index) => (
                    <TextReveal
                      text={word}
                      mode={`chars`}
                      key={`${id}-title-${index}`}
                      id={`${id}-title-word-${index}`}
                      delay={0.08 + index * 0.1}
                      textStyle={[styles.title, { fontSize: titleSize, lineHeight: titleSize * 1.1 }]}
                    />
                  ))}
                </View>
              </View>
              <Reveal id={`${id}-description-reveal`} delay={0.22}>
                <Text nativeID={`${id}-description`} style={[styles.description, wide && styles.wideDescription]}>{description}</Text>
              </Reveal>
            </View>
          </View>
          <View nativeID={`${id}-body`} style={[styles.body, { paddingHorizontal: gutter }]}>
            <Reveal id={`${id}-body-reveal`} delay={0.08}>{children}</Reveal>
          </View>
          <SiteFooter />
        </BlurTargetView>
      </ScrollView>
      <Animated.View
        nativeID={`${id}-scroll-top-container`}
        pointerEvents={topVisible ? `auto` : `none`}
        accessibilityElementsHidden={!topVisible}
        importantForAccessibility={topVisible ? `auto` : `no-hide-descendants`}
        style={[styles.topButton, { opacity: topOpacity, bottom: insets.bottom + 24 }]}
      >
        <ScrollTopButton id={`${id}-scroll-top`} onPress={scrollToTop} disabled={!topVisible} />
      </Animated.View>
    </View>
  );
};

export default PageLayout;
