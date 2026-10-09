import { useState } from 'react';
import { Link } from 'expo-router';
import PageLayout from '../PageLayout';
import FontNotices from '../FontNotices';
import baseStyles from './styles.native';
import { routes } from '../../shared/routes';
import { Text, View, Pressable } from 'react-native';
import { fontNotices } from '../../shared/fontNotices';
import { useFontNotices } from '../FontNotices/useFontNotices';
import { ArrowLeft, BookOpen, ExternalLink } from 'lucide-react-native';
import { useTheme, useThemedStyles } from '../../shared/themeContext/ThemeContext';

const CopyrightPage = () => {
  const { palette } = useTheme();
  const { openLink } = useFontNotices();
  const styles = useThemedStyles(baseStyles);
  const [noticesVisible, setNoticesVisible] = useState(false);

  return (
    <PageLayout id={`copyright`} title={`Copyright`} description={`Font credits, original sources, and bundled license notices.`}>
      <View nativeID={`copyright-content`} style={styles.content}>
        <Text nativeID={`copyright-site-credit`} style={styles.siteCredit}>{`© ${new Date().getFullYear()} Dragon Database`}</Text>
        <View nativeID={`copyright-fonts`} style={styles.fonts}>
          <Text nativeID={`copyright-fonts-title`} accessibilityRole={`header`} style={styles.heading}>Font Credits</Text>
          <View nativeID={`copyright-font-list`} style={styles.fontList}>
            {fontNotices.map(notice => (
              <View key={notice.id} nativeID={`copyright-font-${notice.id}`} style={styles.font}>
                <Text nativeID={`copyright-font-${notice.id}-title`} accessibilityRole={`header`} style={styles.fontTitle}>{notice.title}</Text>
                <Text nativeID={`copyright-font-${notice.id}-credit`} style={styles.paragraph}>{notice.credit}</Text>
                <Text nativeID={`copyright-font-${notice.id}-copyright`} style={styles.paragraph}>{notice.copyright}</Text>
                <View nativeID={`copyright-font-${notice.id}-links`} style={styles.links}>
                  <Pressable
                    accessibilityRole={`link`}
                    onPress={() => openLink(notice.sourceUrl)}
                    nativeID={`copyright-font-${notice.id}-source`}
                    accessibilityLabel={`${notice.title} Original Source`}
                    style={({ pressed }) => [styles.link, pressed && styles.pressed]}
                  >
                    <ExternalLink size={16} color={palette.ink} accessibilityElementsHidden nativeID={`copyright-font-${notice.id}-source-icon`} />
                    <Text nativeID={`copyright-font-${notice.id}-source-label`} style={styles.linkLabel}>Original Source</Text>
                  </Pressable>
                  <Pressable
                    accessibilityRole={`link`}
                    onPress={() => openLink(notice.licenseUrl)}
                    nativeID={`copyright-font-${notice.id}-license`}
                    accessibilityLabel={`${notice.title} License`}
                    style={({ pressed }) => [styles.link, pressed && styles.pressed]}
                  >
                    <ExternalLink size={16} color={palette.ink} accessibilityElementsHidden nativeID={`copyright-font-${notice.id}-license-icon`} />
                    <Text nativeID={`copyright-font-${notice.id}-license-label`} style={styles.linkLabel}>License</Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
          <Pressable
            accessibilityRole={`button`}
            nativeID={`copyright-font-notices`}
            onPress={() => setNoticesVisible(true)}
            style={({ pressed }) => [styles.link, styles.noticesLink, pressed && styles.pressed]}
          >
            <BookOpen size={18} color={palette.ink} accessibilityElementsHidden nativeID={`copyright-font-notices-icon`} />
            <Text nativeID={`copyright-font-notices-label`} style={styles.linkLabel}>Font Notices</Text>
          </Pressable>
        </View>
        <View nativeID={`copyright-page-links`} style={[styles.links, styles.pageLinks]}>
          <Link href={routes.home.path} asChild>
            <Pressable accessibilityRole={`link`} nativeID={`copyright-home-link`} style={({ pressed }) => [styles.link, pressed && styles.pressed]}>
              <ArrowLeft size={18} color={palette.ink} accessibilityElementsHidden nativeID={`copyright-home-icon`} />
              <Text nativeID={`copyright-home-label`} style={styles.linkLabel}>Back to the collection</Text>
            </Pressable>
          </Link>
          <Pressable
            accessibilityRole={`link`}
            nativeID={`copyright-piratechs-link`}
            onPress={() => openLink(`https://piratechs.com/`)}
            style={({ pressed }) => [styles.link, pressed && styles.pressed]}
          >
            <ExternalLink size={16} color={palette.ink} accessibilityElementsHidden nativeID={`copyright-piratechs-icon`} />
            <Text nativeID={`copyright-piratechs-label`} style={styles.linkLabel}>Piratechs</Text>
          </Pressable>
        </View>
      </View>
      <FontNotices visible={noticesVisible} onClose={() => setNoticesVisible(false)} />
    </PageLayout>
  );
};

export default CopyrightPage;
