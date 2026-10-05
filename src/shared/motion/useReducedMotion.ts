import { useEffect, useState } from 'react';
import { AccessibilityInfo, Platform } from 'react-native';

export const useReducedMotion = () => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (Platform.OS === `web`) {
      const preference = window.matchMedia?.(`(prefers-reduced-motion: reduce)`);
      if (!preference) return;

      const update = () => setReducedMotion(preference.matches);
      update();
      preference.addEventListener?.(`change`, update);
      return () => preference.removeEventListener?.(`change`, update);
    }

    let active = true;
    void AccessibilityInfo.isReduceMotionEnabled().then(value => {
      if (active) setReducedMotion(value);
    }).catch(() => undefined);
    const subscription = AccessibilityInfo.addEventListener(`reduceMotionChanged`, setReducedMotion);

    return () => {
      active = false;
      subscription.remove();
    };
  }, []);

  return reducedMotion;
};

export default useReducedMotion;
