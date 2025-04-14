
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-starry py-20 md:py-32">
      {/* Starry background pattern overlay */}
      <div 
        className="absolute inset-0 bg-starry-pattern opacity-20 animate-starry-bg" 
        style={{ backgroundSize: "600px 600px" }}
      ></div>
      
      {/* Hero content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="block bg-gradient-to-r from-starry-purple to-starry-vividPurple text-transparent bg-clip-text">
              Heroic Fashion
            </span>
            <span className="block text-white">For Everyday Adventures</span>
          </h1>
          
          <p className="text-starry-softPurple text-lg md:text-xl mb-8 leading-relaxed">
            Unique T-shirts inspired by comic superheroes and Van Gogh's Starry Night.
            Express your inner hero with our exclusive designs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-starry-orange hover:bg-starry-orange/90 text-white font-medium px-8"
            >
              Shop Collection
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-starry-purple text-starry-purple hover:bg-starry-purple/10"
            >
              Explore Designs
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-starry-vividPurple/20 rounded-full blur-3xl"></div>
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-starry-blue/10 rounded-full blur-3xl"></div>
    </section>
  );
}
