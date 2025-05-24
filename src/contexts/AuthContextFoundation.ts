import {createContext} from "react";

export interface AuthContextType {
    token: string | null;
    isAuthenticated: boolean;
    user: { id: string; name: string } | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
  }
  
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
