import './styles.scss';
import WebAnchor from '../WebAnchor';
import PageLayout from '../PageLayout';
import { routes } from '../../shared/routes';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { Link, Stack, Redirect } from 'expo-router';
import useDragonExamplePage from './useDragonExamplePage';
import { dragonFormPath } from '../../shared/dragonForms';
import DragonExampleDetailView from '../DragonExampleDetailView';

const DragonExamplePage = () => {
  const { exampleId, example, examples, loading, error, retry, selectExample, redirectPath } = useDragonExamplePage();
  const id = `dragon-example-page-${exampleId ?? `unknown`}`;
  const title = example?.name ?? `Dragon Example`;
  const backPath = example ? dragonFormPath(example.kind) : routes.home.path;
  if (redirectPath) return <Redirect href={redirectPath} />;
  return (
    <PageLayout id={id} title={title} description={example?.franchise ?? `Explore dragon characters and creatures across different worlds.`}>
      <Stack.Screen options={{ title: `${title} | Dragon Database` }} />
      <div id={`${id}-content`} className={`dragon-example-page`}>
        <Link href={backPath} asChild><WebAnchor id={`${id}-back`} className={`dragon-example-page__back`}><ArrowLeft size={18} aria-hidden={true} />{example ? `Back To ${example.formName}` : `Back To The Collection`}</WebAnchor></Link>
        {loading ? <p id={`${id}-loading`} className={`dragon-example-page__state`} role={`status`}>Loading Dragon Example…</p> : error ? <div id={`${id}-error`} className={`dragon-example-page__state`} role={`alert`}><p>{error}</p><button type={`button`} id={`${id}-retry`} onClick={retry}><RotateCcw size={18} aria-hidden={true} />Try Again</button></div> : example ? <DragonExampleDetailView id={`${id}-details`} example={example} examples={examples} onSelect={selectExample} /> : <div id={`${id}-not-found`} className={`dragon-example-page__state`}><h2>Dragon Example Not Found</h2><p>This example is not in the collection. Choose a form from the landing page to explore its examples.</p></div>}
      </div>
    </PageLayout>
  );
};
export default DragonExamplePage;
