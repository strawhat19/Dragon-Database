# Dragon Database — Steel Masthead Mockups v7

Two continuations of the selected v6 Steel Masthead move a wide brushed-steel banner immediately below the preserved Editorial header, with breathing space. The inset version keeps silver side margins; the full-bleed version extends the steel across the frame. Both retain the original Classic logo, underlined desktop navigation, solid black Sign In, public search, and illustrated dragon type cards.

[Local review gallery](index.html) · [Comparison SVG](00-overview.svg) · [Comparison PNG](00-overview.png)

| Direction | Banner | Desktop | Mobile |
| --- | --- | --- | --- |
| 01 — Steel Masthead — Inset | Steel framed by open silver margins | [SVG](01-steel-masthead-inset-desktop.svg) · [PNG](01-steel-masthead-inset-desktop.png) | [SVG](01-steel-masthead-inset-mobile.svg) · [PNG](01-steel-masthead-inset-mobile.png) |
| 02 — Steel Masthead — Full Bleed | Steel spans the full canvas width | [SVG](02-steel-masthead-fullbleed-desktop.svg) · [PNG](02-steel-masthead-fullbleed-desktop.png) | [SVG](02-steel-masthead-fullbleed-mobile.svg) · [PNG](02-steel-masthead-fullbleed-mobile.png) |

New black flames curl across the metal; small flying dragon silhouettes sit above the flame tips. The heading has a scaled **S** in **Scaling** and steel-and-black slit-pupil eyes in both **o** letters of **Collection**. These details are editable outlined artwork using the unchanged original Alegreya Sans font. Normal interface text remains clean Alegreya Sans.

View the scale and eye artwork at larger size: [Heading detail SVG](03-heading-detail.svg) · [Heading detail PNG](03-heading-detail.png), authored in [03_heading_detail.py](source/03_heading_detail.py).

## Palette and Font Credits

The palette continues matte silver `#E8EBEF`, paper `#F4F5F7`, brushed steel `#BEC6D0`, ink and flames `#101115`, secondary text `#626B77`, and restrained oxblood `#8D3038`. Editable gradients and fine strokes provide the steel finish.

The exact preserved logo source is [v8 Swordslapper Classic transparent SVG](../../logos/v8/01-db-swordslapper-classic-transparent.svg). **DragonSlapper appears only in this existing header logo.** DragonSlapper by Allison James (NAL), Copyright Allison James 2013, is the original [FontStruct release](https://www.fontstruct.com/fontstructions/show/830154/dragonslapper) under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/). Keep its attribution, notices, and applicable ShareAlike terms with the licensed outlined lettering. [Font provenance](../../../fonts/dragon-slapper-fontstruct/README.md) · [Attribution](../../../fonts/dragon-slapper-fontstruct/ATTRIBUTION.md) · [v8 license notes](../../logos/v8/LICENSE-NOTES.md).

**Alegreya Sans** interface resources retain the SIL Open Font License: [existing font files and licenses](../../logos/v7/fonts/README.md). Custom heading decorations live in the outlined artwork; use Alegreya Sans for normal live text. Existing font files remain unchanged, with no new font adoption or downloads.

## Files and Editing

Desktop SVGs are **1440 × 900**, with matching PNG exports. Mobile SVGs are **390 × 844**, with **780 × 1688** PNG exports. SVG text is outlined for consistent local review.

The [gallery](index.html) switches static artwork and links to full-size SVGs and SVG/PNG downloads. It works from local files, uses bundled font resources without remote requests, and retains accessible controls, sticky review navigation, reduced-motion handling, a scroll-to-top button, and the current-year Piratechs footer. [SCSS](gallery.scss) and [CSS](gallery.css) are manually authored siblings; [JavaScript](gallery.js) handles preview selection.

Editable files live in [source/](source/): [banner.py](source/banner.py) owns banner artwork, [lettering.py](source/lettering.py) owns heading decoration, [masthead.py](source/masthead.py) shares layouts, and [01_steel_masthead_inset.py](source/01_steel_masthead_inset.py) and [02_steel_masthead_fullbleed.py](source/02_steel_masthead_fullbleed.py) author the two SVG pairs.

This is a static review round. Layouts and copy remain provisional; earlier rounds, application code, logos, and font files are preserved. No app integration or publishing was performed. No tests, builds, or UI checks were run.
