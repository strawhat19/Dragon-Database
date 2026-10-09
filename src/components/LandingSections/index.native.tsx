import Reveal from '../Reveal';
import Artwork from '../Artwork';
import { useRef } from 'react';
import { Link } from 'expo-router';
import TextReveal from '../TextReveal';
import baseStyles from './styles.native';
import { SvgXml } from 'react-native-svg';
import { routes } from '../../shared/routes';
import { anatomyNotes, loreNotes } from './content';
import { steelTextureXml } from '../../shared/artwork';
import { Info, Mail, ArrowUpRight } from 'lucide-react-native';
import type { LayoutRectangle, LayoutChangeEvent } from 'react-native';
import type { ScrollTopContrastLayout } from '../ScrollTopButton/types';
import { Text, View, Pressable, useWindowDimensions } from 'react-native';
import { useTheme, useThemedStyles } from '../../shared/themeContext/ThemeContext';
import { wordmarkSwordXml, dragonTypeGraphics } from '../../shared/landingArtwork';

type ContrastLayoutKey = `root` | `plate` | `inner` | `anatomy`;
type LandingSectionsProps = { onContrastLayout?: (layout: ScrollTopContrastLayout) => void };

const LandingSections = ({ onContrastLayout }: LandingSectionsProps) => {
  const contrastLayouts = useRef<Partial<Record<ContrastLayoutKey, LayoutRectangle>>>({});
  const { palette, isDark, themeArtwork } = useTheme();
  const invitationInk = palette.ink;
  const themedStyles = useThemedStyles(baseStyles);
  const styles = isDark ? {
    ...themedStyles,
    noteNumber: { ...themedStyles.noteNumber, color: palette.muted },
    darkEyebrow: { ...themedStyles.darkEyebrow, color: palette.muted },
    darkNoteText: { ...themedStyles.darkNoteText, color: palette.muted },
    lightHeading: { ...themedStyles.lightHeading, color: palette.ink },
    anatomy: { ...themedStyles.anatomy, backgroundColor: palette.paper },
    invitation: { ...themedStyles.invitation, backgroundColor: `#101115` },
  } : themedStyles;
  const { width } = useWindowDimensions();
  const wide = width >= 900;
  const gutter = width >= 720 ? Math.max(40, (width - 1280) / 2) : 24;

  const onContrastSectionLayout = (key: ContrastLayoutKey, { nativeEvent }: LayoutChangeEvent) => {
    contrastLayouts.current[key] = nativeEvent.layout;
    const { root, plate, inner, anatomy } = contrastLayouts.current;
    if (!root || !anatomy || !inner || !plate) return;
    const x = root.x + anatomy.x;
    const y = root.y + anatomy.y;
    onContrastLayout?.({
      anatomy: { ...anatomy, x, y },
      plate: { ...plate, x: x + inner.x + plate.x, y: y + inner.y + plate.y },
    });
  };

  return (
    <View nativeID={`landing-editorial-sections`} onLayout={(event) => onContrastSectionLayout(`root`, event)}>
      <View style={[styles.anatomy, { paddingHorizontal: gutter }]} nativeID={`landing-anatomy`} onLayout={(event) => onContrastSectionLayout(`anatomy`, event)}>
        <View style={[styles.anatomyInner, wide && styles.anatomyWide]} nativeID={`landing-anatomy-inner`} onLayout={(event) => onContrastSectionLayout(`inner`, event)}>
          <View style={wide && styles.anatomyColumn} nativeID={`landing-anatomy-plate-container`} onLayout={(event) => onContrastSectionLayout(`plate`, event)}>
            <Reveal id={`landing-anatomy-plate-reveal`}>
              <View style={styles.plate} nativeID={`landing-anatomy-plate`}>
                <Text style={styles.plateLabel} nativeID={`landing-anatomy-plate-label`}>Form study · 001</Text>
                <View style={styles.plateArtwork} nativeID={`landing-anatomy-illustration-container`}>
                  <Artwork id={`landing-anatomy-illustration`} xml={dragonTypeGraphics.dragon} label={`Dragon anatomy study: four legs, two wings, horns and a long tail`} />
                </View>
                <Text style={styles.plateCaption} nativeID={`landing-anatomy-caption`}>Dragon · Four limbs. Two wings.</Text>
              </View>
            </Reveal>
          </View>
          <View style={wide && styles.anatomyColumn} nativeID={`landing-anatomy-copy`}>
            <Reveal id={`landing-anatomy-eyebrow-reveal`}>
              <Text style={[styles.eyebrow, styles.darkEyebrow]} nativeID={`landing-anatomy-eyebrow`}>Field notes</Text>
            </Reveal>
            <TextReveal id={`landing-anatomy-title`} text={`Anatomy of a dragon`} accessibilityRole={`header`} textStyle={[styles.heading, styles.lightHeading, wide && styles.wideHeading]} />
            <View style={styles.anatomyNotes} nativeID={`landing-anatomy-notes`}>
              {anatomyNotes.map((note, index) => (
                <Reveal key={note.id} id={`landing-anatomy-note-reveal-${note.id}`} delay={0.1 + index * 0.08}>
                  <View style={styles.anatomyNote} nativeID={`landing-anatomy-note-${note.id}`}>
                    <Text style={styles.noteNumber} nativeID={`landing-anatomy-note-number-${note.id}`}>{note.number}</Text>
                    <View style={styles.noteBody} nativeID={`landing-anatomy-note-body-${note.id}`}>
                      <Text style={[styles.noteTitle, styles.lightHeading]} accessibilityRole={`header`} nativeID={`landing-anatomy-note-title-${note.id}`}>{note.title}</Text>
                      <Text style={[styles.noteText, styles.darkNoteText]} nativeID={`landing-anatomy-note-text-${note.id}`}>{note.text}</Text>
                    </View>
                  </View>
                </Reveal>
              ))}
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.lore, { paddingHorizontal: gutter }]} nativeID={`landing-lore`}>
        <Reveal id={`landing-lore-eyebrow-reveal`}>
          <Text style={styles.eyebrow} nativeID={`landing-lore-eyebrow`}>Stories behind the forms</Text>
        </Reveal>
        <TextReveal id={`landing-lore-title`} text={`Beyond the scales`} accessibilityRole={`header`} textStyle={[styles.heading, wide && styles.wideHeading]} />
        <View style={[styles.loreGrid, wide && styles.loreWide]} nativeID={`landing-lore-grid`}>
          {loreNotes.map((note, index) => (
            <View key={note.id} style={wide && styles.loreColumn} nativeID={`landing-lore-column-${note.id}`}>
              <Reveal id={`landing-lore-note-reveal-${note.id}`} delay={0.1 + index * 0.1}>
                <View style={styles.loreNote} nativeID={`landing-lore-note-${note.id}`}>
                  <Text style={styles.loreNumber} nativeID={`landing-lore-number-${note.id}`}>{note.number}</Text>
                  <Text style={styles.noteTitle} accessibilityRole={`header`} nativeID={`landing-lore-title-${note.id}`}>{note.title}</Text>
                  <Text style={styles.noteText} nativeID={`landing-lore-text-${note.id}`}>{note.text}</Text>
                </View>
              </Reveal>
            </View>
          ))}
        </View>
      </View>
      <View style={[styles.invitation, { paddingHorizontal: gutter }]} nativeID={`landing-invitation`}>
        <Reveal id={`landing-invitation-reveal`}>
          <View style={styles.invitationPanel} nativeID={`landing-invitation-panel`}>
            <View
              pointerEvents={`none`}
              accessibilityElementsHidden
              style={styles.invitationArtwork}
              importantForAccessibility={`no-hide-descendants`}
              nativeID={`landing-invitation-steel-container`}
            >
              <SvgXml
                accessible={false}
                width={`100%`}
                height={`100%`}
                preserveAspectRatio={`none`}
                nativeID={`landing-invitation-steel`}
                xml={themeArtwork(steelTextureXml)}
              />
            </View>
            {isDark ? <View pointerEvents={`none`} nativeID={`landing-invitation-steel-tint`} style={[styles.invitationArtwork, { opacity: 0.84, backgroundColor: palette.silver }]} /> : null}
            <View style={styles.invitationSword} nativeID={`landing-invitation-sword-container`}>
              <Artwork id={`landing-invitation-sword`} xml={wordmarkSwordXml} />
            </View>
            <Text style={[styles.eyebrow, { color: invitationInk }]} nativeID={`landing-invitation-eyebrow`}>The collection continues</Text>
            <TextReveal id={`landing-invitation-title`} text={`Every dragon has a story`} accessibilityRole={`header`} textStyle={[styles.heading, styles.centered, wide && styles.wideHeading, { color: invitationInk }]} />
            <Text style={styles.invitationCopy} nativeID={`landing-invitation-copy`}>Explore the forms. Learn the distinctions. Help shape the collection.</Text>
            <View style={[styles.actions, wide && styles.wideActions]} nativeID={`landing-invitation-actions`}>
              <Link href={routes.about.path} asChild>
                <Pressable accessibilityRole={`link`} nativeID={`landing-about-link`} style={({ pressed }) => [styles.link, styles.primaryLink, pressed && styles.pressed]}>
                  <Info size={18} color={palette.paper} accessibilityElementsHidden />
                  <Text style={[styles.linkLabel, styles.primaryLabel]} nativeID={`landing-about-link-label`}>About the archive</Text>
                </Pressable>
              </Link>
              <Link href={routes.contact.path} asChild>
                <Pressable accessibilityRole={`link`} nativeID={`landing-contact-link`} style={({ pressed }) => [styles.link, pressed && styles.pressed]}>
                  <Mail size={18} color={invitationInk} accessibilityElementsHidden />
                  <Text style={[styles.linkLabel, { color: invitationInk }]} nativeID={`landing-contact-link-label`}>Get in touch</Text>
                  <ArrowUpRight size={17} color={invitationInk} accessibilityElementsHidden />
                </Pressable>
              </Link>
            </View>
          </View>
        </Reveal>
      </View>
    </View>
  );
};

export default LandingSections;
