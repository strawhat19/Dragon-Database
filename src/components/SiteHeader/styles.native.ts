import { StyleSheet } from 'react-native';
import { palette } from '../../styles/theme/theme';

export default StyleSheet.create({
  surface: {
    zIndex: 10,
    backgroundColor: `transparent`,
  },
  baseSurface: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: palette.silver,
  },
  floatingSurface: {
    backgroundColor: `rgba(229, 232, 237, 0.86)`,
    borderBottomColor: palette.line,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
  },
  row: {
    gap: 12,
    minHeight: 86,
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `space-between`,
  },
  logo: {
    flexShrink: 1,
    minWidth: 120,
  },
  actions: {
    gap: 12,
    flexDirection: `row`,
    alignItems: `center`,
  },
  navigation: {
    gap: 20,
    flexDirection: `row`,
    alignItems: `center`,
  },
  navigationItem: {
    gap: 6,
    alignItems: `center`,
    flexDirection: `row`,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: palette.line,
  },
  activeItem: {
    borderBottomWidth: 2,
    borderBottomColor: palette.red,
  },
  navigationLabel: {
    fontSize: 19,
    color: palette.muted,
    fontFamily: `AlegreyaSansMedium`,
  },
  activeLabel: {
    color: palette.ink,
  },
  signIn: {
    gap: 8,
    minHeight: 40,
    paddingVertical: 9,
    paddingHorizontal: 14,
    flexDirection: `row`,
    alignItems: `center`,
    backgroundColor: palette.ink,
  },
  signInLabel: {
    fontSize: 18,
    color: palette.paper,
    fontFamily: `AlegreyaSansMedium`,
  },
  menuButton: {
    width: 40,
    height: 44,
    alignItems: `center`,
    justifyContent: `center`,
  },
  rule: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: palette.line,
  },
  menu: {
    gap: 12,
    flexWrap: `wrap`,
    paddingTop: 12,
    paddingBottom: 18,
    flexDirection: `row`,
    justifyContent: `space-between`,
  },
  menuItem: {
    width: `47%`,
    minHeight: 44,
    justifyContent: `flex-start`,
  },
  pressed: {
    opacity: 0.7,
  },
});
