import * as SecureStore from "expo-secure-store";

export const tokenCache = {
  getToken: async (key: string) => {
    return await SecureStore.getItemAsync(key);
  },
  saveToken: async (key: string, value: string) => {
    await SecureStore.setItemAsync(key, value);
  },
  removeToken: async (key: string) => {
    await SecureStore.deleteItemAsync(key);
  },
};
