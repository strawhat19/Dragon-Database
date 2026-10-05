export const storageMode = `browser-localStorage`;

const browserStorage = () => {
  if (typeof window === `undefined`) throw new Error(`Browser Storage Is Unavailable`);
  return window.localStorage;
};

export const readValue = async (key: string) => browserStorage().getItem(key);
export const removeValue = async (key: string) => { browserStorage().removeItem(key); };
export const writeValue = async (key: string, value: string) => { browserStorage().setItem(key, value); };

export const withBrowserLock = <T,>(key: string, operation: () => Promise<T>): Promise<T> => {
  if (typeof navigator !== `undefined` && navigator.locks?.request) {
    return navigator.locks.request(key, operation);
  }
  return operation();
};

