
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LogIn, UserPlus, Google } from "lucide-react";

interface LoginRegisterModalProps {
  open: boolean;
}

export const LoginRegisterModal: React.FC<LoginRegisterModalProps> = ({ open }) => {
  const { loginUser, registerUser, setUser } = useAuth();

  const [view, setView] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await loginUser(form.email, form.password);
    } catch (err: any) {
      setError("Invalid credentials");
    }
    setLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await registerUser(form.name, form.email, form.password);
    } catch (err: any) {
      setError("Failed to register");
    }
    setLoading(false);
  };

  // Redirect to backend Google OAuth endpoint
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/users/auth/google`;
  };

  return (
    <Dialog open={open}>
      <DialogContent className="max-w-xs w-full">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {view === "login" ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
            {view === "login" ? "Login to StarryHero" : "Register for StarryHero"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={view === "login" ? handleLogin : handleRegister} className="flex flex-col gap-4">
          {view === "register" && (
            <Input name="name" placeholder="Name" required value={form.name} onChange={handleChange} />
          )}
          <Input name="email" type="email" placeholder="Email" autoComplete="username" required value={form.email} onChange={handleChange} />
          <Input name="password" type="password" placeholder="Password" autoComplete={view === "login" ? "current-password" : "new-password"} required value={form.password} onChange={handleChange} />
          {error && <span className="text-destructive text-sm">{error}</span>}
          <Button type="submit" className="w-full" loading={loading.toString()}>
            {view === "login" ? "Login" : "Register"}
          </Button>
        </form>
        <Button variant="outline" className="w-full flex items-center justify-center gap-2" type="button" onClick={handleGoogleLogin}>
          <Google className="w-4 h-4" /> Continue with Google
        </Button>
        <p className="text-xs text-center mt-2">
          {view === "login" ? (
            <>Don&apos;t have an account?{" "}
              <button className="text-starry-purple underline" type="button" onClick={() => setView("register")}>Register</button>
            </>
          ) : (
            <>Already have an account?{" "}
              <button className="text-starry-purple underline" type="button" onClick={() => setView("login")}>Login</button>
            </>
          )}
        </p>
      </DialogContent>
    </Dialog>
  );
};
