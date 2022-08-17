import { useState, useEffect } from "react";

const KEY = 'user-token';

export const useLocalStorage = () => {
  const [localData, setLocalData] = useState(localStorage.getItem(KEY));
  const clearLocalData = () => localStorage.removeItem(KEY);

  useEffect(() => {
    localData && localStorage.setItem(KEY, localData);
  }, [localData]);

  return { localData, setLocalData, clearLocalData };
};
