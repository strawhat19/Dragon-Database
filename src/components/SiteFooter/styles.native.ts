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
    flexWrap: `wrap`,
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
    flexWrap: `wrap`,
    flexDirection: `row`,
    alignItems: `center`,
  },
  copyright: {
    gap: 12,
    flexDirection: `row`,
    alignItems: `center`,
  },
  copy: {
    fontSize: 17,
    color: palette.muted,
    fontFamily: `DragonSlapper`,
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
    fontFamily: `DragonSlapper`,
  },
  pressed: {
    opacity: 0.7,
  },
});
