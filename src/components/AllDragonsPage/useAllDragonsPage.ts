import { useState } from 'react';
import { Linking } from 'react-native';

const useAllDragonsPage = () => {
  const [sourceError, setSourceError] = useState<string>();
  const openSource = async (url: string) => {
    setSourceError(undefined);
    try { await Linking.openURL(url); }
    catch { setSourceError(`Source Could Not Be Opened`); }
  };
  return { sourceError, openSource };
};
export default useAllDragonsPage;
