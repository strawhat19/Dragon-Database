import { useState } from 'react';
import { SvgXml } from 'react-native-svg';
import { Play, Pause } from 'lucide-react-native';
import { Text, View, Image, Pressable } from 'react-native';
import baseStyles from './styles.native';
import { dragonTypeIcons } from '../../shared/dragonTypeIcons';
import { useReducedMotion } from '../../shared/motion/useReducedMotion';
import { useTheme, useThemedStyles } from '../../shared/themeContext/ThemeContext';
import type { DragonExampleDetail } from '../../shared/models/dragons/DragonExampleDetail';

type MediaProps = { id: string; fit?: boolean; example: DragonExampleDetail; onOpenSource: (url: string) => void };

const DetailMedia = ({ id, example, onOpenSource, fit }: MediaProps) => {
  const { themeArtwork } = useTheme();
  const styles = useThemedStyles(baseStyles);
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(true);
  const [gifFailed, setGifFailed] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const canPlayGif = Boolean(example.gifUrl && !gifFailed && !reducedMotion);
  const gifUrl = canPlayGif && !paused ? example.gifUrl : undefined;
  const imageUrl = gifUrl ?? example.imageUrl;
  const videoSource = example.videoSourceUrl ?? example.videoUrl ?? example.videoEmbedUrl;
  const sourceHint = fit ? `Open Sources Tab` : `View Source Below`;
  const unavailableLabel = imageFailed ? `Artwork Unavailable · ${sourceHint}` : fit ? `Explore The Sources Tab` : `Explore The Original Source Below`;

  return <View style={[styles.media, fit && styles.modalMedia]} nativeID={`${id}-media`}>
    {imageUrl && (gifUrl || !imageFailed) ? <Image key={imageUrl} nativeID={`${id}-image`} style={styles.image} source={{ uri: imageUrl }} resizeMode={`contain`} accessibilityLabel={example.imageAlt ?? `${example.name} — ${example.franchise}`} onError={() => gifUrl ? setGifFailed(true) : setImageFailed(true)} /> : <View style={styles.artUnavailable} nativeID={`${id}-art-unavailable`}><View style={styles.referenceIcon} nativeID={`${id}-reference-icon-wrap`} pointerEvents={`none`} accessibilityElementsHidden importantForAccessibility={`no-hide-descendants`}><SvgXml width={`100%`} height={`100%`} accessible={false} xml={themeArtwork(dragonTypeIcons[example.kind])} nativeID={`${id}-reference-icon`} /></View><Text style={styles.unavailableLabel} nativeID={`${id}-unavailable-label`}>{unavailableLabel}</Text></View>}
    {canPlayGif && <Pressable nativeID={`${id}-motion-toggle`} accessibilityRole={`button`} accessibilityLabel={`${paused ? `Play` : `Pause`} ${example.name} Animation`} onPress={() => setPaused(current => !current)} style={({ pressed }) => [styles.motionControl, pressed && styles.pressed]}>{paused ? <Play size={18} color={`#f4f6f8`} accessible={false} /> : <Pause size={18} color={`#f4f6f8`} accessible={false} />}<Text nativeID={`${id}-motion-label`} style={styles.mediaControlLabel}>{paused ? `Play Preview` : `Pause Preview`}</Text></Pressable>}
    {videoSource && <Pressable nativeID={`${id}-watch-video`} accessibilityRole={`link`} accessibilityLabel={`Watch ${example.name} Full Clip`} accessibilityHint={`Opens the video source in your browser`} onPress={() => onOpenSource(videoSource)} style={({ pressed }) => [styles.videoControl, pressed && styles.pressed]}><Play size={18} color={`#f4f6f8`} accessible={false} /><Text nativeID={`${id}-watch-video-label`} style={styles.mediaControlLabel}>Watch Full Clip</Text></Pressable>}
  </View>;
};

export default DetailMedia;
