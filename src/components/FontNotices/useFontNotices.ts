import { useCallback } from 'react';
import { Alert, Linking } from 'react-native';
import { useReducedMotion } from '../../shared/motion';

export const useFontNotices = () => {
  const reducedMotion = useReducedMotion();
  const openLink = useCallback((url: string) => {
    void Linking.openURL(url).catch(() => Alert.alert(`Unable to open link`, `Please try again later.`));
  }, []);

  return { openLink, reducedMotion };
};
