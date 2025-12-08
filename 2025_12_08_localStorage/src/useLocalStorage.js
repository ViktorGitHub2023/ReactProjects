import { useEffect, useState } from "react";
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const json = localStorage.getItem(key);
      return json != null ? JSON.parse(json) : initialValue;
    } catch {
      return initialValue;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);
  
  return [value, setValue];
}
