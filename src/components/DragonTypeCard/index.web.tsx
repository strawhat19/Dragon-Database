import Artwork from '../Artwork';
import { ArrowUpRight } from 'lucide-react';
import type { DragonTypeCardProps } from './types';
import { getDragonTypeCardContent } from './content';
import { dragonTypeGraphics } from '../../shared/landingArtwork';
import './styles.scss';

const DragonTypeCard = ({ type, onSelect }: DragonTypeCardProps) => {
  const { traits, specimen } = getDragonTypeCardContent(type);

  return (
    <button
      type={`button`}
      onClick={onSelect}
      disabled={!onSelect}
      className={`dragon-type-card`}
      id={`dragon-type-card-${type.id}`}
      aria-label={`Filter by ${type.name}`}
      aria-describedby={`dragon-type-traits-${type.id} dragon-type-description-${type.id}`}
    >
      <span className={`dragon-type-metadata`} id={`dragon-type-metadata-${type.id}`}>
        <span className={`dragon-type-specimen`} id={`dragon-type-specimen-${type.id}`}>{specimen}</span>
        <span className={`dragon-type-category`} id={`dragon-type-category-${type.id}`}>Dragon form</span>
      </span>
      <span className={`dragon-type-art-frame`} id={`dragon-type-art-frame-${type.id}`}>
        <Artwork
          className={`dragon-type-graphic`}
          id={`dragon-type-graphic-${type.id}`}
          xml={dragonTypeGraphics[type.kind]}
        />
      </span>
      <span className={`dragon-type-body`} id={`dragon-type-body-${type.id}`}>
        <span className={`dragon-type-title`} id={`dragon-type-title-${type.id}`}>{type.name}</span>
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
