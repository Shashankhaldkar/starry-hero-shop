
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 py-20 md:py-32">
      {/* Comic-style background elements */}
      <div className="absolute inset-0">
        {/* Comic dots pattern */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle,_white_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
        
        {/* Energy bursts */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-400 rounded-full blur-3xl opacity-20 animate-pulse-gentle"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse-gentle"></div>
        
        {/* Comic-style burst lines */}
        <div className="absolute top-20 right-20 w-40 h-40">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className="absolute w-full h-1 bg-gradient-to-r from-purple-400/0 via-purple-400/30 to-purple-400/0"
              style={{
                transform: `rotate(${i * 22.5}deg)`,
                top: '50%'
              }}
            ></div>
          ))}
        </div>
      </div>
      
      {/* Hero content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="block bg-gradient-to-r from-purple-300 via-purple-400 to-blue-400 text-transparent bg-clip-text drop-shadow-xl">
              Heroic Threads
            </span>
            <span className="block text-white mt-2">For Everyday Heroes</span>
          </h1>
          
          <p className="text-purple-200 text-lg md:text-xl mb-8 leading-relaxed">
            Unleash your inner superhero with our comic-inspired apparel.
            Bold designs that make a statement, just like your favorite heroes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium px-8 shadow-lg shadow-purple-900/30 border border-purple-500/50 hover:shadow-xl transition-all"
              >
                Shop Collection
              </Button>
            </Link>
            <Link to="/collections">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-purple-400 text-purple-300 hover:bg-purple-600/20 shadow-lg shadow-purple-900/20"
              >
                Explore Designs
              </Button>
            </Link>
          </div>
          
          {/* Comic-style caption */}
          <div className="mt-12 italic text-sm text-purple-300/70">
            *No capes included. Superhero abilities not guaranteed.
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl"></div>
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl"></div>
    </section>
  );
}
