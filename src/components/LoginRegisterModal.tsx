
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { LogIn, UserPlus } from "lucide-react";
import { LoginForm } from "./auth/LoginForm";
import { RegisterForm } from "./auth/RegisterForm";
import { HeroCarousel } from "./auth/HeroCarousel";

interface LoginRegisterModalProps {
  open: boolean;
}

export const LoginRegisterModal: React.FC<LoginRegisterModalProps> = ({ open }) => {
  const [view, setView] = useState<"login" | "register">("login");

  return (
    <Dialog open={open}>
      <DialogContent className="max-w-2xl w-full animate-fade-in p-0 overflow-hidden rounded-xl border-2 border-starry-purple shadow-xl">
        <div className="flex flex-col md:flex-row w-full">
          <HeroCarousel />
          <div className="flex-1 px-6 py-8 bg-card flex flex-col justify-center">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 starry-text-gradient text-2xl font-bold mb-2">
                {view === "login" ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                {view === "login" ? "Sign In to StarryHero" : "Create your StarryHero Account"}
              </DialogTitle>
              <DialogDescription>
                {view === "login"
                  ? "Join the hero league! Log in to access your superpowers."
                  : "Register and begin your superhero story with us."}
              </DialogDescription>
            </DialogHeader>
            
            {view === "login" ? (
              <LoginForm onSwitchToRegister={() => setView("register")} />
            ) : (
              <RegisterForm onSwitchToLogin={() => setView("login")} />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
