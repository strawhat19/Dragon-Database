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
    backgroundColor: palette.silver,
    justifyContent: `space-between`,
  },
  blackMetadata: {
    backgroundColor: `#0b0c10`,
  },
  metadataArtwork: {
    ...StyleSheet.absoluteFillObject,
  },
  form: {
    fontSize: 16,
    flexShrink: 0,
    lineHeight: 20,
    color: palette.ink,
    letterSpacing: 0.8,
    fontFamily: `DragonSlapper`,
  },
  lightMetadataText: {
    color: `#f4f5f7`,
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
    color: palette.ink,
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
