import type { DragonExample } from './DragonForm';

type DragonReferenceMedia = Pick<DragonExample, `id` | `imageUrl` | `imageAlt` | `imageCredit` | `sourceUrl` | `anatomySourceUrl`>;

export const referenceDragonMedia: readonly DragonReferenceMedia[] = [
  {
    id: `young-red-dragon`,
    imageCredit: `Monster Manual (2025) Illustration · Wizards Of The Coast`,
    sourceUrl: `https://www.dndbeyond.com/monsters/5195284-young-red-dragon`,
    imageAlt: `A red dragon flying over a burning city with four clawed legs and separate membrane wings`,
    imageUrl: `https://www.dndbeyond.com/avatars/thumbnails/47139/406/1000/1000/638741964872368132.png`,
  },
  {
    id: `jormungandr`,
    imageCredit: `SMITE God Reveal Thumbnail · Titan Forge Games/Hi-Rez Studios`,
    sourceUrl: `https://www.youtube.com/watch?v=z_bsF1TRKVU`,
    imageUrl: `https://img.youtube.com/vi/z_bsF1TRKVU/maxresdefault.jpg`,
    imageAlt: `SMITE's Jormungandr with a horned serpent head, dark scales and glowing blue-purple markings`,
  },
  {
    id: `couatl`,
    imageCredit: `Monster Manual (2014) Illustration · Wizards Of The Coast`,
    sourceUrl: `https://www.dndbeyond.com/monsters/16832-couatl`,
    imageAlt: `A teal legless serpent coiled beneath large orange and cream feathered wings`,
    imageUrl: `https://www.dndbeyond.com/avatars/thumbnails/30763/227/1000/1000/638061153443493893.png`,
  },
  {
    id: `kukulkan`,
    imageCredit: `SMITE God Reveal Thumbnail · Titan Forge Games/Hi-Rez Studios`,
    sourceUrl: `https://www.youtube.com/watch?v=LTC-IL12igw`,
    imageUrl: `https://img.youtube.com/vi/LTC-IL12igw/maxresdefault.jpg`,
    imageAlt: `SMITE's Kukulkan with teal scales, red feathered crests, purple eyes and a golden headpiece`,
  },
  {
    id: `leviathan-the-lost`,
    imageCredit: `The Rising Tide Key Art · Square Enix`,
    sourceUrl: `https://na.finalfantasyxvi.com/en-gb/dlc/the-rising-tide`,
    imageAlt: `Leviathan's blue serpentine head facing Clive and his companions amid a towering wall of water`,
    imageUrl: `https://fyre.cdn.sewest.net/ff-xvi/655225a7aed7bb35a2c8383e/rising-tide-ZCA77SRhP.jpg?quality=85&width=3840`,
  },
  {
    id: `dragonborn`,
    imageCredit: `Player's Handbook (2014) Species Illustration · Wizards Of The Coast`,
    sourceUrl: `https://www.dndbeyond.com/species/16-dragonborn`,
    imageAlt: `A bronze-scaled dragonborn standing upright in ornate blue armor and holding a decorated staff`,
    imageUrl: `https://www.dndbeyond.com/avatars/thumbnails/6/340/420/618/636272677995471928.png`,
  },
  {
    id: `dracthyr`,
    imageCredit: `Dragonflight Dracthyr Customization Study · Blizzard Entertainment`,
    sourceUrl: `https://worldofwarcraft.blizzard.com/en-us/news/23878723/`,
    imageAlt: `Three Dracthyr with upright scaled bodies, clawed hands and feet, separate wings and long tails`,
    imageUrl: `https://bnetcmsus-a.akamaihd.net/cms/content_entry_media/DIJKTD9QJJYJ1668063871225.jpg`,
  },
  {
    id: `dnd-hydra`,
    imageCredit: `Monster Manual (2014) Illustration · Wizards Of The Coast`,
    sourceUrl: `https://www.dndbeyond.com/monsters/16929-hydra`,
    imageAlt: `A wingless golden-green hydra with several serpentine necks, snarling heads and four clawed legs`,
    imageUrl: `https://www.dndbeyond.com/avatars/thumbnails/30830/759/1000/1000/638063796594944128.png`,
  },
  {
    id: `king-ghidorah`,
    imageCredit: `King Ghidorah Film Still · Toho`,
    sourceUrl: `https://godzilla.com/blogs/monsterpedia/king-ghidorah`,
    imageAlt: `A black-and-white film still of King Ghidorah with three horned heads and enormous membrane wings`,
    imageUrl: `https://godzilla.com/cdn/shop/files/king-ghidorah_Content_page_hero_1728x840_d9c537fe-0f2c-480f-b277-a7c7560cd5a0.jpg?v=1687983060`,
  },
  {
    id: `haku`,
    imageCredit: `Spirited Away Film Still · Studio Ghibli`,
    sourceUrl: `https://www.ghibli.jp/works/chihiro/`,
    imageUrl: `https://www.ghibli.jp/gallery/chihiro045.jpg`,
    imageAlt: `Chihiro beside Haku's white dragon head, flowing teal mane, horns and long whiskers under a night sky`,
  },
];
