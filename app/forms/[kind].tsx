import { dragonFormKinds } from '../../src/shared/dragonForms';
import DragonFormPage from '../../src/components/DragonFormPage';

export const generateStaticParams = () => dragonFormKinds.map(kind => ({ kind }));
export default DragonFormPage;
