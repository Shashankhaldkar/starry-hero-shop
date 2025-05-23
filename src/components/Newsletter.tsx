
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export function Newsletter() {
  const [email, setEmail] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter subscription logic would go here
    toast.success("Thanks for joining our superhero newsletter!");
    setEmail("");
  };

  return (
    <section className="py-16 bg-gradient-to-b from-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Comic-style decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute top-10 left-[10%] w-20 h-20 bg-yellow-400 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-[15%] w-32 h-32 bg-blue-500 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 border-8 border-purple-500/20 rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3 text-white drop-shadow-lg">Join Our Hero Network</h2>
          <p className="text-white/90 mb-8 mx-auto max-w-2xl">
            Subscribe to our newsletter and be the first to know about new collections, 
            exclusive offers, and superhero-worthy discounts.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-indigo-800/50 border-purple-500/30 text-white placeholder:text-white/70 focus-visible:ring-purple-400 focus-visible:border-purple-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium transition-all">
              Subscribe <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </form>
          
          <p className="text-white/80 text-sm mt-4">
            By subscribing, you agree to our <Link to="/privacy" className="underline hover:text-purple-300">Privacy Policy</Link>.
            We promise not to share your information with villains.
          </p>
        </div>
      </div>
    </section>
  );
}

import { Link } from "react-router-dom";
