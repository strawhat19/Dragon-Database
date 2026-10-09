import { StyleSheet } from 'react-native';
import { palette } from '../../styles/theme/theme';

export default StyleSheet.create({
  content: {
    width: `100%`,
    maxWidth: 940,
    alignSelf: `center`,
  },
  siteCredit: {
    padding: 23,
    fontSize: 24,
    lineHeight: 36,
    borderWidth: 1,
    color: palette.ink,
    borderColor: palette.line,
    fontFamily: `DragonSlapper`,
    backgroundColor: palette.paper,
  },
  fonts: {
    marginTop: 24,
  },
  heading: {
    fontSize: 27,
    lineHeight: 35,
    color: palette.ink,
    fontFamily: `DragonSlapper`,
  },
  fontList: {
    marginTop: 10,
  },
  font: {
    gap: 12,
    paddingVertical: 24,
    borderBottomColor: palette.line,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  fontTitle: {
    fontSize: 25,
    lineHeight: 33,
    color: palette.ink,
    fontFamily: `DragonSlapper`,
  },
  paragraph: {
    fontSize: 20,
    lineHeight: 31,
    color: palette.muted,
    fontFamily: `DragonSlapper`,
  },
  links: {
    gap: 14,
    flexWrap: `wrap`,
    flexDirection: `row`,
  },
  link: {
    gap: 9,
    minHeight: 44,
    flexDirection: `row`,
    alignItems: `center`,
  },
  linkLabel: {
    fontSize: 20,
    flexShrink: 1,
    color: palette.ink,
    fontFamily: `DragonSlapper`,
    textDecorationLine: `underline`,
  },
  noticesLink: {
    marginTop: 20,
    alignSelf: `flex-start`,
  },
  pageLinks: {
    marginTop: 30,
  },
  pressed: {
    opacity: 0.72,
  },
});
