import Reveal from '../Reveal';
import { Link } from 'expo-router';
import PageLayout from '../PageLayout';
import { legalPages } from './content';
import baseStyles from './styles.native';
import { routes } from '../../shared/routes';
import type { LegalPageProps } from './types';
import { Mail, ArrowLeft, ExternalLink } from 'lucide-react-native';
import { Text, View, Alert, Linking, Pressable } from 'react-native';
import { useTheme, useThemedStyles } from '../../shared/themeContext/ThemeContext';

const openSource = (url: string) => {
  void Linking.openURL(url).catch(() => Alert.alert(`Unable to open link`, `Please try again later.`));
};

const LegalPage = ({ kind }: LegalPageProps) => {
  const { palette } = useTheme();
  const styles = useThemedStyles(baseStyles);
  const page = legalPages[kind];

  return (
    <PageLayout id={`${kind}-page`} title={page.title} description={page.description}>
      <View nativeID={`${kind}-content`} testID={`${kind}-content`} style={styles.content}>
        <Reveal id={`${kind}-introduction-reveal`} delay={0.04}>
          <View nativeID={`${kind}-introduction`} style={styles.introduction}>
            <View nativeID={`${kind}-introduction-rule`} style={styles.introductionRule} />
            <Text nativeID={`${kind}-introduction-copy`} style={styles.introductionCopy}>{page.introduction}</Text>
          </View>
        </Reveal>
        <View nativeID={`${kind}-sections`} style={styles.sections}>
          {page.sections.map((section, index) => (
            <Reveal key={section.id} id={`${kind}-section-reveal-${section.id}`} delay={Math.min(index * 0.04, 0.16)}>
              <View nativeID={`${kind}-section-${section.id}`} testID={`${kind}-section-${section.id}`} style={styles.section}>
                <View nativeID={`${kind}-section-heading-${section.id}`} style={styles.sectionHeading}>
                  <Text accessible={false} nativeID={`${kind}-section-number-${section.id}`} style={styles.sectionNumber}>
                    {String(index + 1).padStart(2, `0`)}
                  </Text>
                  <Text accessibilityRole={`header`} nativeID={`${kind}-heading-${section.id}`} style={styles.heading}>{section.title}</Text>
                </View>
                <View nativeID={`${kind}-section-body-${section.id}`} style={styles.sectionBody}>
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <Text key={paragraphIndex} nativeID={`${kind}-paragraph-${section.id}-${paragraphIndex}`} style={styles.paragraph}>{paragraph}</Text>
                  ))}
                  {section.source ? (
                    <Pressable
                      accessibilityRole={`link`}
                      accessibilityLabel={section.source.label}
                      nativeID={`${kind}-source-${section.id}`}
                      onPress={() => { if (section.source) openSource(section.source.href); }}
                      style={({ pressed }) => [styles.link, pressed && styles.pressed]}
                    >
                      <Text nativeID={`${kind}-source-label-${section.id}`} style={styles.linkLabel}>{section.source.label}</Text>
                      <ExternalLink size={16} color={palette.ink} accessible={false} />
                    </Pressable>
                  ) : null}
                </View>
              </View>
            </Reveal>
          ))}
        </View>
        <View nativeID={`${kind}-page-links`} style={styles.pageLinks}>
          <Link href={routes.home.path} asChild>
            <Pressable accessibilityRole={`link`} nativeID={`${kind}-explore-link`} style={({ pressed }) => [styles.link, pressed && styles.pressed]}>
              <ArrowLeft size={18} color={palette.ink} accessible={false} />
              <Text nativeID={`${kind}-explore-label`} style={styles.linkLabel}>Back to the collection</Text>
            </Pressable>
          </Link>
          <Link href={routes.contact.path} asChild>
            <Pressable accessibilityRole={`link`} nativeID={`${kind}-contact-link`} style={({ pressed }) => [styles.link, pressed && styles.pressed]}>
              <Mail size={18} color={palette.ink} accessible={false} />
              <Text nativeID={`${kind}-contact-label`} style={styles.linkLabel}>Contact</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </PageLayout>
  );
};

export default LegalPage;
