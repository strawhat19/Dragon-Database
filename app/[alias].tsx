import AliasRedirect from '../src/components/AliasRedirect';
import { routeAliases } from '../src/shared/routes';

export const generateStaticParams = () => Object.keys(routeAliases).map((path) => ({ alias: path.slice(1) }));

export default AliasRedirect;
