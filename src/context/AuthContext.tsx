
import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import * as authAPI from "@/api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

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
    // Check for user in localStorage on initial load
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    
    if (storedUser && token) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
      setLoading(false);
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
      toast({
        title: "Login successful",
        description: `Welcome back, ${data.name}!`
      });
      return data;
    } catch (error: any) {
      console.error("Login error in context:", error);
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials",
        variant: "destructive"
      });
      throw error;
    }
  };

  const registerUser = async (name: string, email: string, password: string, isAdmin: boolean = false) => {
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
      toast({
        title: "Registration successful",
        description: `Welcome, ${data.name}!`
      });
      return data;
    } catch (error: any) {
      console.error("Registration error in context:", error);
      toast({
        title: "Registration failed",
        description: error.message || "Registration failed",
        variant: "destructive"
      });
      throw error;
    }
  };

  const logoutFn = () => {
    try {
      authAPI.logout();
      setUser(null);
      toast({
        title: "Logout successful",
        description: "You've been logged out successfully"
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout failed",
        description: "There was an error logging out",
        variant: "destructive"
      });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      loading,
      loginUser,
      registerUser,
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
