import './styles.scss';
import { RotateCcw } from 'lucide-react';
import DragonExampleCard from '../DragonExampleCard';
import type { DragonExampleCollectionProps } from './types';
import DragonExampleFilters from '../DragonExampleFilters';
import DragonExampleLightbox from '../DragonExampleLightbox';
import { dragonTypeIcons } from '../../shared/dragonTypeIcons';
import useDragonExampleCollection from './useDragonExampleCollection';

const DragonExampleCollection = ({ id, kind }: DragonExampleCollectionProps) => {
  const { query, setQuery, groups, filters, examples, filteredExamples, selectedExample, retry, closeExample, selectExample, resetFilters, toggleFilter, error, loading } = useDragonExampleCollection(kind);
  return (
    <div id={id} className={`dragon-example-collection`}>
      {loading ? <p id={`${id}-loading`} className={`dragon-example-collection__state`} role={`status`}>Loading Examples…</p> : error ? <div id={`${id}-error`} className={`dragon-example-collection__state`} role={`alert`}><p>{error}</p><button id={`${id}-retry`} type={`button`} onClick={retry}><RotateCcw size={17} aria-hidden={true} />Try Again</button></div> : <>
        <DragonExampleFilters id={`${id}-filters`} query={query} onQueryChange={setQuery} groups={groups} filters={filters} onToggle={toggleFilter} onReset={resetFilters} resultCount={filteredExamples.length} totalCount={examples.length} />
        {filteredExamples.length ? <div id={`${id}-grid`} className={`dragon-example-collection__grid`}>{filteredExamples.map(example => <DragonExampleCard key={example.id} id={`${id}-example-${example.id}`} example={example} iconXml={dragonTypeIcons[example.kind]} onOpenDetails={() => selectExample(example.id)} />)}</div> : <div id={`${id}-empty`} className={`dragon-example-collection__state`} role={`status`}><p>{examples.length ? `No Examples Match These Filters` : `No Examples Available`}</p>{examples.length ? <button type={`button`} id={`${id}-clear-filters`} onClick={resetFilters}><RotateCcw size={17} aria-hidden={true} />Clear Filters</button> : null}</div>}
      </>}
      <DragonExampleLightbox id={`${id}-lightbox`} example={selectedExample} examples={filteredExamples} onSelect={selectExample} onClose={closeExample} />
    </div>
  );
};
export default DragonExampleCollection;
