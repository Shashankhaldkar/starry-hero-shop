
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

import { categories } from "@/data/products";

export function CategorySection() {
  return (
    <section className="py-16 bg-starry-darkPurple">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2 text-white">Shop by Category</h2>
        <p className="text-starry-neutral text-center mb-10">Find the perfect t-shirt style for your collection</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <a 
              key={category.id} 
              href={`/category/${category.id}`}
              className="group relative overflow-hidden rounded-lg bg-starry-charcoal/30 transition-transform hover:scale-105 duration-300"
            >
              {/* Category image with overlay */}
              <div className="aspect-square relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-starry-darkPurple/80 z-10"></div>
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Category name */}
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                <h3 className="text-lg font-medium text-white">{category.name}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
