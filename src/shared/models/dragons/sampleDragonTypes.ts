import { Types } from '../../../types/types';
import { createRecordId } from '../../common/ids';
import { DragonType, type DragonTypeRecord } from './DragonType';

const date = `2026-10-05T00:00:00.000Z`;
export const sampleDragonTypesRevision = 4;

const originalSampleDragonTypes = () => [
  new DragonType({
    number: 1,
    kind: `wyvern`,
    name: `Wyvern`,
    created: date,
    updated: date,
    traits: [`Two legs`, `Broad wings`],
    searchTerms: [`winged`, `flying`, `two legs`],
    description: `A two-legged dragon with broad wings and a hooked tail, shaped for swift movement through open skies.`,
    id: `DragonType_1_Wyvern_2026-10-05_00000000-0000-4000-8000-000000000001`,
  }).toRecord(),
  new DragonType({
    number: 2,
    kind: `wyrm`,
    name: `Wyrm`,
    created: date,
    updated: date,
    traits: [`Wingless`, `Serpentine`],
    searchTerms: [`serpent`, `wingless`, `winding`],
    description: `A wingless, serpentine dragon whose long body coils through caverns, valleys, and old legends.`,
    id: `DragonType_2_Wyrm_2026-10-05_00000000-0000-4000-8000-000000000002`,
  }).toRecord(),
  new DragonType({
    number: 3,
    kind: `drake`,
    name: `Drake`,
    created: date,
    updated: date,
    traits: [`Four legs`, `Wingless`],
    searchTerms: [`grounded`, `four legs`, `wingless`],
    description: `A four-legged, wingless dragon with a heavy frame, strong claws, and a grounded, watchful presence.`,
    id: `DragonType_3_Drake_2026-10-05_00000000-0000-4000-8000-000000000003`,
  }).toRecord(),
];

type SampleDragonType = Pick<DragonTypeRecord, `kind` | `name` | `traits` | `description` | `searchTerms`> & { introducedRevision: number };

export const additionalSampleDragonTypes: SampleDragonType[] = [
  {
    kind: `dragon`,
    name: `Dragon`,
    introducedRevision: 2,
    traits: [`Four legs`, `Paired wings`],
    searchTerms: [`classic`, `winged`, `horns`, `four legs`],
    description: `A classic four-legged, winged dragon with a scaled body, sweeping horns, and broad flight membranes.`,
  },
  {
    kind: `amphiptere`,
    name: `Amphiptere`,
    introducedRevision: 2,
    traits: [`Winged serpent`, `No legs`],
    searchTerms: [`serpentine`, `flying`, `legless`, `wings`],
    description: `A winged serpent without legs, its slender body carried by a single pair of sweeping wings.`,
  },
  {
    kind: `leviathan`,
    name: `Leviathan`,
    introducedRevision: 2,
    traits: [`Aquatic`, `Finned body`],
    searchTerms: [`sea`, `ocean`, `water`, `serpent`, `fins`],
    description: `A vast aquatic dragon with a serpentine body, finned limbs, and a crest shaped for deep water.`,
  },
  {
    kind: `dragonoid`,
    name: `Dragonoid`,
    introducedRevision: 2,
    traits: [`Dragon-human hybrid`, `Upright stance`],
    searchTerms: [`humanoid`, `human`, `hybrid`, `bipedal`, `scaled`],
    description: `A dragon-human hybrid with an upright stance, scaled features, and the hands and expression of a humanoid.`,
  },
  {
    kind: `hydra`,
    name: `Hydra`,
    introducedRevision: 3,
    traits: [`Multiple heads`, `Four legs`, `Paired wings`],
    searchTerms: [`many heads`, `multiheaded`, `four legs`, `winged`, `swamp`],
    description: `A winged, four-legged dragon with several long necks and fierce heads rising from one powerful body.`,
  },
  {
    kind: `eastern`,
    name: `Eastern Dragon`,
    introducedRevision: 3,
    traits: [`Serpentine`, `Four legs`, `Wingless`],
    searchTerms: [`eastern`, `long`, `serpent`, `four legs`, `wingless`, `whiskers`],
    description: `A long, wingless dragon with four clawed legs, flowing whiskers, and a serpentine body that winds through clouds.`,
  },
];

export const upgradeSampleHydra = (record: DragonTypeRecord, updated: string): DragonTypeRecord => {
  const sample = additionalSampleDragonTypes.find((item) => item.kind === `hydra`);
  if (!sample || record.kind !== `hydra` || record.name !== sample.name || record.created !== record.updated
    || JSON.stringify(record.traits) !== JSON.stringify([`Multiple heads`, `Four legs`, `Wingless`])
    || JSON.stringify(record.searchTerms) !== JSON.stringify([`many heads`, `multiheaded`, `four legs`, `wingless`, `swamp`])
    || record.description !== `A wingless, four-legged dragon with several long necks and fierce heads rising from one powerful body.`) return record;
  return { ...record, updated, traits: [...sample.traits], searchTerms: [...sample.searchTerms], description: sample.description };
};

export const isOriginalSampleCatalogue = (records: DragonTypeRecord[]) =>
  originalSampleDragonTypes().every((sample) => records.some((record) => record.id === sample.id && record.kind === sample.kind));

export const createSampleDragonType = async (sample: SampleDragonType, number: number, created: string): Promise<DragonTypeRecord> => {
  const id = await createRecordId(Types.DragonType, number, sample.name, created);
  return new DragonType({ ...sample, id, number, created, updated: created }).toRecord();
};

export const sampleDragonTypes = async () => {
  const records = originalSampleDragonTypes();
  const created = new Date().toISOString();
  const additions = await Promise.all(additionalSampleDragonTypes.map((sample, index) =>
    createSampleDragonType(sample, records.length + index + 1, created)));
  return [...records, ...additions];
};
