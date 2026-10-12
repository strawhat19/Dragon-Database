import baseStyles from './styles.native';
import { RotateCcw } from 'lucide-react-native';
import DragonExampleCard from '../DragonExampleCard';
import type { DragonExampleCollectionProps } from './types';
import DragonExampleFilters from '../DragonExampleFilters';
import DragonExampleLightbox from '../DragonExampleLightbox';
import { dragonTypeIcons } from '../../shared/dragonTypeIcons';
import useDragonExampleCollection from './useDragonExampleCollection';
import { Text, View, Pressable, useWindowDimensions } from 'react-native';
import { useTheme, useThemedStyles } from '../../shared/themeContext/ThemeContext';

const DragonExampleCollection = ({ id, kind, onOpenSource }: DragonExampleCollectionProps) => {
  const { palette } = useTheme();
  const styles = useThemedStyles(baseStyles);
  const { width } = useWindowDimensions();
  const wide = width >= 900;
  const { query, setQuery, groups, filters, examples, filteredExamples, selectedExample, retry, closeExample, selectExample, resetFilters, toggleFilter, error, loading } = useDragonExampleCollection(kind);
  return (
    <View nativeID={id} style={styles.collection}>
      {loading ? <Text nativeID={`${id}-loading`} accessibilityLiveRegion={`polite`} style={styles.stateText}>Loading Examples…</Text> : error ? <View nativeID={`${id}-error`} style={styles.state}><Text accessibilityLiveRegion={`polite`} style={styles.stateText}>{error}</Text><Pressable nativeID={`${id}-retry`} accessibilityRole={`button`} onPress={retry} style={styles.action}><RotateCcw size={17} color={palette.ink} /><Text style={styles.actionText}>Try Again</Text></Pressable></View> : <>
        <DragonExampleFilters id={`${id}-filters`} query={query} onQueryChange={setQuery} groups={groups} filters={filters} onToggle={toggleFilter} onReset={resetFilters} resultCount={filteredExamples.length} totalCount={examples.length} />
        {filteredExamples.length ? <View nativeID={`${id}-grid`} style={[styles.grid, wide && styles.wideGrid]}>{filteredExamples.map(example => <DragonExampleCard key={example.id} id={`${id}-example-${example.id}`} example={example} iconXml={dragonTypeIcons[example.kind]} wide={wide} onOpenSource={onOpenSource} onOpenDetails={() => selectExample(example.id)} />)}</View> : <View nativeID={`${id}-empty`} style={styles.state}><Text accessibilityLiveRegion={`polite`} style={styles.stateText}>{examples.length ? `No Examples Match These Filters` : `No Examples Available`}</Text>{examples.length ? <Pressable nativeID={`${id}-clear-filters`} accessibilityRole={`button`} onPress={resetFilters} style={styles.action}><RotateCcw size={17} color={palette.ink} /><Text style={styles.actionText}>Clear Filters</Text></Pressable> : null}</View>}
      </>}
      <DragonExampleLightbox id={`${id}-lightbox`} example={selectedExample} examples={filteredExamples} onSelect={selectExample} onClose={closeExample} />
    </View>
  );
};
export default DragonExampleCollection;
