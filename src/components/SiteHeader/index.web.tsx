import './styles.scss';
import Artwork from '../Artwork';
import WebAnchor from '../WebAnchor';
import type { HeaderProps } from './types';
import { Link, usePathname } from 'expo-router';
import { useSiteHeader } from './useSiteHeader';
import { brandLogoXml } from '../../shared/artwork';
import { routes, navigation } from '../../shared/routes';
import { filledHeaderIcons, filledHeaderIconNodes } from './icons';
import { useTheme } from '../../shared/themeContext/ThemeContext';
import { X, Sun, Moon, Code, Menu, Mail, Info, Flame, House, BookOpen, UserRound, Newspaper, createLucideIcon } from 'lucide-react';

const outlineIcons = {
  x: X,
  sun: Sun,
  code: Code,
  mail: Mail,
  info: Info,
  moon: Moon,
  menu: Menu,
  home: House,
  flame: Flame,
  book: BookOpen,
  user: UserRound,
  newspaper: Newspaper,
};
const icons = filledHeaderIcons
  ? Object.fromEntries(Object.entries(filledHeaderIconNodes).map(([name, nodes]) => [name, createLucideIcon(`Header${name}Filled`, nodes)])) as typeof outlineIcons
  : outlineIcons;
const iconFill = filledHeaderIcons ? `currentColor` : `none`;
const { x: CloseIcon, sun: SunIcon, user: UserIcon, moon: MoonIcon, menu: MenuIcon } = icons;

const SiteHeader = ({ sticky = true, scrolled = false }: HeaderProps) => {
  const pathname = usePathname();
  const { isDark, toggleTheme } = useTheme();
  const { menuOpen, setMenuOpen } = useSiteHeader();

  const navigationLink = (item: (typeof navigation)[number], mobile = false) => {
    const Icon = icons[item.icon];
    const active = item.available && pathname === item.path;
    const prefix = mobile ? `site-mobile-navigation` : `site-navigation`;
    const element = (
      <WebAnchor
        key={item.id}
        href={item.path}
        id={`${prefix}-${item.id}`}
        aria-current={active ? `page` : undefined}
        aria-disabled={item.available ? undefined : true}
        title={item.available ? undefined : `${item.label} — Coming soon`}
        className={`${mobile ? `site-mobile-navigation-link` : `site-navigation-link`} ${active ? `is-active` : ``}`}
        onClick={(event) => {
          if (!item.available) event.preventDefault();
          setMenuOpen(false);
        }}
      >
        <Icon id={`${prefix}-${item.id}-icon`} className={`site-navigation-icon`} size={17} fill={iconFill} aria-hidden={true} />
        <span id={`${prefix}-${item.id}-label`} className={`site-navigation-label`}>{item.label}</span>
      </WebAnchor>
    );
    return item.available ? <Link key={item.id} href={item.path} asChild>{element}</Link> : element;
  };

  return (
    <header id={`site-header`} className={`site-header ${scrolled ? `is-scrolled` : ``}`} data-sticky={sticky}>
      <div id={`site-header-inner`} className={`site-header-inner`}>
        <Link href={routes.home.path} asChild>
          <WebAnchor id={`site-brand-link`} className={`site-brand-link`} aria-label={`Dragon Database Home`} onClick={() => setMenuOpen(false)}>
            <Artwork id={`site-brand-artwork`} xml={brandLogoXml} />
          </WebAnchor>
        </Link>
        <nav id={`site-desktop-navigation`} className={`site-desktop-navigation`} aria-label={`Main navigation`}>
          {navigation.map((item) => navigationLink(item))}
        </nav>
        <div id={`site-header-actions`} className={`site-header-actions`}>
          <button
            type={`button`}
            onClick={toggleTheme}
            aria-pressed={isDark}
            id={`site-theme-toggle`}
            className={`site-theme-toggle`}
            title={isDark ? `Switch To Light Mode` : `Switch To Dark Mode`}
            aria-label={isDark ? `Switch To Light Mode` : `Switch To Dark Mode`}
          >
            {isDark ? <SunIcon id={`site-theme-sun-icon`} size={19} fill={iconFill} aria-hidden={true} /> : <MoonIcon id={`site-theme-moon-icon`} size={19} fill={iconFill} aria-hidden={true} />}
          </button>
          <a
            href={``}
            aria-disabled={true}
            id={`site-sign-in-link`}
            className={`site-sign-in-link`}
            title={`Sign In — Coming soon`}
            onClick={(event) => event.preventDefault()}
          >
            <UserIcon id={`site-sign-in-icon`} className={`site-sign-in-icon`} size={17} fill={iconFill} aria-hidden={true} />
            <span id={`site-sign-in-label`} className={`site-sign-in-label`}>Sign In</span>
          </a>
          <button
            type={`button`}
            id={`site-menu-toggle`}
            className={`site-menu-toggle`}
            aria-expanded={menuOpen}
            aria-controls={`site-mobile-navigation`}
            aria-label={menuOpen ? `Close menu` : `Open menu`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <CloseIcon id={`site-menu-close-icon`} size={23} fill={iconFill} aria-hidden={true} /> : <MenuIcon id={`site-menu-open-icon`} size={23} fill={iconFill} aria-hidden={true} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav id={`site-mobile-navigation`} className={`site-mobile-navigation`} aria-label={`Mobile navigation`}>
          {navigation.map((item) => navigationLink(item, true))}
        </nav>
      )}
    </header>
  );
};

export default SiteHeader;
