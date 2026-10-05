# Dragon Database — Hero Mockups v2

This round develops the preferred **Obsidian Codex** and **Armory** directions, reusing the selected [v7 Swordmaw Hybrid logo](../../logos/v7/01-db-swordmaw-hybrid.svg) unchanged. Both concepts add substantial illustrated dragon type cards and visible **Dragon Dictionary** links using the confirmed destination `/dragon-dictionary`.

[Open the local review gallery](index.html) · [Overview SVG](00-overview.svg) · [Overview PNG](00-overview.png)

## Concepts

| Direction | Changes | Desktop | Mobile |
| --- | --- | --- | --- |
| 01 — Obsidian Bestiary | Charcoal editorial hero and silver crest, new DragonSlapper display lettering, a Dictionary action beside Browse Dragons, and three illustrated type cards. | [SVG](01-obsidian-bestiary-desktop.svg) · [PNG](01-obsidian-bestiary-desktop.png) | [SVG](01-obsidian-bestiary-mobile.svg) · [PNG](01-obsidian-bestiary-mobile.png) |
| 02 — Armory Directory | Dark navigation around a silver archive workspace, a compact search hero, detailed dragon type cards, and a Dictionary navigation entry with a supporting panel. Retains Metal Mania display text for comparison. | [SVG](02-armory-directory-desktop.svg) · [PNG](02-armory-directory-desktop.png) | [SVG](02-armory-directory-mobile.svg) · [PNG](02-armory-directory-mobile.png) |

Desktop compositions are 1440 × 900. Mobile compositions are 390 × 844 and each show two substantial dragon type cards. The cards use original vector silhouettes of Wyvern, Wyrm, and Drake, traits, illustrative descriptions, and clear Explore actions. The taxonomy and copy remain proposed design content rather than populated application data.

Dictionary graphics are hyperlink elements in the standalone SVGs and target `/dragon-dictionary`. Image-based previews display their appearance; open the full SVG to interact with its links. The destination is a proposed app route; this round does not implement the Dictionary page or application routing.

## Font Exploration

[DragonSlapper font study SVG](03-dragon-slapper-study.svg) · [PNG](03-dragon-slapper-study.png)

The supplied 1001Fonts downloads are personal-use restricted. Research identified a separately licensed original **DragonSlapper** release by **Allison James (NAL)** on FontStruct. That exact source release is **CC BY-SA 3.0**, permits commercial use under its conditions, and is saved with its original notices and provenance in [assets/fonts/dragon-slapper-fontstruct/](../../../fonts/dragon-slapper-fontstruct/README.md). The font file is unchanged. Preserve attribution, a license link, applicable share-alike terms, and indicate adaptations when redistributing them.

DragonSlapper lettering in these SVGs is represented by outlined glyphs from the original font; those glyphs remain under CC BY-SA 3.0. Attribution and license information are retained in SVG metadata and this round's documentation. The typography study also includes visible credit. The selected v7 logo's Metal Mania wordmark is preserved, rather than replaced by the study.

**Credit:** DragonSlapper by Allison James (NAL), copyright 2013, via [FontStruct](https://www.fontstruct.com/fontstructions/show/830154/dragonslapper), licensed under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/). Original font file unchanged; glyphs outlined for these studies.

Dragon Hunter, Dragon Fire, and Blast Dragon have no confirmed free commercial app embedding grant from the supplied downloads; their files were not bundled or used. [The four-font audit](../../../fonts/FONT-LICENSES.md) records the sources and distinctions between logo licensing and live font embedding. [Opt-in font SCSS](../../../fonts/fonts.scss) is included for later adoption.

Alegreya Sans supplies body copy and controls. Metal Mania remains the logo's font and the Armory's display family; their existing [v7 font resources](../../logos/v7/fonts/README.md) retain the SIL Open Font License notices.

## Colors and Deliverables

Silver and black continue from the selected identity: `#101115` black, `#C5CBD3` steel, `#E4E7EB` pale silver, muted gray labels, and charcoal card/navigation surfaces. Individual sources contain each concept's exact palette.

The round includes outlined SVG artwork, desktop PNGs at 1440 × 900, mobile PNGs at 780 × 1688, a typography study, and the local gallery. Python authoring sources are in [source/](source/); they use FontTools and the licensed fonts already saved in the project. The included PNG export script uses Sharp. They are asset-authoring tools, not app dependencies.

No prior rounds, application code, or adopted brand files were changed. No tests, builds, or app UI checks were run. A further mockup round should use `assets/concepts/mockups/v3/`; logo rounds retain their independent version series.
