import { Link } from 'expo-router';
import { Info, Mail, FileText, ArrowUpRight } from 'lucide-react';
import WebAnchor from '../WebAnchor';
import { routes } from '../../shared/routes';
import { fontNoticeLinks } from '../../shared/fontNotices';
import './styles.scss';

const SiteFooter = () => (
  <footer id={`site-footer`} className={`site-footer`}>
    <div id={`site-footer-main`} className={`site-footer-main`}>
      <p id={`site-footer-copyright`} className={`site-footer-copyright`}>{`© ${new Date().getFullYear()} Dragon Database`}</p>
      <nav id={`site-footer-navigation`} className={`site-footer-navigation`} aria-label={`Footer navigation`}>
        <Link href={routes.about.path} asChild>
          <WebAnchor id={`site-footer-about`} className={`site-footer-page-link`}>
            <Info id={`site-footer-about-icon`} size={16} aria-hidden={true} />
            <span id={`site-footer-about-label`} className={`site-footer-page-label`}>About</span>
          </WebAnchor>
        </Link>
        <Link href={routes.contact.path} asChild>
          <WebAnchor id={`site-footer-contact`} className={`site-footer-page-link`}>
            <Mail id={`site-footer-contact-icon`} size={16} aria-hidden={true} />
            <span id={`site-footer-contact-label`} className={`site-footer-page-label`}>Contact</span>
          </WebAnchor>
        </Link>
      </nav>
      <a id={`site-footer-piratechs`} className={`site-footer-piratechs`} href={`https://piratechs.com/`} target={`_blank`} rel={`noreferrer`}>
        <span id={`site-footer-piratechs-label`} className={`site-footer-piratechs-label`}>Made by Piratechs</span>
        <ArrowUpRight id={`site-footer-piratechs-icon`} size={16} aria-hidden={true} />
      </a>
    </div>
    <p id={`site-footer-font-credit`} className={`site-footer-font-credit`}>
      {`DragonSlapper by `}<a id={`site-footer-font-author`} className={`site-footer-credit-link`} href={fontNoticeLinks.dragonSlapperSource} target={`_blank`} rel={`noreferrer`}>Allison James (NAL), via FontStruct</a>
      {`, licensed under `}<a id={`site-footer-font-license`} className={`site-footer-credit-link`} href={fontNoticeLinks.dragonSlapperLicense} target={`_blank`} rel={`noreferrer`}>CC BY-SA 3.0</a>
      {`. Font file unchanged.`}
    </p>
    <a
      id={`site-footer-font-notices`}
      className={`site-footer-font-notices`}
      href={fontNoticeLinks.notices}
      aria-label={`Font Notices: DragonSlapper and Alegreya Sans licenses`}
    >
      <FileText id={`site-footer-font-notices-icon`} size={16} aria-hidden={true} />
      <span id={`site-footer-font-notices-label`} className={`site-footer-font-notices-label`}>Font Notices</span>
    </a>
  </footer>
);

export default SiteFooter;
