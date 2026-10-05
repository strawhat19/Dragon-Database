# v7 Typography

Metal Mania Regular 400 is the selected brand and title family for Swordmaw Hybrid, Swordmaw Crowned, and Swordmaw Forged. Alegreya Sans 400/500/700 supplies body copy, controls, and labels. The included font files and licenses make this folder reusable independently of earlier concept rounds.

The logo wordmarks use unchanged Metal Mania glyph outlines. Their uniform size and custom letter spacing align the visible text widths with the horizontal sword. That alignment belongs to the exported logo layout. Live text uses the same family and letterforms, with spacing appropriate to its context; the opt-in classes supply starting values rather than impose sword alignment on app text.

| Role / opt-in class | Family / real weight | Starting size | Line height |
| --- | --- | --- | --- |
| `dragon-database-display` | Metal Mania / 400 | 44–72 px at a 16 px root; fluid | 1.05 |
| `dragon-database-title` | Metal Mania / 400 | 28–40 px at a 16 px root; fluid | 1.15 |
| `dragon-database-body` | Alegreya Sans / 400 | 1 rem | 1.55 |
| `dragon-database-control` | Alegreya Sans / 500 | 1 rem | 1.3 |
| `dragon-database-label` | Alegreya Sans / 700 | 0.9375 rem | 1.3 |

## Usage and Files

Load [typography.scss](typography.scss) through the app's Sass pipeline when adopting the identity. Place `dragon-database-typography` on the intended container, then apply the role classes to individual elements. The stylesheet declares four bundled faces and scoped custom properties; it includes no global body styling or app integration. Synthetic bold and italic are disabled on the role classes. Keep Metal Mania at its supplied 400 weight.

```html
<section
  id="dragon-brand-preview"
  class="dragon-database-typography"
>
  <h1
    id="dragon-brand-name"
    class="dragon-database-display"
  >
    Dragon Database
  </h1>
  <p
    id="dragon-brand-description"
    class="dragon-database-body"
  >
    Explore the dragon archive.
  </p>
</section>
```

Font sources resolve from `./fonts/` relative to `typography.scss`:

- `metal-mania/MetalMania-Regular.ttf` — Metal Mania Regular 400.
- `alegreya-sans/AlegreyaSans-Regular.ttf` — Alegreya Sans Regular 400.
- `alegreya-sans/AlegreyaSans-Medium.ttf` — Alegreya Sans Medium 500.
- `alegreya-sans/AlegreyaSans-Bold.ttf` — Alegreya Sans Bold 700.

Preserve that folder relationship in generated CSS or let the app's asset pipeline rewrite the URLs. Custom properties under `--dragon-display-*`, `--dragon-title-*`, `--dragon-body-*`, and `--dragon-control-*` let individual components adjust typography. Label weight uses `--dragon-label-weight`.

[The font inventory](fonts/README.md) retains official download links, attribution, and licenses. Primary metadata: [Metal Mania](https://raw.githubusercontent.com/google/fonts/main/ofl/metalmania/METADATA.pb) and [Alegreya Sans](https://raw.githubusercontent.com/google/fonts/main/ofl/alegreyasans/METADATA.pb). Keep each family's `OFL.txt` with redistributed font files.

No application integration, compilation, app UI checks, or tests were performed.
