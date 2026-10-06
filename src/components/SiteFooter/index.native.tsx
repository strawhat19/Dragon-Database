import { useState } from 'react';
import { Link } from 'expo-router';
import FontNotices from '../FontNotices';
import baseStyles from './styles.native';
import { routes } from '../../shared/routes';
import { fontNoticeLinks } from '../../shared/fontNotices';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, useThemedStyles } from '../../shared/themeContext/ThemeContext';
import { Info, Mail, FileText, ShieldCheck, ExternalLink } from 'lucide-react-native';
import { Text, View, Alert, Linking, Pressable, useWindowDimensions } from 'react-native';

const openLink = (url: string) => {
  Linking.openURL(url).catch(() => Alert.alert(`Unable to open link`, `Please try again later.`));
};

const SiteFooter = () => {
  const { palette } = useTheme();
  const styles = useThemedStyles(baseStyles);
  const insets = useSafeAreaInsets();
  const [noticesOpen, setNoticesOpen] = useState(false);
  const { width } = useWindowDimensions();
  const wide = width >= 720;
  const gutter = wide ? Math.max(40, (width - 1280) / 2) : 24;

  return (
    <View
      nativeID={`site-footer`}
      testID={`site-footer`}
      style={[styles.footer, { marginHorizontal: gutter, paddingBottom: 28 + insets.bottom }]}
    >
      <View style={[styles.row, !wide && styles.compactRow]} nativeID={`site-footer-main`} testID={`site-footer-main`}>
        <Text style={styles.copy}>© {new Date().getFullYear()} Dragon Database</Text>
        <View style={styles.navigation} nativeID={`site-footer-navigation`}>
          <Link href={routes.about.path} asChild>
            <Pressable nativeID={`site-footer-about`} accessibilityRole={`link`} accessibilityLabel={`About Dragon Database`} style={({ pressed }) => [styles.link, pressed && styles.pressed]}>
              <Info size={16} color={palette.ink} accessibilityElementsHidden />
              <Text nativeID={`site-footer-about-label`} style={styles.linkLabel}>About</Text>
            </Pressable>
          </Link>
          <Link href={routes.contact.path} asChild>
            <Pressable nativeID={`site-footer-contact`} accessibilityRole={`link`} accessibilityLabel={`Contact Dragon Database`} style={({ pressed }) => [styles.link, pressed && styles.pressed]}>
              <Mail size={16} color={palette.ink} accessibilityElementsHidden />
              <Text nativeID={`site-footer-contact-label`} style={styles.linkLabel}>Contact</Text>
            </Pressable>
          </Link>
          <Link href={routes.terms.path} asChild>
            <Pressable nativeID={`site-footer-terms`} accessibilityRole={`link`} accessibilityLabel={`Terms for Dragon Database`} style={({ pressed }) => [styles.link, pressed && styles.pressed]}>
              <FileText size={16} color={palette.ink} accessibilityElementsHidden />
              <Text nativeID={`site-footer-terms-label`} style={styles.linkLabel}>Terms</Text>
            </Pressable>
          </Link>
          <Link href={routes.privacy.path} asChild>
            <Pressable nativeID={`site-footer-privacy`} accessibilityRole={`link`} accessibilityLabel={`Dragon Database Privacy Policy`} style={({ pressed }) => [styles.link, pressed && styles.pressed]}>
              <ShieldCheck size={16} color={palette.ink} accessibilityElementsHidden />
              <Text nativeID={`site-footer-privacy-label`} style={styles.linkLabel}>Privacy Policy</Text>
            </Pressable>
          </Link>
        </View>
        <Pressable
          accessibilityRole={`link`}
          accessibilityLabel={`Piratechs website`}
          nativeID={`site-footer-piratechs`}
          testID={`site-footer-piratechs`}
          onPress={() => openLink(`https://piratechs.com/`)}
          style={({ pressed }) => [styles.link, pressed && styles.pressed]}
        >
          <Text style={styles.linkLabel}>Piratechs</Text>
          <ExternalLink size={15} color={palette.ink} />
        </Pressable>
      </View>
      <View style={styles.credits} nativeID={`site-footer-font-credit`} testID={`site-footer-font-credit`}>
        <Pressable
          accessibilityRole={`link`}
          accessibilityLabel={`DragonSlapper by Allison James (NAL), via FontStruct`}
          nativeID={`site-footer-font-source`}
          testID={`site-footer-font-source`}
          onPress={() => openLink(fontNoticeLinks.dragonSlapperSource)}
          style={({ pressed }) => [styles.link, styles.creditLink, pressed && styles.pressed]}
        >
          <ExternalLink size={14} color={palette.muted} accessibilityElementsHidden />
          <Text nativeID={`site-footer-font-source-label`} style={styles.creditLabel}>{`DragonSlapper by Allison James (NAL), via FontStruct`}</Text>
        </Pressable>
        <Pressable
          accessibilityRole={`link`}
          accessibilityLabel={`Creative Commons Attribution ShareAlike 3.0 license`}
          nativeID={`site-footer-font-license`}
          testID={`site-footer-font-license`}
          onPress={() => openLink(fontNoticeLinks.dragonSlapperLicense)}
          style={({ pressed }) => [styles.link, pressed && styles.pressed]}
        >
          <ExternalLink size={14} color={palette.muted} accessibilityElementsHidden />
          <Text nativeID={`site-footer-font-license-label`} style={styles.creditLabel}>{`Licensed under CC BY-SA 3.0`}</Text>
        </Pressable>
        <Text nativeID={`site-footer-font-unchanged`} style={styles.creditCopy}>{`Font file unchanged.`}</Text>
      </View>
      <Pressable
        accessibilityRole={`button`}
        nativeID={`site-footer-font-notices`}
        accessibilityLabel={`Open Font Notices`}
        onPress={() => setNoticesOpen(true)}
        style={({ pressed }) => [styles.link, pressed && styles.pressed]}
      >
        <FileText size={17} color={palette.muted} accessibilityElementsHidden />
        <Text nativeID={`site-footer-font-notices-label`} style={styles.creditLabel}>{`Font Notices`}</Text>
      </Pressable>
      <FontNotices visible={noticesOpen} onClose={() => setNoticesOpen(false)} />
    </View>
  );
};

export default SiteFooter;
