
import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { getUserProfile, login, register as registerUser } from "@/api/auth";

interface AuthContextProps {
  user: any;
  loading: boolean;
  isAuthenticated: boolean;
  loginUser: (email: string, password: string) => Promise<any>;
  registerUser: (name: string, email: string, password: string) => Promise<any>;
  logout: () => void;
  setUser: (user: any) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserProfile()
        .then((profile) => {
          setUser(profile);
        })
        .catch(() => {
          setUser(null);
          localStorage.removeItem("token");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const loginUser = async (email: string, password: string) => {
    const data = await login({ email, password });
    setUser(data);
    return data;
  };

  const registerUserFn = async (name: string, email: string, password: string) => {
    const data = await registerUser({ name, email, password });
    setUser(data);
    return data;
  };

  const logoutFn = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      loading,
      loginUser,
      registerUser: registerUserFn,
      logout: logoutFn,
      setUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
