import { BlurView } from 'expo-blur';
import type { RefObject } from 'react';
import baseStyles from './styles.native';
import { SvgXml } from 'react-native-svg';
import type { HeaderProps } from './types';
import { Link, usePathname } from 'expo-router';
import useSiteHeader from './useSiteHeader.native';
import { brandLogoXml } from '../../shared/artwork';
import { routes, navigation } from '../../shared/routes';
import AngledSurface from '../AngledSurface/index.native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, useThemedStyles } from '../../shared/themeContext/ThemeContext';
import { Text, View, Animated, Pressable, useWindowDimensions } from 'react-native';
import { X, Sun, Code, Moon, Menu, Mail, Info, Flame, House, BookOpen, UserRound, Newspaper } from 'lucide-react-native';

type NativeHeaderProps = HeaderProps & { blurTarget?: RefObject<View | null> };
const controlInk = `#101115`;
const controlPaper = `#f4f5f7`;
const icons = { code: Code, mail: Mail, info: Info, home: House, book: BookOpen, flame: Flame, newspaper: Newspaper };

const SiteHeader = ({ sticky = true, scrolled = false, blurTarget }: NativeHeaderProps) => {
  const styles = useThemedStyles(baseStyles);
  const { palette, isDark, toggleTheme, themeArtwork } = useTheme();
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const { width } = useWindowDimensions();
  const { menuOpen, closeMenu, toggleMenu, blurOpacity } = useSiteHeader({ sticky, scrolled });
  const wide = width > 1280;
  const gutter = wide ? Math.max(40, (width - 1280) / 2) : 20;
  const logoWidth = wide ? 184 : Math.min(156, Math.max(80, width - 254));

  const navigationItem = (item: (typeof navigation)[number], mobile = false) => {
    const Icon = icons[item.icon];
    const active = item.available && pathname === item.path;
    const element = (
      <Pressable
        key={item.id}
        onPress={closeMenu}
        disabled={!item.available}
        accessibilityRole={`link`}
        accessibilityLabel={item.label}
        accessibilityHint={item.available ? undefined : `Available in a future update`}
        accessibilityState={{ disabled: !item.available, selected: active }}
        nativeID={`site-header-${mobile ? `mobile-` : ``}${item.id}`}
        testID={`site-header-${mobile ? `mobile-` : ``}${item.id}`}
        style={({ pressed }) => [styles.navigationItem, mobile && styles.menuItem, (active || pressed) && styles.activeItem, pressed && styles.pressed]}
      >
        <Icon size={17} color={active ? palette.ink : palette.muted} accessibilityElementsHidden />
        <Text style={[styles.navigationLabel, active && styles.activeLabel]}>{item.label}</Text>
      </Pressable>
    );
    return item.available ? <Link key={item.id} href={item.path} asChild>{element}</Link> : element;
  };

  return (
    <View
      nativeID={`site-header`}
      testID={`site-header`}
      style={[styles.surface, { paddingTop: insets.top }]}
    >
      <Animated.View
        pointerEvents={`none`}
        style={[styles.baseSurface, { opacity: blurOpacity.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }) }]}
        nativeID={`site-header-solid-backdrop`}
        testID={`site-header-solid-backdrop`}
      />
      <Animated.View pointerEvents={`none`} style={[styles.blur, styles.floatingSurface, { opacity: blurOpacity }]}>
        <BlurView
          tint={isDark ? `dark` : `light`}
          intensity={38}
          blurTarget={blurTarget}
          blurMethod={blurTarget ? `dimezisBlurViewSdk31Plus` : `none`}
          style={styles.blur}
          pointerEvents={`none`}
          nativeID={`site-header-backdrop`}
          testID={`site-header-backdrop`}
        />
      </Animated.View>
      <View style={[styles.row, { paddingHorizontal: gutter, minHeight: wide ? 84 : 72 }]} nativeID={`site-header-row`} testID={`site-header-row`}>
        <Link href={routes.home.path} asChild>
          <Pressable
            onPress={closeMenu}
            accessibilityRole={`link`}
            accessibilityLabel={`Dragon Database Home`}
            nativeID={`site-header-logo`}
            testID={`site-header-logo`}
            style={styles.logo}
          >
            <SvgXml xml={themeArtwork(brandLogoXml)} width={logoWidth} height={logoWidth * 0.375} accessibilityElementsHidden />
          </Pressable>
        </Link>
        <View style={styles.actions} nativeID={`site-header-actions`} testID={`site-header-actions`}>
          {wide && (
            <View style={styles.navigation} nativeID={`site-header-navigation`} testID={`site-header-navigation`}>
              {navigation.map((item) => navigationItem(item))}
            </View>
          )}
          <Pressable
            disabled
            accessibilityRole={`button`}
            accessibilityLabel={`Sign In`}
            accessibilityState={{ disabled: true }}
            accessibilityHint={`Available in a future update`}
            nativeID={`site-header-sign-in`}
            testID={`site-header-sign-in`}
            style={styles.signIn}
          >
            <AngledSurface id={`site-header-sign-in-surface`} fill={controlInk} />
            <UserRound size={17} color={controlPaper} accessibilityElementsHidden />
            <Text style={[styles.signInLabel, !wide && styles.mobileSignInLabel, { color: controlPaper }]}>Sign In</Text>
          </Pressable>
          <Pressable
            onPress={toggleTheme}
            accessibilityRole={`button`}
            nativeID={`site-header-theme-toggle`}
            testID={`site-header-theme-toggle`}
            accessibilityLabel={`Switch To ${isDark ? `Light` : `Dark`} Mode`}
            style={({ pressed }) => [styles.themeToggle, pressed && styles.pressed]}
          >
            <AngledSurface id={`site-header-theme-toggle-surface`} fill={controlInk} />
            {isDark ? <Sun size={18} color={controlPaper} accessibilityElementsHidden /> : <Moon size={18} color={controlPaper} accessibilityElementsHidden />}
          </Pressable>
          {!wide && (
            <Pressable
              accessibilityRole={`button`}
              accessibilityLabel={menuOpen ? `Close navigation` : `Open navigation`}
              accessibilityState={{ expanded: menuOpen }}
              nativeID={`site-header-menu-toggle`}
              testID={`site-header-menu-toggle`}
              onPress={toggleMenu}
              style={({ pressed }) => [styles.menuButton, pressed && styles.pressed]}
            >
              {menuOpen ? <X size={24} color={palette.ink} /> : <Menu size={24} color={palette.ink} />}
            </Pressable>
          )}
        </View>
      </View>
      {!wide && menuOpen && (
        <View
          style={[styles.menu, { paddingHorizontal: gutter }]}
          nativeID={`site-header-mobile-navigation`}
          testID={`site-header-mobile-navigation`}
        >
          {navigation.map((item) => navigationItem(item, true))}
        </View>
      )}
      <View style={[styles.rule, { marginHorizontal: gutter }]} nativeID={`site-header-rule`} testID={`site-header-rule`} />
    </View>
  );
};

export default SiteHeader;
