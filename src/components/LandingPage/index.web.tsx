import './styles.scss';
import Reveal from '../Reveal';
import Artwork from '../Artwork';
import DragonEye from '../DragonEye';
import SiteHeader from '../SiteHeader';
import SiteFooter from '../SiteFooter';
import TextReveal from '../TextReveal';
import DragonTypeCard from '../DragonTypeCard';
import LandingSections from '../LandingSections';
import { useLandingPage } from './useLandingPage';
import { wordmarkSwordXml } from '../../shared/landingArtwork';
import { filledHeaderIcons, filledHeaderIconNodes } from '../SiteHeader/icons';
import { useScrollTopContrast } from '../../shared/motion/useScrollTopContrast';
import { X, Flame, Search, ChevronUp, RotateCcw, createLucideIcon } from 'lucide-react';
import { flameLeftXml, flameRightXml, flyingDragonXml, scalingCollectionXml } from '../../shared/artwork';

const SearchIcon = filledHeaderIcons ? createLucideIcon(`LandingSearchFilled`, filledHeaderIconNodes.search) : Search;
const ExploreIcon = filledHeaderIcons ? createLucideIcon(`LandingExploreFilled`, filledHeaderIconNodes.flame) : Flame;

const flights = [
  { id: `left-near`, delay: 0.35 },
  { id: `right-near`, delay: 0.42 },
  { id: `left-far`, delay: 0.5 },
  { id: `right-far`, delay: 0.58 },
];

const LandingPage = () => {
  const { buttonRef, lightButton } = useScrollTopContrast();
  const {
    query, error, types, reload, heroRef, pageRef, scrolled, pastHero,
    setQuery, searchRef, catalogRef, isHydrated, clearSearch, filteredTypes,
    submitSearch, scrollToTop,
  } = useLandingPage();
  const hasQuery = Boolean(query.trim());

  return (
    <div id={`dragon-landing-page`} className={`dragon-landing-page`} ref={pageRef}>
      <a id={`landing-skip-link`} className={`landing-skip-link`} href={`#landing-main`}>Skip to content</a>
      <SiteHeader sticky scrolled={scrolled} />
      <main id={`landing-main`} className={`landing-main`} tabIndex={-1}>
        <section
          ref={heroRef}
          id={`landing-steel-hero`}
          className={`landing-steel-hero`}
          aria-labelledby={`landing-brand-title`}
        >
          <div id={`landing-hero-artwork`} className={`landing-hero-artwork`} aria-hidden={true}>
            <Artwork id={`landing-left-flames`} className={`landing-flame landing-flame-left`} xml={flameLeftXml} />
            <Artwork id={`landing-right-flames`} className={`landing-flame landing-flame-right`} xml={flameRightXml} />
            {flights.map((flight) => (
              <Reveal key={flight.id} id={`landing-dragon-reveal-${flight.id}`} delay={flight.delay} className={`landing-dragon-flight landing-dragon-flight-${flight.id}`}>
                <Artwork id={`landing-flying-dragon-${flight.id}`} className={`landing-flying-dragon`} xml={flyingDragonXml} />
              </Reveal>
            ))}
          </div>
          <div id={`landing-hero-content`} className={`landing-hero-content`}>
            <Reveal id={`landing-red-rule-reveal`} className={`landing-red-rule-reveal`}>
              <span id={`landing-hero-red-rule`} className={`landing-hero-red-rule`} aria-hidden={true} />
            </Reveal>
            <h1 id={`landing-brand-title`} className={`landing-brand-title`} aria-label={`Dragon Database`}>
              <TextReveal id={`landing-brand-dragon`} text={`Dragon`} mode={`chars`} delay={0.08} />
              <TextReveal
                mode={`chars`}
                text={`Database`}
                delay={0.24}
                id={`landing-brand-database`}
                renderDecoration={(piece, index) => index === 0 && piece === `D` ? <DragonEye /> : null}
              />
            </h1>
            <Reveal id={`landing-wordmark-sword-reveal`} delay={0.24} className={`landing-wordmark-sword-reveal`}>
              <Artwork id={`landing-wordmark-sword`} className={`landing-wordmark-sword`} xml={wordmarkSwordXml} />
            </Reveal>
            <Reveal id={`landing-scaling-subtitle-reveal`} delay={0.3} className={`landing-scaling-subtitle-reveal`}>
              <h2 id={`landing-scaling-subtitle`} className={`landing-scaling-subtitle`}>
                <span id={`landing-subtitle-accessible`} className={`visually-hidden`}>The Scaling Collection</span>
                <Artwork id={`landing-subtitle-artwork`} xml={scalingCollectionXml} />
              </h2>
            </Reveal>
            {/* <Reveal id={`landing-introduction-reveal`} delay={0.38}>
              <p id={`landing-introduction`} className={`landing-introduction`}>
                <span id={`landing-introduction-wide`} className={`landing-introduction-wide`}>Explore dragon forms, compare their traits, and follow the lore.</span>
                <span id={`landing-introduction-compact`} className={`landing-introduction-compact`}>Forms, traits, and lore.</span>
              </p>
            </Reveal> */}
            <Reveal id={`landing-search-reveal`} delay={0.46} className={`landing-search-reveal`}>
              <form
                role={`search`}
                id={`landing-search-form`}
                className={`landing-search-form`}
                aria-label={`Dragon forms search`}
                onSubmit={(event) => { event.preventDefault(); submitSearch(); }}
              >
                <label id={`landing-search-label`} className={`visually-hidden`} htmlFor={`landing-search-input`}>Search names, forms, or traits</label>
                <SearchIcon
                  size={23}
                  aria-hidden={true}
                  id={`landing-search-icon`}
                  className={`landing-search-icon`}
                  fill={filledHeaderIcons ? `currentColor` : `none`}
                />
                <input
                  type={`search`}
                  value={query}
                  ref={searchRef}
                  autoCorrect={`off`}
                  autoComplete={`off`}
                  autoCapitalize={`none`}
                  id={`landing-search-input`}
                  className={`landing-search-input`}
                  placeholder={`Search names, forms, or traits`}
                  aria-controls={`landing-type-catalog`}
                  onChange={(event) => setQuery(event.target.value)}
                />
                {query.length > 0 ? (
                  <button id={`landing-search-clear`} className={`landing-search-clear`} type={`button`} aria-label={`Clear search`} onClick={clearSearch}>
                    <X id={`landing-search-clear-icon`} size={19} aria-hidden={true} />
                  </button>
                ) : null}
                <button id={`landing-search-submit`} className={`landing-search-submit`} type={`submit`}>
                  <span id={`landing-search-submit-label`} className={`landing-search-submit-label`}>Search</span>
                  <SearchIcon
                    size={18}
                    aria-hidden={true}
                    id={`landing-search-submit-icon`}
                    className={`landing-search-submit-icon`}
                    fill={filledHeaderIcons ? `currentColor` : `none`}
                  />
                </button>
              </form>
            </Reveal>
          </div>
        </section>
        <section ref={catalogRef} id={`landing-type-catalog`} className={`landing-type-catalog`} aria-labelledby={`landing-catalog-heading`}>
          <h2 id={`landing-catalog-heading`} className={`landing-catalog-heading`}>
            <ExploreIcon
              size={26}
              aria-hidden={true}
              id={`landing-catalog-heading-icon`}
              className={`landing-catalog-heading-icon`}
              fill={filledHeaderIcons ? `currentColor` : `none`}
            />
            <TextReveal id={`landing-catalog-heading-text`} text={hasQuery ? `Search results` : `Explore`} delay={0.08} />
          </h2>
          <p id={`landing-result-status`} className={hasQuery ? `landing-result-status` : `visually-hidden`} role={`status`} aria-live={`polite`} aria-atomic={true}>
            {isHydrated ? `${filteredTypes.length} dragon form${filteredTypes.length === 1 ? `` : `s`}${hasQuery ? ` matching “${query.trim()}”` : ` available`}` : ``}
          </p>
          {isHydrated && error && types.length > 0 ? (
            <div id={`landing-archive-notice`} className={`landing-feedback landing-archive-notice`} role={`status`}>
              <h3 id={`landing-notice-heading`} className={`landing-feedback-heading`}>Archive notice</h3>
              <p id={`landing-notice-copy`} className={`landing-feedback-copy`}>{error}</p>
              <button id={`landing-notice-retry`} className={`landing-feedback-action`} type={`button`} onClick={() => { void reload().catch(() => undefined); }}>
                <RotateCcw id={`landing-notice-retry-icon`} size={18} aria-hidden={true} />
                <span id={`landing-notice-retry-label`} className={`landing-feedback-action-label`}>Try again</span>
              </button>
            </div>
          ) : null}
          {!isHydrated ? (
            <div id={`landing-type-loading`} className={`landing-type-grid`} aria-busy={true} aria-label={`Loading dragon forms`}>
              {[0, 1, 2].map((index) => (
                <div key={index} id={`landing-type-skeleton-${index}`} className={`landing-type-skeleton`} aria-hidden={true}>
                  <span id={`landing-type-skeleton-${index}-symbol`} className={`landing-skeleton-symbol`} />
                  <span id={`landing-type-skeleton-${index}-title`} className={`landing-skeleton-title`} />
                </div>
              ))}
            </div>
          ) : error && types.length === 0 ? (
            <div id={`landing-load-error`} className={`landing-feedback`} role={`status`}>
              <h3 id={`landing-error-heading`} className={`landing-feedback-heading`}>Unable to load dragon forms</h3>
              <p id={`landing-error-copy`} className={`landing-feedback-copy`}>{error}</p>
              <button id={`landing-load-retry`} className={`landing-feedback-action`} type={`button`} onClick={() => { void reload().catch(() => undefined); }}>
                <RotateCcw id={`landing-load-retry-icon`} size={18} aria-hidden={true} />
                <span id={`landing-load-retry-label`} className={`landing-feedback-action-label`}>Try again</span>
              </button>
            </div>
          ) : filteredTypes.length === 0 ? (
            <div id={`landing-empty-results`} className={`landing-feedback`}>
              <h3 id={`landing-empty-heading`} className={`landing-feedback-heading`}>{types.length ? `No matching dragon forms` : `No dragon forms yet`}</h3>
              <p id={`landing-empty-copy`} className={`landing-feedback-copy`}>{types.length ? `Try another name, form, or trait.` : `Dragon forms will appear here when available.`}</p>
              {hasQuery ? (
                <button id={`landing-empty-clear`} className={`landing-feedback-action`} type={`button`} onClick={clearSearch}>
                  <X id={`landing-empty-clear-icon`} size={18} aria-hidden={true} />
                  <span id={`landing-empty-clear-label`} className={`landing-feedback-action-label`}>Clear search</span>
                </button>
              ) : null}
            </div>
          ) : (
            <div id={`landing-type-grid`} className={`landing-type-grid`}>
              {filteredTypes.map((type, index) => (
                <Reveal key={type.id} id={`landing-type-reveal-${type.id}`} delay={Math.min(0.16 + index * 0.09, 0.5)}>
                  <DragonTypeCard type={type} onSelect={() => setQuery(type.name)} />
                </Reveal>
              ))}
            </div>
          )}
        </section>
        <LandingSections />
      </main>
      <SiteFooter />
      <button
        ref={buttonRef}
        type={`button`}
        id={`landing-scroll-top`}
        aria-label={`Scroll to top`}
        aria-hidden={!pastHero}
        tabIndex={pastHero ? 0 : -1}
        onClick={scrollToTop}
        data-contrast={lightButton ? `light` : `dark`}
        className={`landing-scroll-top ${pastHero ? `is-visible` : ``}`}
      >
        <ChevronUp id={`landing-scroll-top-icon`} size={24} aria-hidden={true} />
      </button>
    </div>
  );
};

export default LandingPage;
