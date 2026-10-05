import { useRef } from 'react';
import type { FormEvent } from 'react';
import { Mail, Tag, UserRound, MessageSquare } from 'lucide-react';
import PageLayout from '../PageLayout';
import type { ContactField } from './useContactForm';
import { contactFields, useContactForm } from './useContactForm';
import './styles.scss';

const fieldIcons = {
  name: UserRound,
  email: Mail,
  subject: Tag,
  message: MessageSquare,
};

const ContactPage = () => {
  const { notice, errors, values, updateField, previewSubmit } = useContactForm();
  const inputRefs = useRef<Partial<Record<ContactField, HTMLInputElement | HTMLTextAreaElement>>>({});

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const firstInvalidField = previewSubmit();
    if (firstInvalidField) inputRefs.current[firstInvalidField]?.focus();
  };

  return (
    <PageLayout
      id={`contact-page`}
      title={`Contact`}
      description={`Share a question, an idea, or a dragon worth adding to the collection.`}
    >
      <div id={`contact-content`} className={`contact-content`}>
        <section id={`contact-form-section`} className={`contact-form-section`} aria-labelledby={`contact-form-heading`}>
          <h2 id={`contact-form-heading`} className={`contact-form-heading`}>Send a message</h2>
          <p id={`contact-availability`} className={`contact-availability`}>
            This form is not connected yet. You can fill it out, but no message will be sent.
          </p>
          <form
            noValidate
            id={`contact-form`}
            className={`contact-form`}
            onSubmit={submitForm}
            aria-describedby={`contact-availability contact-required-note`}
          >
            <p id={`contact-required-note`} className={`contact-required-note`}>All fields are required.</p>
            <div id={`contact-field-grid`} className={`contact-field-grid`}>
              {contactFields.map(({ field, label, maxLength, placeholder }) => {
                const Icon = fieldIcons[field];
                const error = errors[field];
                const describedBy = [
                  field === `message` ? `contact-message-help` : ``,
                  error ? `contact-${field}-error` : ``,
                ].filter(Boolean).join(` `) || undefined;

                return (
                  <div key={field} id={`contact-${field}-field`} className={`contact-field contact-field-${field}`}>
                    <label id={`contact-${field}-label`} className={`contact-field-label`} htmlFor={`contact-${field}-input`}>
                      <Icon id={`contact-${field}-icon`} className={`contact-field-icon`} size={18} aria-hidden={true} />
                      <span id={`contact-${field}-label-text`} className={`contact-field-label-text`}>{label}</span>
                    </label>
                    {field === `message` ? (
                      <textarea
                        required
                        rows={6}
                        name={field}
                        value={values[field]}
                        maxLength={maxLength}
                        autoComplete={`off`}
                        placeholder={placeholder}
                        id={`contact-${field}-input`}
                        aria-invalid={Boolean(error)}
                        aria-describedby={describedBy}
                        className={`contact-input contact-textarea`}
                        ref={(input) => { if (input) inputRefs.current[field] = input; else delete inputRefs.current[field]; }}
                        onChange={(event) => updateField(field, event.target.value)}
                      />
                    ) : (
                      <input
                        required
                        name={field}
                        value={values[field]}
                        maxLength={maxLength}
                        placeholder={placeholder}
                        id={`contact-${field}-input`}
                        className={`contact-input`}
                        type={field === `email` ? `email` : `text`}
                        aria-invalid={Boolean(error)}
                        aria-describedby={describedBy}
                        autoComplete={field === `subject` ? `off` : field}
                        autoCapitalize={field === `email` ? `none` : field === `name` ? `words` : `sentences`}
                        ref={(input) => { if (input) inputRefs.current[field] = input; else delete inputRefs.current[field]; }}
                        onChange={(event) => updateField(field, event.target.value)}
                      />
                    )}
                    {field === `message` ? (
                      <p id={`contact-message-help`} className={`contact-field-help`}>
                        {`${values.message.length.toLocaleString(`en-US`)} / 5,000 characters`}
                      </p>
                    ) : null}
                    {error ? <p id={`contact-${field}-error`} className={`contact-field-error`} role={`alert`}>{error}</p> : null}
                  </div>
                );
              })}
            </div>
            <button id={`contact-submit`} className={`contact-submit`} type={`submit`}>
              <Mail id={`contact-submit-icon`} className={`contact-submit-icon`} size={19} aria-hidden={true} />
              <span id={`contact-submit-label`} className={`contact-submit-label`}>Send Message</span>
            </button>
            <p id={`contact-submit-notice`} className={`contact-submit-notice`} role={`status`} aria-live={`polite`} aria-atomic={true}>
              {notice}
            </p>
          </form>
        </section>
        <aside id={`contact-writing-notes`} className={`contact-writing-notes`} aria-labelledby={`contact-notes-heading`}>
          <h2 id={`contact-notes-heading`} className={`contact-notes-heading`}>Before you write</h2>
          <p id={`contact-notes-context`} className={`contact-note-copy`}>A clear subject helps give your question or idea some context.</p>
          <h3 id={`contact-dragon-note-heading`} className={`contact-note-heading`}>Suggesting a dragon?</h3>
          <p id={`contact-dragon-note-copy`} className={`contact-note-copy`}>Include its name, distinctive traits, and a source for its lore if you have one.</p>
          <p id={`contact-draft-note`} className={`contact-draft-note`}>Keep a copy of your message. This form does not save drafts.</p>
        </aside>
      </div>
    </PageLayout>
  );
};

export default ContactPage;
