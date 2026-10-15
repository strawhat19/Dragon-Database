import { dragonExamples, dragonExamplePath } from '../dragonExamples';
export const catalog = dragonExamples.map(item => ({ id: item.id, name: item.name, detail: item.franchise, path: dragonExamplePath(item) }));
export const productName = `Dragon Database`;
