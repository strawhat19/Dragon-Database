import './styles.scss';
import PageLoader from '../PageLoader';
import { usePathname } from 'expo-router';
import { useCallback, useState } from 'react';
import { Platform, View } from 'react-native';
import type { PropsWithChildren } from 'react';
import { useAppFonts } from '../../shared/useAppFonts';
import { useAuth } from '../../shared/authContext/useAuth';
import { routes, resolveRouteAlias } from '../../shared/routes';
import { useDragonData } from '../../shared/dragonDataContext/useDragonData';

const AppShell = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const [entered, setEntered] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const [fontsLoaded, fontError] = useAppFonts();
  const { isHydrated: authReady } = useAuth();
  const { isHydrated: dataReady } = useDragonData();
  const routePath = resolveRouteAlias(pathname) ?? pathname;
  const pageName = routePath === routes.home.path ? `Home` : Object.values(routes).find(route => route.path === routePath)?.label ?? `Home`;
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
        {!entered ? <PageLoader ready={ready} progress={progress} pageName={pageName} onReveal={reveal} onComplete={complete} /> : null}
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
      {!entered ? <PageLoader ready={ready} progress={progress} pageName={pageName} onReveal={reveal} onComplete={complete} /> : null}
    </View>
  );
};

export default AppShell;
