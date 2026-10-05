import { StyleSheet } from 'react-native';
import { palette } from '../../styles/theme/theme';

export default StyleSheet.create({
  footer: {
    gap: 16,
    paddingTop: 24,
    paddingBottom: 28,
    borderTopColor: palette.line,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  row: {
    gap: 16,
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `space-between`,
  },
  compactRow: {
    gap: 8,
    alignItems: `flex-start`,
    flexDirection: `column`,
  },
  navigation: {
    gap: 22,
    flexDirection: `row`,
    alignItems: `center`,
  },
  copy: {
    fontSize: 17,
    color: palette.muted,
    fontFamily: `AlegreyaSans`,
  },
  link: {
    gap: 6,
    minHeight: 38,
    flexDirection: `row`,
    alignItems: `center`,
  },
  linkLabel: {
    fontSize: 18,
    color: palette.ink,
    fontFamily: `AlegreyaSansMedium`,
  },
  credits: {
    gap: 2,
    alignItems: `flex-start`,
  },
  creditLink: {
    maxWidth: `100%`,
  },
  creditLabel: {
    fontSize: 15,
    lineHeight: 21,
    flexShrink: 1,
    color: palette.muted,
    fontFamily: `AlegreyaSans`,
    textDecorationLine: `underline`,
  },
  creditCopy: {
    fontSize: 15,
    lineHeight: 21,
    color: palette.muted,
    fontFamily: `AlegreyaSans`,
  },
  pressed: {
    opacity: 0.7,
  },
});
