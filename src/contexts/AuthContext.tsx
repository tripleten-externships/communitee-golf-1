import React, { useEffect, useState, ReactNode } from "react";

import { AUTH_TOKEN_KEY } from "../components/utils/constants";
import { AuthContext } from "./AuthContextFoundation";
import * as api from "../components/utils/api";

interface JwtPayload {
  userId: string;
  username: string;
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const decodeJWT = (token: string): JwtPayload | null => {
    try {
      const [, b64url] = token.split(".");
      const b64 = b64url.replace(/-/g, "+").replace(/_/g, "/");
      const json = decodeURIComponent(
        atob(b64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(json) as JwtPayload;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chromeAny = (window as any).chrome;
    if (chromeAny?.storage?.local?.get) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      chromeAny.storage.local.get(AUTH_TOKEN_KEY, (items: any) => {
        const token = items[AUTH_TOKEN_KEY] as string | undefined;
        if (!token) return;
        setToken(token);
        const payload = decodeJWT(token);
        if (payload) setUser({ id: payload.userId, name: payload.username });
      });
    } else {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (!token) return;
      setToken(token);
      const payload = decodeJWT(token);
      if (payload) setUser({ id: payload.userId, name: payload.username });
    }
  }, []);

  const login = async (username: string, password: string) => {
    const newToken = await api.login(username, password);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chromeAny = (window as any).chrome;
    if (chromeAny?.storage?.local?.set) {
      chromeAny.storage.local.set({ [AUTH_TOKEN_KEY]: newToken });
    } else {
      localStorage.setItem(AUTH_TOKEN_KEY, newToken);
    }
    setToken(newToken);
    const payload = decodeJWT(newToken);
    if (payload) setUser({ id: payload.userId, name: payload.username });
  };

  const logout = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chromeAny = (window as any).chrome;
    if (chromeAny?.storage?.local?.remove) {
      chromeAny.storage.local.remove(AUTH_TOKEN_KEY);
    } else {
      localStorage.removeItem(AUTH_TOKEN_KEY);
    }
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated: Boolean(token), login, logout, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
