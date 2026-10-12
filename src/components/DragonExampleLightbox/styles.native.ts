import { StyleSheet } from 'react-native';
import { palette } from '../../styles/theme/theme';

export default StyleSheet.create({
  backdrop: { flex: 1, paddingHorizontal: 12, alignItems: `center`, justifyContent: `center`, backgroundColor: `#080b12e8` },
  dismiss: { ...StyleSheet.absoluteFillObject },
  panel: { flex: 1, minHeight: 0, width: `100%`, maxWidth: 1240, overflow: `hidden`, borderWidth: 1, borderColor: palette.line, backgroundColor: palette.paper },
});
