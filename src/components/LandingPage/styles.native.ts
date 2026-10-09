import { StyleSheet } from 'react-native';
import { palette } from '../../styles/theme/theme';

export default StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: palette.silver,
  },
  scroll: {
    flex: 1,
  },
  hero: {
    marginTop: 16,
    overflow: `hidden`,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.steel,
  },
  artwork: {
    ...StyleSheet.absoluteFillObject,
  },
  heroContent: {
    zIndex: 1,
    paddingTop: 28,
    paddingBottom: 42,
    alignItems: `center`,
    paddingHorizontal: 24,
  },
  wideHeroContent: {
    paddingTop: 34,
    paddingBottom: 48,
    paddingHorizontal: 48,
  },
  accent: {
    width: 46,
    height: 2,
    marginBottom: 19,
    backgroundColor: palette.red,
  },
  title: {
    color: palette.ink,
    textAlign: `center`,
    fontFamily: `DragonSlapper`,
  },
  titleReveal: {
    width: `100%`,
  },
  titleLines: {
    alignItems: `center`,
    flexDirection: `column`,
  },
  wideTitleLines: {
    flexDirection: `row`,
    justifyContent: `center`,
  },
  subtitle: {
    marginTop: 4,
    alignItems: `center`,
  },
  wordmarkSword: {
    aspectRatio: 540 / 56,
    marginTop: 10,
    marginBottom: 8,
  },
  introduction: {
    fontSize: 20,
    lineHeight: 25,
    marginTop: 5,
    color: palette.muted,
    textAlign: `center`,
    fontFamily: `DragonSlapper`,
  },
  wideIntroduction: {
    fontSize: 24,
    lineHeight: 30,
    marginTop: 8,
  },
  searchReveal: {
    width: `100%`,
    maxWidth: 860,
    marginTop: 20,
  },
  search: {
    gap: 12,
    minHeight: 54,
    paddingLeft: 16,
    flexDirection: `row`,
    alignItems: `center`,
  },
  input: {
    flex: 1,
    minWidth: 0,
    minHeight: 54,
    fontSize: 21,
    paddingVertical: 0,
    color: palette.ink,
    fontFamily: `DragonSlapper`,
  },
  wideInput: {
    minHeight: 60,
    fontSize: 24,
  },
  clear: {
    width: 38,
    minHeight: 48,
    alignItems: `center`,
    justifyContent: `center`,
  },
  searchSubmit: {
    gap: 7,
    minHeight: 44,
    marginRight: 5,
    paddingHorizontal: 12,
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `center`,
  },
  searchSubmitLabel: {
    fontSize: 18,
    color: palette.paper,
    fontFamily: `DragonSlapper`,
  },
  flame: {
    bottom: -2,
    position: `absolute`,
  },
  flyingDragon: {
    position: `absolute`,
  },
  catalog: {
    gap: 18,
    paddingTop: 28,
    paddingBottom: 40,
  },
  wideCatalog: {
    paddingTop: 46,
    paddingBottom: 56,
  },
  catalogHeading: {
    fontSize: 28,
    lineHeight: 34,
    color: palette.ink,
    fontFamily: `DragonSlapper`,
  },
  wideCatalogHeading: {
    fontSize: 32,
    lineHeight: 38,
  },
  resultLabel: {
    fontSize: 19,
    lineHeight: 24,
    color: palette.muted,
    fontFamily: `DragonSlapper`,
  },
  cards: {
    gap: 12,
  },
  wideCards: {
    gap: 24,
    flexWrap: `wrap`,
    flexDirection: `row`,
  },
  card: {
    alignSelf: `stretch`,
  },
  wideCard: {
    flexGrow: 0,
  },
  feedback: {
    gap: 14,
    padding: 24,
    minHeight: 160,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.paper,
  },
  feedbackHeading: {
    fontSize: 25,
    color: palette.ink,
    fontFamily: `DragonSlapper`,
  },
  feedbackCopy: {
    fontSize: 20,
    lineHeight: 26,
    color: palette.muted,
    fontFamily: `DragonSlapper`,
  },
  feedbackAction: {
    gap: 8,
    minHeight: 44,
    alignSelf: `flex-start`,
    paddingHorizontal: 14,
    flexDirection: `row`,
    alignItems: `center`,
    backgroundColor: palette.ink,
  },
  feedbackActionLabel: {
    fontSize: 19,
    color: palette.paper,
    fontFamily: `DragonSlapper`,
  },
  skeleton: {
    minHeight: 100,
    overflow: `hidden`,
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: `row`,
    alignItems: `center`,
    borderColor: palette.line,
    backgroundColor: palette.paper,
  },
  wideSkeleton: {
    gap: 14,
    minHeight: 184,
    flexDirection: `column`,
    justifyContent: `center`,
  },
  skeletonSymbol: {
    width: 94,
    height: 64,
    backgroundColor: palette.line,
  },
  skeletonTitle: {
    width: 108,
    height: 24,
    marginLeft: 20,
    backgroundColor: palette.line,
  },
  topButton: {
    right: 24,
    position: `absolute`,
  },
  topButtonAction: {
    width: 48,
    height: 48,
    alignItems: `center`,
    justifyContent: `center`,
  },
  pressed: {
    opacity: 0.72,
  },
});
