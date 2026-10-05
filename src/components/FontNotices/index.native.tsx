import styles from './styles.native';
import type { FontNoticesProps } from './types';
import { X, ExternalLink } from 'lucide-react-native';
import { useFontNotices } from './useFontNotices';
import { fontNotices } from '../../shared/fontNotices';
import { palette } from '../../styles/theme/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, View, Modal, Pressable, ScrollView } from 'react-native';

const FontNotices = ({ visible, onClose }: FontNoticesProps) => {
  const insets = useSafeAreaInsets();
  const { openLink, reducedMotion } = useFontNotices();

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      presentationStyle={`pageSheet`}
      animationType={reducedMotion ? `none` : `slide`}
    >
      <View
        nativeID={`font-notices-modal`}
        accessibilityViewIsModal
        style={[styles.root, { paddingTop: Math.max(20, insets.top + 12) }]}
      >
        <View nativeID={`font-notices-header`} style={styles.header}>
          <Text nativeID={`font-notices-title`} accessibilityRole={`header`} style={styles.title}>
            {`Font Notices`}
          </Text>
          <Pressable
            onPress={onClose}
            accessibilityRole={`button`}
            nativeID={`font-notices-close`}
            accessibilityLabel={`Close Font Notices`}
            style={({ pressed }) => [styles.close, pressed && styles.pressed]}
          >
            <X size={19} color={palette.ink} accessibilityElementsHidden />
            <Text nativeID={`font-notices-close-label`} style={styles.linkLabel}>{`Close`}</Text>
          </Pressable>
        </View>
        <ScrollView
          nativeID={`font-notices-content`}
          style={styles.scroll}
          contentContainerStyle={[styles.content, { paddingBottom: Math.max(32, insets.bottom + 24) }]}
        >
          {fontNotices.map(notice => (
            <View key={notice.id} nativeID={`font-notices-${notice.id}`} style={styles.notice}>
              <Text nativeID={`font-notices-${notice.id}-title`} accessibilityRole={`header`} style={styles.fontTitle}>
                {notice.title}
              </Text>
              <Text selectable nativeID={`font-notices-${notice.id}-credit`} style={styles.copy}>{notice.credit}</Text>
              <Text selectable nativeID={`font-notices-${notice.id}-copyright`} style={styles.copy}>{notice.copyright}</Text>
              <View nativeID={`font-notices-${notice.id}-links`} style={styles.links}>
                <Pressable
                  accessibilityRole={`link`}
                  onPress={() => openLink(notice.sourceUrl)}
                  nativeID={`font-notices-${notice.id}-source`}
                  accessibilityLabel={`${notice.title} original source`}
                  style={({ pressed }) => [styles.link, pressed && styles.pressed]}
                >
                  <ExternalLink size={16} color={palette.ink} accessibilityElementsHidden />
                  <Text nativeID={`font-notices-${notice.id}-source-label`} style={styles.linkLabel}>{`Original Source`}</Text>
                </Pressable>
                <Pressable
                  accessibilityRole={`link`}
                  onPress={() => openLink(notice.licenseUrl)}
                  nativeID={`font-notices-${notice.id}-license-link`}
                  accessibilityLabel={`${notice.title} license`}
                  style={({ pressed }) => [styles.link, pressed && styles.pressed]}
                >
                  <ExternalLink size={16} color={palette.ink} accessibilityElementsHidden />
                  <Text nativeID={`font-notices-${notice.id}-license-link-label`} style={styles.linkLabel}>{`License`}</Text>
                </Pressable>
              </View>
              {notice.documents.map(document => (
                <View key={document.id} nativeID={`font-notices-${notice.id}-${document.id}`} style={styles.document}>
                  <Text nativeID={`font-notices-${notice.id}-${document.id}-title`} accessibilityRole={`header`} style={styles.documentTitle}>
                    {document.title}
                  </Text>
                  <Text selectable nativeID={`font-notices-${notice.id}-${document.id}-text`} style={styles.documentText}>
                    {document.text}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default FontNotices;
