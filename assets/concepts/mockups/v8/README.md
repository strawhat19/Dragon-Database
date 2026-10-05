# Dragon Database — Integrated Steel Hero Mockups v8

Three variations of the selected full-bleed Steel Masthead place **The Scaling Collection inside the brushed-steel banner**. The compact Editorial header, black Sign In, curling black flames, flying dragon silhouettes, and custom scale-and-eye lettering continue from v7. The title is part of the banner artwork in every design.

[Local review gallery](index.html) · [Comparison SVG](00-overview.svg) · [Comparison PNG](00-overview.png)

| Direction | Banner composition | Desktop | Mobile |
| --- | --- | --- | --- |
| 01 — Centered Steel | Centered emblem above the title; search below steel | [SVG](01-centered-steel-desktop.svg) · [PNG](01-centered-steel-desktop.png) | [SVG](01-centered-steel-mobile.svg) · [PNG](01-centered-steel-mobile.png) |
| 02 — Emblem & Title | Emblem beside an editorial title; search below steel | [SVG](02-emblem-title-desktop.svg) · [PNG](02-emblem-title-desktop.png) | [SVG](02-emblem-title-mobile.svg) · [PNG](02-emblem-title-mobile.png) |
| 03 — Search in Steel | Title, search, and browsing controls inside steel | [SVG](03-search-in-steel-desktop.svg) · [PNG](03-search-in-steel-desktop.png) | [SVG](03-search-in-steel-mobile.svg) · [PNG](03-search-in-steel-mobile.png) |

Each concept has a full-width banner beneath the header with breathing space, public archive search, three sample type cards on desktop, and two on mobile. Controls and copy are static review artwork. Layouts adapt to the narrower frame.

## Materials and Typography

The steel-and-black palette keeps matte silver `#E8EBEF`, paper `#F4F5F7`, black `#101115`, steel `#BEC6D0`, secondary text `#626B77`, and subtle oxblood `#8D3038`. Brushed-metal gradients and fine horizontal strokes remain editable SVG elements. The edge flames use flowing curves and transparent cuts, with small original flying dragon silhouettes above the tips.

**Alegreya Sans** supplies normal interface text and the outlined heading. Scaling's capital **S** retains clipped steel scale details; both **o** letters in Collection retain silver slit-pupil dragon eyes. This artwork reuses the v7 heading decoration without changing the original font. [Existing lettering close-up SVG](../v7/03-heading-detail.svg) · [PNG](../v7/03-heading-detail.png).

The [Swordslapper Classic transparent logo](../../logos/v8/01-db-swordslapper-classic-transparent.svg) and original DB mark are reused unchanged. DragonSlapper appears only in the existing logo. **Logo lettering credit:** DragonSlapper by Allison James (NAL), Copyright Allison James 2013, from [FontStruct](https://www.fontstruct.com/fontstructions/show/830154/dragonslapper), licensed under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/). Retain attribution, notices, and applicable ShareAlike terms with the licensed outlined lettering. [Font provenance](../../../fonts/dragon-slapper-fontstruct/README.md) · [Attribution](../../../fonts/dragon-slapper-fontstruct/ATTRIBUTION.md) · [v8 logo license notes](../../logos/v8/LICENSE-NOTES.md).

Alegreya Sans retains its SIL Open Font License: [existing resources](../../logos/v7/fonts/README.md). All font files remain unchanged, and the gallery uses existing local font assets with system fallbacks.

## Files and Editing

Desktop SVG frames are **1440 × 900**, with PNGs at the same size. Mobile SVG frames are **390 × 844**, with **780 × 1688** PNG exports. SVG glyphs are outlined for consistent local review.

The [gallery](index.html) provides concept/device selectors, full-size SVG links, and SVG/PNG downloads. It retains sticky review navigation, reduced-motion handling, a scroll-to-top control, and the current-year Piratechs footer. [SCSS](gallery.scss) and [CSS](gallery.css) are manually authored siblings; [JavaScript](gallery.js) handles local preview selection.

Editable artwork and authoring files live in [source/](source/). [banner_stage.py](source/banner_stage.py) shares the full-width steel backdrop and edge artwork; [lettering.py](source/lettering.py) supplies the decorated heading. The three layout scripts are [01_centered_steel.py](source/01_centered_steel.py), [02_emblem_title.py](source/02_emblem_title.py), and [03_search_in_steel.py](source/03_search_in_steel.py). Comparison and PNG authoring are saved alongside them.

Earlier rounds, app code, selected logo sources, and font files are preserved. This is a static design round with no app adoption or publishing. No tests, builds, or UI checks were run.
