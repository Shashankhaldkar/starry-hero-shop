
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LogIn, UserPlus, Mail } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

// Superhero image placeholders
const HERO_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=400&q=80",
    alt: "Superhero 1: Woman with laptop",
    caption: "Unleash your inner hero.",
  },
  {
    src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80",
    alt: "Superhero 2: The Matrix",
    caption: "Enter the Matrix with StarryHero.",
  },
  {
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80",
    alt: "Superhero 3: Woman in white shirt",
    caption: "Join forces with amazing heroes.",
  },
  {
    src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=400&q=80",
    alt: "Superhero 4: Robot hero",
    caption: "Every hero is unique.",
  },
];

interface LoginRegisterModalProps {
  open: boolean;
}

export const LoginRegisterModal: React.FC<LoginRegisterModalProps> = ({ open }) => {
  const { loginUser, registerUser } = useAuth();

  const [view, setView] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pick 3 random images for each open
  const [carouselImages] = useState(() => {
    const shuffled = [...HERO_IMAGES].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await loginUser(form.email, form.password);
      // add mild animation or success feedback (you can display a toast elsewhere)
    } catch (err: any) {
      setError("😅 Invalid credentials. Please try again!");
    }
    setLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await registerUser(form.name, form.email, form.password);
      // add mild animation or success feedback
    } catch (err: any) {
      setError("🚨 Registration failed. Try another email!");
    }
    setLoading(false);
  };

  // Redirect to backend Google OAuth endpoint
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/users/auth/google`;
  };

  return (
    <Dialog open={open}>
      <DialogContent className="max-w-2xl w-full animate-fade-in p-0 overflow-hidden rounded-xl border-2 border-starry-purple shadow-xl">
        <div className="flex flex-col md:flex-row w-full">
          {/* Carousel section - hidden on mobile */}
          <div className="hidden md:flex flex-col justify-center items-center bg-starry-darkPurple px-4 py-8 min-w-[300px] w-1/2">
            <Carousel className="w-full max-w-xs">
              <CarouselContent>
                {carouselImages.map((img, idx) => (
                  <CarouselItem key={img.src}>
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="rounded-lg w-full h-52 object-cover drop-shadow-xl mb-2 hover-scale transition-transform duration-200"
                      style={{ background: "linear-gradient(90deg, #517fa4 0%, #243949 100%)" }}
                    />
                    <div className="text-md font-semibold text-starry-purple text-center">{img.caption}</div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <div className="mt-6 text-sm text-starry-purple text-center font-mono opacity-75">
              Welcome, future hero!
            </div>
          </div>
          {/* Form section */}
          <div className="flex-1 px-6 py-8 bg-card flex flex-col justify-center">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 starry-text-gradient text-2xl font-bold mb-2">
                {view === "login" ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                {view === "login" ? "Sign In to StarryHero" : "Create your StarryHero Account"}
              </DialogTitle>
            </DialogHeader>
            <p className="mb-4 text-muted-foreground text-center text-sm">
              {view === "login"
                ? "Join the hero league! Log in to access your superpowers."
                : "Register and begin your superhero story with us."}
            </p>
            <form
              onSubmit={view === "login" ? handleLogin : handleRegister}
              className="flex flex-col gap-3"
              autoComplete="on"
            >
              {view === "register" && (
                <Input
                  name="name"
                  placeholder="Name"
                  required
                  value={form.name}
                  autoComplete="name"
                  onChange={handleChange}
                  className="animate-fade-in"
                />
              )}
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
                autoComplete={view === "login" ? "current-password" : "new-password"}
                required
                value={form.password}
                onChange={handleChange}
                className="animate-fade-in"
              />
              {error && (
                <span className="text-destructive text-sm animate-shake">{error}</span>
              )}
              <Button
                type="submit"
                className="w-full btn-hero-hover mt-2"
                disabled={loading}
              >
                {loading
                  ? (view === "login" ? "Logging in..." : "Registering...")
                  : (view === "login" ? "Login" : "Register")}
              </Button>
            </form>
            <div className="flex items-center my-4">
              <div className="flex-1 h-px bg-starry-purple/40" />
              <span className="px-2 text-xs text-muted-foreground select-none">or</span>
              <div className="flex-1 h-px bg-starry-purple/40" />
            </div>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 btn-hero-hover"
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <Mail className="w-4 h-4" /> Continue with Google
            </Button>
            <p className="text-xs text-center mt-4">
              {view === "login" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <button
                    className="text-starry-purple underline font-semibold"
                    type="button"
                    onClick={() => setView("register")}
                  >
                    Register
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    className="text-starry-purple underline font-semibold"
                    type="button"
                    onClick={() => setView("login")}
                  >
                    Login
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
