# Dragon Database

Dragon Database is an Expo 57 frontend for web, iOS, and Android. This implementation contains the public landing page at `/`, About at `/about`, Contact at `/contact`, and a startup page loader. It adopts the selected Search in Steel direction: a silver Editorial header, full-width brushed-steel hero, DragonSlapper **Dragon Database** title, the original wordmark sword, decorated **The Scaling Collection** subheading, angular black flames, flying dragons, and seven dragon type cards with original anatomy graphics and short descriptions. Anatomy field notes, lore themes, and a collection invitation give the landing page more depth below the catalogue.

The search field spans the hero's content width, with its submit control inside the field. The separate Explore/Browse button is removed. Search and type-card filters operate within the landing page. Dragons returns to the landing page; About and Contact open their own public pages through the header and footer. Collections, Lore, API, Blog, and Sign In remain placeholders. There are no account forms, backend requests, Firebase integration, or real Google authentication. The local service boundary is prepared for a later Firebase/Google connection.

The Contact page includes name, email, subject, and message fields with local validation. Submitting a valid form reports that the message has not been sent because the form is not connected; entered fields stay intact. Messages are not persisted, emailed, or sent to any service. The About page introduces the collection's forms, traits, and lore. Both pages share the steel page shell, typography, and motion settings. Conventional aliases such as `/about-us` and `/contact-us` redirect to the canonical routes; other registered aliases are in [src/shared/routes.ts](src/shared/routes.ts).

Use **Node 24 LTS**, with the recommended **24.19.0** project pin in [.nvmrc](.nvmrc) and [.node-version](.node-version). Dependencies and scripts are declared in [package.json](package.json); Expo configuration is in [app.json](app.json).

If you use nvm, select the project version before starting:

```sh
nvm install
nvm use
```

```sh
npm install
npm run web
```

Other available commands:

| Command | Purpose |
| --- | --- |
| `npm run ios` | Start Expo for an iOS development target |
| `npm run android` | Start Expo for an Android development target |
| `npm run export:web` | Generate the static web export |

These commands are documented for local use. No app startup, export, tests, builds, or UI checks were run as part of this implementation. Dependency installation is separate from runtime validation. Expo's [Metro configuration guide](https://docs.expo.dev/versions/latest/config/metro/) and [static rendering guide](https://docs.expo.dev/router/web/static-rendering/) informed the setup.

The root layout composes SafeAreaProvider, ThemeProvider, AuthProvider, DragonDataProvider, and AppShell. Thin route files render component entrypoints. Components keep platform views, hooks, Sass, and native styles in their own folders; shared models and services own data behavior.

| Boundary | Source | Behavior |
| --- | --- | --- |
| Configuration | [src/shared/config.ts](src/shared/config.ts) | `useLocalStorage = true`, `useSampleData = true` |
| Storage | [src/shared/common/storage.ts](src/shared/common/storage.ts) | Versioned, namespaced JSON; browser localStorage and device AsyncStorage adapters; serialized operations and browser Web Locks where available |
| Models | [src/shared/models/](src/shared/models/) | `Data.toRecord()` returns plain JSON-compatible records; app-owned IDs use `Type_Number_Name_Date_UUID` with matching numbers |
| Local API | [src/api/](src/api/) | Asynchronous health/status, capability directory, users, notifications, visits, dragon types, and search operations |
| Authentication | [src/shared/authentication/](src/shared/authentication/) · [AuthContext](src/shared/authContext/AuthContext.tsx) | Explicit `signInWithGoogleMock` demo method, separate per-account session storage, hydration, expiry, and sign-out; no passwords, tokens, or OAuth |
| Dragon data | [DragonDataContext](src/shared/dragonDataContext/DragonDataContext.tsx) | Public catalog, filtered records, persisted query, hydration/error state, and reload |

The optional sample module supplies **Wyvern, Wyrm, Drake, Dragon, Amphiptere, Leviathan, and Dragonoid**. Dragonoids are dragon-human hybrids. Samples seed a missing catalogue snapshot. A one-time demo revision adds the four new forms to a recognizable original sample catalogue, preserving its saved records and allocating new matching IDs/numbers from its existing counter. Empty or unrelated custom catalogues stay untouched; malformed or unsupported snapshots remain preserved and expose an error. Users, notifications, and visits are not populated with invented activity. Public user reads return eligible display projections; private session data stays separate.

Live search matches names, descriptions, traits, and search terms locally. Query changes persist after a 300 ms debounce and restore on the next launch. Storage failures are exposed to the contexts; disabling local storage without connecting a replacement service reports a connection-needed error. The capability registry describes local service operations rather than published HTTP endpoints.

The [startup loader](src/components/PageLoader/) follows actual font initialization, session hydration, and catalog hydration milestones. It smooths the displayed percentage, holds a short minimum presentation of about 1.4 seconds, settles at 100%, and exits into the page. Its progress bar uses the exact selected wordmark sword, with a black flame at the advancing edge and a flame curtain that reveals the ready page beneath it. The underlying page stays inaccessible until the transition completes. Web digits use velocity-driven SVG blur; native digits use a faint ghost trail. Reduced-motion preferences shorten the presentation and use a simple fade. [Reveal](src/components/Reveal/) supplies masked content entrances, while [TextReveal](src/components/TextReveal/) staggers hero characters and section words on web and native. The landing page retains sticky header behavior, a scroll-to-top control, and a current-year Piratechs footer.

The following local projects informed the implementation:

| Reference | Local project | Relevant patterns |
| --- | --- | --- |
| Domains Database | [/Applications/XAMPP/xamppfiles/htdocs/apps/Library/Database/Domains-Database](/Applications/XAMPP/xamppfiles/htdocs/apps/Library/Database/Domains-Database) | `src/shared/models/Data.ts`, `common/storage.ts`, `authContext/AuthContext.tsx`, `domainContext/DomainContext.tsx`, and `components/AppShell/useAppShell.ts`: model serialization, shared contexts, and service boundaries |
| Directory Directory | [/Applications/XAMPP/xamppfiles/htdocs/apps/Library/Database/Directory-Directory](/Applications/XAMPP/xamppfiles/htdocs/apps/Library/Database/Directory-Directory) | `src/components/LandingPage/`, `SiteHeader/`, `ScrollToTop/`, and `src/shared/auth/authStorage.web.ts` / `authStorage.ts`: responsive platform views, Sass, and browser/device persistence |
| Forge | [/Applications/XAMPP/xamppfiles/htdocs/apps/Library/Clients/MJ/Forge](/Applications/XAMPP/xamppfiles/htdocs/apps/Library/Clients/MJ/Forge) | `src/app/components/loaders/forge-loader/forge-loader.tsx`, `effects/counter.tsx`, `text-reveal.tsx`, `element-reveal.tsx`, and `src/styles/_loader.scss`: loader presentation, velocity blur, and reveal timing |

Font assets are bundled locally and the original font files remain unchanged. **DragonSlapper** by **Allison James (NAL)**, Copyright Allison James 2013, supplies the Classic logo lettering, main title, card titles, and additional display headings in its original Regular face. This saved original [FontStruct release](https://www.fontstruct.com/fontstructions/show/830154/dragonslapper) is licensed under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/). Retain its attribution, original notices, and applicable ShareAlike terms with the licensed font and outlined lettering: [font provenance](assets/fonts/dragon-slapper-fontstruct/README.md), [attribution](assets/fonts/dragon-slapper-fontstruct/ATTRIBUTION.md), and [license](assets/fonts/dragon-slapper-fontstruct/license.txt). The footer links to readable [distributed font notices](public/notices/fonts/font-notices.txt); web also includes the unchanged original archive, and native bundles the notices in an offline modal.

**Alegreya Sans** supplies readable interface text under the [SIL Open Font License](assets/fonts/alegreya-sans/OFL.txt). The [Scaling Collection vector artwork](assets/brand/scaling-collection.svg) adds scales to the S and one eye within Scaling's g; its Collection o letters remain plain. The original Alegreya Sans font is unmodified. The preserved [Classic logo source](assets/concepts/logos/v8/01-db-swordslapper-classic-transparent.svg), [brand artwork](assets/brand/), and prior [concept rounds](assets/concepts/) remain available for editing and provenance.

[scripts/create-landing-artwork.py](scripts/create-landing-artwork.py) authors the exact reused wordmark sword, black flame, and new anatomy plates into `assets/brand/`, `public/brand/`, and [src/shared/landingArtwork.ts](src/shared/landingArtwork.ts). It leaves earlier concepts and the original approved logo intact. The web artwork renderer scopes both definition IDs and local fragment references so outlined glyphs and masks remain linked correctly.
