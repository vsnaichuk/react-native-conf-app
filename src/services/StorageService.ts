// @TODO: Uncomment to use MMKV
// @ts-nocheck
// import { MMKV } from "react-native-mmkv";
// const storage = new MMKV();

const storage = {};

const StorageService = {
  get: async ({ key }: { key: string }) => {
    const value = storage.getString(key);
    return { value: value ?? null };
  },
  set: async ({ key, value }: { key: string; value: string }) => {
    storage.set(key, value);
  },
  remove: async ({ key }: { key: string }) => {
    storage.delete(key);
  },
};

export { StorageService };
