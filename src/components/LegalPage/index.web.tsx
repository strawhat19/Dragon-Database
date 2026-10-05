import { Link } from 'expo-router';
import { Mail, ArrowLeft, ExternalLink } from 'lucide-react';
import Reveal from '../Reveal';
import WebAnchor from '../WebAnchor';
import PageLayout from '../PageLayout';
import { legalPages } from './content';
import type { LegalPageProps } from './types';
import { routes } from '../../shared/routes';
import './styles.scss';

const LegalPage = ({ kind }: LegalPageProps) => {
  const page = legalPages[kind];

  return (
    <PageLayout id={`${kind}-page`} title={page.title} description={page.description}>
      <div id={`${kind}-content`} className={`legal-content`}>
        <Reveal id={`${kind}-introduction-reveal`} delay={0.04}>
          <div id={`${kind}-introduction`} className={`legal-introduction`}>
            <span id={`${kind}-introduction-rule`} className={`legal-introduction-rule`} aria-hidden={true} />
            <p id={`${kind}-introduction-copy`} className={`legal-introduction-copy`}>{page.introduction}</p>
          </div>
        </Reveal>
        <div id={`${kind}-sections`} className={`legal-sections`}>
          {page.sections.map((section, index) => (
            <Reveal key={section.id} id={`${kind}-section-reveal-${section.id}`} delay={Math.min(index * 0.04, 0.16)}>
              <section
                className={`legal-section`}
                id={`${kind}-section-${section.id}`}
                aria-labelledby={`${kind}-heading-${section.id}`}
              >
                <div id={`${kind}-section-heading-${section.id}`} className={`legal-section-heading`}>
                  <span id={`${kind}-section-number-${section.id}`} className={`legal-section-number`} aria-hidden={true}>
                    {String(index + 1).padStart(2, `0`)}
                  </span>
                  <h2 id={`${kind}-heading-${section.id}`} className={`legal-heading`}>{section.title}</h2>
                </div>
                <div id={`${kind}-section-body-${section.id}`} className={`legal-section-body`}>
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex} id={`${kind}-paragraph-${section.id}-${paragraphIndex}`} className={`legal-paragraph`}>{paragraph}</p>
                  ))}
                  {section.source ? (
                    <a
                      target={`_blank`}
                      rel={`noreferrer`}
                      href={section.source.href}
                      className={`legal-source-link`}
                      id={`${kind}-source-${section.id}`}
                    >
                      <span id={`${kind}-source-label-${section.id}`} className={`legal-source-label`}>{section.source.label}</span>
                      <ExternalLink id={`${kind}-source-icon-${section.id}`} size={16} aria-hidden={true} />
                    </a>
                  ) : null}
                </div>
              </section>
            </Reveal>
          ))}
        </div>
        <nav id={`${kind}-page-links`} className={`legal-page-links`} aria-label={`More about Dragon Database`}>
          <Link href={routes.home.path} asChild>
            <WebAnchor id={`${kind}-explore-link`} className={`legal-page-link`}>
              <ArrowLeft id={`${kind}-explore-icon`} size={18} aria-hidden={true} />
              <span id={`${kind}-explore-label`} className={`legal-page-link-label`}>Back to the collection</span>
            </WebAnchor>
          </Link>
          <Link href={routes.contact.path} asChild>
            <WebAnchor id={`${kind}-contact-link`} className={`legal-page-link`}>
              <Mail id={`${kind}-contact-icon`} size={18} aria-hidden={true} />
              <span id={`${kind}-contact-label`} className={`legal-page-link-label`}>Contact</span>
            </WebAnchor>
          </Link>
        </nav>
      </div>
    </PageLayout>
  );
};

export default LegalPage;
