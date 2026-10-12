import PageLayout from '../PageLayout';
import baseStyles from './styles.native';
import { Link, Stack } from 'expo-router';
import { routes } from '../../shared/routes';
import { ArrowLeft } from 'lucide-react-native';
import useAllDragonsPage from './useAllDragonsPage';
import { Text, View, Pressable } from 'react-native';
import DragonExampleCollection from '../DragonExampleCollection';
import { useTheme, useThemedStyles } from '../../shared/themeContext/ThemeContext';

const AllDragonsPage = () => {
  const { palette } = useTheme();
  const styles = useThemedStyles(baseStyles);
  const { sourceError, openSource } = useAllDragonsPage();
  return (
    <PageLayout id={`all-dragons`} title={routes.allDragons.label} description={`Explore every dragon form and character across games, movies, television, art, and stories.`}>
      <Stack.Screen options={{ title: `${routes.allDragons.label} | Dragon Database` }} />
      <View nativeID={`all-dragons-content`} style={styles.content}>
        <Link href={routes.home.path} asChild><Pressable nativeID={`all-dragons-back`} accessibilityRole={`link`} style={styles.back}><ArrowLeft size={18} color={palette.ink} /><Text style={styles.backLabel}>Back To Dragon Forms</Text></Pressable></Link>
        <DragonExampleCollection id={`all-dragons-examples`} onOpenSource={openSource} />
        {sourceError ? <Text nativeID={`all-dragons-source-error`} accessibilityLiveRegion={`polite`} style={styles.error}>{sourceError}</Text> : null}
      </View>
    </PageLayout>
  );
};
export default AllDragonsPage;
