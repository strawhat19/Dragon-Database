import { SvgXml } from 'react-native-svg';
import type { ArtworkProps } from './types';

const Artwork = ({ id, xml, label }: ArtworkProps) => (
  <SvgXml
    xml={xml}
    width={`100%`}
    height={`100%`}
    nativeID={id}
    accessible={Boolean(label)}
    accessibilityLabel={label}
  />
);

export default Artwork;
