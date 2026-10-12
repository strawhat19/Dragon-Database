import PageLayout from '../PageLayout';
import baseStyles from './styles.native';
import { routes } from '../../shared/routes';
import { Text, View, Pressable } from 'react-native';
import { Link, Stack, Redirect } from 'expo-router';
import useDragonExamplePage from './useDragonExamplePage';
import { dragonFormPath } from '../../shared/dragonForms';
import { ArrowLeft, RotateCcw } from 'lucide-react-native';
import DragonExampleDetailView from '../DragonExampleDetailView';
import { useTheme, useThemedStyles } from '../../shared/themeContext/ThemeContext';

const DragonExamplePage = () => {
  const { palette } = useTheme();
  const styles = useThemedStyles(baseStyles);
  const { exampleId, example, examples, loading, error, retry, selectExample, redirectPath } = useDragonExamplePage();
  const id = `dragon-example-page-${exampleId ?? `unknown`}`;
  const title = example?.name ?? `Dragon Example`;
  const backPath = example ? dragonFormPath(example.kind) : routes.home.path;
  if (redirectPath) return <Redirect href={redirectPath} />;
  return (
    <PageLayout id={id} title={title} description={example?.franchise ?? `Explore dragon characters and creatures across different worlds.`}>
      <Stack.Screen options={{ title: `${title} | Dragon Database` }} />
      <View nativeID={`${id}-content`} style={styles.page}>
        <Link href={backPath} asChild><Pressable nativeID={`${id}-back`} accessibilityRole={`link`} style={styles.back}><ArrowLeft size={18} color={palette.ink} /><Text style={styles.backText}>{example ? `Back To ${example.formName}` : `Back To The Collection`}</Text></Pressable></Link>
        {loading ? <Text nativeID={`${id}-loading`} accessibilityLiveRegion={`polite`} style={styles.body}>Loading Dragon Example…</Text> : error ? <View nativeID={`${id}-error`} style={styles.state}><Text accessibilityLiveRegion={`polite`} style={styles.body}>{error}</Text><Pressable nativeID={`${id}-retry`} accessibilityRole={`button`} onPress={retry} style={styles.back}><RotateCcw size={18} color={palette.ink} /><Text style={styles.backText}>Try Again</Text></Pressable></View> : example ? <DragonExampleDetailView id={`${id}-details`} example={example} examples={examples} onSelect={selectExample} /> : <View nativeID={`${id}-not-found`} style={styles.state}><Text accessibilityRole={`header`} style={styles.title}>Dragon Example Not Found</Text><Text style={styles.body}>This example is not in the collection. Choose a form from the landing page to explore its examples.</Text></View>}
      </View>
    </PageLayout>
  );
};
export default DragonExamplePage;
