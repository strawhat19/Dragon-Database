import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppShell from '../src/components/AppShell';
import { AuthProvider } from '../src/shared/authContext/AuthContext';
import { ThemeProvider } from '../src/shared/themeContext/ThemeContext';
import { DragonDataProvider } from '../src/shared/dragonDataContext/DragonDataContext';
import '../src/styles/global.scss';

const RootLayout = () => (
  <SafeAreaProvider>
    <ThemeProvider>
      <AuthProvider>
        <DragonDataProvider>
          <AppShell>
            <StatusBar style={`dark`} />
            <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: `#e8ebef` } }}>
              <Stack.Screen name={`index`} options={{ title: `Dragon Database` }} />
              <Stack.Screen name={`about`} options={{ title: `About | Dragon Database` }} />
              <Stack.Screen name={`contact`} options={{ title: `Contact | Dragon Database` }} />
            </Stack>
          </AppShell>
        </DragonDataProvider>
      </AuthProvider>
    </ThemeProvider>
  </SafeAreaProvider>
);

export default RootLayout;
