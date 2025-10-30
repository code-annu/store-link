import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { AuthUser } from "../../../domain/model/user";

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  return (
    <AuthContext.Provider value={{ user: user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
