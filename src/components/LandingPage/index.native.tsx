import Reveal from '../Reveal';
import DragonEye from '../DragonEye';
import SiteFooter from '../SiteFooter';
import SiteHeader from '../SiteHeader';
import TextReveal from '../TextReveal';
import baseStyles from './styles.native';
import { SvgXml } from 'react-native-svg';
import { BlurTargetView } from 'expo-blur';
import DragonTypeCard from '../DragonTypeCard';
import LandingSections from '../LandingSections';
import useLandingPage from './useLandingPage.native';
import AngledSurface from '../AngledSurface/index.native';
import { wordmarkSwordXml } from '../../shared/landingArtwork';
import { Search, X, ArrowUp, ArrowRight, RotateCcw } from 'lucide-react-native';
import { useTheme, useThemedStyles } from '../../shared/themeContext/ThemeContext';
import {
  Text,
  View,
  Animated,
  Pressable,
  ScrollView,
  TextInput,
} from 'react-native';
import {
  flameLeftXml,
  flameRightXml,
  flyingDragonXml,
  steelTextureXml,
  scalingCollectionXml,
} from '../../shared/artwork';

const controlInk = `#101115`;
const controlPaper = `#f4f5f7`;

const LandingPage = () => {
  const styles = useThemedStyles(baseStyles);
  const { palette, isDark, themeArtwork } = useTheme();
  const {
    wide,
    types,
    query,
    error,
    gutter,
    insets,
    setQuery,
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
    clearQuery,
    backToTop,
    retryLoad,
    isHydrated,
    onHeroLayout,
    onSearchBlur,
    onSearchFocus,
    submitSearch,
    onHeaderLayout,
    searchFocused,
    subtitleWidth,
    filteredTypes,
    loadingOpacity,
  } = useLandingPage();

  return (
    <View style={styles.page} nativeID={`dragon-landing-page`} testID={`dragon-landing-page`}>
      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        stickyHeaderIndices={[0]}
        scrollEventThrottle={16}
        keyboardShouldPersistTaps={`handled`}
        keyboardDismissMode={`on-drag`}
        nativeID={`dragon-landing-scroll`}
        testID={`dragon-landing-scroll`}
        onScroll={onScroll}
      >
        <View
          nativeID={`landing-sticky-header`}
          testID={`landing-sticky-header`}
          onLayout={onHeaderLayout}
        >
          <SiteHeader sticky scrolled={scrolled} blurTarget={blurTarget} />
        </View>
        <BlurTargetView ref={blurTarget} nativeID={`landing-blur-target`} testID={`landing-blur-target`}>
          <View
            style={[styles.hero, { minHeight: heroHeight }]}
            nativeID={`dragon-landing-steel-hero`}
            testID={`dragon-landing-steel-hero`}
            onLayout={onHeroLayout}
          >
            <View style={styles.artwork} pointerEvents={`none`} accessibilityElementsHidden importantForAccessibility={`no-hide-descendants`}>
              <SvgXml xml={themeArtwork(steelTextureXml)} width={`100%`} height={`100%`} preserveAspectRatio={`none`} />
              {isDark && <View pointerEvents={`none`} nativeID={`landing-hero-dark-tint`} testID={`landing-hero-dark-tint`} style={[styles.artwork, { opacity: 0.76, backgroundColor: palette.silver }]} />}
              <View style={[styles.flame, { left: 6, width: flameWidth, height: flameHeight }]} nativeID={`landing-left-flames`} testID={`landing-left-flames`}>
                <SvgXml xml={flameLeftXml} width={`100%`} height={`100%`} />
              </View>
              <View style={[styles.flame, { right: 6, width: flameWidth, height: flameHeight }]} nativeID={`landing-right-flames`} testID={`landing-right-flames`}>
                <SvgXml xml={flameRightXml} width={`100%`} height={`100%`} />
              </View>
              {[`left`, `right`].map((side) => (
                <View
                  key={side}
                  nativeID={`landing-flying-dragon-${side}-0`}
                  testID={`landing-flying-dragon-${side}-0`}
                  style={[
                    styles.flyingDragon,
                    {
                      width: flyingWidth,
                      height: flyingWidth * 0.7,
                      bottom: flameHeight + (wide ? 24 : 12),
                      ...(side === `left` ? { left: wide ? 30 : 5 } : { right: wide ? 30 : 5 }),
                      transform: [{ scaleX: side === `right` ? -1 : 1 }],
                    },
                  ]}
                >
                  <SvgXml xml={themeArtwork(flyingDragonXml)} width={`100%`} height={`100%`} />
                </View>
              ))}
              {wide && [`left`, `right`].map((side) => (
                <View
                  key={side}
                  nativeID={`landing-flying-dragon-${side}-1`}
                  testID={`landing-flying-dragon-${side}-1`}
                  style={[
                    styles.flyingDragon,
                    {
                      width: 56,
                      height: 39,
                      bottom: flameHeight + 38,
                      ...(side === `left` ? { left: flameWidth * 0.62 } : { right: flameWidth * 0.62 }),
                      transform: [{ scaleX: side === `right` ? -1 : 1 }],
                    },
                  ]}
                >
                  <SvgXml xml={themeArtwork(flyingDragonXml)} width={`100%`} height={`100%`} />
                </View>
              ))}
            </View>
            <View style={[styles.heroContent, wide && styles.wideHeroContent]} nativeID={`landing-hero-content`} testID={`landing-hero-content`}>
              <View style={styles.accent} nativeID={`landing-hero-red-rule`} testID={`landing-hero-red-rule`} />
              <View
                accessible
                accessibilityRole={`header`}
                accessibilityLabel={`Dragon Database`}
                style={styles.titleReveal}
                nativeID={`landing-brand-title`}
                testID={`landing-brand-title`}
              >
                <View
                  accessibilityElementsHidden
                  importantForAccessibility={`no-hide-descendants`}
                  nativeID={`landing-brand-title-visual`}
                  testID={`landing-brand-title-visual`}
                  style={[styles.titleLines, wide && styles.wideTitleLines, wide && { gap: titleSize * 0.2 }]}
                >
                  <TextReveal
                    mode={`chars`}
                    text={`Dragon`}
                    delay={0.06}
                    id={`landing-brand-dragon-reveal`}
                    textStyle={[styles.title, { fontSize: titleSize, lineHeight: titleSize * 1.08 }]}
                  />
                  <TextReveal
                    mode={`chars`}
                    text={`Database`}
                    delay={0.18}
                    id={`landing-brand-database-reveal`}
                    textStyle={[styles.title, { fontSize: titleSize, lineHeight: titleSize * 1.08 }]}
                    renderDecoration={(piece, index) => index === 0 && piece === `D` ? <DragonEye fontSize={titleSize} lineHeight={titleSize * 1.08} /> : null}
                  />
                </View>
              </View>
              <Reveal id={`landing-wordmark-sword-reveal`} delay={0.12}>
                <View style={[styles.wordmarkSword, { width: subtitleWidth }]} nativeID={`landing-wordmark-sword`}>
                  <SvgXml xml={themeArtwork(wordmarkSwordXml)} width={`100%`} height={`100%`} />
                </View>
              </Reveal>
              <Reveal id={`landing-scaling-subtitle-reveal`} delay={0.15}>
                <View
                  accessible
                  accessibilityRole={`header`}
                  accessibilityLabel={`The Scaling Collection`}
                  style={styles.subtitle}
                  nativeID={`landing-scaling-subtitle`}
                  testID={`landing-scaling-subtitle`}
                >
                  <SvgXml xml={themeArtwork(scalingCollectionXml)} width={subtitleWidth} height={subtitleWidth * 110 / 1080} />
                </View>
              </Reveal>
              {/* <Reveal id={`landing-introduction-reveal`} delay={0.22}>
                <Text style={[styles.introduction, wide && styles.wideIntroduction]} nativeID={`landing-introduction`} testID={`landing-introduction`}>
                  {wide ? `Explore dragon forms, compare their traits, and follow the lore.` : `Forms, traits, and lore.`}
                </Text>
              </Reveal> */}
              <View style={styles.searchReveal} nativeID={`landing-search-container`} testID={`landing-search-container`}>
                <Reveal id={`landing-search-reveal`} delay={0.28}>
                  <View style={styles.search} nativeID={`landing-search-field`} testID={`landing-search-field`}>
                    <AngledSurface id={`landing-search-surface`} fill={palette.paper} stroke={searchFocused ? palette.ink : palette.line} />
                    <Search size={22} color={palette.muted} accessibilityElementsHidden />
                    <TextInput
                      value={query}
                      autoCorrect={false}
                      autoCapitalize={`none`}
                      returnKeyType={`search`}
                      onChangeText={setQuery}
                      onFocus={onSearchFocus}
                      onBlur={onSearchBlur}
                      onSubmitEditing={submitSearch}
                      placeholder={wide ? `Search names, forms, or traits` : `Search names or traits`}
                      placeholderTextColor={palette.muted}
                      selectionColor={palette.red}
                      accessibilityLabel={`Search dragon names, forms, or traits`}
                      accessibilityHint={`Filters the dragon forms below as you type`}
                      nativeID={`landing-search-input`}
                      testID={`landing-search-input`}
                      style={[styles.input, wide && styles.wideInput]}
                    />
                    {query.length > 0 && (
                      <Pressable
                        onPress={clearQuery}
                        accessibilityRole={`button`}
                        accessibilityLabel={`Clear search`}
                        nativeID={`landing-search-clear`}
                        testID={`landing-search-clear`}
                        style={({ pressed }) => [styles.clear, pressed && styles.pressed]}
                      >
                        <X size={20} color={palette.ink} />
                      </Pressable>
                    )}
                    <Pressable
                      onPress={submitSearch}
                      accessibilityRole={`button`}
                      accessibilityLabel={`Search dragon forms`}
                      nativeID={`landing-search-submit`}
                      testID={`landing-search-submit`}
                      style={({ pressed }) => [styles.searchSubmit, pressed && styles.pressed]}
                    >
                      <AngledSurface id={`landing-search-submit-surface`} fill={controlInk} />
                      <Text style={[styles.searchSubmitLabel, { color: controlPaper }]}>Search</Text>
                      {wide && <ArrowRight size={18} color={controlPaper} />}
                    </Pressable>
                  </View>
                </Reveal>
              </View>
            </View>
          </View>
          <View style={[styles.catalog, cardGrid && styles.wideCatalog, { paddingHorizontal: gutter }]} nativeID={`landing-type-catalog`} testID={`landing-type-catalog`}>
            <TextReveal
              mode={`words`}
              delay={0.32}
              accessibilityRole={`header`}
              id={`landing-catalog-heading`}
              text={query.trim() ? `Search results` : `Explore dragon forms`}
              textStyle={[styles.catalogHeading, cardGrid && styles.wideCatalogHeading]}
            />
            {!!query.trim() && (
              <Text accessibilityLiveRegion={`polite`} style={styles.resultLabel} nativeID={`landing-query-label`} testID={`landing-query-label`}>
                {`Matches for “${query.trim()}”`}
              </Text>
            )}
            {isHydrated && error && types.length > 0 && (
              <View style={styles.feedback} nativeID={`landing-archive-notice`} testID={`landing-archive-notice`} accessibilityLiveRegion={`polite`}>
                <Text style={styles.feedbackHeading}>Archive notice</Text>
                <Text style={styles.feedbackCopy}>{error}</Text>
                <Pressable onPress={retryLoad} accessibilityRole={`button`} nativeID={`landing-notice-retry`} testID={`landing-notice-retry`} style={({ pressed }) => [styles.feedbackAction, pressed && styles.pressed]}>
                  <RotateCcw size={18} color={palette.paper} />
                  <Text style={styles.feedbackActionLabel}>Try again</Text>
                </Pressable>
              </View>
            )}
            {!isHydrated ? (
              <View nativeID={`landing-loading`} testID={`landing-loading`} accessibilityLabel={`Loading dragon forms`} accessibilityLiveRegion={`polite`} accessibilityState={{ busy: true }}>
                <View style={[styles.cards, cardGrid && styles.wideCards]}>
                  {[0, 1, 2].map((index) => (
                    <Animated.View
                      key={index}
                      nativeID={`landing-type-skeleton-${index}`}
                      testID={`landing-type-skeleton-${index}`}
                      accessibilityElementsHidden
                      importantForAccessibility={`no-hide-descendants`}
                      style={[styles.card, cardGrid && styles.wideCard, styles.skeleton, cardGrid && styles.wideSkeleton, { opacity: loadingOpacity }, cardGrid && { width: cardWidth }]}
                    >
                      <View style={styles.skeletonSymbol} />
                      <View style={[styles.skeletonTitle, cardGrid && { marginLeft: 0 }]} />
                    </Animated.View>
                  ))}
                </View>
              </View>
            ) : error && types.length === 0 ? (
              <View style={styles.feedback} nativeID={`landing-load-error`} testID={`landing-load-error`} accessibilityLiveRegion={`polite`}>
                <Text style={styles.feedbackHeading}>Unable to load dragon forms</Text>
                <Text style={styles.feedbackCopy}>{error}</Text>
                <Pressable onPress={retryLoad} accessibilityRole={`button`} nativeID={`landing-load-retry`} testID={`landing-load-retry`} style={({ pressed }) => [styles.feedbackAction, pressed && styles.pressed]}>
                  <RotateCcw size={18} color={palette.paper} />
                  <Text style={styles.feedbackActionLabel}>Try again</Text>
                </Pressable>
              </View>
            ) : filteredTypes.length === 0 ? (
              <View style={styles.feedback} nativeID={`landing-empty-results`} testID={`landing-empty-results`} accessibilityLiveRegion={`polite`}>
                <Text style={styles.feedbackHeading}>{types.length ? `No matching dragon forms` : `No dragon forms yet`}</Text>
                <Text style={styles.feedbackCopy}>{types.length ? `Try another name, form, or trait.` : `Dragon forms will appear here when available.`}</Text>
                {!!query.trim() && (
                  <Pressable onPress={clearQuery} accessibilityRole={`button`} nativeID={`landing-empty-clear`} testID={`landing-empty-clear`} style={({ pressed }) => [styles.feedbackAction, pressed && styles.pressed]}>
                    <X size={18} color={palette.paper} />
                    <Text style={styles.feedbackActionLabel}>Clear search</Text>
                  </Pressable>
                )}
              </View>
            ) : (
              <View style={[styles.cards, cardGrid && styles.wideCards]} nativeID={`landing-type-grid`} testID={`landing-type-grid`}>
                {filteredTypes.map((type, index) => (
                  <View key={type.id} style={[styles.card, cardGrid && styles.wideCard, cardGrid && { width: cardWidth }]} nativeID={`landing-type-slot-${type.id}`} testID={`landing-type-slot-${type.id}`}>
                    <Reveal id={`landing-type-reveal-${type.id}`} delay={Math.min(0.42 + index * 0.07, 0.7)}>
                      <DragonTypeCard type={type} onSelect={() => setQuery(type.name)} />
                    </Reveal>
                  </View>
                ))}
              </View>
            )}
          </View>
          <LandingSections />
          <SiteFooter />
        </BlurTargetView>
      </ScrollView>
      <Animated.View
        pointerEvents={pastHero ? `auto` : `none`}
        accessibilityElementsHidden={!pastHero}
        importantForAccessibility={pastHero ? `auto` : `no-hide-descendants`}
        nativeID={`landing-scroll-top-container`}
        testID={`landing-scroll-top-container`}
        style={[styles.topButton, { bottom: Math.max(20, insets.bottom + 12), opacity: topOpacity }]}
      >
        <Pressable onPress={backToTop} accessibilityRole={`button`} accessibilityLabel={`Scroll to top`} nativeID={`landing-scroll-top`} testID={`landing-scroll-top`} style={({ pressed }) => [styles.topButtonAction, pressed && styles.pressed]}>
          <ArrowUp size={19} color={palette.paper} />
          <Text style={styles.topButtonLabel}>Top</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

export default LandingPage;
