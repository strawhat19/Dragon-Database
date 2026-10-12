import { useState } from 'react';
import baseStyles from './styles.native';
import { SvgXml } from 'react-native-svg';
import type { DragonExampleCardProps } from './types';
import { Info, Play, Pause } from 'lucide-react-native';
import AngledSurface from '../AngledSurface/index.native';
import CardCorners from '../DragonTypeCard/CardCorners.native';
import { blackSteelTextureXml } from '../../shared/cardArtwork';
import { Text, View, Image, Linking, Pressable } from 'react-native';
import { useReducedMotion } from '../../shared/motion/useReducedMotion';
import { useTheme, useThemedStyles } from '../../shared/themeContext/ThemeContext';

const DragonExampleCard = ({ id, example, iconXml, wide, onOpenSource, onOpenDetails }: DragonExampleCardProps) => {
  const { palette, themeArtwork } = useTheme();
  const styles = useThemedStyles(baseStyles);
  const reducedMotion = useReducedMotion();
  const [motionPaused, setMotionPaused] = useState(false);
  const [failedGifUrl, setFailedGifUrl] = useState<string>();
  const [failedImageUrl, setFailedImageUrl] = useState<string>();
  const videoSource = example.videoSourceUrl ?? example.videoUrl;
  const canPlayGif = Boolean(!reducedMotion && example.gifUrl && failedGifUrl !== example.gifUrl);
  const hasAnimatedGif = canPlayGif && !motionPaused;
  const imageSource = hasAnimatedGif ? example.gifUrl : example.imageUrl;
  const hasImage = Boolean(imageSource && (hasAnimatedGif || failedImageUrl !== imageSource));
  const headerTexture = blackSteelTextureXml.replace(/brushed-steel-texture/g, `${id}-steel`);
  const openDetails = () => { setMotionPaused(true); onOpenDetails?.(); };
  const openSource = (url: string) => {
    void (onOpenSource?.(url) ?? Linking.openURL(url)).catch((error: unknown) => console.warn(`Dragon Source Could Not Be Opened`, error));
  };
  const artwork = hasImage ? (
    <Image
      key={imageSource}
      resizeMode={`cover`}
      style={styles.image}
      accessible={!videoSource}
      nativeID={`${id}-image`}
      source={{ uri: imageSource }}
      onError={() => hasAnimatedGif ? setFailedGifUrl(example.gifUrl) : setFailedImageUrl(example.imageUrl)}
      accessibilityLabel={example.imageAlt ?? `${example.name} — ${example.franchise}`}
    />
  ) : (
    <View style={styles.referenceArt} nativeID={`${id}-art-reference`}>
      <View
        pointerEvents={`none`}
        style={styles.referenceIcon}
        accessibilityElementsHidden
        nativeID={`${id}-reference-icon-wrap`}
        importantForAccessibility={`no-hide-descendants`}
      >
        <SvgXml width={`100%`} height={`100%`} accessible={false} xml={themeArtwork(iconXml)} nativeID={`${id}-reference-icon`} />
      </View>
      <Text style={styles.referenceLabel} nativeID={`${id}-reference-label`}>
        {example.imageUrl || example.gifUrl ? `Artwork Unavailable · View Details` : `Explore The Details`}
      </Text>
    </View>
  );

  return (
    <View nativeID={id} testID={id} style={[styles.card, wide && styles.wideCard]}>
      <View style={styles.header} nativeID={`${id}-header`}>
        <View
          pointerEvents={`none`}
          style={styles.headerArtwork}
          accessibilityElementsHidden
          nativeID={`${id}-header-steel`}
          importantForAccessibility={`no-hide-descendants`}
        >
          <SvgXml xml={headerTexture} width={`100%`} height={`100%`} accessible={false} preserveAspectRatio={`none`} />
        </View>
        <View
          pointerEvents={`none`}
          style={styles.titleIcon}
          accessibilityElementsHidden
          nativeID={`${id}-title-icon-wrap`}
          importantForAccessibility={`no-hide-descendants`}
        >
          <SvgXml width={`100%`} height={`100%`} accessible={false} xml={themeArtwork(iconXml)} nativeID={`${id}-title-icon`} />
        </View>
        <View style={styles.identity} nativeID={`${id}-identity`}>
          <Text
            numberOfLines={2}
            adjustsFontSizeToFit
            style={styles.title}
            minimumFontScale={0.75}
            nativeID={`${id}-title`}
            accessibilityRole={`header`}
          >
            {example.name}
          </Text>
          <Text style={styles.franchise} nativeID={`${id}-franchise`}>{example.franchise}</Text>
        </View>
        <Pressable
          onPress={openDetails}
          disabled={!onOpenDetails}
          nativeID={`${id}-info`}
          accessibilityRole={`button`}
          accessibilityState={{ disabled: !onOpenDetails }}
          accessibilityLabel={`View ${example.name} Details`}
          style={({ pressed }) => [styles.info, !onOpenDetails && styles.disabled, pressed && styles.pressed]}
        >
          <AngledSurface id={`${id}-info-surface`} fill={palette.red} stroke={palette.red} />
          <Info size={21} strokeWidth={2.25} color={palette.paper} accessible={false} />
        </Pressable>
      </View>
      <View style={styles.artFrame} nativeID={`${id}-art`}>
        {videoSource ? (
          <Pressable
            accessibilityRole={`link`}
            nativeID={`${id}-video`}
            onPress={() => openSource(videoSource)}
            accessibilityLabel={`Watch ${example.name} Video`}
            style={({ pressed }) => [styles.mediaLink, pressed && styles.pressed]}
            accessibilityHint={`Opens the video source in your browser`}
          >
            {artwork}
            <View style={styles.playOverlay} pointerEvents={`none`} nativeID={`${id}-video-overlay`}>
              <View style={styles.playBadge} nativeID={`${id}-video-play-badge`}>
                <Play size={19} color={`#f4f6f8`} fill={`#f4f6f8`} accessible={false} />
                <Text style={styles.playLabel} nativeID={`${id}-video-play-label`}>Watch Video</Text>
              </View>
            </View>
          </Pressable>
        ) : artwork}
        {canPlayGif && (
          <Pressable
            accessibilityRole={`button`}
            nativeID={`${id}-motion-toggle`}
            onPress={() => setMotionPaused(paused => !paused)}
            style={({ pressed }) => [styles.motionControl, pressed && styles.pressed]}
            accessibilityHint={motionPaused ? `Plays the animated preview` : `Shows a still preview`}
            accessibilityLabel={`${motionPaused ? `Play` : `Pause`} ${example.name} Animation`}
          >
            {motionPaused ? <Play size={18} color={`#f4f6f8`} accessible={false} /> : <Pause size={18} color={`#f4f6f8`} accessible={false} />}
            <Text style={styles.playLabel} nativeID={`${id}-motion-toggle-label`}>{motionPaused ? `Play` : `Pause`}</Text>
          </Pressable>
        )}
      </View>
      <View style={styles.body} nativeID={`${id}-body`}>
        <Text numberOfLines={3} ellipsizeMode={`tail`} style={styles.description} nativeID={`${id}-description`}>{example.description}</Text>
      </View>
      <View style={styles.actions} nativeID={`${id}-actions`}>
        <Pressable
          onPress={openDetails}
          disabled={!onOpenDetails}
          nativeID={`${id}-details`}
          accessibilityRole={`button`}
          accessibilityState={{ disabled: !onOpenDetails }}
          accessibilityLabel={`View ${example.name} Details`}
          style={({ pressed }) => [styles.action, pressed && styles.pressed]}
        >
          <Info size={18} color={palette.ink} accessible={false} />
          <Text style={styles.actionLabel} nativeID={`${id}-details-label`}>View Details</Text>
        </Pressable>
      </View>
      <CardCorners id={`${id}-corners`} fill={palette.silver} stroke={palette.line} />
    </View>
  );
};

export default DragonExampleCard;
