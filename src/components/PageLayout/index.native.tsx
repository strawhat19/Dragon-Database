import { BlurTargetView } from 'expo-blur';
import { SvgXml } from 'react-native-svg';
import { ArrowUp } from 'lucide-react-native';
import { Text, View, Animated, Pressable, ScrollView } from 'react-native';
import Reveal from '../Reveal';
import SiteHeader from '../SiteHeader';
import SiteFooter from '../SiteFooter';
import TextReveal from '../TextReveal';
import styles from './styles.native';
import type { PageLayoutProps } from './types';
import usePageLayout from './usePageLayout.native';
import { palette } from '../../styles/theme/theme';
import { steelTextureXml } from '../../shared/artwork';

const PageLayout = ({ id, title, description, children }: PageLayoutProps) => {
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
              <SvgXml xml={steelTextureXml} width={`100%`} height={`100%`} preserveAspectRatio={`none`} />
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
        <Pressable
          disabled={!topVisible}
          onPress={scrollToTop}
          accessibilityRole={`button`}
          nativeID={`${id}-scroll-top`}
          accessibilityLabel={`Scroll to top`}
          style={({ pressed }) => [styles.topButtonAction, pressed && styles.pressed]}
        >
          <ArrowUp size={19} color={palette.paper} accessibilityElementsHidden />
          <Text nativeID={`${id}-scroll-top-label`} style={styles.topButtonLabel}>Top</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

export default PageLayout;
