export const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === `object` && !Array.isArray(value);

export const dataError = (label: string) =>
  new Error(`${label} Has An Unsupported Or Malformed Format. Saved Data Was Preserved`);

export const errorMessage = (failure: unknown, fallback = `Local Data Is Unavailable`) =>
  failure instanceof Error ? failure.message : fallback;

export const isIsoDate = (value: unknown): value is string =>
  typeof value === `string` && /^\d{4}-\d{2}-\d{2}T/.test(value) && Number.isFinite(Date.parse(value));

