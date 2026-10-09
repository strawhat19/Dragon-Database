import './styles.scss';
import { Link } from 'expo-router';
import WebAnchor from '../WebAnchor';
import PageLayout from '../PageLayout';
import { routes } from '../../shared/routes';
import { ArrowLeft, BookOpen, ExternalLink } from 'lucide-react';
import { fontNotices, fontNoticeLinks } from '../../shared/fontNotices';

const CopyrightPage = () => (
  <PageLayout id={`copyright`} title={`Copyright`} description={`Font credits, original sources, and bundled license notices.`}>
    <div id={`copyright-content`} className={`copyright-content`}>
      <p id={`copyright-site-credit`} className={`copyright-site-credit`}>{`© ${new Date().getFullYear()} Dragon Database`}</p>
      <section id={`copyright-fonts`} className={`copyright-fonts`} aria-labelledby={`copyright-fonts-title`}>
        <h2 id={`copyright-fonts-title`} className={`copyright-heading`}>Font Credits</h2>
        <div id={`copyright-font-list`} className={`copyright-font-list`}>
          {fontNotices.map(notice => (
            <article key={notice.id} id={`copyright-font-${notice.id}`} className={`copyright-font`} aria-labelledby={`copyright-font-${notice.id}-title`}>
              <h3 id={`copyright-font-${notice.id}-title`} className={`copyright-font-title`}>{notice.title}</h3>
              <p id={`copyright-font-${notice.id}-credit`} className={`copyright-paragraph`}>{notice.credit}</p>
              <p id={`copyright-font-${notice.id}-copyright`} className={`copyright-paragraph`}>{notice.copyright}</p>
              <div id={`copyright-font-${notice.id}-links`} className={`copyright-links`}>
                <a
                  target={`_blank`}
                  rel={`noreferrer`}
                  href={notice.sourceUrl}
                  className={`copyright-link`}
                  id={`copyright-font-${notice.id}-source`}
                  aria-label={`${notice.title} Original Source`}
                >
                  <ExternalLink size={16} aria-hidden={true} id={`copyright-font-${notice.id}-source-icon`} />
                  <span id={`copyright-font-${notice.id}-source-label`}>Original Source</span>
                </a>
                <a
                  target={`_blank`}
                  rel={`noreferrer`}
                  href={notice.licenseUrl}
                  className={`copyright-link`}
                  id={`copyright-font-${notice.id}-license`}
                  aria-label={`${notice.title} License`}
                >
                  <ExternalLink size={16} aria-hidden={true} id={`copyright-font-${notice.id}-license-icon`} />
                  <span id={`copyright-font-${notice.id}-license-label`}>License</span>
                </a>
              </div>
            </article>
          ))}
        </div>
        <a
          target={`_blank`}
          rel={`noreferrer`}
          className={`copyright-link copyright-notices-link`}
          href={fontNoticeLinks.notices}
          id={`copyright-font-notices`}
        >
          <BookOpen size={18} aria-hidden={true} id={`copyright-font-notices-icon`} />
          <span id={`copyright-font-notices-label`}>Font Notices</span>
        </a>
      </section>
      <nav id={`copyright-page-links`} className={`copyright-links copyright-page-links`} aria-label={`More about Dragon Database`}>
        <Link href={routes.home.path} asChild>
          <WebAnchor id={`copyright-home-link`} className={`copyright-link`}>
            <ArrowLeft size={18} aria-hidden={true} id={`copyright-home-icon`} />
            <span id={`copyright-home-label`}>Back to the collection</span>
          </WebAnchor>
        </Link>
        <a id={`copyright-piratechs-link`} className={`copyright-link`} href={`https://piratechs.com/`} target={`_blank`} rel={`noreferrer`}>
          <ExternalLink size={16} aria-hidden={true} id={`copyright-piratechs-icon`} />
          <span id={`copyright-piratechs-label`}>Piratechs</span>
        </a>
      </nav>
    </div>
  </PageLayout>
);

export default CopyrightPage;
