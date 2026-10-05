# Font Assets

[The license audit](FONT-LICENSES.md) covers the four fonts supplied on October 5, 2026.

The original **DragonSlapper** release by Allison James (NAL) is saved in [dragon-slapper-fontstruct/](dragon-slapper-fontstruct/README.md). This specific FontStruct source release is CC BY-SA 3.0; it is distinct from the personal-use package at the supplied 1001Fonts URL. Preserve its attribution, original notices, and applicable share-alike license conditions. The TTF is unchanged.

[useAppFonts.ts](../../src/shared/useAppFonts.ts) loads the original TTF through Expo Font under the exact family name `DragonSlapper`. Web display styles use `--font-brand`; native display text uses the same family name. The font has one Regular face, used at weight 400 without synthetic bold. [fonts.scss](fonts.scss) remains an optional standalone Sass declaration; the app uses its Expo Font loader instead of duplicating that declaration.

The footer credits Allison James (NAL), FontStruct, and CC BY-SA 3.0, and provides Font Notices. Web notices live in [public/notices/fonts/](../../public/notices/fonts/font-notices.txt), alongside unchanged copies of DragonSlapper's original license, readme, attribution, and source archive and Alegreya Sans's OFL. Native Font Notices includes the original notice text through [fontNotices.ts](../../src/shared/fontNotices.ts), making it readable offline. Preserve these notices and the original archive when redistributing the font.

Dragon Hunter, Dragon Fire, and Blast Dragon require additional licensing for commercial app use. Their restricted font files were not added. Sources and embedding distinctions are in the audit.

The selected Swordslapper Classic logo uses the original DragonSlapper glyphs. Alegreya Sans supplies readable body and control text. The earlier [v7 typography resources](../concepts/logos/v7/TYPOGRAPHY.md), including Metal Mania, remain preserved as historical design concepts.
