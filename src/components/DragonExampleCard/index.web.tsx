import '../DragonTypeCard/styles.scss';
import './styles.scss';
import Artwork from '../Artwork';
import { Info, Play, Pause, X } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import type { DragonExampleCardProps } from './types';
import { useReducedMotion } from '../../shared/motion';

const DragonExampleCard = ({ id, example, iconXml, onOpenDetails }: DragonExampleCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();
  const [imageFailed, setImageFailed] = useState(false);
  const [gifFailed, setGifFailed] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [embedPlaying, setEmbedPlaying] = useState(false);
  const [paused, setPaused] = useState(true);
  const videoUrl = videoFailed ? undefined : example.videoUrl;
  const gifUrl = !reducedMotion && !paused && !gifFailed ? example.gifUrl : undefined;
  const imageUrl = !videoUrl ? gifUrl ?? example.imageUrl : example.imageUrl;
  const imageAlt = example.imageAlt ?? `${example.name} — ${example.franchise}`;
  const openDetails = () => {
    videoRef.current?.pause();
    setPaused(true);
    setEmbedPlaying(false);
    onOpenDetails?.();
  };
  useEffect(() => {
    if (!reducedMotion) return;
    videoRef.current?.pause();
    setPaused(true);
  }, [reducedMotion]);
  const pauseMotion = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) void video.play().catch(() => setVideoFailed(true));
      else video.pause();
    } else setPaused(current => !current);
  };

  return (
    <article id={id} className={`dragon-type-card dragon-example-card`} aria-labelledby={`${id}-title`}>
      <header id={`${id}-header`} className={`dragon-type-metadata dragon-example-card__header`}>
        <Artwork id={`${id}-form-icon`} xml={iconXml} className={`dragon-type-title-icon`} />
        <div id={`${id}-heading`} className={`dragon-example-card__heading`}>
          <p id={`${id}-franchise`} className={`dragon-example-card__franchise`}>{example.franchise}</p>
          <h3 id={`${id}-title`} className={`dragon-type-title dragon-example-card__title`}>{example.name}</h3>
        </div>
        <button type={`button`} id={`${id}-info`} onClick={openDetails} disabled={!onOpenDetails} aria-haspopup={`dialog`} className={`dragon-example-card__info`} aria-label={`View ${example.name} Details`}><Info size={21} strokeWidth={2.25} aria-hidden={true} /></button>
      </header>
      <div id={`${id}-media`} className={`dragon-type-art-frame dragon-example-card__media`}>
        {embedPlaying && example.videoEmbedUrl ? <>
          <iframe id={`${id}-video-embed`} className={`dragon-example-card__embed`} src={example.videoEmbedUrl} title={`${example.name} Video`} allow={`autoplay; encrypted-media; picture-in-picture; fullscreen`} referrerPolicy={`strict-origin-when-cross-origin`} allowFullScreen />
          <button type={`button`} id={`${id}-close-video`} className={`dragon-example-card__motion-control`} aria-label={`Close ${example.name} Video`} onClick={() => setEmbedPlaying(false)}><X size={18} aria-hidden={true} /></button>
        </> : videoUrl ? <>
          <video ref={videoRef} id={`${id}-video`} className={`dragon-example-card__video`} src={videoUrl} poster={example.imageUrl} aria-label={imageAlt} autoPlay={!reducedMotion} playsInline muted loop preload={`metadata`} onPlay={() => setPaused(false)} onPause={() => setPaused(true)} onError={() => setVideoFailed(true)} />
          <button type={`button`} id={`${id}-toggle-motion`} className={`dragon-example-card__motion-control`} aria-label={`${paused ? `Play` : `Pause`} ${example.name} Clip`} onClick={pauseMotion}>{paused ? <Play size={18} aria-hidden={true} /> : <Pause size={18} aria-hidden={true} />}</button>
        </> : imageUrl && (gifUrl || !imageFailed) ? (
          <img key={imageUrl} id={`${id}-image`} className={`dragon-type-graphic dragon-example-card__image`} src={imageUrl} alt={imageAlt} loading={`lazy`} decoding={`async`} onError={() => gifUrl ? setGifFailed(true) : setImageFailed(true)} />
        ) : <div id={`${id}-media-unavailable`} className={`dragon-example-card__media-unavailable`}><Artwork id={`${id}-reference-icon`} xml={iconXml} className={`dragon-example-card__reference-icon`} /><span>{imageFailed ? `Artwork Unavailable · View Details` : `Explore The Details`}</span></div>}
        {example.gifUrl && !embedPlaying && !videoUrl && !reducedMotion && !gifFailed ? <button type={`button`} id={`${id}-toggle-motion`} className={`dragon-example-card__motion-control`} aria-label={`${paused ? `Play` : `Pause`} ${example.name} Animation`} onClick={pauseMotion}>{paused ? <Play size={18} aria-hidden={true} /> : <Pause size={18} aria-hidden={true} />}</button> : null}
        {example.videoEmbedUrl && !embedPlaying && !videoUrl ? <button type={`button`} id={`${id}-play-video`} className={`dragon-example-card__play`} onClick={() => setEmbedPlaying(true)}><Play size={21} aria-hidden={true} /><span>Play Clip</span></button> : null}
      </div>
      <div id={`${id}-body`} className={`dragon-type-body dragon-example-card__body`}>
        <p id={`${id}-description`} className={`dragon-example-card__description`}>{example.description}</p>
      </div>
      <footer id={`${id}-actions`} className={`dragon-type-action dragon-example-card__actions`}>
        <button type={`button`} id={`${id}-details`} onClick={openDetails} disabled={!onOpenDetails} aria-haspopup={`dialog`} className={`dragon-example-card__details`} aria-label={`View ${example.name} Details`}><Info size={18} aria-hidden={true} /><span>View Details</span></button>
      </footer>
    </article>
  );
};

export default DragonExampleCard;
