# v6 Typography Resources

The v5 wordmark uses original SVG letter paths and has no corresponding font family. The v6 wordmarks use glyph outlines from the bundled families below, with custom spacing and placement. Each family can reproduce the matching letterforms in live app text; the exported logo retains its own arrangement.

| Concept | Exact family | Real weight | Display modifier |
| --- | --- | --- | --- |
| Swordmaw Prime | Grenze | Black, 900 | `dragon-database-display--prime` |
| Swordmaw Flame | Grenze Gotisch | 900 on the variable `wght` axis | `dragon-database-display--flame` |
| Swordmaw Regalia | Metal Mania | Regular, 400 | `dragon-database-display--regalia` |
| Swordmaw Greatblade | Pirata One | Regular, 400 | `dragon-database-display--greatblade` |

Use Grenze 900 for the brand and major titles, Grenze 800 for supporting headings, and Alegreya Sans 400/500/700 for body text, controls, and labels. Grenze 400 is an optional same-family body direction. Metal Mania and Pirata One are expressive alternatives for short titles; their supplied faces use weight 400.

## Opt-In Usage

Load [typography.scss](typography.scss) through the app's Sass pipeline when a direction is adopted. It declares the nine packaged font faces and adds descriptive opt-in classes. Place `dragon-database-typography` on the intended container to supply shared custom properties, then apply typography classes to the relevant elements.

```html
<section
  id="dragon-brand-preview"
  class="dragon-database-typography"
>
  <h1
    id="dragon-brand-name"
    class="dragon-database-display dragon-database-display--prime"
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

| Role / class | Starting size | Family / weight | Line height |
| --- | --- | --- | --- |
| `dragon-database-display` | 44–72 px at a 16 px root; fluid | Selected display family / concept weight | 1.05 |
| `dragon-database-title` | 28–40 px at a 16 px root; fluid | Grenze / 800 | 1.15 |
| `dragon-database-body` | 1 rem | Alegreya Sans / 400 | 1.55 |
| `dragon-database-control` | 1 rem | Alegreya Sans / 500 | 1.3 |
| `dragon-database-label` | 0.9375 rem | Alegreya Sans / 700 | 1.3 |

Add `dragon-database-body--scholarly` alongside the body class to choose Grenze 400. Adjust the `--dragon-display-*`, `--dragon-title-*`, `--dragon-body-*`, and `--dragon-control-*` properties within your selected component scope. The label weight uses `--dragon-label-weight`. Display modifiers retain the real 400 weight for Metal Mania and Pirata One, and the opt-in typography classes disable synthetic bold and italic.

Font URLs are relative to `typography.scss` under `./fonts/`. Preserve that relationship in the generated CSS or let the app's asset pipeline rewrite the URLs. Grenze Gotisch declares the full variable range `100 900`; its bracketed filename is percent-encoded in the URL. No global body style or application adoption is included.

## Sources and Licenses

[The font inventory](fonts/README.md) lists every file, original download URL, attribution, and accompanying SIL Open Font License 1.1. Keep each family's `OFL.txt` with redistributed font files.

Official Google Fonts metadata: [Grenze](https://raw.githubusercontent.com/google/fonts/main/ofl/grenze/METADATA.pb), [Grenze Gotisch](https://raw.githubusercontent.com/google/fonts/main/ofl/grenzegotisch/METADATA.pb), [Metal Mania](https://raw.githubusercontent.com/google/fonts/main/ofl/metalmania/METADATA.pb), [Pirata One](https://raw.githubusercontent.com/google/fonts/main/ofl/pirataone/METADATA.pb), [Alegreya Sans](https://raw.githubusercontent.com/google/fonts/main/ofl/alegreyasans/METADATA.pb). Static Grenze files come from its [official upstream TTF directory](https://github.com/Omnibus-Type/Grenze/tree/master/fonts/ttf).

These are reusable concept resources. No application styles were changed, and no tests, builds, or application UI checks were run.
