import { useMemo } from 'react';
import type { ArtworkProps } from './types';

const scopedArtwork = (xml: string, prefix: string) => xml
  .replace(/\bid="([^"]+)"/g, (_, value: string) => `id="${prefix}-${value}"`)
  .replace(/url\(#([^)]+)\)/g, (_, value: string) => `url(#${prefix}-${value})`)
  .replace(/\b(href|xlink:href)="#([^"]+)"/g, (_, attribute: string, value: string) => `${attribute}="#${prefix}-${value}"`)
  .replace(/\baria-labelledby="([^"]+)"/g, (_, value: string) => `aria-labelledby="${value.split(/\s+/).map((key) => `${prefix}-${key}`).join(` `)}"`);

const Artwork = ({ id, xml, label, className = `` }: ArtworkProps) => {
  const markup = useMemo(() => scopedArtwork(xml, id), [xml, id]);
  return (
    <span
      id={id}
      className={`artwork ${className}`}
      role={label ? `img` : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
};

export default Artwork;
