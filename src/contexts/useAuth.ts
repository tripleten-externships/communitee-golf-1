import {useContext} from "react";

import  { AuthContext } from "./AuthContextFoundation"

// custom hook
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useContext must be inside AuthProvider");
    return context;
  };
  