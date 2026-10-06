import './styles.scss';
import Artwork from '../Artwork';
import WebAnchor from '../WebAnchor';
import type { HeaderProps } from './types';
import { Link, usePathname } from 'expo-router';
import { useSiteHeader } from './useSiteHeader';
import { brandLogoXml } from '../../shared/artwork';
import { routes, navigation } from '../../shared/routes';
import { useTheme } from '../../shared/themeContext/ThemeContext';
import { X, Sun, Moon, Code, Menu, Mail, Info, BookOpen, Bookmark, Compass, UserRound, Newspaper } from 'lucide-react';

const icons = { code: Code, mail: Mail, info: Info, book: BookOpen, compass: Compass, bookmark: Bookmark, newspaper: Newspaper };

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
        <Icon id={`${prefix}-${item.id}-icon`} className={`site-navigation-icon`} size={17} aria-hidden={true} />
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
          <a
            href={``}
            aria-disabled={true}
            id={`site-sign-in-link`}
            className={`site-sign-in-link`}
            title={`Sign In — Coming soon`}
            onClick={(event) => event.preventDefault()}
          >
            <UserRound id={`site-sign-in-icon`} className={`site-sign-in-icon`} size={17} aria-hidden={true} />
            <span id={`site-sign-in-label`} className={`site-sign-in-label`}>Sign In</span>
          </a>
          <button
            type={`button`}
            onClick={toggleTheme}
            aria-pressed={isDark}
            id={`site-theme-toggle`}
            className={`site-theme-toggle`}
            title={isDark ? `Switch To Light Mode` : `Switch To Dark Mode`}
            aria-label={isDark ? `Switch To Light Mode` : `Switch To Dark Mode`}
          >
            {isDark ? <Sun id={`site-theme-sun-icon`} size={19} aria-hidden={true} /> : <Moon id={`site-theme-moon-icon`} size={19} aria-hidden={true} />}
          </button>
          <button
            type={`button`}
            id={`site-menu-toggle`}
            className={`site-menu-toggle`}
            aria-expanded={menuOpen}
            aria-controls={`site-mobile-navigation`}
            aria-label={menuOpen ? `Close menu` : `Open menu`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X id={`site-menu-close-icon`} size={23} aria-hidden={true} /> : <Menu id={`site-menu-open-icon`} size={23} aria-hidden={true} />}
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
