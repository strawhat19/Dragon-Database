# Dragon Form Pages

Each landing-page form card links to its canonical `/forms/<kind>` page. Card navigation has no search mutation; the shared landing-page query and its existing persistence remain intact.

The nine routes are `/forms/dragon`, `/forms/wyvern`, `/forms/drake`, `/forms/wyrm`, `/forms/amphiptere`, `/forms/leviathan`, `/forms/dragonoid`, `/forms/hydra`, `/forms/eastern`. Expo's dynamic form route supplies static parameters for every form. Web and native rendering consume the same typed catalog through `dragonAPI.getDragonFormDetails`.

Each form has an anatomy guide, four original gallery illustrations, full-size artwork viewing, cross-franchise examples, credits and source links, and links to the other forms. There are 24 curated example entries. A franchise's canon classification is kept separate from the archive's body-plan grouping. Neighboring interpretations are explicitly labeled as variations.

Original galleries reuse the artwork in `assets/dragons/storybook/`; existing landing artwork assignments remain unchanged. Official Pokémon, Chrono Cross and Sisu reference images are loaded from their credited publishers. If a remote image fails, its example and source link remain available. Gallery artwork and external franchise references have separate attribution on each page and on Copyright.

No backend, account, search-storage or AI instruction changes are needed for these public reference pages. This source change has not been built or UI tested, following the project's working agreement.

## Example Sources

| Form | Example | Franchise | Reference |
| --- | --- | --- | --- |
| Dragon | Salamence | Pokémon | [Source](https://in.portal-pokemon.com/pokedex/0373/) |
| Dragon | Young Red Dragon | Dungeons & Dragons | [Source](https://www.dndbeyond.com/monsters/5195284-young-red-dragon) |
| Dragon | Sky Dragon | Chrono Cross | [Source](https://www.jp.square-enix.com/cc_rd/linestc/?id=55) · [Anatomy](https://gamefaqs.gamespot.com/ps/196917-chrono-cross/faqs/37862) |
| Dragon | Draggy | Chrono Cross | [Source](https://www.jp.square-enix.com/cc_rd/linestc/?id=28) |
| Wyvern | Drogon | Game of Thrones | [Source](https://georgerrmartin.com/notablog/2024/07/11/here-there-be-dragons-2/) |
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
| Eastern Dragon | Shenron | Dragon Ball | [Source](https://tamashiiweb.com/item/12179/?dmode=pc&wovn=en) |
| Eastern Dragon | Sisu | Raya and the Last Dragon | [Source](https://www.disneyanimation.com/kumandra/) |
| Eastern Dragon | Haku | Spirited Away | [Source](https://www.ghibli.jp/works/chihiro/) |

Sky Dragon is labeled as a four-winged variant using the game-dialogue transcription linked above. Dragonair is labeled as a serpentine variant with head wings using the official Mega Dragonite description. The archive's winged Hydra art does not imply that D&D's Hydra has wings or that King Ghidorah has four walking legs. Gyarados and Milotic remain aquatic comparisons with their actual Pokémon types.
