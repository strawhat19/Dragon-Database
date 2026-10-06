import { StyleSheet } from 'react-native';
import { palette } from '../../styles/theme/theme';

export default StyleSheet.create({
  content: {
    width: `100%`,
    maxWidth: 940,
    alignSelf: `center`,
  },
  introduction: {
    padding: 23,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.paper,
  },
  introductionRule: {
    top: -1,
    left: 23,
    width: 44,
    height: 2,
    position: `absolute`,
    backgroundColor: palette.red,
  },
  introductionCopy: {
    fontSize: 22,
    lineHeight: 32,
    color: palette.ink,
    fontFamily: `DragonSlapper`,
  },
  sections: {
    marginTop: 20,
  },
  section: {
    paddingVertical: 24,
    borderBottomColor: palette.line,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  sectionHeading: {
    gap: 12,
    flexDirection: `row`,
    alignItems: `baseline`,
  },
  sectionNumber: {
    minWidth: 24,
    fontSize: 15,
    lineHeight: 21,
    color: palette.muted,
    letterSpacing: 0.6,
    fontFamily: `DragonSlapper`,
  },
  heading: {
    flex: 1,
    fontSize: 27,
    lineHeight: 35,
    color: palette.ink,
    fontFamily: `DragonSlapper`,
  },
  sectionBody: {
    gap: 15,
    marginTop: 15,
  },
  paragraph: {
    fontSize: 20,
    lineHeight: 31,
    color: palette.muted,
    fontFamily: `DragonSlapper`,
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
  pageLinks: {
    gap: 14,
    marginTop: 30,
    flexWrap: `wrap`,
    flexDirection: `row`,
  },
  pressed: {
    opacity: 0.72,
  },
});
