import { SvgXml } from 'react-native-svg';
import type { ArtworkProps } from './types';
import { useTheme } from '../../shared/themeContext/ThemeContext';

const Artwork = ({ id, xml, label }: ArtworkProps) => {
  const { themeArtwork } = useTheme();

  return <SvgXml
    xml={themeArtwork(xml)}
    width={`100%`}
    height={`100%`}
    nativeID={id}
    accessible={Boolean(label)}
    accessibilityLabel={label}
  />;
};

export default Artwork;
