import { dragonAPI } from '../../src/api/dragons';
import DragonExamplePage from '../../src/components/DragonExamplePage';

export const generateStaticParams = async () => (await dragonAPI.getDragonExamples()).map(example => ({ id: example.id }));
export default DragonExamplePage;
