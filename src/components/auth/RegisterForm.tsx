
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export const RegisterForm = ({ onSwitchToLogin }: RegisterFormProps) => {
  const { registerUser } = useAuth();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      if (!form.name || !form.email || !form.password) {
        throw new Error("All fields are required");
      }
      
      if (form.password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }
      
      const result = await registerUser(form.name, form.email, form.password, isAdmin);
      console.log("Registration successful:", result);
      toast({
        title: "Registration successful",
        description: `Welcome to StarryHero${isAdmin ? " Admin" : ""}!`,
      });
    } catch (err: any) {
      console.error("Registration error:", err);
      setError(err.message || "Registration failed. Try another email!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4" autoComplete="on">
      <Input
        name="name"
        placeholder="Name"
        required
        value={form.name}
        autoComplete="name"
        onChange={handleChange}
        className="animate-fade-in"
      />
      <Input
        name="email"
        type="email"
        placeholder="Email"
        autoComplete="username"
        required
        value={form.email}
        onChange={handleChange}
        className="animate-fade-in"
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        autoComplete="new-password"
        required
        minLength={6}
        value={form.password}
        onChange={handleChange}
        className="animate-fade-in"
      />
      
      <div className="flex items-center space-x-2">
        <Switch
          id="admin-mode"
          checked={isAdmin}
          onCheckedChange={setIsAdmin}
        />
        <Label htmlFor="admin-mode" className="flex items-center gap-1">
          <Settings className="h-4 w-4" />
          Admin Mode
        </Label>
      </div>

      {error && (
        <div className="text-destructive text-sm animate-shake bg-destructive/10 p-2 rounded">
          {error}
        </div>
      )}
      <Button
        type="submit"
        className="w-full btn-hero-hover mt-2"
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </Button>

      <div className="flex items-center my-4">
        <div className="flex-1 h-px bg-starry-purple/40" />
        <span className="px-2 text-xs text-muted-foreground select-none">or</span>
        <div className="flex-1 h-px bg-starry-purple/40" />
      </div>

      <p className="text-xs text-center mt-4">
        Already have an account?{" "}
        <button
          className="text-starry-purple underline font-semibold"
          type="button"
          onClick={onSwitchToLogin}
        >
          Login
        </button>
      </p>
    </form>
  );
};
