import { Link } from 'expo-router';
import { Mail, ArrowLeft } from 'lucide-react';
import Reveal from '../Reveal';
import Artwork from '../Artwork';
import WebAnchor from '../WebAnchor';
import PageLayout from '../PageLayout';
import { routes } from '../../shared/routes';
import { aboutValues, aboutContact, aboutIntroduction } from './content';
import { dragonSymbols, steelTextureXml } from '../../shared/artwork';
import './styles.scss';

const AboutPage = () => (
  <PageLayout
    id={`about-page`}
    title={`About`}
    description={`The Scaling Collection: a place to explore the forms, traits, and lore of dragons.`}
  >
    <div id={`about-content`} className={`about-content`}>
      <Reveal id={`about-introduction-reveal`} delay={0.06}>
        <div id={`about-introduction`} className={`about-introduction`}>
          {aboutIntroduction.map((paragraph, index) => (
            <p key={index} id={`about-introduction-paragraph-${index}`} className={`about-introduction-paragraph`}>
              {paragraph}
            </p>
          ))}
        </div>
      </Reveal>
      <section id={`about-values`} className={`about-values`} aria-labelledby={`about-values-heading`}>
        <h2 id={`about-values-heading`} className={`about-section-heading`}>Three ways to explore</h2>
        <div id={`about-values-grid`} className={`about-values-grid`}>
          {aboutValues.map((value, index) => (
            <Reveal key={value.id} id={`about-value-reveal-${value.id}`} delay={0.12 + index * 0.08}>
              <article id={`about-value-${value.id}`} className={`about-value`} aria-labelledby={`about-value-title-${value.id}`}>
                <div id={`about-value-art-${value.id}`} className={`about-value-art`} aria-hidden={true}>
                  <Artwork id={`about-value-steel-${value.id}`} className={`about-value-steel`} xml={steelTextureXml} />
                  <Artwork id={`about-value-symbol-${value.id}`} className={`about-value-symbol`} xml={dragonSymbols[value.kind]} />
                </div>
                <h3 id={`about-value-title-${value.id}`} className={`about-value-title`}>{value.title}</h3>
                <p id={`about-value-description-${value.id}`} className={`about-value-description`}>{value.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <Reveal id={`about-contact-reveal`} delay={0.2}>
        <section id={`about-contact-panel`} className={`about-contact-panel`} aria-labelledby={`about-contact-heading`}>
          <span id={`about-contact-rule`} className={`about-contact-rule`} aria-hidden={true} />
          <div id={`about-contact-copy`} className={`about-contact-copy`}>
            <h2 id={`about-contact-heading`} className={`about-section-heading`}>{aboutContact.title}</h2>
            <p id={`about-contact-description`} className={`about-contact-description`}>{aboutContact.description}</p>
          </div>
          <div id={`about-contact-actions`} className={`about-contact-actions`}>
            <Link href={routes.contact.path} asChild>
              <WebAnchor id={`about-contact-link`} className={`about-action about-action-primary`}>
                <Mail id={`about-contact-icon`} size={19} aria-hidden={true} />
                <span id={`about-contact-label`} className={`about-action-label`}>Contact</span>
              </WebAnchor>
            </Link>
            <Link href={routes.home.path} asChild>
              <WebAnchor id={`about-explore-link`} className={`about-action about-action-secondary`}>
                <ArrowLeft id={`about-explore-icon`} size={19} aria-hidden={true} />
                <span id={`about-explore-label`} className={`about-action-label`}>Explore dragons</span>
              </WebAnchor>
            </Link>
          </div>
        </section>
      </Reveal>
    </div>
  </PageLayout>
);

export default AboutPage;
