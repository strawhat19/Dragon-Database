import baseStyles from './styles.native';
import { useRef, useState, useEffect } from 'react';
import type { DragonExampleFiltersProps } from './types';
import AngledSurface from '../AngledSurface/index.native';
import { useReducedMotion } from '../../shared/motion/useReducedMotion';
import { useTheme, useThemedStyles } from '../../shared/themeContext/ThemeContext';
import { Text, View, Easing, Animated, Keyboard, TextInput, Pressable, useWindowDimensions } from 'react-native';
import { X, Film, Check, Plus, Flame, Filter, Search, Palette, BookOpen, RotateCcw, SlidersHorizontal } from 'lucide-react-native';

const groupIcons = { colors: Palette, mediums: Film, elements: Flame, sources: BookOpen };

const DragonExampleFilters = ({ id, query, groups, filters, onReset, onToggle, onQueryChange, resultCount, totalCount }: DragonExampleFiltersProps) => {
  const { palette } = useTheme();
  const { width } = useWindowDimensions();
  const search = useRef<TextInput>(null);
  const styles = useThemedStyles(baseStyles);
  const reducedMotion = useReducedMotion();
  const panelProgress = useRef(new Animated.Value(0)).current;
  const [panelHeight, setPanelHeight] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const wide = width >= 600;
  const selectedCount = Object.values(filters).reduce((count, values) => count + values.length, 0);
  const hasFilters = Boolean(query.trim()) || selectedCount > 0;
  const clearQuery = () => { onQueryChange(``); search.current?.focus(); };
  const toggleFilters = () => {
    if (!filtersOpen) Keyboard.dismiss();
    setFiltersOpen(current => !current);
  };
  useEffect(() => {
    const animation = Animated.timing(panelProgress, { toValue: filtersOpen ? 1 : 0, duration: reducedMotion ? 0 : 220, easing: Easing.inOut(Easing.cubic), useNativeDriver: false });
    animation.start();
    return () => animation.stop();
  }, [filtersOpen, reducedMotion, panelProgress]);
  return (
    <View nativeID={id} style={styles.root}>
      <View nativeID={`${id}-toolbar`} style={[styles.toolbar, !wide && styles.toolbarStack]}>
        <Text nativeID={`${id}-count`} accessibilityLiveRegion={`polite`} accessibilityLabel={`${resultCount} Of ${totalCount} Examples`} style={styles.count}><Text style={styles.countNumber}>{resultCount}</Text> Examples{resultCount !== totalCount ? <Text style={styles.countTotal}> / {totalCount}</Text> : null}</Text>
        <View nativeID={`${id}-search-controls`} style={[styles.searchControls, wide ? styles.searchControlsWide : styles.searchControlsPhone]}>
          <View nativeID={`${id}-search`} style={styles.search}>
            <AngledSurface id={`${id}-search-surface`} fill={palette.paper} stroke={searchFocused ? palette.red : palette.line} />
            <Search size={19} color={palette.red} accessible={false} />
            <TextInput
              ref={search}
              value={query}
              autoCorrect={false}
              returnKeyType={`search`}
              autoCapitalize={`none`}
              clearButtonMode={`never`}
              nativeID={`${id}-query`}
              style={styles.searchInput}
              onChangeText={onQueryChange}
              selectionColor={palette.red}
              placeholderTextColor={palette.muted}
              onBlur={() => setSearchFocused(false)}
              onFocus={() => setSearchFocused(true)}
              placeholder={`Search`}
              accessibilityLabel={`Search Examples By Name, World, Or Description`}
            />
            {query.length > 0 ? <Pressable onPress={clearQuery} nativeID={`${id}-clear-search`} accessibilityRole={`button`} accessibilityLabel={`Clear Examples Search`} style={({ pressed }) => [styles.searchClear, pressed && styles.pressed]}><X size={19} color={palette.muted} accessible={false} /></Pressable> : null}
          </View>
          <Pressable
            onPress={toggleFilters}
            nativeID={`${id}-filter-toggle`}
            accessibilityRole={`button`}
            accessibilityState={{ expanded: filtersOpen }}
            accessibilityLabel={`${filtersOpen ? `Hide` : `Show`} Filters${selectedCount ? `: ${selectedCount} Selected` : ``}`}
            style={({ pressed }) => [styles.filterToggle, pressed && styles.pressed]}
          >
            <AngledSurface id={`${id}-filter-toggle-surface`} fill={palette.ink} stroke={filtersOpen || selectedCount ? palette.red : palette.ink} />
            <Filter size={21} color={palette.paper} accessible={false} />
            <View pointerEvents={`none`} nativeID={`${id}-selected-count`} accessibilityElementsHidden importantForAccessibility={`no-hide-descendants`} style={[styles.badge, selectedCount > 0 && styles.badgeActive]}><Text style={[styles.badgeLabel, selectedCount > 0 && styles.badgeLabelActive]}>{selectedCount}</Text></View>
          </Pressable>
        </View>
      </View>
      <Animated.View
        nativeID={`${id}-panel`}
        pointerEvents={filtersOpen ? `auto` : `none`}
        accessibilityElementsHidden={!filtersOpen}
        importantForAccessibility={filtersOpen ? `auto` : `no-hide-descendants`}
        style={[styles.panelClip, {
          opacity: panelProgress,
          height: panelProgress.interpolate({ inputRange: [0, 1], outputRange: [0, panelHeight] }),
          marginTop: panelProgress.interpolate({ inputRange: [0, 1], outputRange: [0, 12] }),
        }]}
      >
        <View nativeID={`${id}-panel-content`} style={styles.panel} onLayout={({ nativeEvent }) => setPanelHeight(nativeEvent.layout.height)}>
          <View nativeID={`${id}-panel-header`} style={styles.panelHeader}>
            <View nativeID={`${id}-title-row`} style={styles.titleRow}><SlidersHorizontal size={19} color={palette.red} accessible={false} /><Text nativeID={`${id}-title`} accessibilityRole={`header`} style={styles.title}>Filters</Text></View>
            <Pressable onPress={() => setFiltersOpen(false)} nativeID={`${id}-done`} accessibilityRole={`button`} accessibilityLabel={`Close Filters`} style={({ pressed }) => [styles.done, pressed && styles.pressed]}><AngledSurface id={`${id}-done-surface`} fill={palette.silver} stroke={palette.line} /><X size={17} color={palette.ink} accessible={false} /><Text nativeID={`${id}-done-label`} style={styles.optionLabel}>Done</Text></Pressable>
          </View>
          <View nativeID={`${id}-groups`} style={styles.groups}>
            {groups.map(group => {
              const GroupIcon = groupIcons[group.key];
              return (
                <View key={group.key} nativeID={`${id}-${group.key}`} style={styles.group}>
                  <View nativeID={`${id}-${group.key}-label-row`} style={styles.labelRow}>
                    <GroupIcon size={17} color={palette.red} accessible={false} />
                    <Text nativeID={`${id}-${group.key}-label`} accessibilityRole={`header`} style={styles.label}>{group.label}</Text>
                  </View>
                  <View nativeID={`${id}-${group.key}-options`} style={styles.options}>
                    {group.options.map((option, index) => {
                      const selected = filters[group.key]?.includes(option) ?? false;
                      const optionId = `${id}-${group.key}-option-${index}`;
                      const color = selected ? palette.paper : palette.ink;
                      return (
                        <Pressable key={option} nativeID={optionId} accessibilityRole={`button`} accessibilityState={{ selected }} onPress={() => onToggle(group.key, option)} accessibilityLabel={`${group.label}: ${option}`} style={({ pressed }) => [styles.option, pressed && styles.pressed]}>
                          <AngledSurface id={`${optionId}-surface`} fill={selected ? palette.ink : palette.paper} stroke={selected ? palette.red : palette.line} />
                          {selected ? <Check size={15} color={color} accessible={false} /> : <Plus size={15} color={color} accessible={false} />}
                          <Text nativeID={`${optionId}-label`} style={[styles.optionLabel, { color }]}>{option}</Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </View>
          <View nativeID={`${id}-panel-actions`} style={styles.panelActions}>
            <Pressable onPress={onReset} disabled={!hasFilters} nativeID={`${id}-reset`} accessibilityRole={`button`} accessibilityState={{ disabled: !hasFilters }} style={({ pressed }) => [styles.reset, pressed && styles.pressed]}>
              <AngledSurface id={`${id}-reset-surface`} fill={palette.silver} stroke={palette.line} />
              <RotateCcw size={16} color={hasFilters ? palette.ink : palette.muted} accessible={false} />
              <Text nativeID={`${id}-reset-label`} style={[styles.optionLabel, !hasFilters && { color: palette.muted }]}>{hasFilters ? `Reset Filters` : `All Examples`}</Text>
            </Pressable>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default DragonExampleFilters;
