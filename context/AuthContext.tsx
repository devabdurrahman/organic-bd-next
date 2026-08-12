"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { WCUser } from "@/lib/auth";

interface AuthContextType {
  user: WCUser | null;
  token: string | null;
  login: (token: string, user: WCUser) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<WCUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("wc_token");
    const savedUser = localStorage.getItem("wc_user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (token: string, user: WCUser) => {
    setToken(token);
    setUser(user);
    localStorage.setItem("wc_token", token);
    localStorage.setItem("wc_user", JSON.stringify(user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("wc_token");
    localStorage.removeItem("wc_user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoggedIn: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}