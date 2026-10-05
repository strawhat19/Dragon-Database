# Dragon Database — The Scaling Collection Mockups v6

Three new compositions explore the selected **The Scaling Collection** heading with silver and black, subtle oxblood red, black flame silhouettes, and brushed-steel surfaces. The professional typography and compact Editorial header continue from v5, including underlined desktop navigation and a black Sign In control. The hero layout changes across this round.

[Local review gallery](index.html) · [Comparison SVG](00-overview.svg) · [Comparison PNG](00-overview.png)

| Direction | Composition | Desktop | Mobile |
| --- | --- | --- | --- |
| 01 — Crimson Foundry | Open silver hero, offset steel feature panel, black flames | [SVG](01-crimson-foundry-desktop.svg) · [PNG](01-crimson-foundry-desktop.png) | [SVG](01-crimson-foundry-mobile.svg) · [PNG](01-crimson-foundry-mobile.png) |
| 02 — Steel Masthead | Centered editorial heading, broad search, horizontal steel band | [SVG](02-steel-masthead-desktop.svg) · [PNG](02-steel-masthead-desktop.png) | [SVG](02-steel-masthead-mobile.svg) · [PNG](02-steel-masthead-mobile.png) |
| 03 — Obsidian Ledger | Charcoal hero, steel insert, silver dragon catalog | [SVG](03-obsidian-ledger-desktop.svg) · [PNG](03-obsidian-ledger-desktop.png) | [SVG](03-obsidian-ledger-mobile.svg) · [PNG](03-obsidian-ledger-mobile.png) |

All studies retain public search and browsing, three sample dragon type cards on desktop, and two on mobile. Controls and sample copy are static concept artwork. Black flames are decorative silhouettes; brushed steel uses editable gradients and fine horizontal strokes. Red stays confined to small accents.

## Palette and Typography

| Role | Color |
| --- | --- |
| Ink / black flames | `#101115` |
| Charcoal | `#17191D` |
| Matte silver | `#E8EBEF` |
| Paper | `#F4F5F7` |
| Steel | `#BEC6D0` |
| Oxblood accent | `#8D3038` |
| Secondary text | `#626B77` |

Steel gradients add controlled metallic highlights. **Alegreya Sans** supplies hero headings, interface copy, and controls. **DragonSlapper appears only in the unchanged [Swordslapper Classic transparent logo](../../logos/v8/01-db-swordslapper-classic-transparent.svg)**. The original DB dragon mark is reused without altering the selected identity. Existing font files remain unchanged.

**Logo lettering credit:** DragonSlapper by Allison James (NAL), Copyright Allison James 2013, from [FontStruct](https://www.fontstruct.com/fontstructions/show/830154/dragonslapper), licensed under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/). Retain attribution, notices, and applicable ShareAlike terms with the licensed outlined lettering. [Original font provenance](../../../fonts/dragon-slapper-fontstruct/README.md) · [Attribution](../../../fonts/dragon-slapper-fontstruct/ATTRIBUTION.md) · [v8 license notes](../../logos/v8/LICENSE-NOTES.md).

Alegreya Sans remains under the SIL Open Font License: [font resources and licenses](../../logos/v7/fonts/README.md). No new font downloads are required. The SVGs contain proportional outlined glyphs; the gallery uses the existing local font files with system fallbacks.

## Files and Editing

Desktop SVG frames are **1440 × 900**, with PNGs at the same size. Mobile SVG frames are **390 × 844**, with **780 × 1688** PNG exports. Each design adapts its material artwork and search hierarchy to the narrower frame.

The local gallery provides concept/device selectors, full-size SVG links, downloads, sticky review navigation, reduced-motion handling, and a scroll-to-top control. Its [SCSS](gallery.scss) and [CSS](gallery.css) are manually authored siblings; [JavaScript](gallery.js) handles the local preview controls.

Editable SVGs and authoring files in [source/](source/) retain the layouts, text, original dragon silhouettes, black flames, and material gradients. `materials.py` owns shared visual elements; `00_overview.py` produces the comparison board; `export-previews.cjs` saves the PNG artwork.

Earlier rounds, application code, selected logo sources, and fonts are preserved. This is a review round with no app adoption or publishing. No tests, builds, or UI checks were run.
