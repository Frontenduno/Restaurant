import { createContext, useState, type ReactNode } from "react";
import type { User } from "@/types";
import { users, getRolPath } from "@/data";

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => { success: boolean; user?: User; error?: string };
  logout: () => void;
  getRedirectPath: () => string;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  function login(email: string, password: string) {
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) return { success: false, error: "Credenciales incorrectas" };
    if (!found.isActive) return { success: false, error: "Usuario desactivado" };

    const { password: _, ...userWithoutPassword } = found;
    const userToSet = userWithoutPassword as User;
    setUser(userToSet);
    return { success: true, user: userToSet };
  }

  function logout() {
    setUser(null);
  }

  function getRedirectPath() {
    return user ? getRolPath(user.rol.nombre) : "/login";
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, getRedirectPath }}>
      {children}
    </AuthContext.Provider>
  );
}
