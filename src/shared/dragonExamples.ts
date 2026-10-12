import type { DragonKind } from '../types/types';
import { dragonFormDetails } from './dragonFormDetails';
import { dragonFormPath, dragonFormKinds } from './dragonForms';
import type { DragonExample } from './models/dragons/DragonForm';
import type { DragonExampleDetail } from './models/dragons/DragonExampleDetail';

export type DragonExampleFilterKey = `mediums` | `sources` | `colors` | `elements`;
export type DragonExampleFilterState = Record<DragonExampleFilterKey, string[]>;
export type DragonExampleFilterGroup = { key: DragonExampleFilterKey; label: string; options: readonly string[] };

type DragonExampleMetadata = Pick<DragonExampleDetail, `mediums` | `colors` | `elements`>;

const unspecified = `Not Specified`;
const filterKeys = [`mediums`, `sources`, `colors`, `elements`] as const;
const filterLabels: Record<DragonExampleFilterKey, string> = { colors: `Colors`, mediums: `Media`, sources: `Sources`, elements: `Elements` };
const franchiseMediums: Record<string, readonly string[]> = {
  SMITE: [`Games`],
  Godzilla: [`Movies`],
  Digimon: [`Games`, `TV Shows`],
  [`Chrono Cross`]: [`Games`],
  Pokémon: [`Games`, `TV Shows`],
  [`Elden Ring`]: [`Games`],
  [`Harry Potter`]: [`Art`, `Stories`],
  [`Spirited Away`]: [`Movies`],
  [`Monster Hunter`]: [`Games`],
  [`World of Warcraft`]: [`Games`],
  [`League of Legends`]: [`Games`],
  [`Dungeons & Dragons`]: [`Games`],
  [`Final Fantasy XIV`]: [`Games`],
  [`Final Fantasy XVI`]: [`Games`],
  [`Game of Thrones`]: [`TV Shows`],
  [`One Piece`]: [`Games`, `Stories`, `TV Shows`],
  [`Fairy Tail`]: [`Games`, `Stories`, `TV Shows`],
  [`House of the Dragon`]: [`TV Shows`],
  [`Spyro Reignited Trilogy`]: [`Games`],
  [`Raya and the Last Dragon`]: [`Movies`],
  [`The Lord of the Rings Online`]: [`Games`],
  [`Middle-earth · The Hobbit`]: [`Art`, `Stories`],
  [`Middle-earth · The Hobbit Films`]: [`Movies`],
  [`Middle-earth · The Silmarillion`]: [`Art`, `Stories`],
  [`The Elder Scrolls V: Skyrim`]: [`Games`],
  [`Dragon Ball`]: [`Games`, `Movies`, `Stories`, `TV Shows`],
  [`How to Train Your Dragon (Animated Films)`]: [`Movies`],
};
const metadataById: Record<string, Partial<DragonExampleMetadata>> = {
  haku: { colors: [`White`, `Teal`], elements: [`Water`] },
  kaido: { colors: [`Blue`, `Gold`] },
  sisu: { colors: [`Blue`] },
  igneel: { colors: [`Red`], elements: [`Fire`] },
  drogon: { colors: [`Black`], elements: [`Fire`] },
  dratini: { colors: [`Blue`, `White`] },
  shelgon: { colors: [`White`, `Gray`] },
  noivern: { colors: [`Black`, `Green`, `Purple`] },
  milotic: { colors: [`Cream`], elements: [`Water`] },
  glorund: { colors: [`Gold`, `Green`] },
  couatl: { colors: [`Teal`, `Cream`, `Orange`] },
  caraxes: { colors: [`Red`], elements: [`Fire`] },
  rhaegal: { colors: [`Green`, `Bronze`], elements: [`Fire`] },
  viserion: { elements: [`Fire`] },
  vhagar: { elements: [`Fire`] },
  dracthyr: { colors: [`Blue`, `Teal`, `Black`] },
  draigoch: { elements: [`Fire`] },
  stormfly: { colors: [`Blue`, `Gold`] },
  toothless: { colors: [`Black`, `Red`] },
  gyarados: { colors: [`Blue`], elements: [`Water`] },
  dragonair: { colors: [`Blue`, `White`] },
  dragonborn: { colors: [`Blue`, `Bronze`] },
  salamence: { colors: [`Red`, `Blue`] },
  hydreigon: { colors: [`Blue`, `Black`, `Purple`], elements: [`Darkness`] },
  appletun: { colors: [`Green`, `Brown`], elements: [`Nature`] },
  momonosuke: { colors: [`Pink`] },
  wargreymon: { colors: [`Gold`, `Silver`] },
  groundramon: { colors: [`Red`, `Green`], elements: [`Earth`] },
  megidramon: { colors: [`Red`, `Yellow`], elements: [`Fire`] },
  magnadramon: { colors: [`Pink`, `Black`] },
  azulongmon: { colors: [`Blue`, `White`, `Purple`], elements: [`Lightning`] },
  airdramon: { colors: [`Red`, `Blue`, `White`], elements: [`Air`] },
  seadramon: { colors: [`Red`, `Teal`, `Yellow`], elements: [`Ice`] },
  jormungandr: { colors: [`Blue`, `Purple`] },
  kukulkan: { colors: [`Red`, `Gold`, `Teal`, `Purple`], elements: [`Air`] },
  shenron: { colors: [`Red`, `Brown`, `Cream`, `Green`] },
  [`sky-dragon`]: { colors: [`White`] },
  [`smaug-film`]: { colors: [`Red`, `Orange`], elements: [`Fire`] },
  [`smaug-tolkien`]: { colors: [`Red`], elements: [`Fire`] },
  [`dnd-hydra`]: { colors: [`Gold`, `Green`] },
  [`lol-smolder`]: { colors: [`Red`, `Purple`], elements: [`Fire`] },
  [`skyrim-alduin`]: { colors: [`Black`] },
  [`chinese-fireball`]: { colors: [`Red`], elements: [`Fire`] },
  [`common-welsh-green`]: { colors: [`Green`], elements: [`Fire`] },
  [`norwegian-ridgeback`]: { colors: [`Black`], elements: [`Fire`] },
  [`hungarian-horntail`]: { colors: [`Black`, `Bronze`], elements: [`Fire`] },
  [`young-red-dragon`]: { colors: [`Red`], elements: [`Fire`] },
  [`spyro-reignited`]: { colors: [`Gold`, `Orange`, `Purple`], elements: [`Fire`] },
  [`leviathan-the-lost`]: { colors: [`Blue`], elements: [`Water`] },
  [`elden-ring-adula`]: { colors: [`Blue`], elements: [`Magic`] },
  [`elden-ring-agheel`]: { colors: [`Gray`, `Brown`], elements: [`Fire`] },
  [`skyrim-paarthurnax`]: { colors: [`Gray`, `Brown`] },
  [`lol-aurelion-sol`]: { colors: [`Blue`], elements: [`Cosmic`] },
  [`monster-hunter-fatalis`]: { colors: [`Black`] },
  [`monster-hunter-rathalos`]: { colors: [`Red`], elements: [`Fire`] },
  [`monster-hunter-lagiacrus`]: { colors: [`Blue`] },
  [`lol-shyvana-dragon`]: { colors: [`Red`, `Orange`], mediums: [`Art`, `Games`] },
};
const normalizeTags = (tags?: readonly string[]): readonly string[] => tags?.length ? tags : [unspecified];
const normalizeSearchText = (value: string) => value.normalize(`NFD`).replace(/\p{M}/gu, ``).toLowerCase();
const getExampleMetadata = (example: DragonExample): DragonExampleMetadata => {
  const metadata = metadataById[example.id];
  return {
    colors: normalizeTags(example.colors ?? metadata?.colors),
    elements: normalizeTags(example.elements ?? metadata?.elements),
    mediums: normalizeTags(example.mediums ?? metadata?.mediums ?? franchiseMediums[example.franchise]),
  };
};
const getExampleFilterValues = (example: DragonExample): Record<DragonExampleFilterKey, readonly string[]> => ({
  ...getExampleMetadata(example),
  sources: [example.franchise || unspecified],
});

export const dragonExamples: readonly DragonExampleDetail[] = dragonFormKinds.flatMap(kind => {
  const form = dragonFormDetails[kind];
  return form.examples.map(example => ({
    ...example,
    kind,
    formName: form.name,
    formNote: form.note,
    anatomy: form.anatomy,
    ...getExampleMetadata(example),
  }));
});
const dragonExamplesById = new Map(dragonExamples.map(example => [example.id, example]));

export const dragonExamplePath = ({ id, kind }: Pick<DragonExampleDetail, `id` | `kind`>): `${ReturnType<typeof dragonFormPath>}/${string}` => `${dragonFormPath(kind)}/${id}`;
export const getDragonExample = (id: string): DragonExampleDetail | undefined => dragonExamplesById.get(id);
export const getDragonExamples = (kind?: DragonKind): readonly DragonExampleDetail[] => kind ? dragonExamples.filter(example => example.kind === kind) : dragonExamples;
export const createDragonExampleFilters = (): DragonExampleFilterState => ({ colors: [], mediums: [], sources: [], elements: [] });
export const getDragonExampleFilterGroups = (examples: readonly DragonExample[]): readonly DragonExampleFilterGroup[] => filterKeys.map(key => ({
  key,
  label: filterLabels[key],
  options: [...new Set(examples.flatMap(example => getExampleFilterValues(example)[key]))].sort((a, b) => a === b ? 0 : a === unspecified ? 1 : b === unspecified ? -1 : a.localeCompare(b)),
}));
export const filterDragonExamples = <T extends DragonExample>(examples: readonly T[], filters: DragonExampleFilterState, query: string = ``): T[] => {
  const queryWords = normalizeSearchText(query).split(/\s+/).filter(Boolean);
  return examples.filter(example => {
    const values = getExampleFilterValues(example);
    if (!filterKeys.every(key => !filters[key]?.length || filters[key].some(option => values[key].includes(option)))) return false;
    if (!queryWords.length) return true;
    const formName = (example as Partial<DragonExampleDetail>).formName ?? dragonExamplesById.get(example.id)?.formName;
    const searchText = normalizeSearchText([example.name, example.franchise, example.description, example.canonLabel, example.imageCredit, example.sourceUrl, formName, ...values.mediums, ...values.colors, ...values.elements].join(` `));
    return queryWords.every(word => searchText.includes(word));
  });
};
