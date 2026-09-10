import { useCallback, useState } from "react";

const STORAGE_KEY = "labnova_admin_token";

export function getStoredToken(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function setStoredToken(token: string | null) {
  try {
    if (token) window.localStorage.setItem(STORAGE_KEY, token);
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* localStorage unavailable — session just won't persist across reloads */
  }
}

export function useAdminSession() {
  const [token, setTokenState] = useState<string | null>(() => getStoredToken());

  const login = useCallback((newToken: string) => {
    setStoredToken(newToken);
    setTokenState(newToken);
  }, []);

  const logout = useCallback(() => {
    setStoredToken(null);
    setTokenState(null);
  }, []);

  return { token, isAuthenticated: !!token, login, logout };
}
