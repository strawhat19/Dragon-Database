import { useContext } from 'react';
import { DragonDataContext } from './DragonDataContext';

export const useDragonData = () => {
  const context = useContext(DragonDataContext);
  if (!context) throw new Error(`useDragonData Requires DragonDataProvider`);
  return context;
};

