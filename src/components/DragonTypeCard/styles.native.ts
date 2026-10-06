import { StyleSheet } from 'react-native';
import { palette } from '../../styles/theme/theme';

export default StyleSheet.create({
  card: {
    width: `100%`,
    overflow: `hidden`,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.paper,
  },
  metadata: {
    gap: 12,
    paddingVertical: 14,
    alignItems: `center`,
    borderBottomWidth: 1,
    flexDirection: `row`,
    paddingHorizontal: 20,
    borderBottomColor: palette.line,
    backgroundColor: palette.silver,
    justifyContent: `space-between`,
  },
  specimen: {
    fontSize: 16,
    lineHeight: 20,
    color: palette.ink,
    letterSpacing: 0.8,
    fontFamily: `DragonSlapper`,
  },
  category: {
    fontSize: 15,
    lineHeight: 20,
    color: palette.muted,
    fontFamily: `DragonSlapper`,
  },
  artFrame: {
    width: `100%`,
    aspectRatio: 5 / 3,
    overflow: `hidden`,
    borderBottomWidth: 1,
    borderBottomColor: palette.line,
    backgroundColor: palette.silver,
  },
  body: {
    gap: 10,
    flexGrow: 1,
    paddingVertical: 21,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 35,
    lineHeight: 43,
    color: palette.ink,
    fontFamily: `DragonSlapper`,
  },
  traits: {
    fontSize: 17,
    lineHeight: 23,
    color: palette.muted,
    fontFamily: `DragonSlapper`,
  },
  description: {
    fontSize: 20,
    lineHeight: 28,
    color: palette.ink,
    fontFamily: `DragonSlapper`,
  },
  action: {
    gap: 16,
    borderTopWidth: 1,
    paddingVertical: 14,
    alignItems: `center`,
    flexDirection: `row`,
    paddingHorizontal: 20,
    borderTopColor: palette.line,
    justifyContent: `space-between`,
  },
  actionLabel: {
    fontSize: 18,
    lineHeight: 23,
    color: palette.ink,
    fontFamily: `DragonSlapper`,
  },
  pressed: {
    opacity: 0.84,
    borderColor: palette.ink,
  },
});
