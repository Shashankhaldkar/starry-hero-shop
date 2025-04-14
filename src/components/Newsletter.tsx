
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  return (
    <section className="py-16 bg-starry-darkPurple">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3 text-white">Join Our Universe</h2>
          <p className="text-starry-neutral mb-8 mx-auto max-w-2xl">
            Subscribe to our newsletter and be the first to know about new collections, 
            exclusive offers, and superhero-worthy discounts.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-starry-charcoal border-starry-purple/30 text-white placeholder:text-starry-neutral/60 focus-visible:ring-starry-purple"
              required
            />
            <Button type="submit" className="bg-starry-purple hover:bg-starry-vividPurple text-white">
              Subscribe <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </form>
          
          <p className="text-starry-neutral/60 text-sm mt-4">
            By subscribing, you agree to our <a href="/privacy" className="underline hover:text-starry-purple">Privacy Policy</a>.
            We promise not to share your information.
          </p>
        </div>
      </div>
    </section>
  );
}
