import { Link } from 'expo-router';
import baseStyles from './styles.native';
import { routes } from '../../shared/routes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, useThemedStyles } from '../../shared/themeContext/ThemeContext';
import { Text, View, Alert, Linking, Pressable, useWindowDimensions } from 'react-native';
import { FileText, Copyright, ShieldCheck, ExternalLink } from 'lucide-react-native';

const openLink = (url: string) => {
  void Linking.openURL(url).catch(() => Alert.alert(`Unable To Open Link`, `Please Try Again Later`));
};

const SiteFooter = () => {
  const { palette } = useTheme();
  const styles = useThemedStyles(baseStyles);
  const insets = useSafeAreaInsets();
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
        <View style={styles.copyright} nativeID={`site-footer-copyright`} accessible accessibilityLabel={`© ${new Date().getFullYear()} Dragon Database`}>
          <Text nativeID={`site-footer-copyright-year`} style={styles.copy}>{`© ${new Date().getFullYear()}`}</Text>
          <Text nativeID={`site-footer-copyright-brand`} style={styles.copy}>Dragon Database</Text>
        </View>
        <View style={styles.navigation} nativeID={`site-footer-navigation`}>
          <Link href={routes.terms.path} asChild>
            <Pressable nativeID={`site-footer-terms`} accessibilityRole={`link`} accessibilityLabel={`Terms for Dragon Database`} style={({ pressed }) => [styles.link, pressed && styles.pressed]}>
              <FileText size={16} color={palette.ink} accessibilityElementsHidden />
              <Text nativeID={`site-footer-terms-label`} style={styles.linkLabel}>Terms</Text>
            </Pressable>
          </Link>
          <Link href={routes.privacy.path} asChild>
            <Pressable nativeID={`site-footer-privacy`} accessibilityRole={`link`} accessibilityLabel={`Dragon Database Privacy Policy`} style={({ pressed }) => [styles.link, pressed && styles.pressed]}>
              <ShieldCheck size={16} color={palette.ink} accessibilityElementsHidden />
              <Text nativeID={`site-footer-privacy-label`} style={styles.linkLabel}>Privacy</Text>
            </Pressable>
          </Link>
          <Link href={routes.copyright.path} asChild>
            <Pressable nativeID={`site-footer-copyright-link`} accessibilityRole={`link`} accessibilityLabel={`Dragon Database Copyright`} style={({ pressed }) => [styles.link, pressed && styles.pressed]}>
              <Copyright size={16} color={palette.ink} accessibilityElementsHidden />
              <Text nativeID={`site-footer-copyright-label`} style={styles.linkLabel}>Copyright</Text>
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
    </View>
  );
};

export default SiteFooter;
