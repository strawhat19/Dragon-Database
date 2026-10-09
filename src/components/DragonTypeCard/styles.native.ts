import { StyleSheet } from 'react-native';
import { palette } from '../../styles/theme/theme';

export default StyleSheet.create({
  card: {
    padding: 1,
    width: `100%`,
    overflow: `hidden`,
    backgroundColor: palette.paper,
  },
  corners: {
    ...StyleSheet.absoluteFillObject,
  },
  metadata: {
    gap: 12,
    overflow: `hidden`,
    paddingVertical: 14,
    alignItems: `center`,
    borderBottomWidth: 1,
    flexDirection: `row`,
    paddingHorizontal: 20,
    borderBottomColor: palette.line,
    backgroundColor: palette.ink,
    justifyContent: `space-between`,
  },
  metadataArtwork: {
    ...StyleSheet.absoluteFillObject,
  },
  titleGroup: {
    gap: 8,
    flex: 1,
    minWidth: 0,
    alignItems: `center`,
    flexDirection: `row`,
  },
  titleIcon: {
    width: 30,
    height: 26,
    flexShrink: 0,
    transform: [{ scale: 1.18 }],
  },
  form: {
    gap: 6,
    flexShrink: 0,
    flexDirection: `row`,
    alignItems: `baseline`,
  },
  formLabel: {
    fontSize: 16,
    lineHeight: 20,
    color: palette.red,
    letterSpacing: 0.8,
    fontFamily: `DragonSlapper`,
  },
  formNumber: {
    fontSize: 24,
    lineHeight: 28,
    color: palette.paper,
    letterSpacing: 0.8,
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
  graphic: {
    width: `100%`,
    height: `100%`,
  },
  alternateGraphic: {
    ...StyleSheet.absoluteFillObject,
  },
  body: {
    gap: 10,
    flexGrow: 1,
    paddingVertical: 21,
    paddingHorizontal: 20,
  },
  title: {
    flex: 1,
    fontSize: 26,
    flexShrink: 1,
    lineHeight: 32,
    color: palette.paper,
    fontFamily: `DragonSlapper`,
  },
  traits: {
    fontSize: 17,
    lineHeight: 23,
    color: palette.muted,
    fontFamily: `DragonSlapper`,
  },
  separator: {
    height: 2,
    alignSelf: `stretch`,
    backgroundColor: palette.red,
  },
  description: {
    fontSize: 20,
    lineHeight: 28,
    color: palette.ink,
    fontFamily: `AlegreyaSans`,
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
    fontFamily: `AlegreyaSans`,
  },
  pressed: {
    opacity: 0.84,
  },
});
