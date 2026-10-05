import { useState } from 'react';

export type ContactField = `name` | `email` | `subject` | `message`;
export type ContactValues = Record<ContactField, string>;
export type ContactErrors = Partial<Record<ContactField, string>>;

type ContactFieldDetails = {
  field: ContactField;
  label: string;
  maxLength: number;
  placeholder: string;
};

export const contactFields: ContactFieldDetails[] = [
  { field: `name`, label: `Name`, maxLength: 100, placeholder: `Your name` },
  { field: `email`, label: `Email`, maxLength: 254, placeholder: `you@example.com` },
  { field: `subject`, label: `Subject`, maxLength: 160, placeholder: `What would you like to share?` },
  { field: `message`, label: `Message`, maxLength: 5000, placeholder: `Share your question, idea, or dragon suggestion.` },
];

export const contactPreviewNotice = `Your message has not been sent. This contact form is not connected yet.`;

const initialValues: ContactValues = {
  name: ``,
  email: ``,
  subject: ``,
  message: ``,
};

const validateValues = (values: ContactValues): ContactErrors => {
  const errors: ContactErrors = {};

  contactFields.forEach(({ field, label, maxLength }) => {
    const value = values[field];
    if (!value.trim()) {
      errors[field] = `Enter your ${label.toLowerCase()}.`;
    } else if (value.length > maxLength) {
      errors[field] = `Keep your ${label.toLowerCase()} to ${maxLength.toLocaleString(`en-US`)} characters.`;
    }
  });

  if (!errors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = `Enter a valid email address.`;
  }

  return errors;
};

export const useContactForm = () => {
  const [notice, setNotice] = useState(``);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [values, setValues] = useState<ContactValues>(initialValues);

  const updateField = (field: ContactField, value: string) => {
    setNotice(``);
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const previewSubmit = (): ContactField | null => {
    const nextErrors = validateValues(values);
    const firstInvalidField = contactFields.find(({ field }) => nextErrors[field])?.field;
    setErrors(nextErrors);
    setNotice(firstInvalidField ? `` : contactPreviewNotice);
    return firstInvalidField ?? null;
  };

  return { notice, errors, values, updateField, previewSubmit };
};
