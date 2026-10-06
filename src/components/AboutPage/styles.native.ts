import { StyleSheet } from 'react-native';
import { palette } from '../../styles/theme/theme';

export default StyleSheet.create({
  content: {
    gap: 32,
    width: `100%`,
    maxWidth: 1120,
    alignSelf: `center`,
  },
  introduction: {
    gap: 16,
    maxWidth: 850,
  },
  paragraph: {
    fontSize: 21,
    lineHeight: 30,
    color: palette.muted,
    fontFamily: `DragonSlapper`,
  },
  leadParagraph: {
    color: palette.ink,
  },
  values: {
    gap: 20,
  },
  sectionHeading: {
    fontSize: 27,
    lineHeight: 33,
    color: palette.ink,
    fontFamily: `DragonSlapper`,
  },
  valuesGrid: {
    gap: 14,
  },
  wideValuesGrid: {
    gap: 22,
    flexDirection: `row`,
  },
  wideValueSlot: {
    flex: 1,
    minWidth: 0,
  },
  value: {
    gap: 18,
    padding: 22,
    borderWidth: 1,
    flexDirection: `column`,
    borderColor: palette.line,
    backgroundColor: palette.paper,
  },
  wideValue: {
    gap: 20,
    padding: 26,
    minHeight: 282,
    flexDirection: `column`,
  },
  symbolSurface: {
    width: 94,
    height: 76,
    borderWidth: 1,
    overflow: `hidden`,
    alignItems: `center`,
    justifyContent: `center`,
    borderColor: palette.line,
    backgroundColor: palette.steel,
  },
  steelTexture: {
    ...StyleSheet.absoluteFillObject,
  },
  valueHeading: {
    gap: 18,
    flexDirection: `row`,
    alignItems: `center`,
  },
  wideValueHeading: {
    gap: 20,
    flexDirection: `column`,
    alignItems: `flex-start`,
  },
  valueTitle: {
    fontSize: 26,
    lineHeight: 31,
    color: palette.ink,
    fontFamily: `DragonSlapper`,
  },
  valueDescription: {
    fontSize: 20,
    lineHeight: 28,
    color: palette.muted,
    fontFamily: `DragonSlapper`,
  },
  contactPanel: {
    gap: 10,
    paddingTop: 26,
    borderTopColor: palette.line,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  contactRule: {
    top: -1,
    left: 0,
    width: 42,
    height: 2,
    position: `absolute`,
    backgroundColor: palette.red,
  },
  contactDescription: {
    fontSize: 21,
    lineHeight: 29,
    color: palette.muted,
    fontFamily: `DragonSlapper`,
  },
  actions: {
    gap: 12,
    marginTop: 10,
    flexWrap: `wrap`,
    flexDirection: `row`,
  },
  action: {
    gap: 9,
    minHeight: 48,
    paddingVertical: 11,
    paddingHorizontal: 16,
    flexDirection: `row`,
    alignItems: `center`,
  },
  primaryAction: {
    backgroundColor: palette.ink,
  },
  secondaryAction: {
    borderWidth: 1,
    borderColor: palette.line,
  },
  primaryLabel: {
    fontSize: 20,
    color: palette.paper,
    fontFamily: `DragonSlapper`,
  },
  secondaryLabel: {
    fontSize: 20,
    color: palette.ink,
    fontFamily: `DragonSlapper`,
  },
  pressed: {
    opacity: 0.72,
  },
});
