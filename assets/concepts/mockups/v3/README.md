# Dragon Database — Silver Codex Mockups v3

This round combines the selected [Swordslapper Classic underline logo](../../logos/v8/01-db-swordslapper-classic.svg), Armory's silver-and-black palette, and Obsidian Codex's editorial hero composition. The full selected logo is embedded unchanged, including its DragonSlapper wordmark and horizontal sword.

[Open the local review gallery](index.html) · [Overview SVG](00-overview.svg) · [Overview PNG](00-overview.png)

## Design Directions

| Concept | Direction | Desktop | Mobile |
| --- | --- | --- | --- |
| 01 — Silver Codex | The closest direct blend: large fantasy display text on pale silver, a charcoal header, a framed dragon crest, and silver type cards. | [SVG](01-silver-codex-desktop.svg) · [PNG](01-silver-codex-desktop.png) | [SVG](01-silver-codex-mobile.svg) · [PNG](01-silver-codex-mobile.png) |
| 02 — Ironbound Archive | A raised silver editorial hero inside a charcoal shell, with the dragon crest and layered silver type cards. | [SVG](02-ironbound-archive-desktop.svg) · [PNG](02-ironbound-archive-desktop.png) | [SVG](02-ironbound-archive-mobile.svg) · [PNG](02-ironbound-archive-mobile.png) |
| 03 — Splitsteel Bestiary | An asymmetric silver-and-charcoal composition, balancing strong hero copy with a dramatic framed crest and illustrated cards. | [SVG](03-splitsteel-bestiary-desktop.svg) · [PNG](03-splitsteel-bestiary-desktop.png) | [SVG](03-splitsteel-bestiary-mobile.svg) · [PNG](03-splitsteel-bestiary-mobile.png) |

All three are above-the-fold landing page studies. Navigation focuses on Dragons, Collections, and Lore. Public browsing remains the primary action, with account access secondary. Type cards show original Wyvern, Wyrm, and Drake silhouettes, illustrative traits, short descriptions, and Explore actions. The sample categories and copy are design content rather than a defined database schema or populated records.

## Palette and Typography

| Role | Color |
| --- | --- |
| Black | `#101115` |
| Charcoal chrome | `#191B20` |
| Steel | `#C5CBD3` |
| Pale silver | `#E4E7EB` |
| Card paper | `#F5F6F8` |
| Illustration surface | `#D2D7DF` |
| Borders | `#B7BEC8` |
| Muted text | `#5B626C` |

DragonSlapper Regular supplies the selected logo and fantasy display text. Alegreya Sans supplies navigation, descriptions, and controls. Font shapes remain proportional; SVG glyphs are outlined so no installed fonts are required to view the artwork.

**Font credit:** DragonSlapper by Allison James (NAL), copyright 2013, via [FontStruct](https://www.fontstruct.com/fontstructions/show/830154/dragonslapper), licensed under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/). The original font file is unchanged; included outlined glyphs retain that license. Preserve attribution, license notices, and applicable ShareAlike terms with redistribution. [Font resources and provenance](../../../fonts/dragon-slapper-fontstruct/README.md) · [Selected logo licensing notes](../../logos/v8/LICENSE-NOTES.md).

Alegreya Sans and its SIL Open Font License notices remain in the [v7 font resources](../../logos/v7/fonts/README.md).

## Files and Editing

Desktop SVGs use 1440 × 900 frames and export at the same PNG size. Mobile SVGs use 390 × 844 frames and export PNGs at 780 × 1688. Each mobile composition rearranges the hero and includes two substantial type cards.

The gallery switches among concepts and device frames, and links to full-size SVGs and PNG downloads. It is a local review viewer for static artwork. It has no dependencies or remote font requests. The included SCSS and CSS are editable siblings rather than an adopted application stylesheet.

Python sources in [source/](source/) keep layout, copy, colors, and artwork editable. They use FontTools, the saved fonts, and the selected logo source. The included PNG export script uses Sharp; these are asset-authoring tools, not app dependencies.

No prior rounds, logo files, fonts, or application code were changed. No tests, builds, or app UI checks were run. A future mockup round should use `assets/concepts/mockups/v4/`; logo versions remain independent.
