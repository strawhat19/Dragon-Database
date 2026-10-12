import { StyleSheet } from 'react-native';
import { palette } from '../../styles/theme/theme';

export default StyleSheet.create({
  page: { gap: 26 },
  state: { gap: 18, padding: 24, borderWidth: 1, borderColor: palette.line, backgroundColor: palette.paper },
  title: { fontSize: 28, lineHeight: 35, color: palette.ink, fontFamily: `DragonSlapper` },
  body: { fontSize: 21, lineHeight: 29, color: palette.muted, fontFamily: `AlegreyaSans` },
  back: { gap: 10, minHeight: 44, paddingVertical: 8, flexDirection: `row`, alignItems: `center` },
  backText: { fontSize: 19, lineHeight: 26, color: palette.ink, fontFamily: `AlegreyaSans` },
});
