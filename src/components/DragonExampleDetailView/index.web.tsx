import './styles.scss';
import Artwork from '../Artwork';
import WebAnchor from '../WebAnchor';
import DetailMedia from './Media.web';
import { Link } from 'expo-router';
import { useRef, useState, useEffect } from 'react';
import { useReducedMotion } from '../../shared/motion';
import type { DragonExampleDetailViewProps } from './types';
import { dragonFormPath } from '../../shared/dragonForms';
import { dragonTypeIcons } from '../../shared/dragonTypeIcons';
import { dragonExamplePath } from '../../shared/dragonExamples';
import useDragonExampleDetailView from './useDragonExampleDetailView';
import type { DragonExampleDetail } from '../../shared/models/dragons/DragonExampleDetail';
import { X, Info, Tags, Image, Play, Flame, BookOpen, ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink } from 'lucide-react';

const detailTabs = [{ key: `artwork`, label: `Artwork`, Icon: Image }, { key: `overview`, label: `Overview`, Icon: Info }, { key: `details`, label: `Details`, Icon: Tags }, { key: `anatomy`, label: `Anatomy`, Icon: Flame }, { key: `sources`, label: `Sources`, Icon: BookOpen }] as const;
type DetailTab = typeof detailTabs[number][`key`];
const Thumbnail = ({ id, example }: { id: string; example: DragonExampleDetail }) => {
  const [failed, setFailed] = useState(false);
  return example.imageUrl && !failed ? <img id={`${id}-image`} className={`dragon-example-detail__thumbnail-image`} src={example.imageUrl} alt={``} loading={`lazy`} decoding={`async`} onError={() => setFailed(true)} /> : <Artwork id={`${id}-fallback-icon`} xml={dragonTypeIcons[example.kind]} className={`dragon-example-detail__thumbnail-icon`} />;
};

const DragonExampleDetailView = (props: DragonExampleDetailViewProps) => {
  const { id, example, modal, onClose, onSelect } = props;
  const reducedMotion = useReducedMotion();
  const thumbnailStrip = useRef<HTMLDivElement>(null);
  const [compact, setCompact] = useState(false);
  const [selectedTab, setSelectedTab] = useState<DetailTab>(`artwork`);
  const { collection, metadata, currentIndex, previous, next, selectPrevious, selectNext } = useDragonExampleDetailView(props);
  const frameId = `${id}-${example.id}`;
  const tabs = compact ? detailTabs : detailTabs.filter(tab => tab.key !== `artwork`);
  const activeTab = !compact && selectedTab === `artwork` ? `overview` : selectedTab;
  const showArtwork = !compact || activeTab === `artwork`;
  useEffect(() => {
    const preference = window.matchMedia(`(max-width: 900px)`);
    const update = () => setCompact(preference.matches);
    update();
    preference.addEventListener(`change`, update);
    return () => preference.removeEventListener(`change`, update);
  }, []);
  useEffect(() => {
    const strip = thumbnailStrip.current;
    const selected = strip?.querySelector<HTMLButtonElement>(`[aria-pressed=true]`);
    if (!strip || !selected) return;
    strip.scrollTo({ left: Math.max(0, selected.offsetLeft - (strip.clientWidth - selected.offsetWidth) / 2), behavior: reducedMotion ? `auto` : `smooth` });
  }, [example.id, reducedMotion, collection.length]);

  return <article id={id} className={`dragon-example-detail${modal ? ` dragon-example-detail--modal` : ``}`} aria-labelledby={`${frameId}-title`}>
    <header id={`${id}-header`} className={`dragon-example-detail__header`}>
      <Artwork id={`${frameId}-form-icon`} xml={dragonTypeIcons[example.kind]} className={`dragon-example-detail__form-icon`} />
      <div id={`${frameId}-identity`} className={`dragon-example-detail__identity`}><p id={`${frameId}-franchise`} className={`dragon-example-detail__franchise`}>{example.franchise}</p><h2 id={`${frameId}-title`} className={`dragon-example-detail__title`} title={example.name}>{example.name}</h2></div>
      {onClose && <button type={`button`} id={`${id}-close`} className={`dragon-example-detail__close`} aria-label={`Close Dragon Details`} onClick={onClose}><X size={22} aria-hidden={true} /></button>}
    </header>
    <div id={`${frameId}-frame`} className={`dragon-example-detail__frame${reducedMotion ? `` : ` dragon-example-detail__frame--animated`}`}>
      <div id={`${frameId}-workspace`} className={`dragon-example-detail__workspace`} data-tab={activeTab}>
        <figure id={`${id}-panel-artwork`} className={`dragon-example-detail__figure`} hidden={!showArtwork} role={compact ? `tabpanel` : undefined} tabIndex={compact ? 0 : undefined} aria-labelledby={compact ? `${id}-tab-artwork` : `${frameId}-title`}>{showArtwork && <DetailMedia key={example.id} id={frameId} example={example} />}</figure>
        <div id={`${frameId}-content`} className={`dragon-example-detail__content`}>
          <div id={`${id}-tabs`} className={`dragon-example-detail__tabs`} role={`tablist`} aria-label={`Dragon Detail Sections`} onKeyDown={event => {
            if (event.altKey || event.ctrlKey || event.metaKey) return;
            const step = event.key === `ArrowLeft` ? -1 : event.key === `ArrowRight` ? 1 : 0;
            if (!step && event.key !== `Home` && event.key !== `End`) return;
            event.preventDefault(); event.stopPropagation();
            const index = tabs.findIndex(tab => tab.key === activeTab);
            const nextIndex = event.key === `Home` ? 0 : event.key === `End` ? tabs.length - 1 : (index + step + tabs.length) % tabs.length;
            const nextTab = tabs[nextIndex];
            if (nextTab) { setSelectedTab(nextTab.key); document.getElementById(`${id}-tab-${nextTab.key}`)?.focus(); }
          }}>{tabs.map(({ key, label, Icon }) => <button key={key} type={`button`} role={`tab`} id={`${id}-tab-${key}`} className={`dragon-example-detail__tab${activeTab === key ? ` is-active` : ``}`} aria-selected={activeTab === key} aria-controls={`${id}-panel-${key}`} tabIndex={activeTab === key ? 0 : -1} onClick={() => setSelectedTab(key)}><Icon size={16} aria-hidden={true} /><span>{label}</span></button>)}</div>
          <div id={`${frameId}-panels`} className={`dragon-example-detail__panels`} hidden={compact && activeTab === `artwork`}>
            <section id={`${id}-panel-overview`} className={`dragon-example-detail__panel`} role={`tabpanel`} aria-labelledby={`${id}-tab-overview`} tabIndex={0} hidden={activeTab !== `overview`}><h3 id={`${frameId}-story-title`} className={`dragon-example-detail__section-title`}>About {example.name}</h3><p id={`${frameId}-description`} className={`dragon-example-detail__description`}>{example.description}</p></section>
            <section id={`${id}-panel-details`} className={`dragon-example-detail__panel`} role={`tabpanel`} aria-labelledby={`${id}-tab-details`} tabIndex={0} hidden={activeTab !== `details`}>
              <p id={`${frameId}-canon`} className={`dragon-example-detail__canon`}>{example.canonLabel}</p>
              <dl id={`${frameId}-metadata`} className={`dragon-example-detail__metadata`}>{metadata.map(field => <div key={field.label} id={`${frameId}-field-${field.label.toLowerCase()}`} className={`dragon-example-detail__metadata-field`}><dt className={`dragon-example-detail__metadata-label`}>{field.label}</dt><dd className={`dragon-example-detail__metadata-values`}>{field.values.length ? field.values.map((value, index) => <span key={`${value}-${index}`} id={`${frameId}-${field.label.toLowerCase()}-${index}`} className={`dragon-example-detail__tag`}>{value}</span>) : <span className={`dragon-example-detail__metadata-empty`}>Not Documented</span>}</dd></div>)}</dl>
            </section>
            <section id={`${id}-panel-anatomy`} className={`dragon-example-detail__panel`} role={`tabpanel`} aria-labelledby={`${id}-tab-anatomy`} tabIndex={0} hidden={activeTab !== `anatomy`}><h3 id={`${frameId}-anatomy-title`} className={`dragon-example-detail__section-title`}>Anatomy &amp; Form</h3><ul id={`${frameId}-traits`} className={`dragon-example-detail__traits`}>{example.anatomy.map((trait, index) => <li key={trait} id={`${frameId}-trait-${index}`} className={`dragon-example-detail__trait`}>{trait}</li>)}</ul><p id={`${frameId}-form-note`} className={`dragon-example-detail__form-note`}>{example.formNote}</p><Link href={dragonFormPath(example.kind)} asChild><WebAnchor id={`${frameId}-form-page`} className={`dragon-example-detail__form-link`} onClick={onClose}><span>Explore The {example.formName} Form</span><ArrowUpRight size={17} aria-hidden={true} /></WebAnchor></Link></section>
            <section id={`${id}-panel-sources`} className={`dragon-example-detail__panel`} role={`tabpanel`} aria-labelledby={`${id}-tab-sources`} tabIndex={0} hidden={activeTab !== `sources`}><h3 id={`${frameId}-sources-title`} className={`dragon-example-detail__section-title`}>Sources &amp; Credits</h3><p id={`${frameId}-source-franchise`} className={`dragon-example-detail__credit`}>{example.franchise}</p>{example.imageCredit && <p id={`${frameId}-credit`} className={`dragon-example-detail__credit`}>{example.imageCredit}</p>}<div id={`${frameId}-sources`} className={`dragon-example-detail__sources`}><a id={`${frameId}-source`} className={`dragon-example-detail__source-link`} href={example.sourceUrl} target={`_blank`} rel={`noopener noreferrer`} aria-label={`View Source For ${example.name} (Opens In A New Tab)`}><BookOpen size={18} aria-hidden={true} /><span>View Original Source</span><ArrowUpRight size={17} aria-hidden={true} /></a>{example.anatomySourceUrl && <a id={`${frameId}-anatomy-source`} className={`dragon-example-detail__source-link`} href={example.anatomySourceUrl} target={`_blank`} rel={`noopener noreferrer`}><BookOpen size={18} aria-hidden={true} /><span>Anatomy Reference</span><ArrowUpRight size={17} aria-hidden={true} /></a>}{example.videoSourceUrl && <a id={`${frameId}-video-source`} className={`dragon-example-detail__source-link`} href={example.videoSourceUrl} target={`_blank`} rel={`noopener noreferrer`}><Play size={18} aria-hidden={true} /><span>Watch Full Clip</span><ArrowUpRight size={17} aria-hidden={true} /></a>}</div></section>
          </div>
        </div>
      </div>
    </div>
    <section id={`${id}-collection`} className={`dragon-example-detail__collection`} aria-label={`Choose A Dragon`}>
      <nav id={`${id}-navigation`} className={`dragon-example-detail__navigation`} aria-label={`Dragon Slideshow`}>
        <button type={`button`} id={`${id}-previous`} className={`dragon-example-detail__nav-button`} disabled={collection.length < 2} onClick={selectPrevious} aria-label={`Previous Dragon${previous ? `: ${previous.name}` : ``}`}><ArrowLeft size={18} aria-hidden={true} /><span>Previous</span></button>
        <p id={`${id}-counter`} className={`dragon-example-detail__counter`} aria-live={`polite`} aria-atomic={true}>{currentIndex + 1}<span> / {collection.length}</span></p>
        <button type={`button`} id={`${id}-next`} className={`dragon-example-detail__nav-button`} disabled={collection.length < 2} onClick={selectNext} aria-label={`Next Dragon${next ? `: ${next.name}` : ``}`}><span>Next</span><ArrowRight size={18} aria-hidden={true} /></button>
        {modal && <Link href={dragonExamplePath(example)} asChild><WebAnchor id={`${frameId}-full-page`} className={`dragon-example-detail__full-page`} onClick={onClose} aria-label={`Open ${example.name} Full Page`}><ExternalLink size={17} aria-hidden={true} /><span>Open Full Page</span></WebAnchor></Link>}
      </nav>
      <div ref={thumbnailStrip} id={`${id}-thumbnails`} className={`dragon-example-detail__thumbnails`}>{collection.map(item => {
        const thumbnailId = `${id}-thumbnail-${item.id}`;
        return <button key={item.id} type={`button`} id={thumbnailId} className={`dragon-example-detail__thumbnail${item.id === example.id ? ` dragon-example-detail__thumbnail--active` : ``}`} aria-pressed={item.id === example.id} aria-label={`View ${item.name} From ${item.franchise}`} title={`${item.name} · ${item.franchise}`} onClick={() => onSelect(item.id)}><div id={`${thumbnailId}-art`} className={`dragon-example-detail__thumbnail-art`}><Thumbnail id={thumbnailId} example={item} /></div><span id={`${thumbnailId}-name`} className={`dragon-example-detail__thumbnail-name`}>{item.name}</span></button>;
      })}</div>
    </section>
  </article>;
};

export default DragonExampleDetailView;
export type { DragonExampleDetailViewProps } from './types';
