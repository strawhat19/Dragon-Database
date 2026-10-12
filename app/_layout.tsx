import '../src/styles/global.scss';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { routes } from '../src/shared/routes';
import AppShell from '../src/components/AppShell';
import { dragonFormRoutes } from '../src/shared/dragonForms';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '../src/shared/authContext/AuthContext';
import { useTheme, ThemeProvider } from '../src/shared/themeContext/ThemeContext';
import { DragonDataProvider } from '../src/shared/dragonDataContext/DragonDataContext';

const ThemedRouter = () => {
  const { isDark, palette } = useTheme();
  return (
    <AppShell>
      <StatusBar style={isDark ? `light` : `dark`} />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: palette.silver } }}>
        <Stack.Screen name={`index`} options={{ title: `Dragon Database` }} />
        <Stack.Screen name={`all-dragons`} options={{ title: `${routes.allDragons.label} | Dragon Database` }} />
        {Object.values(dragonFormRoutes).map(route => <Stack.Screen key={route.path} name={route.path.slice(1)} options={{ title: `${route.label} | Dragon Database` }} />)}
        <Stack.Screen name={`[form]/[id]`} options={{ title: `${routes.example.label} | Dragon Database` }} />
        <Stack.Screen name={`examples/[id]`} options={{ title: `Dragon Example | Dragon Database` }} />
        <Stack.Screen name={`about`} options={{ title: `About | Dragon Database` }} />
        <Stack.Screen name={`contact`} options={{ title: `Contact | Dragon Database` }} />
        <Stack.Screen name={`terms`} options={{ title: `Terms | Dragon Database` }} />
        <Stack.Screen name={`privacy`} options={{ title: `Privacy Policy | Dragon Database` }} />
        <Stack.Screen name={`copyright`} options={{ title: `Copyright | Dragon Database` }} />
      </Stack>
    </AppShell>
  );
};

const RootLayout = () => (
  <SafeAreaProvider>
    <ThemeProvider>
      <AuthProvider>
        <DragonDataProvider>
          <ThemedRouter />
        </DragonDataProvider>
      </AuthProvider>
    </ThemeProvider>
  </SafeAreaProvider>
);

export default RootLayout;
