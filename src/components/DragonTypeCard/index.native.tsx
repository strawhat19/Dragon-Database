import baseStyles from './styles.native';
import { SvgXml } from 'react-native-svg';
import CardCorners from './CardCorners.native';
import { ArrowUpRight } from 'lucide-react-native';
import type { DragonTypeCardProps } from './types';
import { getDragonTypeCardContent } from './content';
import { steelTextureXml } from '../../shared/artwork';
import useDragonTypeArt from './useDragonTypeArt.native';
import { Text, View, Animated, Pressable } from 'react-native';
import { dragonTypeImages } from '../../shared/dragonTypeImages';
import { useTheme, useThemedStyles } from '../../shared/themeContext/ThemeContext';

const blackSteelColors: Record<string, string> = {
  '#aab3bf': `#0b0c10`,
  '#e1e5ea': `#272c32`,
  '#f3f4f6': `#30343b`,
  '#bac3ce': `#15191f`,
  '#d6dce4': `#111318`,
  '#a2adb9': `#11151a`,
  '#67717d': `#d1d8df`,
  '#f4f6f8': `#747e89`,
};
const blackSteelTextureXml = steelTextureXml.replace(/#[\da-f]{6}/gi, (color) => blackSteelColors[color.toLowerCase()] ?? color);

const DragonTypeCard = ({ type, onSelect }: DragonTypeCardProps) => {
  const { palette, isDark, themeArtwork } = useTheme();
  const image = dragonTypeImages[type.kind];
  const styles = useThemedStyles(baseStyles);
  const { traits, iconXml, formNumber } = getDragonTypeCardContent(type);
  const { onPressIn, onPressOut, baseArtStyle, onAlternateLoad, alternateArtStyle } = useDragonTypeArt(image.hoverSource);

  return (
    <Pressable
      onPress={onSelect}
      disabled={!onSelect}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      accessibilityRole={`button`}
      accessibilityLabel={`Filter by ${type.name}`}
      accessibilityHint={`${traits}. ${type.description} Filters the archive to this form.`}
      nativeID={`dragon-type-card-${type.id}`}
      testID={`dragon-type-card-${type.id}`}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      {({ pressed }) => (
        <>
          <View style={styles.metadata} nativeID={`dragon-type-metadata-${type.id}`}>
            {!isDark && (
              <View
                pointerEvents={`none`}
                accessibilityElementsHidden
                style={styles.metadataArtwork}
                importantForAccessibility={`no-hide-descendants`}
                nativeID={`dragon-type-metadata-steel-${type.id}`}
              >
                <SvgXml xml={blackSteelTextureXml} width={`100%`} height={`100%`} preserveAspectRatio={`none`} />
              </View>
            )}
            <View style={styles.titleGroup} nativeID={`dragon-type-title-group-${type.id}`}>
              <View
                pointerEvents={`none`}
                style={styles.titleIcon}
                accessibilityElementsHidden
                importantForAccessibility={`no-hide-descendants`}
                nativeID={`dragon-type-title-icon-container-${type.id}`}
              >
                <SvgXml
                  width={`100%`}
                  height={`100%`}
                  accessible={false}
                  xml={themeArtwork(iconXml)}
                  nativeID={`dragon-type-title-icon-${type.id}`}
                />
              </View>
              <Text
                style={styles.title}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.65}
                testID={`dragon-type-title-${type.id}`}
                nativeID={`dragon-type-title-${type.id}`}
              >
                {type.name}
              </Text>
            </View>
            <View style={styles.form} nativeID={`dragon-type-form-${type.id}`}>
              <Text style={styles.formLabel} nativeID={`dragon-type-form-label-${type.id}`}>Form</Text>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.85}
                style={styles.formNumber}
                nativeID={`dragon-type-form-number-${type.id}`}
              >
                {formNumber}
              </Text>
            </View>
          </View>
          <View
            style={styles.artFrame}
            pointerEvents={`none`}
            accessibilityElementsHidden
            importantForAccessibility={`no-hide-descendants`}
            nativeID={`dragon-type-art-frame-${type.id}`}
            testID={`dragon-type-art-frame-${type.id}`}
          >
            <Animated.Image
              accessible={false}
              resizeMode={`cover`}
              source={image.source}
              style={[styles.graphic, baseArtStyle]}
              nativeID={`dragon-type-graphic-${type.id}`}
            />
            <Animated.Image
              accessible={false}
              resizeMode={`cover`}
              onLoad={onAlternateLoad}
              source={image.hoverSource}
              nativeID={`dragon-type-alternate-${type.id}`}
              style={[styles.graphic, styles.alternateGraphic, alternateArtStyle]}
            />
          </View>
          <View style={styles.body} nativeID={`dragon-type-body-${type.id}`} testID={`dragon-type-body-${type.id}`}>
            <Text style={styles.traits} nativeID={`dragon-type-traits-${type.id}`}>{traits}</Text>
            <View
              accessible={false}
              pointerEvents={`none`}
              style={styles.separator}
              accessibilityElementsHidden
              importantForAccessibility={`no-hide-descendants`}
              nativeID={`dragon-type-description-separator-${type.id}`}
            />
            <Text style={styles.description} nativeID={`dragon-type-description-${type.id}`}>{type.description}</Text>
          </View>
          <View style={styles.action} nativeID={`dragon-type-action-${type.id}`} testID={`dragon-type-action-${type.id}`}>
            <Text style={styles.actionLabel} nativeID={`dragon-type-action-label-${type.id}`}>Filter by form</Text>
            <ArrowUpRight size={19} color={palette.ink} accessible={false} />
          </View>
          <CardCorners
            fill={palette.silver}
            id={`dragon-type-corners-${type.id}`}
            stroke={pressed ? palette.ink : palette.line}
          />
        </>
      )}
    </Pressable>
  );
};

export default DragonTypeCard;
