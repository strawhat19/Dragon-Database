import { dragonFormKinds } from '../../src/shared/dragonForms';
import DragonFormRedirect from '../../src/components/DragonFormRedirect';

export const generateStaticParams = () => dragonFormKinds.map(kind => ({ kind }));
export default DragonFormRedirect;
