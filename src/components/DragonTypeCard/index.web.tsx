import './styles.scss';
import Artwork from '../Artwork';
import { Asset } from 'expo-asset';
import { ArrowUpRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import type { DragonTypeCardProps } from './types';
import { getDragonTypeCardContent } from './content';
import { dragonTypeImages } from '../../shared/dragonTypeImages';

const DragonTypeCard = ({ type, onSelect }: DragonTypeCardProps) => {
  const image = dragonTypeImages[type.kind];
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const alternateRef = useRef<HTMLImageElement>(null);
  const [loadedAlternate, setLoadedAlternate] = useState<number>();
  const { traits, iconXml, formNumber } = getDragonTypeCardContent(type);

  useEffect(() => {
    const alternate = alternateRef.current;
    if (alternate?.complete && alternate.naturalWidth > 0) setLoadedAlternate(image.hoverSource);
  }, [image.hoverSource]);

  return (
    <button
      type={`button`}
      onClick={onSelect}
      disabled={!onSelect}
      className={`dragon-type-card`}
      id={`dragon-type-card-${type.id}`}
      aria-label={`Filter by ${type.name}`}
      onPointerUp={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
      data-art-active={hovered || focused || pressed}
      onBlur={() => { setFocused(false); setPressed(false); }}
      onPointerLeave={() => { setHovered(false); setPressed(false); }}
      onFocus={event => setFocused(event.currentTarget.matches(`:focus-visible`))}
      onPointerDown={event => { if (event.pointerType === `touch`) setPressed(true); }}
      onPointerEnter={event => { if (event.pointerType !== `touch`) setHovered(true); }}
      aria-describedby={`dragon-type-traits-${type.id} dragon-type-description-${type.id}`}
    >
      <span className={`dragon-type-metadata`} id={`dragon-type-metadata-${type.id}`}>
        <span className={`dragon-type-title-group`} id={`dragon-type-title-group-${type.id}`}>
          <Artwork
            xml={iconXml}
            className={`dragon-type-title-icon`}
            id={`dragon-type-title-icon-${type.id}`}
          />
          <span className={`dragon-type-title`} id={`dragon-type-title-${type.id}`}>{type.name}</span>
        </span>
        <span className={`dragon-type-form`} id={`dragon-type-form-${type.id}`}>
          <span className={`dragon-type-form-label`} id={`dragon-type-form-label-${type.id}`}>Form</span>
          <span className={`dragon-type-form-number`} id={`dragon-type-form-number-${type.id}`}>{formNumber}</span>
        </span>
      </span>
      <span
        className={`dragon-type-art-frame`}
        id={`dragon-type-art-frame-${type.id}`}
        data-alternate-ready={loadedAlternate === image.hoverSource}
      >
        <img
          alt={image.alt}
          loading={`lazy`}
          decoding={`async`}
          className={`dragon-type-graphic`}
          id={`dragon-type-graphic-${type.id}`}
          src={Asset.fromModule(image.source).uri}
        />
        <img
          alt={``}
          aria-hidden
          ref={alternateRef}
          loading={`eager`}
          decoding={`async`}
          key={image.hoverSource}
          id={`dragon-type-alternate-${type.id}`}
          src={Asset.fromModule(image.hoverSource).uri}
          onError={() => setLoadedAlternate(undefined)}
          className={`dragon-type-graphic dragon-type-graphic-alternate`}
          onLoad={() => setLoadedAlternate(image.hoverSource)}
        />
      </span>
      <span className={`dragon-type-body`} id={`dragon-type-body-${type.id}`}>
        <span className={`dragon-type-traits`} id={`dragon-type-traits-${type.id}`}>{traits}</span>
        <span className={`dragon-type-description`} id={`dragon-type-description-${type.id}`}>{type.description}</span>
      </span>
      <span className={`dragon-type-action`} id={`dragon-type-action-${type.id}`}>
        <span className={`dragon-type-action-label`} id={`dragon-type-action-label-${type.id}`}>Filter by form</span>
        <ArrowUpRight size={19} aria-hidden />
      </span>
    </button>
  );
};

export default DragonTypeCard;
