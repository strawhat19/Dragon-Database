# Font Assets

[The license audit](FONT-LICENSES.md) covers the four fonts supplied on October 5, 2026.

The original **DragonSlapper** release by Allison James (NAL) is saved in [dragon-slapper-fontstruct/](dragon-slapper-fontstruct/README.md). This specific FontStruct source release is CC BY-SA 3.0; it is distinct from the personal-use package at the supplied 1001Fonts URL. Preserve its attribution, original notices, and applicable share-alike license conditions. The TTF is unchanged.

[fonts.scss](fonts.scss) provides an opt-in `@font-face` declaration and display class using the real family name, `DragonSlapper`, at weight 400. Import it through an app's supported Sass pipeline when adopting the font; no application stylesheet imports it yet. Keep the relative font path or let the asset pipeline resolve it.

Dragon Hunter, Dragon Fire, and Blast Dragon require additional licensing for commercial app use. Their restricted font files were not added. Sources and embedding distinctions are in the audit.

The existing licensed [v7 typography resources](../concepts/logos/v7/TYPOGRAPHY.md) contain Metal Mania and Alegreya Sans. Those families continue to supply the selected logo and readable body/control text in the mockups.
