import Artwork from '../Artwork';
import { useState } from 'react';
import PageLayout from '../PageLayout';
import baseStyles from './styles.native';
import { Link, Stack } from 'expo-router';
import { routes } from '../../shared/routes';
import useDragonFormPage from './useDragonFormPage';
import { dragonTypeIcons } from '../../shared/dragonTypeIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useReducedMotion } from '../../shared/motion/useReducedMotion';
import type { DragonExample } from '../../shared/models/dragons/DragonForm';
import { useTheme, useThemedStyles } from '../../shared/themeContext/ThemeContext';
import { ArrowLeft, ArrowUpRight, Expand, RotateCcw, X } from 'lucide-react-native';
import { Text, View, Image, Modal, Pressable, useWindowDimensions } from 'react-native';
import { dragonFormKinds, dragonFormPath, getDragonFormName } from '../../shared/dragonForms';

const ExampleArtwork = ({ example, id, iconXml }: { example: DragonExample; id: string; iconXml: string }) => {
  const [failed, setFailed] = useState(false);
  const styles = useThemedStyles(baseStyles);
  return <View nativeID={`${id}-art`} style={styles.exampleArt}>
    {example.imageUrl && !failed ? <Image nativeID={`${id}-image`} source={{ uri: example.imageUrl }} resizeMode={`contain`} accessibilityLabel={`${example.name} — Official ${example.franchise} Artwork`} style={styles.exampleImage} onError={() => setFailed(true)} /> : <View nativeID={`${id}-art-reference`} style={styles.referenceArt}><View nativeID={`${id}-reference-symbol-wrap`} style={styles.referenceSymbol}><Artwork id={`${id}-reference-symbol`} xml={iconXml} /></View><Text style={styles.referenceLabel}>{failed ? `Artwork Unavailable · View Source` : `Explore The Source`}</Text></View>}
  </View>;
};
const DragonFormPage = () => {
  const styles = useThemedStyles(baseStyles);
  const { palette } = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const reducedMotion = useReducedMotion();
  const wide = width >= 900;
  const { kind, details, error, loading, retry, sourceError, viewedArtwork, viewArtwork, closeArtwork, openSource } = useDragonFormPage();
  const id = `dragon-form-${kind ?? `unknown`}`;
  const title = details?.name ?? (kind ? getDragonFormName(kind) : `Dragon Form Not Found`);
  return (
    <PageLayout id={id} title={title} description={details?.description ?? `Explore dragon anatomy, original art, and examples from different worlds.`}>
      <Stack.Screen options={{ title: `${title} | Dragon Database` }} />
      <View nativeID={`${id}-content`} testID={`${id}-content`} style={styles.content}>
        <View nativeID={`${id}-navigation`} style={styles.navigation}>
          <Link href={routes.home.path} asChild><Pressable accessibilityRole={`link`} nativeID={`${id}-home`} style={({ pressed }) => [styles.backLink, pressed && styles.pressed]}><ArrowLeft size={18} color={palette.ink} /><Text style={styles.linkText}>Back To The Collection</Text></Pressable></Link>
          {details && <Text nativeID={`${id}-counts`} style={styles.counts}>{details.gallery.length} Illustrations · {details.examples.length} References</Text>}
        </View>
        {loading ? <View nativeID={`${id}-loading`} style={styles.state}><Text accessibilityLiveRegion={`polite`} style={styles.body}>Loading Dragon Form…</Text></View> : error ? <View nativeID={`${id}-error`} style={styles.state}><Text accessibilityRole={`header`} style={styles.sectionTitle}>Dragon Form Could Not Be Loaded</Text><Text accessibilityLiveRegion={`polite`} style={styles.body}>{error}</Text><Pressable nativeID={`${id}-retry`} accessibilityRole={`button`} onPress={retry} style={styles.action}><RotateCcw size={17} color={palette.ink} /><Text style={styles.linkText}>Try Again</Text></Pressable></View> : !details || !kind ? <View nativeID={`${id}-not-found`} style={styles.state}><Text accessibilityRole={`header`} style={styles.sectionTitle}>Choose A Dragon Form</Text><Text style={styles.body}>This form is not in the collection. Explore one of the forms below.</Text></View> : <>
          <View nativeID={`${id}-overview`} style={[styles.overview, wide && styles.overviewWide]}>
            <View nativeID={`${id}-overview-copy`} style={styles.overviewCopy}><Text style={styles.eyebrow}>Form Guide</Text><Text nativeID={`${id}-overview-title`} accessibilityRole={`header`} style={styles.sectionTitle}>Recognizing The Form</Text><Text nativeID={`${id}-overview-description`} style={styles.lead}>{details.overview}</Text></View>
            <View nativeID={`${id}-anatomy`} style={[styles.anatomy, wide && styles.anatomyWide]}><Text accessibilityRole={`header`} nativeID={`${id}-anatomy-title`} style={styles.cardTitle}>Anatomy &amp; Traits</Text>{details.anatomy.map((trait, index) => <View key={trait} nativeID={`${id}-trait-${index}`} style={styles.trait}><Text style={styles.bullet}>•</Text><Text style={[styles.body, styles.traitText]}>{trait}</Text></View>)}</View>
          </View>
          <View nativeID={`${id}-gallery`} style={styles.section}>
            <View nativeID={`${id}-gallery-heading`} style={styles.sectionHeading}><Text nativeID={`${id}-gallery-eyebrow`} style={styles.eyebrow}>Original Illustrations</Text><Text accessibilityRole={`header`} nativeID={`${id}-gallery-title`} style={styles.sectionTitle}>The Art Collection</Text><Text style={styles.body}>Open an illustration to explore the full scene.</Text></View>
            <View nativeID={`${id}-gallery-grid`} style={[styles.gallery, wide && styles.wideGrid]}>{details.gallery.map(artwork => <View key={artwork.id} nativeID={`${id}-art-${artwork.id}`} style={[styles.artCard, wide && styles.wideCard]}><Pressable nativeID={`${id}-view-${artwork.id}`} accessibilityRole={`button`} accessibilityLabel={`View ${artwork.title} Full Size`} onPress={() => viewArtwork(artwork)} style={({ pressed }) => [styles.artButton, pressed && styles.pressed]}><Image nativeID={`${id}-image-${artwork.id}`} source={artwork.source} resizeMode={`contain`} accessibilityLabel={artwork.alt} style={styles.galleryImage} /><View nativeID={`${id}-expand-${artwork.id}`} style={styles.artExpand}><Expand size={16} color={palette.paper} /><Text style={styles.artExpandLabel}>View Artwork</Text></View></Pressable><View nativeID={`${id}-caption-${artwork.id}`} style={styles.artCaption}><Text style={styles.artTitle}>{artwork.title}</Text><Text style={styles.credit}>Dragon Database · Original Art</Text></View></View>)}</View>
          </View>
          <View nativeID={`${id}-examples`} style={styles.section}><View nativeID={`${id}-examples-heading`} style={styles.sectionHeading}><Text nativeID={`${id}-examples-eyebrow`} style={styles.eyebrow}>Games · Film · Fiction</Text><Text accessibilityRole={`header`} nativeID={`${id}-examples-title`} style={styles.sectionTitle}>Across Different Worlds</Text></View><Text nativeID={`${id}-canon-note`} style={styles.canonNote}>{details.note}</Text>
            <View nativeID={`${id}-examples-grid`} style={[styles.examples, wide && styles.wideGrid]}>{details.examples.map(example => {
              const exampleId = `${id}-example-${example.id}`;
              return <View key={example.id} nativeID={exampleId} testID={exampleId} style={[styles.exampleCard, wide && styles.wideCard]}>
                <ExampleArtwork key={example.imageUrl ?? example.id} id={exampleId} example={example} iconXml={dragonTypeIcons[kind]} />
                <View nativeID={`${exampleId}-body`} style={styles.exampleBody}><Text nativeID={`${exampleId}-franchise`} style={styles.eyebrow}>{example.franchise}</Text><Text nativeID={`${exampleId}-title`} accessibilityRole={`header`} style={styles.cardTitle}>{example.name}</Text><Text nativeID={`${exampleId}-description`} style={styles.body}>{example.description}</Text><Text nativeID={`${exampleId}-canon`} style={styles.canonLabel}>{example.canonLabel}</Text>{example.imageCredit && <Text nativeID={`${exampleId}-credit`} style={styles.credit}>{example.imageCredit}</Text>}<Pressable nativeID={`${exampleId}-source`} accessibilityRole={`link`} accessibilityLabel={`View Source For ${example.name}`} onPress={() => { void openSource(example.sourceUrl); }} style={({ pressed }) => [styles.sourceLink, pressed && styles.pressed]}><Text style={styles.linkText}>View Source</Text><ArrowUpRight size={17} color={palette.ink} /></Pressable>{example.anatomySourceUrl && <Pressable nativeID={`${exampleId}-anatomy-source`} accessibilityRole={`link`} accessibilityLabel={`View Anatomy Reference For ${example.name}`} onPress={() => { void openSource(example.anatomySourceUrl ?? example.sourceUrl); }} style={({ pressed }) => [styles.sourceLink, pressed && styles.pressed]}><Text style={styles.linkText}>Anatomy Reference</Text><ArrowUpRight size={17} color={palette.ink} /></Pressable>}</View>
              </View>;
            })}</View>
            {sourceError && <Text nativeID={`${id}-source-error`} accessibilityLiveRegion={`polite`} style={styles.error}>{sourceError}</Text>}
          </View>
        </>}
        <View nativeID={`${id}-related`} style={styles.related}><Text accessibilityRole={`header`} nativeID={`${id}-related-title`} style={styles.sectionTitle}>Explore More Forms</Text><View nativeID={`${id}-related-links`} style={styles.relatedLinks}>{dragonFormKinds.filter(related => related !== kind).map(related => <Link key={related} href={dragonFormPath(related)} asChild><Pressable nativeID={`${id}-related-${related}`} accessibilityRole={`link`} style={({ pressed }) => [styles.relatedLink, pressed && styles.pressed]}><Text style={styles.linkText}>{getDragonFormName(related)}</Text><ArrowUpRight size={17} color={palette.ink} /></Pressable></Link>)}</View></View>
      </View>
      <Modal visible={Boolean(viewedArtwork)} transparent animationType={reducedMotion ? `none` : `fade`} onRequestClose={closeArtwork} statusBarTranslucent>
        {viewedArtwork && <View nativeID={`${id}-art-viewer`} accessibilityViewIsModal style={[styles.viewerBackdrop, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 16 }]}><View nativeID={`${id}-viewer-heading`} style={styles.viewerHeading}><Text accessibilityRole={`header`} nativeID={`${id}-viewer-title`} style={styles.viewerTitle}>{viewedArtwork.title}</Text><Pressable nativeID={`${id}-viewer-close`} accessibilityRole={`button`} accessibilityLabel={`Close Artwork Viewer`} onPress={closeArtwork} hitSlop={8} style={styles.viewerClose}><X size={24} color={`#fff`} /></Pressable></View><Image nativeID={`${id}-viewer-image`} source={viewedArtwork.source} resizeMode={`contain`} accessibilityLabel={viewedArtwork.alt} style={styles.viewerImage} /><Text style={styles.viewerCredit}>Dragon Database · Original Art</Text></View>}
      </Modal>
    </PageLayout>
  );
};
export default DragonFormPage;
