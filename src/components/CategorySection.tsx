
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Category } from "@/types";
import { categories } from "@/data/products";
import { cn } from "@/lib/utils";

export function CategorySection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState<{[key: string]: boolean}>({});

  // Mark the section as loaded once all images are preloaded
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Handle image loading state
  const handleImageLoad = (id: string) => {
    setLoadedImages(prev => ({...prev, [id]: true}));
  };

  return (
    <section className="py-16 bg-gradient-to-b from-indigo-900 to-purple-900 relative overflow-hidden">
      {/* Comic-style background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-20 h-20 bg-yellow-400 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-500 rounded-full blur-xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-center mb-2 text-white drop-shadow-lg">
            Hero Categories
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Choose your superhero style from our exclusive collections
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={`/category/${category.id}`}
              className={cn(
                "group relative overflow-hidden rounded-lg bg-gradient-to-br from-indigo-800/80 to-purple-900/80",
                "transition-all duration-300 hover:scale-105",
                "border-2 border-purple-500/30 hover:border-purple-500/70 shadow-lg",
                "transform hover:-rotate-1 hover:shadow-xl",
                !isLoaded && "animate-pulse"
              )}
            >
              {/* Comic-style border effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-600 to-blue-500 opacity-30 group-hover:opacity-60 transition-opacity rounded-lg"></div>
              
              {/* Category image with overlay */}
              <div className="aspect-square relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-indigo-900/80 z-10"></div>
                {loadedImages[category.id] ? null : (
                  <div className="absolute inset-0 bg-indigo-800/50 z-5 flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                <img 
                  src={category.image} 
                  alt={category.name}
                  onLoad={() => handleImageLoad(category.id)}
                  className={cn(
                    "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110",
                    loadedImages[category.id] ? "opacity-100" : "opacity-0"
                  )}
                />
                
                {/* Comic-style burst effect on hover */}
                <div className="absolute -right-10 -bottom-10 w-28 h-28 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-20 transition-all duration-500 group-hover:scale-110"></div>
                
                {/* Comic-style stars */}
                <div className="absolute top-5 right-5 w-6 h-6 bg-yellow-300 transform rotate-45 opacity-0 group-hover:opacity-40 transition-all duration-300"></div>
                <div className="absolute top-10 left-7 w-4 h-4 bg-blue-300 transform rotate-12 opacity-0 group-hover:opacity-30 transition-all duration-700 delay-100"></div>
              </div>
              
              {/* Category name */}
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20 bg-gradient-to-t from-indigo-900/90 to-transparent pb-6">
                <h3 className="text-xl font-bold text-white drop-shadow-md tracking-wide group-hover:translate-x-1 transition-transform duration-300">
                  {category.name}
                  <ChevronRight className="inline-block h-5 w-5 ml-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1" />
                </h3>
                <div className="h-0.5 w-0 group-hover:w-16 bg-purple-400 mt-2 transition-all duration-500 rounded-full"></div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/shop" className="inline-block">
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 
              text-white font-medium px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all 
              border border-purple-500/50 text-lg h-auto">
              View All Heroes <ChevronRight className="ml-1 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
