# Dragon Database Swordmaw and Typography Concepts

Four new developments of the selected [DB Swordmaw from v5](../v5/02-db-swordmaw-mark.svg), created on October 5, 2026. The crossed swords, fierce dragon profile, DB letterforms, and silver-and-black palette remain central. This round also explores four wordmarks based on real font families that can be used for live text throughout the app.

The v5 lettering was custom SVG path artwork with no corresponding font family. The new wordmarks use actual glyphs from the bundled fonts, with custom spacing, sizing, and the sword underline. Their letterforms match those font families, while the logo composition remains an editable graphic.

Open [00-concept-sheet.png](00-concept-sheet.png) to compare the logos and [09-typography-sheet.png](09-typography-sheet.png) to compare font samples, alphabets, numbers, and the proposed interface companion. Both sheets also have editable SVG sources.

| Concept | Full Logo | Standalone Mark | Wordmark and Font | Direction |
| --- | --- | --- | --- | --- |
| DB Swordmaw Prime | [01-db-swordmaw-prime.svg](01-db-swordmaw-prime.svg) | [01-db-swordmaw-prime-mark.svg](01-db-swordmaw-prime-mark.svg) | [Grenze Black 900](05-wordmark-grenze.svg) | The closest refinement of the favorite, with roomier DB counters, a sharper horn, a broader jaw, and slimmer crossed blades. |
| DB Swordmaw Flame | [02-db-swordmaw-flame.svg](02-db-swordmaw-flame.svg) | [02-db-swordmaw-flame-mark.svg](02-db-swordmaw-flame-mark.svg) | [Grenze Gotisch 900](06-wordmark-grenze-gotisch.svg) | A steeper sword arrangement with curling black flames and stronger medieval lettering. |
| DB Swordmaw Regalia | [03-db-swordmaw-regalia.svg](03-db-swordmaw-regalia.svg) | [03-db-swordmaw-regalia-mark.svg](03-db-swordmaw-regalia-mark.svg) | [Metal Mania 400](07-wordmark-metal-mania.svg) | Slender ceremonial blades, curved guards, a scalloped wing, and irregular expressive lettering. |
| DB Swordmaw Greatblade | [04-db-swordmaw-greatblade.svg](04-db-swordmaw-greatblade.svg) | [04-db-swordmaw-greatblade-mark.svg](04-db-swordmaw-greatblade-mark.svg) | [Pirata One 400](08-wordmark-pirata-one.svg) | Broad claymore blades, angular guards, an armored wing, and compact gothic lettering. |

## App Typography

My recommended starting point is **Grenze 900 or 800 for titles** and **Alegreya Sans 400, 500, and 700 for body text, navigation, labels, controls, and table data**. Grenze 400 is included for a single-family direction. The other three display families provide more decorative heading options.

The font files and their original licenses are in [fonts/](fonts/README.md). [TYPOGRAPHY.md](TYPOGRAPHY.md) describes weights, roles, and usage. [typography.scss](typography.scss) includes font-face declarations, scoped variables, and opt-in classes. These are resources for review and later adoption; application styles have not been changed.

The font specimens use outlines from the actual bundled files. Full wordmarks and standalone wordmarks are outlined so their appearance does not depend on fonts installed in the viewer. To use the matching typography as editable app text, load the included font files and select the family and weight listed above. Keep the accompanying license files when distributing the fonts.

## Artwork Files

Full logos have a `960 × 360` viewBox and the requested silver background; PNG exports are `1920 × 720`. Standalone marks have transparent surrounding canvases and a `360 × 360` viewBox, with `1024 × 1024` PNG exports. Standalone wordmarks have silver backgrounds with `1644 × 960` PNG exports. Every PNG shares its SVG filename.

The palette remains black `#101115`, silver `#C5CBD3`, and pale silver `#E4E7EB`; background gradients also include cool silver `#B9C1CC`. All SVGs contain accessible titles and descriptions and descriptive IDs. Preserve the internal masks and definitions with the mark groups when moving them so the swords stay clear of the DB counters.

All five prior rounds are preserved. No application code or adopted assets were changed. No tests, builds, or application UI checks were run.

## Next Round

Use `assets/concepts/logos/v7/` for another requested logo round. Preserve previous concepts, keep requested mockups in the independent `assets/concepts/mockups/vN/` series, and adopt a concept or app typography only when requested.
