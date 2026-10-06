import baseStyles from './styles.native';
import { SvgXml } from 'react-native-svg';
import { ArrowUpRight } from 'lucide-react-native';
import type { DragonTypeCardProps } from './types';
import { Text, View, Pressable } from 'react-native';
import { getDragonTypeCardContent } from './content';
import { dragonTypeGraphics } from '../../shared/landingArtwork';
import { useTheme, useThemedStyles } from '../../shared/themeContext/ThemeContext';

const DragonTypeCard = ({ type, onSelect }: DragonTypeCardProps) => {
  const styles = useThemedStyles(baseStyles);
  const { palette, themeArtwork } = useTheme();
  const { traits, specimen } = getDragonTypeCardContent(type);

  return (
    <Pressable
      onPress={onSelect}
      disabled={!onSelect}
      accessibilityRole={`button`}
      accessibilityLabel={`Filter by ${type.name}`}
      accessibilityHint={`${traits}. ${type.description} Filters the archive to this form.`}
      nativeID={`dragon-type-card-${type.id}`}
      testID={`dragon-type-card-${type.id}`}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.metadata} nativeID={`dragon-type-metadata-${type.id}`}>
        <Text style={styles.specimen} nativeID={`dragon-type-specimen-${type.id}`}>{specimen}</Text>
        <Text style={styles.category} nativeID={`dragon-type-category-${type.id}`}>Dragon form</Text>
      </View>
      <View
        style={styles.artFrame}
        pointerEvents={`none`}
        accessibilityElementsHidden
        importantForAccessibility={`no-hide-descendants`}
        nativeID={`dragon-type-art-frame-${type.id}`}
        testID={`dragon-type-art-frame-${type.id}`}
      >
        <SvgXml xml={themeArtwork(dragonTypeGraphics[type.kind])} width={`100%`} height={`100%`} />
      </View>
      <View style={styles.body} nativeID={`dragon-type-body-${type.id}`} testID={`dragon-type-body-${type.id}`}>
        <Text
          style={styles.title}
          nativeID={`dragon-type-title-${type.id}`}
          testID={`dragon-type-title-${type.id}`}
        >
          {type.name}
        </Text>
        <Text style={styles.traits} nativeID={`dragon-type-traits-${type.id}`}>{traits}</Text>
        <Text style={styles.description} nativeID={`dragon-type-description-${type.id}`}>{type.description}</Text>
      </View>
      <View style={styles.action} nativeID={`dragon-type-action-${type.id}`} testID={`dragon-type-action-${type.id}`}>
        <Text style={styles.actionLabel} nativeID={`dragon-type-action-label-${type.id}`}>Filter by form</Text>
        <ArrowUpRight size={19} color={palette.ink} accessible={false} />
      </View>
    </Pressable>
  );
};

export default DragonTypeCard;
