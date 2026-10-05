# Dragon Database — Hero Mockups v1

The first landing page mockup round uses the selected [v7 Swordmaw Hybrid logo](../../logos/v7/01-db-swordmaw-hybrid.svg). All three directions explore the header and hero above the fold, in silver and black. The logo artwork is reused unchanged; its lettering remains provisional while the surrounding identity develops.

Open [the local review gallery](index.html) to switch between the concepts and their desktop/mobile compositions. These are static design studies, with editable vector sources and PNG previews. The gallery controls switch artwork; the navigation, search fields, and buttons within each mockup describe proposed app UI.

## Directions

| Concept | Idea | Desktop | Mobile |
| --- | --- | --- | --- |
| 01 — Obsidian Codex | A dramatic charcoal split hero with large fantasy lettering and the dragon mark on a silver crest. | [SVG](01-obsidian-codex-desktop.svg) · [PNG](01-obsidian-codex-desktop.png) | [SVG](01-obsidian-codex-mobile.svg) · [PNG](01-obsidian-codex-mobile.png) |
| 02 — Silver Atlas | A brighter, centered composition with the full logo, editorial spacing, a prominent search field, and lineage shortcuts. | [SVG](02-silver-atlas-desktop.svg) · [PNG](02-silver-atlas-desktop.png) | [SVG](02-silver-atlas-mobile.svg) · [PNG](02-silver-atlas-mobile.png) |
| 03 — The Armory | A dark navigation shell around a silver archive workspace, emphasizing search and illustrated directory cards. | [SVG](03-the-armory-desktop.svg) · [PNG](03-the-armory-desktop.png) | [SVG](03-the-armory-mobile.svg) · [PNG](03-the-armory-mobile.png) |

[Overview SVG](00-overview.svg) · [Overview PNG](00-overview.png)

## Design Decisions

- Public dragon discovery is the primary action. Account access is secondary.
- Metal Mania supplies fantasy display lettering; Alegreya Sans keeps descriptions, navigation, and controls readable. Both families come from the licensed [v7 font resources](../../logos/v7/fonts/README.md).
- Each concept includes the full selected lockup. Secondary mark-only placements reuse the original dragon/sword group from that same SVG.
- Mobile compositions rearrange content for a 390 × 844 frame rather than shrink the desktop artwork.
- Copy about dragon lineages, lore, and collections is illustrative. Wyvern, Wyrm, and Drake are sample directory categories, not a defined product schema or populated database. No live counts or testimonials are claimed.
- The scope is above-the-fold exploration. Further pages, scroll behavior, routes, and app integration can follow a selected direction.

## Palette

| Role | Colors |
| --- | --- |
| Black and charcoal | `#101115`, near-black navigation and background tones |
| Silver | `#C5CBD3`, `#DDE2E8` |
| Pale silver | `#E4E7EB`, `#EEF0F3` |
| Mid-gray | Muted labels, borders, and etched details |

Individual SVGs retain each concept's exact color values. The brighter Silver Atlas direction uses black text and controls on a silver surface; the dark directions balance silver panels with pale text on charcoal.

## Files and Editing

Desktop SVGs are 1440 × 900. Mobile SVGs are 390 × 844. Desktop PNGs export at 1440 × 900; mobile PNGs export at 780 × 1688. Artwork contains accessible titles/descriptions and outlined font glyphs, so the previews need no installed fonts.

The authoring scripts keep text, coordinates, layout, and colors editable:

- [Obsidian Codex source](source/01_obsidian_codex.py)
- [Silver Atlas source](source/02_silver_atlas.py)
- [The Armory source](source/03_the_armory.py)
- [Shared vector helpers](source/artwork.py)
- [Overview source](source/00_overview.py)
- [PNG export source](source/export-previews.cjs)

The Python authoring scripts use FontTools and the existing v7 font files. The PNG export script uses Sharp. These are asset-authoring tools, not application dependencies. The gallery has no runtime dependencies or external network requests; [SCSS](gallery.scss), [CSS](gallery.css), and [JavaScript](gallery.js) are included for editing.

No existing logo rounds, app code, or adopted implementation assets were changed. No tests, builds, or app UI checks were run. Future mockup rounds should use `assets/concepts/mockups/v2/`; logo versions remain an independent series.
