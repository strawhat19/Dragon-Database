import { StyleSheet } from 'react-native';
import { palette } from '../../styles/theme/theme';

export default StyleSheet.create({
  collection: { gap: 24 },
  grid: { gap: 20 },
  wideGrid: { gap: 24, flexWrap: `wrap`, flexDirection: `row`, alignItems: `stretch` },
  state: { gap: 16, padding: 24, borderWidth: 1, borderColor: palette.line, backgroundColor: palette.paper },
  stateText: { fontSize: 20, lineHeight: 28, color: palette.muted, fontFamily: `AlegreyaSans` },
  action: { gap: 8, minHeight: 44, borderWidth: 1, paddingVertical: 10, flexDirection: `row`, alignItems: `center`, alignSelf: `flex-start`, paddingHorizontal: 14, borderColor: palette.line, backgroundColor: palette.silver },
  actionText: { fontSize: 18, color: palette.ink, fontFamily: `AlegreyaSans` },
});
