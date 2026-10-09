# Dragon Database — Crimson Detail v9

Adopted October 9, 2026 as the user-requested exact refinement of the current Swordslapper Classic identity. The original silhouette paths, DB monogram, DragonSlapper lettering, layout, sword contours and steel badge geometry are retained.

| File | Purpose |
| --- | --- |
| `01-db-swordslapper-crimson-detail.svg` | Full existing logo with one small silver dragon eye socket, a narrow muted-red eye, and subtle smears on the crossed swords and wordmark sword |
| `02-db-swordmaw-crimson-mark.svg` | Existing mark with the same eye and crossed-sword details, used in the header and app icons |
| `03-crimson-wordmark-sword.svg` | Existing horizontal sword with two tiny muted-red blade stains, used throughout the app |
| `app-icon.svg` / `app-icon.png` | Existing brushed-steel app icon badge containing the adopted mark |
| `adaptive-icon.svg` / `adaptive-icon.png` | Existing adaptive badge containing the adopted mark |
| `favicon.png` | Raster web favicon containing the adopted mark |

The accent is `#8d3038`, matching the light-theme red borders. The app's existing theme mapping changes it to `#d16a71` alongside dark-theme borders. Socket and blade details retain the existing silver `#C5CBD3`, pale silver `#E4E7EB` and ink `#101115` colors. The eye has one small dark pupil without glow; the blade marks are restrained flat vector smears.

The complete pre-adoption production SVGs, PNGs, favicons, shared SVG modules and generation scripts are preserved under `pre-adoption/`. Earlier logo and mockup rounds remain intact.

`source/refine_brand.py` produces the editable refinement directly from those archived production vectors and updates the adopted SVGs and shared XML exports. The regular brand and landing artwork generators reference this v9 source so regeneration retains these details. `scripts/create-app-icons.cjs` rasterizes the adopted icon SVGs into app/adaptive PNGs, web favicon PNG/ICO and Apple touch icon PNG; it is asset production only.

DragonSlapper by Allison James (NAL), copyright 2013, via [FontStruct](https://www.fontstruct.com/fontstructions/show/830154/dragonslapper), licensed under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/). Original font files and lettering outlines remain unchanged. Preserve the attribution, source/license links and applicable ShareAlike terms for the derived lettering. Independent dragon, sword and accent vectors retain their existing project treatment.

No tests, builds or app UI checks were run for this artwork refinement.
