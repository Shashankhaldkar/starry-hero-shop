import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import * as authAPI from "@/api/auth";

interface AuthContextProps {
  user: any;
  loading: boolean;
  isAuthenticated: boolean;
  loginUser: (email: string, password: string, isAdmin?: boolean) => Promise<any>;
  registerUser: (name: string, email: string, password: string, isAdmin?: boolean) => Promise<any>;
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
      authAPI.getUserProfile()
        .then((profile) => {
          setUser(profile);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
          setUser(null);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const loginUser = async (email: string, password: string, isAdmin: boolean = false) => {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    
    try {
      console.log("Attempting login with:", { email, isAdmin });
      const data = await authAPI.login({ email, password, isAdmin });
      console.log("Login response:", data);
      setUser(data);
      return data;
    } catch (error) {
      console.error("Login error in context:", error);
      throw error;
    }
  };

  const registerUserFn = async (name: string, email: string, password: string, isAdmin: boolean = false) => {
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }
    
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }
    
    try {
      console.log("Attempting registration with:", { name, email, isAdmin });
      const data = await authAPI.register({ name, email, password, isAdmin });
      console.log("Registration response:", data);
      setUser(data);
      return data;
    } catch (error) {
      console.error("Registration error in context:", error);
      throw error;
    }
  };

  const logoutFn = () => {
    authAPI.logout();
    setUser(null);
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
