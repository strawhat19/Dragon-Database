import { dragonAPI } from '../../src/api/dragons';
import { dragonFormPath } from '../../src/shared/dragonForms';
import DragonExamplePage from '../../src/components/DragonExamplePage';

export const generateStaticParams = async () => (await dragonAPI.getDragonExamples()).map(example => ({ id: example.id, form: dragonFormPath(example.kind).slice(1) }));
export default DragonExamplePage;
