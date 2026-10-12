import { useRef } from 'react';
import baseStyles from './styles.native';
import type { DragonExampleLightboxProps } from './types';
import { useReducedMotion } from '../../shared/motion';
import DragonExampleDetailView from '../DragonExampleDetailView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Modal, Pressable } from 'react-native';
import { useThemedStyles } from '../../shared/themeContext/ThemeContext';

const DragonExampleLightbox = ({ id, example, examples, onSelect, onClose }: DragonExampleLightboxProps) => {
  const styles = useThemedStyles(baseStyles);
  const insets = useSafeAreaInsets();
  const reducedMotion = useReducedMotion();
  const lastExample = useRef(example);
  if (example) lastExample.current = example;
  const displayedExample = example ?? lastExample.current;
  return (
    <Modal visible={Boolean(example)} transparent statusBarTranslucent animationType={reducedMotion ? `none` : `fade`} onRequestClose={onClose}>
      <View nativeID={id} accessibilityViewIsModal style={[styles.backdrop, { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 12 }]}>
        <Pressable accessible={false} style={styles.dismiss} onPress={onClose} nativeID={`${id}-backdrop`} />
        <View nativeID={`${id}-panel`} style={styles.panel}>
          {displayedExample ? <DragonExampleDetailView id={`${id}-details`} modal example={displayedExample} examples={examples} onSelect={onSelect} onClose={onClose} /> : null}
        </View>
      </View>
    </Modal>
  );
};
export default DragonExampleLightbox;
