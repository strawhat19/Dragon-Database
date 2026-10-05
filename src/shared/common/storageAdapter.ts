import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageMode = `device-AsyncStorage`;
export const readValue = (key: string) => AsyncStorage.getItem(key);
export const removeValue = (key: string) => AsyncStorage.removeItem(key);
export const writeValue = (key: string, value: string) => AsyncStorage.setItem(key, value);
export const withBrowserLock = <T,>(_key: string, operation: () => Promise<T>) => operation();

