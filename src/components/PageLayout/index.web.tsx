import { ArrowUp } from 'lucide-react';
import Reveal from '../Reveal';
import SiteHeader from '../SiteHeader';
import SiteFooter from '../SiteFooter';
import TextReveal from '../TextReveal';
import type { PageLayoutProps } from './types';
import usePageLayout from './usePageLayout';
import './styles.scss';

const PageLayout = ({ id, title, description, children }: PageLayoutProps) => {
  const sticky = true;
  const { heroRef, pageRef, scrolled, pastHero, scrollToTop } = usePageLayout(id);
  const words = title.split(/\s+/).filter(Boolean);

  return (
    <div id={`${id}-page`} ref={pageRef} className={`page-layout`}>
      <a id={`${id}-skip-link`} className={`page-layout__skip-link`} href={`#${id}-main`}>Skip to content</a>
      <SiteHeader sticky={sticky} scrolled={scrolled} />
      <main id={`${id}-main`} className={`page-layout__main`} tabIndex={-1}>
        <section
          ref={heroRef}
          id={`${id}-hero`}
          className={`page-layout__hero`}
          aria-labelledby={`${id}-title`}
          aria-describedby={`${id}-description`}
        >
          <div id={`${id}-hero-content`} className={`page-layout__hero-content`}>
            <Reveal id={`${id}-accent-reveal`}>
              <span id={`${id}-hero-accent`} className={`page-layout__accent`} aria-hidden={true} />
            </Reveal>
            <h1 id={`${id}-title`} className={`page-layout__title`} aria-label={title}>
              <span id={`${id}-title-visual`} className={`page-layout__title-visual`} aria-hidden={true}>
                {words.map((word, index) => (
                  <TextReveal key={`${id}-title-${index}`} id={`${id}-title-word-${index}`} text={word} mode={`chars`} delay={0.08 + index * 0.1} />
                ))}
              </span>
            </h1>
            <Reveal id={`${id}-description-reveal`} delay={0.22}>
              <p id={`${id}-description`} className={`page-layout__description`}>{description}</p>
            </Reveal>
          </div>
        </section>
        <section id={`${id}-body`} className={`page-layout__body`} aria-label={`${title} content`}>
          <Reveal id={`${id}-body-reveal`} delay={0.08}>{children}</Reveal>
        </section>
      </main>
      <SiteFooter />
      <button
        type={`button`}
        id={`${id}-scroll-top`}
        aria-label={`Scroll to top`}
        aria-hidden={!pastHero}
        tabIndex={pastHero ? 0 : -1}
        onClick={scrollToTop}
        className={`page-layout__scroll-top${pastHero ? ` is-visible` : ``}`}
      >
        <ArrowUp id={`${id}-scroll-top-icon`} size={19} aria-hidden={true} />
        <span id={`${id}-scroll-top-label`}>Top</span>
      </button>
    </div>
  );
};

export default PageLayout;
