import React, {
    useEffect,
    useState,
    ReactNode,
  } from "react";
  
  import { AUTH_TOKEN_KEY } from "../components/LoginForm";
  import { AuthContext } from "./AuthContextFoundation";
  import * as api from "../components/utils/api";
  
  export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
  }) => {
    const [token, setToken] = useState<string | null>(null);
  
    useEffect(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const chromeStorage = (window as any).chrome?.storage?.local;
      if (chromeStorage?.get) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        chromeStorage.get(AUTH_TOKEN_KEY, (items: Record<string, any>) => {
          if (items[AUTH_TOKEN_KEY]) setToken(items[AUTH_TOKEN_KEY]);
        });
      } else {
        const stored = localStorage.getItem(AUTH_TOKEN_KEY);
        if (stored) setToken(stored);
      }
    }, []);
  
    const login = async (username: string, password: string) => {
      const newToken = await api.login(username, password);
  
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const chromeStorage = (window as any).chrome?.storage?.local;
      if (chromeStorage?.set) {
        chromeStorage.set({ [AUTH_TOKEN_KEY]: newToken });
      } else {
        localStorage.setItem(AUTH_TOKEN_KEY, newToken);
      }
  
      setToken(newToken);
    };
  
    const logout = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const chromeStorage = (window as any).chrome?.storage?.local;
      if (chromeStorage?.remove) {
        chromeStorage.remove(AUTH_TOKEN_KEY);
      } else {
        localStorage.removeItem(AUTH_TOKEN_KEY);
      }
      setToken(null);
    };
  
    return (
      <AuthContext.Provider
        value={{ token, isAuthenticated: Boolean(token), login, logout }}
      >
        {children}
      </AuthContext.Provider>
    );
  };