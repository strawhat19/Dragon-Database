import { StyleSheet } from 'react-native';
import { palette } from '../../styles/theme/theme';

export default StyleSheet.create({
  content: {
    gap: 36,
    alignItems: `stretch`,
  },
  wideContent: {
    gap: 64,
    alignItems: `flex-start`,
    flexDirection: `row`,
  },
  formSection: {
    minWidth: 0,
  },
  wideFormSection: {
    flex: 1,
  },
  formHeading: {
    fontSize: 30,
    lineHeight: 35,
    marginBottom: 14,
    color: palette.ink,
    fontFamily: `DragonSlapper`,
  },
  availability: {
    fontSize: 19,
    lineHeight: 28,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 28,
    borderLeftWidth: 2,
    color: palette.muted,
    borderLeftColor: palette.steel,
    backgroundColor: palette.silver,
    fontFamily: `DragonSlapper`,
  },
  form: {
    alignItems: `stretch`,
  },
  requiredNote: {
    fontSize: 17,
    marginBottom: 22,
    color: palette.muted,
    fontFamily: `DragonSlapper`,
  },
  fieldGrid: {
    gap: 24,
  },
  field: {
    minWidth: 0,
  },
  fieldLabel: {
    gap: 9,
    marginBottom: 9,
    alignItems: `center`,
    flexDirection: `row`,
  },
  labelText: {
    fontSize: 19,
    color: palette.ink,
    fontFamily: `DragonSlapper`,
  },
  input: {
    fontSize: 19,
    minHeight: 52,
    borderWidth: 1,
    borderRadius: 2,
    paddingVertical: 12,
    paddingHorizontal: 14,
    color: palette.ink,
    borderColor: palette.line,
    backgroundColor: palette.paper,
    fontFamily: `DragonSlapper`,
  },
  textarea: {
    minHeight: 174,
    lineHeight: 27,
  },
  inputError: {
    borderColor: palette.red,
  },
  fieldHelp: {
    fontSize: 16,
    lineHeight: 23,
    marginTop: 8,
    color: palette.muted,
    fontFamily: `DragonSlapper`,
  },
  fieldError: {
    fontSize: 16,
    lineHeight: 23,
    marginTop: 8,
    color: palette.red,
    fontFamily: `DragonSlapper`,
  },
  submit: {
    gap: 10,
    minHeight: 50,
    borderRadius: 2,
    marginTop: 26,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: `center`,
    flexDirection: `row`,
    alignSelf: `flex-start`,
    justifyContent: `center`,
    backgroundColor: palette.ink,
  },
  submitPressed: {
    opacity: 0.84,
  },
  submitLabel: {
    fontSize: 19,
    color: palette.paper,
    fontFamily: `DragonSlapper`,
  },
  submitNotice: {
    fontSize: 19,
    lineHeight: 28,
    marginTop: 18,
    color: palette.ink,
    fontFamily: `DragonSlapper`,
  },
  writingNotes: {
    borderTopWidth: 1,
    paddingTop: 24,
    borderTopColor: palette.line,
  },
  wideWritingNotes: {
    width: 286,
  },
  notesHeading: {
    fontSize: 25,
    lineHeight: 29,
    marginBottom: 14,
    color: palette.ink,
    fontFamily: `DragonSlapper`,
  },
  noteHeading: {
    fontSize: 21,
    marginTop: 28,
    marginBottom: 10,
    color: palette.ink,
    fontFamily: `DragonSlapper`,
  },
  noteCopy: {
    fontSize: 19,
    lineHeight: 28,
    color: palette.muted,
    fontFamily: `DragonSlapper`,
  },
  draftNote: {
    fontSize: 17,
    lineHeight: 25,
    marginTop: 28,
    paddingTop: 20,
    borderTopWidth: 1,
    color: palette.muted,
    borderTopColor: palette.line,
    fontFamily: `DragonSlapper`,
  },
});
