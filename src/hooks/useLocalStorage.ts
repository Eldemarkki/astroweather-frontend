import { useLocalStorageValue } from "@mantine/hooks";

export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const [valueStr, setValueStr] = useLocalStorageValue<string>(defaultValue === undefined ? { key } : { key, defaultValue: JSON.stringify(defaultValue) });

  const value: T = JSON.parse(valueStr);
  const setValue = (newValue: T) => setValueStr(JSON.stringify(newValue));

  return [value, setValue] as [T, (newVal: T) => void];
};
