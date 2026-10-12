import Artwork from '../Artwork';
import { useRef, useState, useEffect } from 'react';
import { Play, Pause, X } from 'lucide-react';
import { useReducedMotion } from '../../shared/motion';
import { dragonTypeIcons } from '../../shared/dragonTypeIcons';
import type { DragonExampleDetail } from '../../shared/models/dragons/DragonExampleDetail';

type MediaProps = { id: string; example: DragonExampleDetail };

const DetailMedia = ({ id, example }: MediaProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(true);
  const [gifFailed, setGifFailed] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [embedPlaying, setEmbedPlaying] = useState(false);
  const videoUrl = videoFailed ? undefined : example.videoUrl;
  const gifUrl = !paused && !reducedMotion && !gifFailed ? example.gifUrl : undefined;
  const imageUrl = gifUrl ?? example.imageUrl;
  const imageAlt = example.imageAlt ?? `${example.name} — ${example.franchise}`;
  useEffect(() => {
    if (!reducedMotion) return;
    videoRef.current?.pause();
    setPaused(true);
  }, [reducedMotion]);
  const toggleMotion = () => {
    const video = videoRef.current;
    if (!video) { setPaused(current => !current); return; }
    if (!video.paused) { video.pause(); return; }
    void video.play().catch(() => setVideoFailed(true));
  };
  const canPlayAnimation = Boolean(videoUrl || (example.gifUrl && !gifFailed && !reducedMotion));

  return <div id={`${id}-media`} className={`dragon-example-detail__media${reducedMotion ? `` : ` dragon-example-detail__media--animated`}`}>
    {embedPlaying && example.videoEmbedUrl ? <>
      <iframe id={`${id}-video-embed`} className={`dragon-example-detail__embed`} src={example.videoEmbedUrl} title={`${example.name} Video`} allow={`autoplay; encrypted-media; picture-in-picture; fullscreen`} referrerPolicy={`strict-origin-when-cross-origin`} allowFullScreen />
      <button type={`button`} id={`${id}-close-video`} className={`dragon-example-detail__media-control`} aria-label={`Close ${example.name} Video`} onClick={() => setEmbedPlaying(false)}><X size={19} aria-hidden={true} /><span>Close Video</span></button>
    </> : videoUrl ? <>
      <video ref={videoRef} id={`${id}-video`} className={`dragon-example-detail__video`} src={videoUrl} poster={example.imageUrl} aria-label={imageAlt} playsInline muted loop preload={`metadata`} onPlay={() => setPaused(false)} onPause={() => setPaused(true)} onError={() => setVideoFailed(true)} />
    </> : imageUrl && (gifUrl || !imageFailed) ? <img key={imageUrl} id={`${id}-image`} className={`dragon-example-detail__image`} src={imageUrl} alt={imageAlt} decoding={`async`} onError={() => gifUrl ? setGifFailed(true) : setImageFailed(true)} /> : <div id={`${id}-art-unavailable`} className={`dragon-example-detail__art-unavailable`}><Artwork id={`${id}-reference-icon`} xml={dragonTypeIcons[example.kind]} className={`dragon-example-detail__reference-icon`} /><p id={`${id}-unavailable-label`} className={`dragon-example-detail__unavailable-label`}>{imageFailed || videoFailed ? `Artwork Unavailable · Open Sources Tab` : `Explore The Sources Tab`}</p></div>}
    {!embedPlaying && canPlayAnimation && <button type={`button`} id={`${id}-motion-toggle`} className={`dragon-example-detail__media-control`} aria-label={`${paused ? `Play` : `Pause`} ${example.name} Preview`} onClick={toggleMotion}>{paused ? <Play size={19} aria-hidden={true} /> : <Pause size={19} aria-hidden={true} />}<span>{paused ? `Play Preview` : `Pause Preview`}</span></button>}
    {example.videoEmbedUrl && !embedPlaying && <button type={`button`} id={`${id}-play-video`} className={`dragon-example-detail__play-video`} onClick={() => { videoRef.current?.pause(); setEmbedPlaying(true); }}><Play size={21} aria-hidden={true} /><span>Watch Full Clip</span></button>}
  </div>;
};

export default DetailMedia;
