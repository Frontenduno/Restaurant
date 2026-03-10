import { createContext, useState, useEffect, type ReactNode } from "react";
import type { User } from "@/types";
import { users, getRolPath } from "@/data";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  getRedirectPath: () => string;
};

export const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = "restaurant_auth_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored) as User);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  function login(email: string, password: string) {
    const found = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!found) {
      return { success: false, error: "Credenciales incorrectas" };
    }

    if (!found.isActive) {
      return { success: false, error: "Usuario desactivado" };
    }

    const { password: _, ...userWithoutPassword } = found;
    void _;
    setUser(userWithoutPassword);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userWithoutPassword));
    return { success: true };
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  function getRedirectPath(): string {
    if (!user) return "/login";
    return getRolPath(user.rol.nombre);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, getRedirectPath }}>
      {children}
    </AuthContext.Provider>
  );
}
