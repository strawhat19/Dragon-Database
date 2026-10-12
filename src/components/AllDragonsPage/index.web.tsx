import './styles.scss';
import WebAnchor from '../WebAnchor';
import PageLayout from '../PageLayout';
import { ArrowLeft } from 'lucide-react';
import { Link, Stack } from 'expo-router';
import { routes } from '../../shared/routes';
import DragonExampleCollection from '../DragonExampleCollection';

const AllDragonsPage = () => (
  <PageLayout id={`all-dragons`} title={routes.allDragons.label} description={`Explore every dragon form and character across games, movies, television, art, and stories.`}>
    <Stack.Screen options={{ title: `${routes.allDragons.label} | Dragon Database` }} />
    <div id={`all-dragons-content`} className={`all-dragons-content`}>
      <Link href={routes.home.path} asChild><WebAnchor id={`all-dragons-back`} className={`all-dragons-back`}><ArrowLeft size={18} aria-hidden={true} />Back To Dragon Forms</WebAnchor></Link>
      <DragonExampleCollection id={`all-dragons-examples`} />
    </div>
  </PageLayout>
);
export default AllDragonsPage;
