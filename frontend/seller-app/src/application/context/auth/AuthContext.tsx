import { createContext, useContext } from "react";
import type { AuthUser } from "../../../domain/model/user";

export interface AuthContextType {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = (): AuthContextType => {
  return useContext(AuthContext)!;
};
