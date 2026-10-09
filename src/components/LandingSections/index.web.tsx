import './styles.scss';

import Reveal from '../Reveal';
import Artwork from '../Artwork';
import { Link } from 'expo-router';
import WebAnchor from '../WebAnchor';
import TextReveal from '../TextReveal';
import { routes } from '../../shared/routes';
import { anatomyNotes, loreNotes } from './content';
import { Info, Mail, ArrowUpRight } from 'lucide-react';
import { wordmarkSwordXml, dragonTypeGraphics } from '../../shared/landingArtwork';

const LandingSections = () => (
  <div id={`landing-editorial-sections`} className={`landing-editorial-sections`}>
    <section id={`landing-anatomy`} className={`landing-anatomy`} aria-labelledby={`landing-anatomy-title`}>
      <div id={`landing-anatomy-inner`} className={`landing-section-inner landing-anatomy-inner`}>
        <Reveal id={`landing-anatomy-plate-reveal`} className={`landing-anatomy-plate-reveal`}>
          <figure id={`landing-anatomy-plate`} className={`landing-anatomy-plate`}>
            <span id={`landing-anatomy-plate-label`} className={`landing-plate-label`}>Form study · 001</span>
            <Artwork id={`landing-anatomy-illustration`} className={`landing-anatomy-illustration`} xml={dragonTypeGraphics.dragon} label={`Dragon anatomy study: four legs, two wings, horns and a long tail`} />
            <figcaption id={`landing-anatomy-caption`} className={`landing-anatomy-caption`}>Dragon · Four limbs. Two wings.</figcaption>
          </figure>
        </Reveal>
        <div id={`landing-anatomy-copy`} className={`landing-anatomy-copy`}>
          <Reveal id={`landing-anatomy-eyebrow-reveal`}>
            <p id={`landing-anatomy-eyebrow`} className={`landing-section-eyebrow`}>Field notes</p>
          </Reveal>
          <h2 id={`landing-anatomy-title`} className={`landing-section-title`}>
            <TextReveal id={`landing-anatomy-title-text`} text={`Anatomy of a dragon`} delay={0.08} />
          </h2>
          <div id={`landing-anatomy-notes`} className={`landing-anatomy-notes`}>
            {anatomyNotes.map((note, index) => (
              <Reveal key={note.id} id={`landing-anatomy-note-reveal-${note.id}`} delay={0.1 + index * 0.08}>
                <article id={`landing-anatomy-note-${note.id}`} className={`landing-anatomy-note`}>
                  <span id={`landing-anatomy-note-number-${note.id}`} className={`landing-note-number`} aria-hidden={true}>{note.number}</span>
                  <div id={`landing-anatomy-note-body-${note.id}`} className={`landing-note-body`}>
                    <h3 id={`landing-anatomy-note-title-${note.id}`} className={`landing-note-title`}>{note.title}</h3>
                    <p id={`landing-anatomy-note-text-${note.id}`} className={`landing-note-text`}>{note.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
    <section id={`landing-lore`} className={`landing-lore landing-section-inner`} aria-labelledby={`landing-lore-title`}>
      <Reveal id={`landing-lore-eyebrow-reveal`}>
        <p id={`landing-lore-eyebrow`} className={`landing-section-eyebrow`}>Stories behind the forms</p>
      </Reveal>
      <h2 id={`landing-lore-title`} className={`landing-section-title`}>
        <TextReveal id={`landing-lore-title-text`} text={`Beyond the scales`} />
      </h2>
      <div id={`landing-lore-grid`} className={`landing-lore-grid`}>
        {loreNotes.map((note, index) => (
          <Reveal key={note.id} id={`landing-lore-note-reveal-${note.id}`} delay={0.1 + index * 0.1}>
            <article id={`landing-lore-note-${note.id}`} className={`landing-lore-note`}>
              <span id={`landing-lore-number-${note.id}`} className={`landing-lore-number`} aria-hidden={true}>{note.number}</span>
              <h3 id={`landing-lore-title-${note.id}`} className={`landing-note-title`}>{note.title}</h3>
              <p id={`landing-lore-text-${note.id}`} className={`landing-note-text`}>{note.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
    <section id={`landing-invitation`} className={`landing-invitation`} aria-labelledby={`landing-invitation-title`}>
      <div id={`landing-invitation-inner`} className={`landing-section-inner`}>
        <Reveal id={`landing-invitation-reveal`} className={`landing-invitation-panel`}>
          <Artwork id={`landing-invitation-sword`} className={`landing-invitation-sword`} xml={wordmarkSwordXml} />
          <p id={`landing-invitation-eyebrow`} className={`landing-section-eyebrow`}>The collection continues</p>
          <h2 id={`landing-invitation-title`} className={`landing-section-title`}>
            <TextReveal id={`landing-invitation-title-text`} text={`Every dragon has a story`} delay={0.1} />
          </h2>
          <p id={`landing-invitation-copy`} className={`landing-invitation-copy`}>Explore the forms. Learn the distinctions. Help shape the collection.</p>
          <div id={`landing-invitation-actions`} className={`landing-invitation-actions`}>
            <Link href={routes.about.path} asChild>
              <WebAnchor id={`landing-about-link`} className={`landing-editorial-link landing-editorial-link-primary`}>
                <Info id={`landing-about-link-icon`} size={18} aria-hidden={true} />
                <span id={`landing-about-link-label`} className={`landing-editorial-link-label`}>About the archive</span>
              </WebAnchor>
            </Link>
            <Link href={routes.contact.path} asChild>
              <WebAnchor id={`landing-contact-link`} className={`landing-editorial-link`}>
                <Mail id={`landing-contact-link-icon`} size={18} aria-hidden={true} />
                <span id={`landing-contact-link-label`} className={`landing-editorial-link-label`}>Get in touch</span>
                <ArrowUpRight id={`landing-contact-link-arrow`} size={17} aria-hidden={true} />
              </WebAnchor>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  </div>
);

export default LandingSections;
