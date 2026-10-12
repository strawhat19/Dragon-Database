# Dragon Form Pages

Each landing-page form card links to its canonical plural top-level page. Card navigation has no search mutation; the shared landing-page query and its existing persistence remain intact.

The header's Dragons link opens `/all-dragons`, titled All Dragons. Its shared `DragonExampleCollection` omits a form restriction and requests the complete 61-entry catalog through the same API. Web and native reuse the form-page shell, three-column wide-screen cards, responsive search and filters, and detail lightbox. Every card uses its own form icon; slideshow arrows and thumbnails follow the currently filtered collection across forms. The classic Dragons form remains `/dragons` and is reached from its landing card. Grid styles belong to the collection so direct All Dragons visits do not depend on a form page's styles loading first.

The shared form order supplies landing-card positions and display numbers: 01 Dragons, 02 Wyverns, 03 Wyrms, 04 Leviathans, 05 Hydras, 06 Dragonoids, 07 Drakes, 08 Eastern and 09 Amphipteres. The shared route labels supply page headings, browser titles, loader labels, related links, landing-card titles, accessibility labels and search terms. Eastern retains its `/eastern-dragons` URL. Saved catalog numbers and IDs are independent of display numbers and are not rewritten.

The nine routes are `/dragons`, `/wyverns`, `/drakes`, `/wyrms`, `/amphipteres`, `/leviathans`, `/dragonoids`, `/hydras`, `/eastern-dragons`. Each has a thin Expo route file that renders the shared form page. `dragonFormRoutes` owns paths, labels and icons; card links, related links, the Stack and the global route registry consume it. Form content is resolved from the pathname, so query parameters cannot select a different form. Web and native rendering consume the same typed catalog through `dragonAPI.getDragonFormDetails`.

The old `/forms/<kind>` route retains static parameters for all nine forms and performs an Expo replace-style redirect to the canonical page, including `/forms/eastern` to `/eastern-dragons`. These are client/native redirects rather than hosted HTTP redirects. Old and new paths resolve to the same loader label, and trailing slashes are normalized.

Each form has an anatomy guide, four original gallery illustrations, full-size artwork viewing, cross-franchise examples, credits and source links, and links to the other forms. A franchise's canon classification is kept separate from the archive's body-plan grouping. Neighboring interpretations and different adaptations are explicitly labeled as variations.

The example cards use three columns on wide web and native layouts and one column on phones. The original illustration gallery retains its separate layout.

Original galleries reuse the artwork in `assets/dragons/storybook/`; existing landing artwork assignments remain unchanged. Franchise examples use actual credited publisher artwork, collectible photographs or game/film stills. The image alt text describes the selected reference without labeling every image as official artwork. If a remote image fails, its example and source link remain available. Gallery artwork and external franchise references have separate attribution on each page and on Copyright.

`DragonExampleCard` owns the compact web/native example views. Its angled corners, brushed-steel identity header and edge-to-edge 5:3 media banner follow the landing form cards. Descriptions show at most three lines with truncation; the themed 44px cut-corner Info control and View Details action open the full detail lightbox. The Info control uses the app's red accent, contrasting icon and keyboard focus treatment. Character headings retain DragonSlapper; descriptions and detail-view prose use the registered Alegreya Sans family. Ten earlier image-less references have credited publisher imagery through `referenceDragonMedia.ts`, merged by existing ID without changing the catalog count or anatomy classifications.

`DragonExampleCollection` loads each form's enriched examples through `dragonAPI.getDragonExamples`. Its cut-corner controls combine multi-select Sources (franchises), Media, Colors and Elements with accent-insensitive search over names, worlds, descriptions, credits, form names and tags. Options within a group match any selected value; groups and search terms combine. Clear Search retains facet selections; Reset Filters clears search and all facets. Counts and recoverable no-match/loading/error states describe the actual current collection. Controls wrap on narrow screens, and search spans the available width without changing the landing page's saved query.

The compact example toolbar follows the supplied count/search/action layout: a live count at the left, flexible search in the middle and a cut-corner filter icon at the right. Its badge counts selected facet values. Filters start collapsed; the icon opens a themed options panel with reset and Done controls. Web supports Escape/outside dismissal and keeps collapsed options out of keyboard navigation; native animates the panel's measured height and hides its collapsed controls from accessibility. Reduced motion disables transitions. Below 600 pixels the count moves above the search/filter row.

`dragonExamples.ts` flattens the same 61 catalog entries in shared form order and adds represented media types plus documented color/element tags. Media includes Movies, TV Shows, Games, Art and Stories. Unknown colors or elements remain explicitly Not Specified. Metadata and catalog lookup are read-only; no records, IDs, account data or source attributions are rewritten.

`DragonExampleLightbox` displays `DragonExampleDetailView`, also used by every dedicated `/<form>/<id>` page. The viewport-sized modal keeps Previous/Next navigation, a slide counter and selectable image-thumbnail pagination visible. Large screens place media on the left and Overview, Details, Anatomy and Sources tabs on the right. Compact screens add an Artwork tab to the selected content pane. Source links and image credits live in Sources. The outer modal has no vertical scrolling; selected panes allow limited overflow when short windows, zoom or large text need extra reading space. Hiding modal Artwork unmounts its media playback. Modal slides follow the current filtered collection; full-page slides follow the example's form. The thin route `app/[form]/[id].tsx` generates both parameters from every example returned by the API: `form` is the record's canonical plural form URL segment, and `id` is its stable catalog ID. Examples include `/dragons/young-red-dragon`, `/wyverns/drogon` and `/eastern-dragons/lol-aurelion-sol`; all 61 records share this route and detail component. Direct links, missing examples and failed reads have explicit states.

`dragonExamplePath` supplies canonical destinations for Open Full Page and slideshow navigation from the record's catalog form. Old `/examples/<id>` links redirect through `app/examples/[id].tsx` to the corresponding detail page. A valid example under the wrong known form also redirects to its own form; unknown form prefixes show the missing-example state. Form resolution uses the pathname, so query parameters cannot change the form or bypass the legacy redirect. These are Expo client/native replace-style redirects rather than hosted HTTP redirects. The shared route registry labels both canonical and legacy detail URLs as Dragon Example while `/forms/<kind>` retains the form-page label.

Web uses a native dialog with focus containment, Escape/backdrop/Close dismissal, restored trigger focus and parent scroll locking; arrow keys navigate slides, while the tab bar handles its own Left/Right/Home/End keys. Stable tab controls retain focus across slide changes; only media remounts for the new record. Entry/exit and slide animations respect reduced motion. Native uses a themed viewport-sized modal with safe-area spacing, selected content panes and persistent thumbnail/navigation controls. Open Full Page continues to use the dedicated detail routes through the shared component: web uses the compact tabbed layout, and native retains its full-page reading layout. Opening details pauses the compact card's animated preview.

Web page bodies render without an observer-controlled reveal wrapper. A finite CSS entry animation retains the fade and rise, with ordinary visible styles afterward and no animation under reduced motion. This prevents the whole body from remaining hidden when a reveal callback is missed. Smaller scroll reveals trigger on any intersection and inspect every queued entry rather than only the first.

Drogon's banner uses the inspected season 5 Daznak's Pit fire loop from [Tenor](https://tenor.com/view/drogon-breathing-fire-dragon-daenerys-targaryen-khaleesi-gif-12708970), with its static poster and [official HBO full-scene video](https://www.youtube.com/watch?v=G-yYULj7NAU). Web plays the short MP4 muted with Pause/Play, falling back to GIF or the poster when unavailable. Native uses the GIF with Pause/Play and opens the full video through an accessible banner link. Reduced motion keeps the native poster static and disables web autoplay. The official video can also be embedded after user interaction when the short clip is unavailable. Media is referenced from its host; no remote video or audio files were downloaded or bundled.

The franchise catalog lives in `src/shared/models/dragons/` across `gameDragonExamples.ts`, `animeDragonExamples.ts`, `screenDragonExamples.ts` and `literatureDragonExamples.ts`, combined by `franchiseDragonExamples.ts`. Each entry declares its form, identity, description, canon label, actual image URL, image description and credit, plus a source and optional separate anatomy reference. `dragonFormDetails.ts` groups these entries by form and merges existing entries by stable ID, enriching Drogon and Shenron without duplicate cards.

The public API includes example names and franchises in each form's search terms at read time, so searches such as Kaido, Digimon, Skyrim or Harry Potter find the appropriate form cards without overwriting saved catalog records or resetting the saved query. No backend, account, cloud configuration or AI instruction changes are needed for these public reference pages.

Dark-mode landing card headers retain the same brushed black-steel surface as light mode, with a light foreground for legibility. Web keeps the existing textured gradient visible; native always renders the existing black-steel SVG. Source and image references were inspected; builds, tests and application UI checks remain unrun under the project's working agreement.

## Franchise Expansion

The expanded catalog has 61 entries: 37 additions to the original 24, plus image-backed updates to Drogon and Shenron. It covers League of Legends, Digimon, One Piece, Fairy Tail, Skyrim, Game of Thrones, House of the Dragon, Tolkien's Middle-earth, The Lord of the Rings Online, Harry Potter and Elden Ring, alongside Monster Hunter, Final Fantasy XIV, Spyro and How to Train Your Dragon. Every expansion entry has a credited image; the data modules retain the direct sources for each record.

| Form Page | Total Examples | Expansion Examples |
| --- | --- | --- |
| `/dragons` | 18 | Smolder, Shyvana, Fatalis, Bahamut, Spyro, Magnadramon, Igneel, Toothless, illustrated Smaug, Draigoch, Hungarian Horntail, Norwegian Ridgeback, Common Welsh Green, Chinese Fireball |
| `/wyverns` | 13 | Alduin, Paarthurnax, Agheel, Adula, Rathalos, Rhaegal, Viserion, Vhagar, Caraxes, Stormfly, film Smaug; Drogon image updated |
| `/drakes` | 4 | Groundramon, Glórund |
| `/wyrms` | 3 | Existing examples retained |
| `/amphipteres` | 4 | Airdramon, Megidramon |
| `/leviathans` | 5 | Seadramon, Lagiacrus |
| `/dragonoids` | 3 | WarGreymon |
| `/hydras` | 4 | Dragonlord Placidusax |
| `/eastern-dragons` | 7 | Aurelion Sol, Azulongmon, Kaido, Momonosuke; Shenron image updated |

Important classification distinctions:

- Tolkien's illustrated Smaug belongs to Dragon; the film design belongs to Wyvern. Wētā's collectible photograph is identified as a film-design reference, not a film still.
- Tolkien's wingless Glórund painting belongs to Drake; Draigoch is explicitly LOTRO's game interpretation of Middle-earth.
- HBO's dragons keep their canon Dragon label while browsing under Wyvern. Martin's description of two legs and wing forelimbs is linked separately from the image source.
- The Harry Potter portraits are identified as official illustrated interpretations. Chinese Fireball is winged in the selected portrait and does not belong under Eastern merely because of its name.
- Body-plan variations such as multiple wing pairs, extra arms or surviving heads are described explicitly rather than silently treated as exact anatomy matches.

The requested reverse-engineer-anything skill was read. It directs ordinary source-repository work to normal repository tools; no shipped game package or user-owned game runtime was supplied. Reference-image inspection and primary franchise pages establish visual identity here, rather than a claim of binary decompilation.

## Example Sources

| Form | Example | Franchise | Reference |
| --- | --- | --- | --- |
| Dragon | Salamence | Pokémon | [Source](https://in.portal-pokemon.com/pokedex/0373/) |
| Dragon | Young Red Dragon | Dungeons & Dragons | [Source](https://www.dndbeyond.com/monsters/5195284-young-red-dragon) |
| Dragon | Sky Dragon | Chrono Cross | [Source](https://www.jp.square-enix.com/cc_rd/linestc/?id=55) · [Anatomy](https://gamefaqs.gamespot.com/ps/196917-chrono-cross/faqs/37862) |
| Dragon | Draggy | Chrono Cross | [Source](https://www.jp.square-enix.com/cc_rd/linestc/?id=28) |
| Wyvern | Drogon | Game of Thrones | [Fighting-Pit Clip](https://tenor.com/view/drogon-breathing-fire-dragon-daenerys-targaryen-khaleesi-gif-12708970) · [HBO Video](https://www.youtube.com/watch?v=G-yYULj7NAU) · [Anatomy](https://georgerrmartin.com/notablog/2024/07/11/here-there-be-dragons-2/) |
| Wyvern | Noivern | Pokémon | [Source](https://in.portal-pokemon.com/pokedex/0715/) |
| Drake | Appletun | Pokémon | [Source](https://in.portal-pokemon.com/pokedex/0842/) |
| Drake | Shelgon | Pokémon | [Source](https://ph.portal-pokemon.com/play/pokedex/0372) |
| Wyrm | Dratini | Pokémon | [Source](https://in.portal-pokemon.com/pokedex/0147/) |
| Wyrm | Dragonair | Pokémon | [Source](https://in.portal-pokemon.com/pokedex/0148/) · [Anatomy](https://legends.pokemon.com/en-us/story-world/pokemon/mega-dragonite) |
| Wyrm | Jormungandr | SMITE | [Source](https://www.youtube.com/watch?v=z_bsF1TRKVU) |
| Amphiptere | Couatl | Dungeons & Dragons | [Source](https://www.dndbeyond.com/monsters/16832-couatl) |
| Amphiptere | Kukulkan | SMITE | [Source](https://www.youtube.com/watch?v=LTC-IL12igw) |
| Leviathan | Gyarados | Pokémon | [Source](https://in.portal-pokemon.com/pokedex/0130/) |
| Leviathan | Leviathan The Lost | Final Fantasy XVI | [Source](https://www.square-enix-games.com/en_GB/news/final-fantasy-xvi-rising-tide) |
| Leviathan | Milotic | Pokémon | [Source](https://in.portal-pokemon.com/pokedex/0350/) |
| Dragonoid | Dragonborn | Dungeons & Dragons | [Source](https://www.dndbeyond.com/species/16-dragonborn) |
| Dragonoid | Dracthyr | World of Warcraft | [Source](https://worldofwarcraft.blizzard.com/en-us/news/23878723/) |
| Hydra | Hydra | Dungeons & Dragons | [Source](https://www.dndbeyond.com/monsters/16929-hydra) |
| Hydra | Hydreigon | Pokémon | [Source](https://in.portal-pokemon.com/pokedex/0635/) |
| Hydra | King Ghidorah | Godzilla | [Source](https://godzilla.com/blogs/monsterpedia/king-ghidorah) |
| Eastern Dragon | Shenron | Dragon Ball | [Source](https://en.dragon-ball-official.com/news/01_4048.html) |
| Eastern Dragon | Sisu | Raya and the Last Dragon | [Source](https://www.disneyanimation.com/kumandra/) |
| Eastern Dragon | Haku | Spirited Away | [Source](https://www.ghibli.jp/works/chihiro/) |

Sky Dragon is labeled as a four-winged variant using the game-dialogue transcription linked above. Dragonair is labeled as a serpentine variant with head wings using the official Mega Dragonite description. The archive's winged Hydra art does not imply that D&D's Hydra has wings or that King Ghidorah has four walking legs. Gyarados and Milotic remain aquatic comparisons with their actual Pokémon types.
