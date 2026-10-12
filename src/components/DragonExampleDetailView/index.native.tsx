import { Link } from 'expo-router';
import DetailMedia from './Media.native';
import baseStyles from './styles.native';
import { SvgXml } from 'react-native-svg';
import { useRef, useState, useEffect } from 'react';
import type { DragonExampleDetailViewProps } from './types';
import AngledSurface from '../AngledSurface/index.native';
import { dragonFormPath } from '../../shared/dragonForms';
import { dragonExamplePath } from '../../shared/dragonExamples';
import { blackSteelTextureXml } from '../../shared/cardArtwork';
import { dragonTypeIcons } from '../../shared/dragonTypeIcons';
import CardCorners from '../DragonTypeCard/CardCorners.native';
import useDragonExampleDetailView from './useDragonExampleDetailView';
import { useReducedMotion } from '../../shared/motion/useReducedMotion';
import { useTheme, useThemedStyles } from '../../shared/themeContext/ThemeContext';
import { Text, View, Image, Linking, Animated, Pressable, ScrollView, useWindowDimensions } from 'react-native';
import { X, List, Info, Play, Images, FileText, BookOpen, ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink } from 'lucide-react-native';
import type { DragonExampleDetail } from '../../shared/models/dragons/DragonExampleDetail';

const Thumbnail = ({ id, example }: { id: string; example: DragonExampleDetail }) => {
  const { themeArtwork } = useTheme();
  const styles = useThemedStyles(baseStyles);
  const [failed, setFailed] = useState(false);
  return example.imageUrl && !failed ? <Image nativeID={`${id}-image`} style={styles.thumbnailImage} source={{ uri: example.imageUrl }} accessible={false} resizeMode={`cover`} onError={() => setFailed(true)} /> : <View nativeID={`${id}-fallback-icon-wrap`} style={styles.thumbnailIcon} pointerEvents={`none`} accessibilityElementsHidden importantForAccessibility={`no-hide-descendants`}><SvgXml width={`100%`} height={`100%`} accessible={false} xml={themeArtwork(dragonTypeIcons[example.kind])} nativeID={`${id}-fallback-icon`} /></View>;
};

const FullPageDetail = (props: DragonExampleDetailViewProps) => {
  const { id, example, modal, onClose, onSelect, onOpenSource } = props;
  const { isDark, palette, themeArtwork } = useTheme();
  const styles = useThemedStyles(baseStyles);
  const reducedMotion = useReducedMotion();
  const transition = useRef(new Animated.Value(1)).current;
  const thumbnailStrip = useRef<ScrollView>(null);
  const [viewWidth, setViewWidth] = useState(0);
  const [sourceError, setSourceError] = useState<string>();
  const wide = viewWidth >= 900;
  const { collection, metadata, currentIndex, previous, next, selectPrevious, selectNext } = useDragonExampleDetailView(props);
  const frameId = `${id}-${example.id}`;
  const headerTexture = blackSteelTextureXml.replace(/brushed-steel-texture/g, `${id}-steel`);
  useEffect(() => {
    setSourceError(undefined);
    transition.stopAnimation();
    if (reducedMotion) { transition.setValue(1); return; }
    transition.setValue(0);
    Animated.timing(transition, { toValue: 1, duration: 240, useNativeDriver: true }).start();
    return () => transition.stopAnimation();
  }, [example.id, reducedMotion, transition]);
  useEffect(() => {
    thumbnailStrip.current?.scrollTo({ x: Math.max(0, currentIndex * 160 - 160), animated: !reducedMotion });
  }, [currentIndex, reducedMotion]);
  const openSource = (url: string) => {
    setSourceError(undefined);
    void (onOpenSource?.(url) ?? Linking.openURL(url)).catch(() => setSourceError(`This Source Could Not Be Opened`));
  };

  return <View nativeID={id} testID={id} style={styles.detail} onLayout={({ nativeEvent }) => setViewWidth(nativeEvent.layout.width)}>
    <View nativeID={`${id}-header`} style={styles.header}>
      <View nativeID={`${id}-header-steel`} style={styles.headerArtwork} pointerEvents={`none`} accessibilityElementsHidden importantForAccessibility={`no-hide-descendants`}><SvgXml xml={headerTexture} width={`100%`} height={`100%`} accessible={false} preserveAspectRatio={`none`} /></View>
      <View nativeID={`${frameId}-form-icon-wrap`} style={styles.formIcon} pointerEvents={`none`} accessibilityElementsHidden importantForAccessibility={`no-hide-descendants`}><SvgXml xml={themeArtwork(dragonTypeIcons[example.kind])} width={`100%`} height={`100%`} accessible={false} nativeID={`${frameId}-form-icon`} /></View>
      <View nativeID={`${frameId}-identity`} style={styles.identity}><Text nativeID={`${frameId}-franchise`} style={styles.franchise}>{example.franchise}</Text><Text nativeID={`${frameId}-title`} accessibilityRole={`header`} style={styles.title}>{example.name}</Text></View>
      {onClose && <Pressable nativeID={`${id}-close`} accessibilityRole={`button`} accessibilityLabel={`Close Dragon Details`} onPress={onClose} style={({ pressed }) => [styles.close, pressed && styles.pressed]}><X size={23} color={`#f4f6f8`} accessible={false} /></Pressable>}
    </View>
    <View nativeID={`${id}-navigation`} style={styles.navigation}>
      <Pressable nativeID={`${id}-previous`} accessibilityRole={`button`} disabled={collection.length < 2} accessibilityState={{ disabled: collection.length < 2 }} accessibilityLabel={`Previous Dragon${previous ? `: ${previous.name}` : ``}`} onPress={selectPrevious} style={({ pressed }) => [styles.navButton, collection.length < 2 && styles.disabled, pressed && styles.pressed]}><ArrowLeft size={18} color={palette.ink} accessible={false} /><Text style={styles.controlLabel}>Previous</Text></Pressable>
      <Text nativeID={`${id}-counter`} accessibilityLiveRegion={`polite`} style={styles.counter}>{currentIndex + 1} / {collection.length}</Text>
      <Pressable nativeID={`${id}-next`} accessibilityRole={`button`} disabled={collection.length < 2} accessibilityState={{ disabled: collection.length < 2 }} accessibilityLabel={`Next Dragon${next ? `: ${next.name}` : ``}`} onPress={selectNext} style={({ pressed }) => [styles.navButton, collection.length < 2 && styles.disabled, pressed && styles.pressed]}><Text style={styles.controlLabel}>Next</Text><ArrowRight size={18} color={palette.ink} accessible={false} /></Pressable>
      {modal && <Link href={dragonExamplePath(example)} asChild><Pressable nativeID={`${frameId}-full-page`} accessibilityRole={`link`} onPress={onClose} style={({ pressed }) => [styles.fullPage, pressed && styles.pressed]}><ExternalLink size={17} color={palette.ink} accessible={false} /><Text style={styles.controlLabel}>Open Full Page</Text></Pressable></Link>}
    </View>
    <Animated.View nativeID={`${frameId}-frame`} style={[styles.frame, { opacity: transition, transform: [{ translateY: transition.interpolate({ inputRange: [0, 1], outputRange: [8, 0] }) }] }]}>
      <View nativeID={`${frameId}-overview`} style={[styles.overview, wide && styles.overviewWide]}>
        <View nativeID={`${frameId}-figure`} style={[styles.figure, wide && styles.figureWide]}><DetailMedia key={example.id} id={frameId} example={example} onOpenSource={openSource} />{example.imageCredit && <Text nativeID={`${frameId}-credit`} style={styles.credit}>{example.imageCredit}</Text>}</View>
        <View nativeID={`${frameId}-facts`} style={[styles.facts, wide && styles.factsWide]}>
          <Text nativeID={`${frameId}-canon`} style={styles.canon}>{example.canonLabel}</Text>
          <View nativeID={`${frameId}-metadata`} style={styles.metadata}>{metadata.map(field => <View key={field.label} nativeID={`${frameId}-field-${field.label.toLowerCase()}`} style={styles.metadataField}><Text style={styles.metadataLabel}>{field.label}</Text><View style={styles.metadataValues}>{field.values.length ? field.values.map((value, index) => <View key={`${value}-${index}`} nativeID={`${frameId}-${field.label.toLowerCase()}-${index}`} style={styles.tag}><Text style={styles.tagLabel}>{value}</Text></View>) : <Text style={styles.metadataEmpty}>Not Documented</Text>}</View></View>)}</View>
          <View nativeID={`${frameId}-sources`} style={styles.sources}>
            <Pressable nativeID={`${frameId}-source`} accessibilityRole={`link`} accessibilityLabel={`View Original Source For ${example.name}`} onPress={() => openSource(example.sourceUrl)} style={({ pressed }) => [styles.sourceLink, pressed && styles.pressed]}><BookOpen size={18} color={palette.ink} accessible={false} /><Text style={[styles.controlLabel, styles.sourceLabel]}>View Original Source</Text><ArrowUpRight size={17} color={palette.ink} accessible={false} /></Pressable>
            {example.anatomySourceUrl && <Pressable nativeID={`${frameId}-anatomy-source`} accessibilityRole={`link`} accessibilityLabel={`View Anatomy Reference For ${example.name}`} onPress={() => openSource(example.anatomySourceUrl ?? example.sourceUrl)} style={({ pressed }) => [styles.sourceLink, pressed && styles.pressed]}><BookOpen size={18} color={palette.ink} accessible={false} /><Text style={[styles.controlLabel, styles.sourceLabel]}>Anatomy Reference</Text><ArrowUpRight size={17} color={palette.ink} accessible={false} /></Pressable>}
            {example.videoSourceUrl && <Pressable nativeID={`${frameId}-video-source`} accessibilityRole={`link`} accessibilityLabel={`Watch ${example.name} Full Clip`} onPress={() => openSource(example.videoSourceUrl ?? example.sourceUrl)} style={({ pressed }) => [styles.sourceLink, pressed && styles.pressed]}><Play size={18} color={palette.ink} accessible={false} /><Text style={[styles.controlLabel, styles.sourceLabel]}>Watch Full Clip</Text><ArrowUpRight size={17} color={palette.ink} accessible={false} /></Pressable>}
            {sourceError && <Text nativeID={`${frameId}-source-error`} accessibilityLiveRegion={`polite`} style={styles.error}>{sourceError}</Text>}
          </View>
        </View>
      </View>
      <View nativeID={`${frameId}-story-grid`} style={[styles.storyGrid, wide && styles.storyGridWide]}>
        <View nativeID={`${frameId}-story`} style={[styles.story, wide && styles.storyWide]}><Text nativeID={`${frameId}-story-title`} accessibilityRole={`header`} style={styles.sectionTitle}>About {example.name}</Text><Text nativeID={`${frameId}-description`} style={styles.description}>{example.description}</Text></View>
        <View nativeID={`${frameId}-anatomy`} style={[styles.anatomy, wide && styles.anatomyWide]}><Text nativeID={`${frameId}-anatomy-title`} accessibilityRole={`header`} style={styles.sectionTitle}>Anatomy &amp; Form</Text><View nativeID={`${frameId}-traits`} style={styles.traits}>{example.anatomy.map((trait, index) => <View key={trait} nativeID={`${frameId}-trait-${index}`} style={styles.trait}><Text style={styles.bullet}>•</Text><Text style={styles.traitText}>{trait}</Text></View>)}</View><Text nativeID={`${frameId}-form-note`} style={styles.formNote}>{example.formNote}</Text><Link href={dragonFormPath(example.kind)} asChild><Pressable nativeID={`${frameId}-form-page`} accessibilityRole={`link`} onPress={onClose} style={({ pressed }) => [styles.formLink, pressed && styles.pressed]}><Text style={[styles.controlLabel, styles.sourceLabel]}>Explore The {example.formName} Form</Text><ArrowUpRight size={17} color={palette.ink} accessible={false} /></Pressable></Link></View>
      </View>
    </Animated.View>
    <View nativeID={`${id}-collection`} style={styles.collection}>
      <View nativeID={`${id}-collection-heading`} style={styles.collectionHeading}><Text accessibilityRole={`header`} style={styles.sectionTitle}>Across Different Worlds</Text><Text style={styles.collectionCount}>{collection.length} Dragon Reference(s)</Text></View>
      <ScrollView ref={thumbnailStrip} nativeID={`${id}-thumbnails`} horizontal showsHorizontalScrollIndicator indicatorStyle={isDark ? `white` : `black`} contentContainerStyle={styles.thumbnails}>{collection.map(item => {
        const thumbnailId = `${id}-thumbnail-${item.id}`;
        const active = item.id === example.id;
        return <Pressable key={item.id} nativeID={thumbnailId} accessibilityRole={`button`} accessibilityState={{ selected: active }} accessibilityLabel={`View ${item.name} From ${item.franchise}`} onPress={() => onSelect(item.id)} style={({ pressed }) => [styles.thumbnail, active && styles.thumbnailActive, pressed && styles.pressed]}><View nativeID={`${thumbnailId}-art`} style={styles.thumbnailArt}><Thumbnail id={thumbnailId} example={item} /></View><Text nativeID={`${thumbnailId}-name`} style={styles.thumbnailName}>{item.name}</Text><Text nativeID={`${thumbnailId}-franchise`} style={styles.thumbnailFranchise}>{item.franchise}</Text></Pressable>;
      })}</ScrollView>
    </View>
    <CardCorners id={`${id}-corners`} fill={palette.silver} stroke={palette.line} />
  </View>;
};

const detailTabs = [
  { key: `artwork`, label: `Artwork`, icon: Images },
  { key: `overview`, label: `Overview`, icon: FileText },
  { key: `details`, label: `Details`, icon: Info },
  { key: `anatomy`, label: `Anatomy`, icon: List },
  { key: `sources`, label: `Sources`, icon: BookOpen },
] as const;
type DetailTab = (typeof detailTabs)[number][`key`];

const ModalDetail = (props: DragonExampleDetailViewProps) => {
  const { id, example, onClose, onSelect, onOpenSource } = props;
  const { isDark, palette, themeArtwork } = useTheme();
  const { fontScale, height: windowHeight } = useWindowDimensions();
  const styles = useThemedStyles(baseStyles);
  const reducedMotion = useReducedMotion();
  const pane = useRef<ScrollView>(null);
  const thumbnailStrip = useRef<ScrollView>(null);
  const transition = useRef(new Animated.Value(1)).current;
  const [selectedTab, setSelectedTab] = useState<DetailTab>(`artwork`);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [paneHeight, setPaneHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [stripWidth, setStripWidth] = useState(0);
  const [sourceError, setSourceError] = useState<string>();
  const { collection, metadata, currentIndex, previous, next, selectPrevious, selectNext } = useDragonExampleDetailView(props);
  const viewportHeight = size.height || windowHeight;
  const shortChrome = viewportHeight < 400;
  const chromeScale = shortChrome ? Math.min(fontScale, 1.3) : fontScale;
  const compact = viewportHeight < 580;
  const wide = size.width >= 900 && size.height >= 460 && fontScale <= 1.3;
  const activeTab = wide && selectedTab === `artwork` ? `overview` : selectedTab;
  const tabs = wide ? detailTabs.filter(tab => tab.key !== `artwork`) : detailTabs;
  const thumbnailWidth = compact ? 80 : 96;
  const artworkHeight = compact ? 44 : 58;
  const tabHeight = Math.max(52, 22 * chromeScale + 26);
  const frameId = `${id}-${example.id}`;
  const canScroll = contentHeight > paneHeight + 1;
  const headerTexture = blackSteelTextureXml.replace(/brushed-steel-texture/g, `${id}-steel`);
  useEffect(() => {
    setSourceError(undefined);
  }, [example.id]);
  useEffect(() => {
    pane.current?.scrollTo({ y: 0, animated: false });
    transition.stopAnimation();
    if (reducedMotion) { transition.setValue(1); return; }
    transition.setValue(0);
    const animation = Animated.timing(transition, { toValue: 1, duration: 220, useNativeDriver: true, isInteraction: false });
    animation.start();
    return () => animation.stop();
  }, [example.id, activeTab, reducedMotion, transition]);
  useEffect(() => {
    thumbnailStrip.current?.scrollTo({ x: Math.max(0, 4 + currentIndex * (thumbnailWidth + 8) - (stripWidth - thumbnailWidth) / 2), animated: !reducedMotion });
  }, [currentIndex, stripWidth, thumbnailWidth, reducedMotion]);
  const openSource = (url: string) => {
    setSourceError(undefined);
    void (onOpenSource?.(url) ?? Linking.openURL(url)).catch(() => setSourceError(`This Source Could Not Be Opened`));
  };
  const sources = <View nativeID={`${frameId}-sources`} style={styles.modalContent}>
    <Text nativeID={`${frameId}-sources-title`} accessibilityRole={`header`} style={styles.modalSectionTitle}>{example.franchise}</Text>
    {example.imageCredit ? <Text nativeID={`${frameId}-credit`} style={styles.modalNote}>{example.imageCredit}</Text> : null}
    <Pressable nativeID={`${frameId}-source`} accessibilityRole={`link`} accessibilityLabel={`View Original Source For ${example.name}`} onPress={() => openSource(example.sourceUrl)} style={({ pressed }) => [styles.sourceLink, pressed && styles.pressed]}><BookOpen size={18} color={palette.ink} accessible={false} /><Text style={[styles.modalControlLabel, styles.sourceLabel]}>View Original Source</Text><ArrowUpRight size={17} color={palette.ink} accessible={false} /></Pressable>
    {example.anatomySourceUrl ? <Pressable nativeID={`${frameId}-anatomy-source`} accessibilityRole={`link`} accessibilityLabel={`View Anatomy Reference For ${example.name}`} onPress={() => openSource(example.anatomySourceUrl ?? example.sourceUrl)} style={({ pressed }) => [styles.sourceLink, pressed && styles.pressed]}><BookOpen size={18} color={palette.ink} accessible={false} /><Text style={[styles.modalControlLabel, styles.sourceLabel]}>Anatomy Reference</Text><ArrowUpRight size={17} color={palette.ink} accessible={false} /></Pressable> : null}
    {example.videoSourceUrl ? <Pressable nativeID={`${frameId}-video-source`} accessibilityRole={`link`} accessibilityLabel={`Watch ${example.name} Full Clip`} onPress={() => openSource(example.videoSourceUrl ?? example.sourceUrl)} style={({ pressed }) => [styles.sourceLink, pressed && styles.pressed]}><Play size={18} color={palette.ink} accessible={false} /><Text style={[styles.modalControlLabel, styles.sourceLabel]}>Watch Full Clip</Text><ArrowUpRight size={17} color={palette.ink} accessible={false} /></Pressable> : null}
  </View>;
  const content = activeTab === `overview` ? <View nativeID={`${frameId}-overview`} style={styles.modalContent}>
    <Text nativeID={`${frameId}-overview-title`} accessibilityRole={`header`} style={styles.modalSectionTitle}>About {example.name}</Text>
    <Text nativeID={`${frameId}-description`} style={styles.modalDescription}>{example.description}</Text>
  </View> : activeTab === `details` ? <View nativeID={`${frameId}-metadata`} style={styles.modalContent}>
    <Text nativeID={`${frameId}-canon`} style={styles.modalCanon}>{example.canonLabel}</Text>
    <View nativeID={`${frameId}-metadata-grid`} style={[styles.modalMetadata, wide && styles.modalMetadataWide]}>{metadata.map(field => <View key={field.label} nativeID={`${frameId}-field-${field.label.toLowerCase()}`} style={[styles.modalMetadataField, wide && styles.modalMetadataFieldWide]}><Text style={styles.modalMetadataLabel}>{field.label}</Text><View style={styles.metadataValues}>{field.values.length ? field.values.map((value, index) => <View key={`${value}-${index}`} nativeID={`${frameId}-${field.label.toLowerCase()}-${index}`} style={styles.modalTag}><Text style={styles.modalTagLabel}>{value}</Text></View>) : <Text style={styles.modalNote}>Not Documented</Text>}</View></View>)}</View>
  </View> : activeTab === `anatomy` ? <View nativeID={`${frameId}-anatomy`} style={styles.modalContent}>
    <Text nativeID={`${frameId}-anatomy-title`} accessibilityRole={`header`} style={styles.modalSectionTitle}>Anatomy &amp; Form</Text>
    <View nativeID={`${frameId}-traits`} style={styles.traits}>{example.anatomy.map((trait, index) => <View key={trait} nativeID={`${frameId}-trait-${index}`} style={styles.trait}><Text style={styles.modalBullet}>•</Text><Text style={styles.modalTraitText}>{trait}</Text></View>)}</View>
    <Text nativeID={`${frameId}-form-note`} style={styles.modalNote}>{example.formNote}</Text>
    <Link href={dragonFormPath(example.kind)} asChild><Pressable nativeID={`${frameId}-form-page`} accessibilityRole={`link`} onPress={onClose} style={({ pressed }) => [styles.formLink, pressed && styles.pressed]}><Text style={[styles.modalControlLabel, styles.sourceLabel]}>Explore {example.formName}</Text><ArrowUpRight size={17} color={palette.ink} accessible={false} /></Pressable></Link>
  </View> : sources;

  return <View nativeID={id} testID={id} style={styles.modalDetail} onLayout={({ nativeEvent }) => setSize({ width: nativeEvent.layout.width, height: nativeEvent.layout.height })}>
    <View nativeID={`${id}-header`} style={[styles.modalHeader, shortChrome && styles.modalHeaderShort]}>
      <View nativeID={`${id}-header-steel`} style={styles.headerArtwork} pointerEvents={`none`} accessibilityElementsHidden importantForAccessibility={`no-hide-descendants`}><SvgXml xml={headerTexture} width={`100%`} height={`100%`} accessible={false} preserveAspectRatio={`none`} /></View>
      <View nativeID={`${frameId}-form-icon-wrap`} style={styles.modalFormIcon} pointerEvents={`none`} accessibilityElementsHidden importantForAccessibility={`no-hide-descendants`}><SvgXml xml={themeArtwork(dragonTypeIcons[example.kind])} width={`100%`} height={`100%`} accessible={false} nativeID={`${frameId}-form-icon`} /></View>
      <View nativeID={`${frameId}-identity`} style={styles.identity}>{shortChrome ? null : <Text nativeID={`${frameId}-franchise`} numberOfLines={1} style={styles.modalFranchise}>{example.franchise}</Text>}<Text nativeID={`${frameId}-title`} numberOfLines={shortChrome ? 1 : 2} maxFontSizeMultiplier={shortChrome ? 1.3 : undefined} adjustsFontSizeToFit minimumFontScale={.8} accessibilityRole={`header`} accessibilityLabel={example.name} style={styles.modalTitle}>{example.name}</Text></View>
      {onClose ? <Pressable nativeID={`${id}-close`} accessibilityRole={`button`} accessibilityLabel={`Close Dragon Details`} onPress={onClose} style={({ pressed }) => [styles.modalClose, pressed && styles.pressed]}><AngledSurface id={`${id}-close-surface`} fill={palette.paper} stroke={palette.red} /><X size={22} color={palette.red} accessible={false} /></Pressable> : null}
    </View>
    {sourceError ? <Text nativeID={`${frameId}-source-error`} maxFontSizeMultiplier={shortChrome ? 1.3 : undefined} accessibilityLiveRegion={`polite`} style={styles.modalError}>{sourceError}</Text> : null}
    <Animated.View nativeID={`${frameId}-body`} style={[styles.modalBody, wide && styles.modalBodyWide, { opacity: transition }]}>
      {wide ? <View nativeID={`${frameId}-artwork`} style={styles.modalArtwork}><DetailMedia key={example.id} id={frameId} fit example={example} onOpenSource={openSource} /></View> : null}
      <View nativeID={`${id}-panes`} style={styles.modalPanes}>
        <ScrollView horizontal nativeID={`${id}-tabs`} showsHorizontalScrollIndicator={false} style={[styles.modalTabs, { height: tabHeight }]} contentContainerStyle={styles.modalTabsContent}>
          {tabs.map(tab => {
            const Icon = tab.icon;
            const selected = activeTab === tab.key;
            return <Pressable key={tab.key} nativeID={`${id}-tab-${tab.key}`} accessibilityRole={`tab`} accessibilityState={{ selected }} accessibilityLabel={tab.label} onPress={() => setSelectedTab(tab.key)} style={({ pressed }) => [styles.modalTab, selected && styles.modalTabActive, pressed && styles.pressed]}><Icon size={16} color={selected ? palette.paper : palette.ink} accessible={false} /><Text maxFontSizeMultiplier={shortChrome ? 1.3 : undefined} style={[styles.modalTabLabel, selected && { color: palette.paper }]}>{tab.label}</Text></Pressable>;
          })}
        </ScrollView>
        {activeTab === `artwork` ? <ScrollView ref={pane} key={`${example.id}-artwork`} nativeID={`${frameId}-artwork-pane`} bounces={false} style={styles.modalPane} contentContainerStyle={styles.modalArtContent} scrollEnabled={canScroll} showsVerticalScrollIndicator={canScroll} nestedScrollEnabled indicatorStyle={isDark ? `white` : `black`} onLayout={({ nativeEvent }) => setPaneHeight(nativeEvent.layout.height)} onContentSizeChange={(_, height) => setContentHeight(height)}><View nativeID={`${frameId}-artwork-fit`} style={[styles.modalArtPane, { minHeight: compact ? 160 : 220 }]}><DetailMedia key={example.id} id={frameId} fit example={example} onOpenSource={openSource} /></View></ScrollView> : <ScrollView ref={pane} key={`${example.id}-${activeTab}`} nativeID={`${frameId}-pane-${activeTab}`} bounces={false} style={styles.modalPane} contentContainerStyle={styles.modalPaneContent} scrollEnabled={canScroll} showsVerticalScrollIndicator={canScroll} nestedScrollEnabled indicatorStyle={isDark ? `white` : `black`} onLayout={({ nativeEvent }) => setPaneHeight(nativeEvent.layout.height)} onContentSizeChange={(_, height) => setContentHeight(height)}>{content}</ScrollView>}
      </View>
    </Animated.View>
    <View nativeID={`${id}-pagination`} style={styles.modalFooter}>
      <View nativeID={`${id}-navigation`} style={styles.modalNavigation}>
        <Pressable nativeID={`${id}-previous`} accessibilityRole={`button`} disabled={collection.length < 2} accessibilityState={{ disabled: collection.length < 2 }} accessibilityLabel={`Previous Dragon${previous ? `: ${previous.name}` : ``}`} onPress={selectPrevious} style={({ pressed }) => [styles.modalNavButton, collection.length < 2 && styles.disabled, pressed && styles.pressed]}><ArrowLeft size={20} color={palette.ink} accessible={false} /></Pressable>
        <Text nativeID={`${id}-counter`} numberOfLines={1} maxFontSizeMultiplier={shortChrome ? 1.3 : undefined} adjustsFontSizeToFit minimumFontScale={.75} accessibilityLiveRegion={`polite`} style={styles.modalCounter}>{currentIndex + 1} / {collection.length}</Text>
        <Pressable nativeID={`${id}-next`} accessibilityRole={`button`} disabled={collection.length < 2} accessibilityState={{ disabled: collection.length < 2 }} accessibilityLabel={`Next Dragon${next ? `: ${next.name}` : ``}`} onPress={selectNext} style={({ pressed }) => [styles.modalNavButton, collection.length < 2 && styles.disabled, pressed && styles.pressed]}><ArrowRight size={20} color={palette.ink} accessible={false} /></Pressable>
        <Link href={dragonExamplePath(example)} asChild><Pressable nativeID={`${frameId}-full-page`} accessibilityRole={`link`} accessibilityLabel={`Open Full Page For ${example.name}`} onPress={onClose} style={({ pressed }) => [styles.modalNavButton, pressed && styles.pressed]}><ExternalLink size={19} color={palette.ink} accessible={false} /></Pressable></Link>
      </View>
      <ScrollView ref={thumbnailStrip} horizontal nativeID={`${id}-thumbnails`} showsHorizontalScrollIndicator={false} indicatorStyle={isDark ? `white` : `black`} style={[styles.modalThumbnailStrip, { height: artworkHeight + (shortChrome ? 16 : 22 * fontScale + 16) }]} contentContainerStyle={styles.modalThumbnails} onLayout={({ nativeEvent }) => setStripWidth(nativeEvent.layout.width)}>{collection.map(item => {
        const thumbnailId = `${id}-thumbnail-${item.id}`;
        const active = item.id === example.id;
        return <Pressable key={item.id} nativeID={thumbnailId} accessibilityRole={`button`} accessibilityState={{ selected: active }} accessibilityLabel={`View ${item.name} From ${item.franchise}`} onPress={() => onSelect(item.id)} style={({ pressed }) => [styles.modalThumbnail, { width: thumbnailWidth }, active && styles.thumbnailActive, pressed && styles.pressed]}><View nativeID={`${thumbnailId}-art`} style={[styles.modalThumbnailArt, { height: artworkHeight }]}><Thumbnail id={thumbnailId} example={item} /></View>{shortChrome ? null : <Text nativeID={`${thumbnailId}-name`} numberOfLines={1} ellipsizeMode={`tail`} style={styles.modalThumbnailName}>{item.name}</Text>}</Pressable>;
      })}</ScrollView>
    </View>
  </View>;
};

const DragonExampleDetailView = (props: DragonExampleDetailViewProps) => props.modal ? <ModalDetail {...props} /> : <FullPageDetail {...props} />;
export default DragonExampleDetailView;
export type { DragonExampleDetailViewProps } from './types';
