import type { DragonExampleDetailViewProps } from './types';

const useDragonExampleDetailView = ({ example, examples, onSelect }: DragonExampleDetailViewProps) => {
  const collection = examples.length ? examples : [example];
  const currentIndex = Math.max(0, collection.findIndex(item => item.id === example.id));
  const previous = collection[(currentIndex - 1 + collection.length) % collection.length];
  const next = collection[(currentIndex + 1) % collection.length];
  const selectPrevious = () => { if (previous) onSelect(previous.id); };
  const selectNext = () => { if (next) onSelect(next.id); };
  const metadata = [
    { label: `Form`, values: [example.formName] },
    { label: `Media`, values: example.mediums },
    { label: `Colors`, values: example.colors },
    { label: `Elements`, values: example.elements },
  ];
  return { next, previous, metadata, collection, currentIndex, selectNext, selectPrevious };
};

export default useDragonExampleDetailView;
