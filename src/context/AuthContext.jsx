import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("bl_token");
    if (!token) {
      setLoading(false);
      return;
    }

    authAPI
      .me()
      .then((res) => setUser(res.data.data))
      .catch(() => localStorage.removeItem("bl_token"))
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await authAPI.login({ email, password });
    const { user: u, token } = res.data.data;
    localStorage.setItem("bl_token", token);
    setUser(u);
    return u;
  }, []);

  const register = useCallback(async (formData) => {
    const res = await authAPI.register(formData);
    const { user: u, token } = res.data.data;
    localStorage.setItem("bl_token", token);
    setUser(u);
    return u;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("bl_token");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
