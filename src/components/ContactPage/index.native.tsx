import { useRef } from 'react';
import { Mail, Tag, UserRound, MessageSquare } from 'lucide-react-native';
import { Text, View, Keyboard, TextInput, Pressable, AccessibilityInfo, useWindowDimensions } from 'react-native';
import styles from './styles.native';
import PageLayout from '../PageLayout';
import type { ContactField } from './useContactForm';
import { palette } from '../../styles/theme/theme';
import { contactFields, useContactForm, contactPreviewNotice } from './useContactForm';

const fieldIcons = {
  name: UserRound,
  email: Mail,
  subject: Tag,
  message: MessageSquare,
};

const ContactPage = () => {
  const { width } = useWindowDimensions();
  const wide = width >= 900;
  const { notice, errors, values, updateField, previewSubmit } = useContactForm();
  const inputRefs = useRef<Partial<Record<ContactField, TextInput>>>({});

  const submitForm = () => {
    const firstInvalidField = previewSubmit();
    if (firstInvalidField) {
      inputRefs.current[firstInvalidField]?.focus();
      return;
    }
    Keyboard.dismiss();
    AccessibilityInfo.announceForAccessibility(contactPreviewNotice);
  };

  return (
    <PageLayout
      id={`contact-page`}
      title={`Contact`}
      description={`Share a question, an idea, or a dragon worth adding to the collection.`}
    >
      <View nativeID={`contact-content`} testID={`contact-content`} style={[styles.content, wide && styles.wideContent]}>
        <View nativeID={`contact-form-section`} testID={`contact-form-section`} style={[styles.formSection, wide && styles.wideFormSection]}>
          <Text nativeID={`contact-form-heading`} testID={`contact-form-heading`} style={styles.formHeading} accessibilityRole={`header`}>Send a message</Text>
          <Text nativeID={`contact-availability`} testID={`contact-availability`} style={styles.availability}>
            This form is not connected yet. You can fill it out, but no message will be sent.
          </Text>
          <View nativeID={`contact-form`} testID={`contact-form`} style={styles.form}>
            <Text nativeID={`contact-required-note`} testID={`contact-required-note`} style={styles.requiredNote}>All fields are required.</Text>
            <View nativeID={`contact-field-grid`} testID={`contact-field-grid`} style={styles.fieldGrid}>
              {contactFields.map(({ field, label, maxLength, placeholder }, index) => {
                const Icon = fieldIcons[field];
                const error = errors[field];
                const multiline = field === `message`;
                const nextField = contactFields[index + 1]?.field;

                return (
                  <View key={field} nativeID={`contact-${field}-field`} testID={`contact-${field}-field`} style={styles.field}>
                    <View nativeID={`contact-${field}-label`} testID={`contact-${field}-label`} style={styles.fieldLabel}>
                      <View nativeID={`contact-${field}-icon`} testID={`contact-${field}-icon`} accessibilityElementsHidden importantForAccessibility={`no-hide-descendants`}>
                        <Icon size={18} color={palette.muted} />
                      </View>
                      <Text nativeID={`contact-${field}-label-text`} testID={`contact-${field}-label-text`} style={styles.labelText}>{label}</Text>
                    </View>
                    <TextInput
                      editable
                      value={values[field]}
                      multiline={multiline}
                      maxLength={maxLength}
                      placeholder={placeholder}
                      nativeID={`contact-${field}-input`}
                      testID={`contact-${field}-input`}
                      placeholderTextColor={palette.muted}
                      autoCorrect={field !== `email`}
                      textAlignVertical={multiline ? `top` : `center`}
                      returnKeyType={multiline ? `default` : `next`}
                      submitBehavior={multiline ? `newline` : `submit`}
                      keyboardType={field === `email` ? `email-address` : `default`}
                      autoComplete={field === `email` ? `email` : field === `name` ? `name` : `off`}
                      textContentType={field === `email` ? `emailAddress` : field === `name` ? `name` : `none`}
                      autoCapitalize={field === `email` ? `none` : field === `name` ? `words` : `sentences`}
                      accessibilityLabel={`${label}, required${error ? `, invalid` : ``}`}
                      accessibilityHint={error ?? (multiline ? `Up to 5,000 characters` : `Up to ${maxLength} characters`)}
                      style={[styles.input, multiline && styles.textarea, Boolean(error) && styles.inputError]}
                      ref={(input) => { if (input) inputRefs.current[field] = input; else delete inputRefs.current[field]; }}
                      onChangeText={(value) => updateField(field, value)}
                      onSubmitEditing={() => { if (nextField) inputRefs.current[nextField]?.focus(); }}
                    />
                    {multiline ? (
                      <Text nativeID={`contact-message-help`} testID={`contact-message-help`} style={styles.fieldHelp}>
                        {`${values.message.length.toLocaleString(`en-US`)} / 5,000 characters`}
                      </Text>
                    ) : null}
                    {error ? (
                      <Text nativeID={`contact-${field}-error`} testID={`contact-${field}-error`} style={styles.fieldError} accessibilityRole={`alert`} accessibilityLiveRegion={`polite`}>{error}</Text>
                    ) : null}
                  </View>
                );
              })}
            </View>
            <Pressable
              onPress={submitForm}
              nativeID={`contact-submit`}
              testID={`contact-submit`}
              accessibilityRole={`button`}
              accessibilityLabel={`Send Message`}
              accessibilityHint={`Checks the form. No message is sent because this form is not connected yet.`}
              style={({ pressed }) => [styles.submit, pressed && styles.submitPressed]}
            >
              <View nativeID={`contact-submit-icon`} testID={`contact-submit-icon`} accessibilityElementsHidden importantForAccessibility={`no-hide-descendants`}>
                <Mail size={19} color={palette.paper} />
              </View>
              <Text nativeID={`contact-submit-label`} testID={`contact-submit-label`} style={styles.submitLabel}>Send Message</Text>
            </Pressable>
            {notice ? (
              <Text nativeID={`contact-submit-notice`} testID={`contact-submit-notice`} style={styles.submitNotice} accessibilityLiveRegion={`polite`}>{notice}</Text>
            ) : null}
          </View>
        </View>
        <View nativeID={`contact-writing-notes`} testID={`contact-writing-notes`} style={[styles.writingNotes, wide && styles.wideWritingNotes]}>
          <Text nativeID={`contact-notes-heading`} testID={`contact-notes-heading`} style={styles.notesHeading} accessibilityRole={`header`}>Before you write</Text>
          <Text nativeID={`contact-notes-context`} testID={`contact-notes-context`} style={styles.noteCopy}>A clear subject helps give your question or idea some context.</Text>
          <Text nativeID={`contact-dragon-note-heading`} testID={`contact-dragon-note-heading`} style={styles.noteHeading} accessibilityRole={`header`}>Suggesting a dragon?</Text>
          <Text nativeID={`contact-dragon-note-copy`} testID={`contact-dragon-note-copy`} style={styles.noteCopy}>Include its name, distinctive traits, and a source for its lore if you have one.</Text>
          <Text nativeID={`contact-draft-note`} testID={`contact-draft-note`} style={styles.draftNote}>Keep a copy of your message. This form does not save drafts.</Text>
        </View>
      </View>
    </PageLayout>
  );
};

export default ContactPage;
