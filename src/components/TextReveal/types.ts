import type { StyleProp, TextStyle } from 'react-native';

export type TextRevealProps = {
  id: string;
  text: string;
  delay?: number;
  className?: string;
  mode?: `words` | `chars`;
  textStyle?: StyleProp<TextStyle>;
  accessibilityRole?: `text` | `header`;
};
