import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppShell from '../src/components/AppShell';
import { AuthProvider } from '../src/shared/authContext/AuthContext';
import { useTheme, ThemeProvider } from '../src/shared/themeContext/ThemeContext';
import { DragonDataProvider } from '../src/shared/dragonDataContext/DragonDataContext';
import '../src/styles/global.scss';

const ThemedRouter = () => {
  const { isDark, palette } = useTheme();
  return (
    <AppShell>
      <StatusBar style={isDark ? `light` : `dark`} />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: palette.silver } }}>
        <Stack.Screen name={`index`} options={{ title: `Dragon Database` }} />
        <Stack.Screen name={`about`} options={{ title: `About | Dragon Database` }} />
        <Stack.Screen name={`contact`} options={{ title: `Contact | Dragon Database` }} />
        <Stack.Screen name={`terms`} options={{ title: `Terms | Dragon Database` }} />
        <Stack.Screen name={`privacy`} options={{ title: `Privacy Policy | Dragon Database` }} />
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
