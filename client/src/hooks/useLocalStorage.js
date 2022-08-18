import { useState, useEffect } from "react";

const KEY = "user-token";

export const useLocalStorage = () => {
  const [token, setToken] = useState(localStorage.getItem(KEY));
  const clearLocalData = () => {
    localStorage.removeItem(KEY);
    setToken(undefined);
  };

  useEffect(() => {
    token && localStorage.setItem(KEY, token);
  }, [token]);

  return { token, setToken, clearLocalData };
};
