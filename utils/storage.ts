import AsyncStorage from "@react-native-async-storage/async-storage";

export const getFromStorage = async (item: string) => {
  const storedUser = await AsyncStorage.getItem(item);
  if (storedUser) {
    return JSON.parse(storedUser);
  }
  return null;
};

export const setToStorage = async (
  item: string,
  value: unknown
): Promise<void> => {
  await AsyncStorage.setItem(item, JSON.stringify(value));
};
