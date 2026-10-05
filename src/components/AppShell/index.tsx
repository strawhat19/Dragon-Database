import { Platform, View } from 'react-native';
import { useCallback, useState } from 'react';
import type { PropsWithChildren } from 'react';
import PageLoader from '../PageLoader';
import { useAppFonts } from '../../shared/useAppFonts';
import { useAuth } from '../../shared/authContext/useAuth';
import { useDragonData } from '../../shared/dragonDataContext/useDragonData';
import './styles.scss';

const AppShell = ({ children }: PropsWithChildren) => {
  const [entered, setEntered] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const [fontsLoaded, fontError] = useAppFonts();
  const { isHydrated: authReady } = useAuth();
  const { isHydrated: dataReady } = useDragonData();
  const fontsReady = fontsLoaded || Boolean(fontError);
  const ready = fontsReady && authReady && dataReady;
  const progress = Math.round((Number(fontsReady) + Number(authReady) + Number(dataReady)) * 100 / 3);
  const reveal = useCallback(() => setRevealing(true), []);
  const complete = useCallback(() => setEntered(true), []);

  if (Platform.OS === `web`) {
    return (
      <div id={`dragon-app-shell`} className={`dragon-app-shell`}>
        {revealing || entered ? (
          <div
            inert={!entered}
            aria-hidden={!entered}
            id={`dragon-app-shell-content`}
            className={`dragon-app-shell-content`}
            style={{ pointerEvents: entered ? `auto` : `none` }}
          >
            {children}
          </div>
        ) : null}
        {!entered ? <PageLoader ready={ready} progress={progress} onReveal={reveal} onComplete={complete} /> : null}
      </div>
    );
  }

  return (
    <View nativeID={`dragon-app-shell`} style={{ flex: 1 }}>
      {revealing || entered ? (
        <View
          style={{ flex: 1 }}
          nativeID={`dragon-app-shell-content`}
          accessibilityElementsHidden={!entered}
          pointerEvents={entered ? `auto` : `none`}
          importantForAccessibility={entered ? `auto` : `no-hide-descendants`}
        >
          {children}
        </View>
      ) : null}
      {!entered ? <PageLoader ready={ready} progress={progress} onReveal={reveal} onComplete={complete} /> : null}
    </View>
  );
};

export default AppShell;
