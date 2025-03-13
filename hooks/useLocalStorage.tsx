import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function useLocalStorage<T>(
  key: string
): [string, (value: string) => void] {
  const [itemValue, setItemValue] = useState("");

  async function storeData(value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
      setItemValue(value);
    } catch (e) {
      // saving error
    }
  }

  const getData = async () => {
    try {
      const fetchValue = await AsyncStorage.getItem(key);
      if (fetchValue !== null) {
        setItemValue(fetchValue);
        // value previously stored
      } else {
        setItemValue("");
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return [itemValue, storeData];
}
