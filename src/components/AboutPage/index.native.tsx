import Reveal from '../Reveal';
import { Link } from 'expo-router';
import PageLayout from '../PageLayout';
import baseStyles from './styles.native';
import { SvgXml } from 'react-native-svg';
import { routes } from '../../shared/routes';
import { Mail, ArrowLeft } from 'lucide-react-native';
import { dragonSymbols, steelTextureXml } from '../../shared/artwork';
import { aboutValues, aboutContact, aboutIntroduction } from './content';
import { Text, View, Pressable, useWindowDimensions } from 'react-native';
import { useTheme, useThemedStyles } from '../../shared/themeContext/ThemeContext';

const AboutPage = () => {
  const styles = useThemedStyles(baseStyles);
  const { palette, themeArtwork } = useTheme();
  const { width } = useWindowDimensions();
  const wide = width >= 900;

  return (
    <PageLayout
      id={`about-page`}
      title={`About`}
      description={`The Scaling Collection: a place to explore the forms, traits, and lore of dragons.`}
    >
      <View nativeID={`about-content`} testID={`about-content`} style={styles.content}>
        <Reveal id={`about-introduction-reveal`} delay={0.06}>
          <View nativeID={`about-introduction`} testID={`about-introduction`} style={styles.introduction}>
            {aboutIntroduction.map((paragraph, index) => (
              <Text
                key={index}
                nativeID={`about-introduction-paragraph-${index}`}
                testID={`about-introduction-paragraph-${index}`}
                style={[styles.paragraph, index === 0 && styles.leadParagraph]}
              >
                {paragraph}
              </Text>
            ))}
          </View>
        </Reveal>
        <View nativeID={`about-values`} testID={`about-values`} style={styles.values}>
          <Text accessibilityRole={`header`} nativeID={`about-values-heading`} testID={`about-values-heading`} style={styles.sectionHeading}>
            Three ways to explore
          </Text>
          <View nativeID={`about-values-grid`} testID={`about-values-grid`} style={[styles.valuesGrid, wide && styles.wideValuesGrid]}>
            {aboutValues.map((value, index) => (
              <View key={value.id} style={wide && styles.wideValueSlot} nativeID={`about-value-slot-${value.id}`} testID={`about-value-slot-${value.id}`}>
                <Reveal id={`about-value-reveal-${value.id}`} delay={0.12 + index * 0.08}>
                  <View nativeID={`about-value-${value.id}`} testID={`about-value-${value.id}`} style={[styles.value, wide && styles.wideValue]}>
                    <View nativeID={`about-value-heading-${value.id}`} testID={`about-value-heading-${value.id}`} style={[styles.valueHeading, wide && styles.wideValueHeading]}>
                      <View
                        accessibilityElementsHidden
                        importantForAccessibility={`no-hide-descendants`}
                        nativeID={`about-value-art-${value.id}`}
                        testID={`about-value-art-${value.id}`}
                        style={styles.symbolSurface}
                      >
                        <View style={styles.steelTexture} pointerEvents={`none`}>
                          <SvgXml xml={themeArtwork(steelTextureXml)} width={`100%`} height={`100%`} preserveAspectRatio={`none`} />
                        </View>
                        <SvgXml xml={themeArtwork(dragonSymbols[value.kind])} width={78} height={58} />
                      </View>
                      <Text accessibilityRole={`header`} nativeID={`about-value-title-${value.id}`} testID={`about-value-title-${value.id}`} style={styles.valueTitle}>
                        {value.title}
                      </Text>
                    </View>
                    <Text nativeID={`about-value-description-${value.id}`} testID={`about-value-description-${value.id}`} style={styles.valueDescription}>
                      {value.description}
                    </Text>
                  </View>
                </Reveal>
              </View>
            ))}
          </View>
        </View>
        <Reveal id={`about-contact-reveal`} delay={0.2}>
          <View nativeID={`about-contact-panel`} testID={`about-contact-panel`} style={styles.contactPanel}>
            <View nativeID={`about-contact-rule`} testID={`about-contact-rule`} style={styles.contactRule} />
            <Text accessibilityRole={`header`} nativeID={`about-contact-heading`} testID={`about-contact-heading`} style={styles.sectionHeading}>
              {aboutContact.title}
            </Text>
            <Text nativeID={`about-contact-description`} testID={`about-contact-description`} style={styles.contactDescription}>
              {aboutContact.description}
            </Text>
            <View nativeID={`about-contact-actions`} testID={`about-contact-actions`} style={styles.actions}>
              <Link href={routes.contact.path} asChild>
                <Pressable accessibilityRole={`link`} nativeID={`about-contact-link`} testID={`about-contact-link`} style={({ pressed }) => [styles.action, styles.primaryAction, pressed && styles.pressed]}>
                  <Mail size={19} color={palette.paper} />
                  <Text nativeID={`about-contact-label`} testID={`about-contact-label`} style={styles.primaryLabel}>Contact</Text>
                </Pressable>
              </Link>
              <Link href={routes.home.path} asChild>
                <Pressable accessibilityRole={`link`} nativeID={`about-explore-link`} testID={`about-explore-link`} style={({ pressed }) => [styles.action, styles.secondaryAction, pressed && styles.pressed]}>
                  <ArrowLeft size={19} color={palette.ink} />
                  <Text nativeID={`about-explore-label`} testID={`about-explore-label`} style={styles.secondaryLabel}>Explore dragons</Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </Reveal>
      </View>
    </PageLayout>
  );
};

export default AboutPage;
