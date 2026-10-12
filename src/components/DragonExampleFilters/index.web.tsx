import './styles.scss';
import { useRef, useState, useEffect } from 'react';
import type { DragonExampleFiltersProps } from './types';
import { X, Film, Check, Plus, Flame, Search, Filter, Palette, BookOpen, RotateCcw } from 'lucide-react';

const groupIcons = { colors: Palette, mediums: Film, elements: Flame, sources: BookOpen };

const DragonExampleFilters = ({ id, query, groups, filters, onReset, onToggle, onQueryChange, resultCount, totalCount }: DragonExampleFiltersProps) => {
  const search = useRef<HTMLInputElement>(null);
  const root = useRef<HTMLElement>(null);
  const filterButton = useRef<HTMLButtonElement>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const activeFilters = Object.values(filters).reduce((count, values) => count + values.length, 0);
  const hasFilters = Boolean(query.trim()) || Object.values(filters).some(values => values.length > 0);
  const clearQuery = () => { onQueryChange(``); search.current?.focus(); };
  const closeFilters = () => { setFiltersOpen(false); filterButton.current?.focus(); };
  useEffect(() => {
    if (!filtersOpen) return;
    const dismiss = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) setFiltersOpen(false); };
    document.addEventListener(`pointerdown`, dismiss);
    return () => document.removeEventListener(`pointerdown`, dismiss);
  }, [filtersOpen]);
  return (
    <section ref={root} id={id} className={`dragon-example-filters`} aria-label={`Search And Filter Dragon Examples`} onKeyDown={event => { if (filtersOpen && event.key === `Escape`) { event.preventDefault(); event.stopPropagation(); closeFilters(); } }}>
      <div id={`${id}-toolbar`} className={`dragon-example-filters__toolbar`}>
        <p id={`${id}-count`} className={`dragon-example-filters__count`} role={`status`} aria-live={`polite`} aria-atomic={true} aria-label={`${resultCount} Of ${totalCount} Examples`}><strong>{resultCount}</strong><span>Examples</span>{resultCount !== totalCount ? <small>/ {totalCount}</small> : null}</p>
        <div id={`${id}-search`} className={`dragon-example-filters__search`} role={`search`} aria-label={`Search Dragon Examples`}>
          <label htmlFor={`${id}-query`} id={`${id}-search-label`} className={`visually-hidden`}>Search Examples By Name, World, Or Description</label>
          <Search size={19} aria-hidden={true} />
          <input
            ref={search}
            type={`search`}
            value={query}
            id={`${id}-query`}
            autoComplete={`off`}
            onChange={event => onQueryChange(event.currentTarget.value)}
            placeholder={`Search`}
            className={`dragon-example-filters__search-input`}
          />
          {query.length > 0 ? <button type={`button`} id={`${id}-clear-search`} onClick={clearQuery} className={`dragon-example-filters__search-clear`} aria-label={`Clear Examples Search`}><X size={19} aria-hidden={true} /></button> : null}
        </div>
        <button ref={filterButton} type={`button`} id={`${id}-toggle`} className={`dragon-example-filters__toggle${filtersOpen ? ` is-open` : ``}`} aria-controls={`${id}-panel`} aria-expanded={filtersOpen} aria-label={`Filter Examples · ${activeFilters} Selected`} title={`Filter Examples`} onClick={() => setFiltersOpen(current => !current)}><Filter size={21} aria-hidden={true} /><span id={`${id}-badge`} className={`dragon-example-filters__badge${activeFilters ? ` is-active` : ``}`} aria-hidden={true}>{activeFilters}</span></button>
      </div>
      <div id={`${id}-panel`} className={`dragon-example-filters__panel${filtersOpen ? ` is-open` : ``}`} inert={!filtersOpen} aria-hidden={!filtersOpen}>
        <div id={`${id}-panel-inner`} className={`dragon-example-filters__panel-inner`}>
          <div id={`${id}-panel-header`} className={`dragon-example-filters__panel-header`}><h3 id={`${id}-title`} className={`dragon-example-filters__title`}><Filter size={18} aria-hidden={true} />Filter Examples</h3><button type={`button`} id={`${id}-close`} className={`dragon-example-filters__close`} aria-label={`Close Filters`} onClick={closeFilters}><X size={20} aria-hidden={true} /></button></div>
          <div id={`${id}-groups`} className={`dragon-example-filters__groups`}>
            {groups.map(group => {
              const GroupIcon = groupIcons[group.key];
              return (
                <fieldset key={group.key} id={`${id}-${group.key}`} className={`dragon-example-filters__group`}>
                  <legend id={`${id}-${group.key}-label`} className={`dragon-example-filters__label`}><GroupIcon size={17} aria-hidden={true} />{group.label}</legend>
                  <div id={`${id}-${group.key}-options`} className={`dragon-example-filters__options`}>
                    {group.options.map((option, index) => {
                      const selected = filters[group.key]?.includes(option) ?? false;
                      return <button key={option} type={`button`} aria-pressed={selected} id={`${id}-${group.key}-option-${index}`} onClick={() => onToggle(group.key, option)} aria-label={`${group.label}: ${option}`} className={`dragon-example-filters__option${selected ? ` dragon-example-filters__option--selected` : ``}`}>{selected ? <Check size={15} aria-hidden={true} /> : <Plus size={15} aria-hidden={true} />}<span>{option}</span></button>;
                    })}
                  </div>
                </fieldset>
              );
            })}
          </div>
          <div id={`${id}-panel-actions`} className={`dragon-example-filters__panel-actions`}><button type={`button`} onClick={onReset} disabled={!hasFilters} id={`${id}-reset`} className={`dragon-example-filters__reset`}><RotateCcw size={16} aria-hidden={true} /><span>Reset Filters</span></button><button type={`button`} id={`${id}-done`} className={`dragon-example-filters__done`} onClick={closeFilters}><Check size={17} aria-hidden={true} /><span>Done</span></button></div>
        </div>
      </div>
    </section>
  );
};

export default DragonExampleFilters;
