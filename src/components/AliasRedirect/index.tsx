import { Redirect, Unmatched, useLocalSearchParams } from 'expo-router';
import { resolveRouteAlias } from '../../shared/routes';

const AliasRedirect = () => {
  const { alias } = useLocalSearchParams<{ alias: string | string[] }>();
  const destination = typeof alias === `string` ? resolveRouteAlias(`/${alias}`) : null;
  return destination ? <Redirect href={destination} /> : <Unmatched />;
};

export default AliasRedirect;
