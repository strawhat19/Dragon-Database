import './styles.scss';
import { Link } from 'expo-router';
import WebAnchor from '../WebAnchor';
import { routes } from '../../shared/routes';
import { FileText, Copyright, ShieldCheck, ArrowUpRight } from 'lucide-react';

const SiteFooter = () => (
  <footer id={`site-footer`} className={`site-footer`}>
    <div id={`site-footer-main`} className={`site-footer-main`}>
      <p id={`site-footer-copyright`} className={`site-footer-copyright`}>
        <span id={`site-footer-copyright-year`} className={`site-footer-copyright-year`}>{`© ${new Date().getFullYear()}`}</span>
        {` `}<span id={`site-footer-copyright-brand`} className={`site-footer-copyright-brand`}>Dragon Database</span>
      </p>
      <nav id={`site-footer-navigation`} className={`site-footer-navigation`} aria-label={`Footer navigation`}>
        <Link href={routes.terms.path} asChild>
          <WebAnchor id={`site-footer-terms`} className={`site-footer-page-link`}>
            <FileText id={`site-footer-terms-icon`} size={16} aria-hidden={true} />
            <span id={`site-footer-terms-label`} className={`site-footer-page-label`}>Terms</span>
          </WebAnchor>
        </Link>
        <Link href={routes.privacy.path} asChild>
          <WebAnchor id={`site-footer-privacy`} className={`site-footer-page-link`}>
            <ShieldCheck id={`site-footer-privacy-icon`} size={16} aria-hidden={true} />
            <span id={`site-footer-privacy-label`} className={`site-footer-page-label`}>Privacy</span>
          </WebAnchor>
        </Link>
        <Link href={routes.copyright.path} asChild>
          <WebAnchor id={`site-footer-copyright-link`} className={`site-footer-page-link`}>
            <Copyright id={`site-footer-copyright-icon`} size={16} aria-hidden={true} />
            <span id={`site-footer-copyright-label`} className={`site-footer-page-label`}>Copyright</span>
          </WebAnchor>
        </Link>
      </nav>
      <a id={`site-footer-piratechs`} className={`site-footer-piratechs`} href={`https://piratechs.com/`} target={`_blank`} rel={`noreferrer`}>
        <span id={`site-footer-piratechs-label`} className={`site-footer-piratechs-label`}>Made by Piratechs</span>
        <ArrowUpRight id={`site-footer-piratechs-icon`} size={16} aria-hidden={true} />
      </a>
    </div>
  </footer>
);

export default SiteFooter;
