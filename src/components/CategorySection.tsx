
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

import { categories } from "@/data/products";

export function CategorySection() {
  return (
    <section className="py-16 bg-gradient-to-b from-indigo-900 to-purple-900 relative overflow-hidden">
      {/* Comic-style background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-20 h-20 bg-yellow-400 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-2 text-white drop-shadow-lg">Hero Categories</h2>
        <p className="text-white text-center mb-10 opacity-90">Choose your superhero style</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={`/category/${category.id}`}
              className="group relative overflow-hidden rounded-lg bg-indigo-900/50 transition-transform hover:scale-105 duration-300 border-2 border-purple-500/30 hover:border-purple-500/70"
            >
              {/* Comic-style border effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-600 to-blue-500 opacity-30 group-hover:opacity-60 transition-opacity rounded-lg"></div>
              
              {/* Category image with overlay */}
              <div className="aspect-square relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-900/80 z-10"></div>
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Comic-style burst effect on hover */}
                <div className="absolute -right-10 -bottom-10 w-20 h-20 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </div>
              
              {/* Category name */}
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                <h3 className="text-lg font-medium text-white drop-shadow-md">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/shop">
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium px-6 py-2 rounded-md shadow-lg hover:shadow-xl transition-all border border-purple-500/50">
              View All Heroes <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
