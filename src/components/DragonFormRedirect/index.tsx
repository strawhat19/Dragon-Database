import { Redirect, Unmatched, usePathname } from 'expo-router';
import { dragonFormPath, resolveDragonFormKind } from '../../shared/dragonForms';

const DragonFormRedirect = () => {
  const pathname = usePathname();
  const kind = resolveDragonFormKind(pathname);
  return kind ? <Redirect href={dragonFormPath(kind)} /> : <Unmatched />;
};

export default DragonFormRedirect;
