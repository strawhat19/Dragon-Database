import './styles.scss';
import Artwork from '../Artwork';
import { Asset } from 'expo-asset';
import WebAnchor from '../WebAnchor';
import PageLayout from '../PageLayout';
import { Link, Stack } from 'expo-router';
import { routes } from '../../shared/routes';
import { useRef, useState, useEffect } from 'react';
import useDragonFormPage from './useDragonFormPage';
import { dragonTypeIcons } from '../../shared/dragonTypeIcons';
import type { DragonExample } from '../../shared/models/dragons/DragonForm';
import { ArrowLeft, ArrowUpRight, Expand, RotateCcw, X } from 'lucide-react';
import { dragonFormKinds, dragonFormPath, getDragonFormName } from '../../shared/dragonForms';

const ExampleArtwork = ({ example, id, iconXml }: { example: DragonExample; id: string; iconXml: string }) => {
  const [failed, setFailed] = useState(false);
  return <div id={`${id}-art`} className={`dragon-form-example-art`}>
    {example.imageUrl && !failed ? <img id={`${id}-image`} className={`dragon-form-example-image`} src={example.imageUrl} alt={`${example.name} — Official ${example.franchise} Artwork`} loading={`lazy`} decoding={`async`} onError={() => setFailed(true)} /> : <div id={`${id}-art-reference`} className={`dragon-form-example-reference`}><Artwork id={`${id}-reference-symbol`} xml={iconXml} className={`dragon-form-example-symbol`} /><span>{failed ? `Artwork Unavailable · View Source` : `Explore The Source`}</span></div>}
  </div>;
};
const DragonFormPage = () => {
  const dialog = useRef<HTMLDialogElement>(null);
  const { kind, details, error, loading, retry, viewedArtwork, viewArtwork, closeArtwork } = useDragonFormPage();
  const id = `dragon-form-${kind ?? `unknown`}`;
  const title = details?.name ?? (kind ? getDragonFormName(kind) : `Dragon Form Not Found`);
  useEffect(() => {
    const element = dialog.current;
    if (viewedArtwork && element && !element.open) element.showModal();
    if (!viewedArtwork && element?.open) element.close();
    return () => { if (element?.open) element.close(); };
  }, [viewedArtwork?.id, kind]);
  return (
    <PageLayout id={id} title={title} description={details?.description ?? `Explore dragon anatomy, original art, and examples from different worlds.`}>
      <Stack.Screen options={{ title: `${title} | Dragon Database` }} />
      <div id={`${id}-content`} className={`dragon-form-content`}>
        <div id={`${id}-navigation`} className={`dragon-form-navigation`}>
          <Link href={routes.home.path} asChild><WebAnchor id={`${id}-home`} className={`dragon-form-back-link`}><ArrowLeft size={18} aria-hidden={true} />Back To The Collection</WebAnchor></Link>
          {details && <span id={`${id}-counts`} className={`dragon-form-counts`}>{details.gallery.length} Illustrations · {details.examples.length} References</span>}
        </div>
        {loading ? <p id={`${id}-loading`} className={`dragon-form-state`} role={`status`} aria-busy={true}>Loading Dragon Form…</p> : error ? <div id={`${id}-error`} className={`dragon-form-state`} role={`alert`}><h2>Dragon Form Could Not Be Loaded</h2><p>{error}</p><button type={`button`} id={`${id}-retry`} className={`dragon-form-action`} onClick={retry}><RotateCcw size={17} aria-hidden={true} />Try Again</button></div> : !details || !kind ? <div id={`${id}-not-found`} className={`dragon-form-state`}><h2>Choose A Dragon Form</h2><p>This form is not in the collection. Explore one of the forms below.</p></div> : <>
          <section id={`${id}-overview`} className={`dragon-form-overview`} aria-labelledby={`${id}-overview-title`}>
            <div id={`${id}-overview-copy`} className={`dragon-form-overview-copy`}><p className={`dragon-form-eyebrow`}>Form Guide</p><h2 id={`${id}-overview-title`} className={`dragon-form-section-title`}>Recognizing The Form</h2><p id={`${id}-overview-description`} className={`dragon-form-lead`}>{details.overview}</p></div>
            <div id={`${id}-anatomy`} className={`dragon-form-anatomy`}><h3 id={`${id}-anatomy-title`}>Anatomy &amp; Traits</h3><ul id={`${id}-anatomy-list`}>{details.anatomy.map((trait, index) => <li key={trait} id={`${id}-trait-${index}`}>{trait}</li>)}</ul></div>
          </section>
          <section id={`${id}-gallery`} className={`dragon-form-section`} aria-labelledby={`${id}-gallery-title`}>
            <div id={`${id}-gallery-heading`} className={`dragon-form-section-heading`}><div id={`${id}-gallery-heading-copy`}><p id={`${id}-gallery-eyebrow`} className={`dragon-form-eyebrow`}>Original Illustrations</p><h2 id={`${id}-gallery-title`} className={`dragon-form-section-title`}>The Art Collection</h2></div><p>Open an illustration to explore the full scene.</p></div>
            <div id={`${id}-gallery-grid`} className={`dragon-form-gallery`}>{details.gallery.map(artwork => <figure key={artwork.id} id={`${id}-art-${artwork.id}`} className={`dragon-form-art`}><button type={`button`} id={`${id}-view-${artwork.id}`} className={`dragon-form-art-button`} onClick={() => viewArtwork(artwork)} aria-label={`View ${artwork.title} Full Size`}><img id={`${id}-image-${artwork.id}`} className={`dragon-form-gallery-image`} src={Asset.fromModule(artwork.source).uri} alt={artwork.alt} loading={`lazy`} decoding={`async`} /><span id={`${id}-expand-${artwork.id}`} className={`dragon-form-art-expand`}><Expand size={17} aria-hidden={true} />View Artwork</span></button><figcaption id={`${id}-caption-${artwork.id}`}><span>{artwork.title}</span><span className={`dragon-form-art-credit`}>Dragon Database · Original Art</span></figcaption></figure>)}</div>
          </section>
          <section id={`${id}-examples`} className={`dragon-form-section`} aria-labelledby={`${id}-examples-title`}>
            <div id={`${id}-examples-heading`} className={`dragon-form-section-heading`}><div id={`${id}-examples-heading-copy`}><p id={`${id}-examples-eyebrow`} className={`dragon-form-eyebrow`}>Games · Film · Fiction</p><h2 id={`${id}-examples-title`} className={`dragon-form-section-title`}>Across Different Worlds</h2></div></div>
            <p id={`${id}-canon-note`} className={`dragon-form-canon-note`}>{details.note}</p>
            <div id={`${id}-examples-grid`} className={`dragon-form-examples`}>{details.examples.map(example => {
              const exampleId = `${id}-example-${example.id}`;
              return <article key={example.id} id={exampleId} className={`dragon-form-example`} aria-labelledby={`${exampleId}-title`}>
                <ExampleArtwork key={example.imageUrl ?? example.id} id={exampleId} example={example} iconXml={dragonTypeIcons[kind]} />
                <div id={`${exampleId}-body`} className={`dragon-form-example-body`}><p id={`${exampleId}-franchise`} className={`dragon-form-eyebrow`}>{example.franchise}</p><h3 id={`${exampleId}-title`}>{example.name}</h3><p id={`${exampleId}-description`} className={`dragon-form-example-description`}>{example.description}</p><p id={`${exampleId}-canon`} className={`dragon-form-example-canon`}>{example.canonLabel}</p>{example.imageCredit && <p id={`${exampleId}-credit`} className={`dragon-form-reference-credit`}>{example.imageCredit}</p>}<a id={`${exampleId}-source`} href={example.sourceUrl} className={`dragon-form-source-link`} target={`_blank`} rel={`noopener noreferrer`} aria-label={`View Source For ${example.name} (Opens In A New Tab)`}>View Source<ArrowUpRight size={17} aria-hidden={true} /></a>{example.anatomySourceUrl && <a id={`${exampleId}-anatomy-source`} href={example.anatomySourceUrl} className={`dragon-form-source-link`} target={`_blank`} rel={`noopener noreferrer`} aria-label={`View Anatomy Reference For ${example.name} (Opens In A New Tab)`}>Anatomy Reference<ArrowUpRight size={17} aria-hidden={true} /></a>}</div>
              </article>;
            })}</div>
          </section>
        </>}
        <nav id={`${id}-related`} className={`dragon-form-related`} aria-labelledby={`${id}-related-title`}><h2 id={`${id}-related-title`} className={`dragon-form-section-title`}>Explore More Forms</h2><div id={`${id}-related-links`} className={`dragon-form-related-links`}>{dragonFormKinds.filter(related => related !== kind).map(related => <Link key={related} href={dragonFormPath(related)} asChild><WebAnchor id={`${id}-related-${related}`} className={`dragon-form-related-link`}>{getDragonFormName(related)}<ArrowUpRight size={17} aria-hidden={true} /></WebAnchor></Link>)}</div></nav>
      </div>
      <dialog ref={dialog} id={`${id}-art-viewer`} className={`dragon-form-art-viewer`} aria-labelledby={`${id}-viewer-title`} onCancel={event => { event.preventDefault(); closeArtwork(); }} onClick={event => { if (event.target === event.currentTarget) closeArtwork(); }}>
        {viewedArtwork && <div id={`${id}-viewer-content`} className={`dragon-form-viewer-content`}><div id={`${id}-viewer-heading`} className={`dragon-form-viewer-heading`}><h2 id={`${id}-viewer-title`}>{viewedArtwork.title}</h2><button type={`button`} id={`${id}-viewer-close`} className={`dragon-form-viewer-close`} onClick={closeArtwork} aria-label={`Close Artwork Viewer`}><X size={22} aria-hidden={true} /></button></div><img id={`${id}-viewer-image`} className={`dragon-form-viewer-image`} src={Asset.fromModule(viewedArtwork.source).uri} alt={viewedArtwork.alt} /><p className={`dragon-form-viewer-credit`}>Dragon Database · Original Art</p></div>}
      </dialog>
    </PageLayout>
  );
};
export default DragonFormPage;
