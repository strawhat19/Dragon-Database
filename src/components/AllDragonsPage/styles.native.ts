import { StyleSheet } from 'react-native';
import { palette } from '../../styles/theme/theme';

export default StyleSheet.create({
  content: { gap: 26 },
  back: { gap: 10, minHeight: 44, paddingVertical: 8, alignItems: `center`, flexDirection: `row` },
  backLabel: { fontSize: 19, lineHeight: 26, color: palette.ink, fontFamily: `AlegreyaSans` },
  error: { fontSize: 18, lineHeight: 25, color: palette.red, fontFamily: `AlegreyaSans` },
});
