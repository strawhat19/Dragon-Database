import { StyleSheet } from 'react-native';
import { palette } from '../../styles/theme/theme';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.silver,
  },
  header: {
    gap: 18,
    paddingBottom: 16,
    paddingHorizontal: 24,
    flexDirection: `row`,
    alignItems: `center`,
    borderBottomColor: palette.line,
    justifyContent: `space-between`,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontSize: 28,
    color: palette.ink,
    fontFamily: `DragonSlapper`,
  },
  close: {
    gap: 6,
    minHeight: 44,
    paddingHorizontal: 8,
    flexDirection: `row`,
    alignItems: `center`,
  },
  scroll: {
    flex: 1,
  },
  content: {
    gap: 32,
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  notice: {
    gap: 12,
  },
  fontTitle: {
    fontSize: 25,
    color: palette.ink,
    fontFamily: `DragonSlapper`,
  },
  copy: {
    fontSize: 18,
    lineHeight: 25,
    color: palette.ink,
    fontFamily: `DragonSlapper`,
  },
  links: {
    gap: 18,
    flexWrap: `wrap`,
    flexDirection: `row`,
  },
  link: {
    gap: 6,
    minHeight: 44,
    flexDirection: `row`,
    alignItems: `center`,
  },
  linkLabel: {
    fontSize: 18,
    color: palette.ink,
    fontFamily: `DragonSlapper`,
  },
  document: {
    gap: 12,
    paddingTop: 16,
    borderTopColor: palette.line,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  documentTitle: {
    fontSize: 20,
    color: palette.ink,
    fontFamily: `DragonSlapper`,
  },
  documentText: {
    fontSize: 16,
    lineHeight: 24,
    color: palette.ink,
    fontFamily: `DragonSlapper`,
  },
  pressed: {
    opacity: 0.65,
  },
});
