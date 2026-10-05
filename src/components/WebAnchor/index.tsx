import { forwardRef, type ComponentPropsWithoutRef } from 'react';

type WebAnchorProps = ComponentPropsWithoutRef<'a'> & {
  onPress?: unknown;
};

// Expo Link also forwards native onPress; its web navigation handler uses onClick.
const WebAnchor = forwardRef<HTMLAnchorElement, WebAnchorProps>(
  ({ onPress: _onPress, ...props }, ref) => <a {...props} ref={ref} />,
);

WebAnchor.displayName = `WebAnchor`;

export default WebAnchor;
