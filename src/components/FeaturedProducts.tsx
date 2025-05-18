import { useState, useEffect } from "react";
import { getFeaturedProducts } from "@/api/productsData";
import { Card } from "@/components/ui/card";
import { Product } from "@/types";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FeaturedProducts() {
  // Filter only featured products
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    getFeaturedProducts().then((data) => {
      setFeaturedProducts(data);
    });
  }, []);

  return (
    <section className="py-16 bg-starry-charcoal">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2 text-white">Featured T-Shirts</h2>
        <p className="text-starry-neutral text-center mb-10">Exclusive designs our heroes would wear</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div 
              key={product.id} 
              className="group bg-gradient-to-b from-starry-darkPurple/40 to-starry-darkPurple/20 backdrop-blur-sm rounded-xl overflow-hidden border border-starry-purple/10 hover:border-starry-purple/30 transition-all duration-300"
            >
              {/* Product image */}
              <div className="aspect-[4/5] overflow-hidden relative">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Discount badge if applicable */}
                {product.discountPrice && (
                  <div className="absolute top-4 right-4 bg-starry-orange text-white text-xs font-medium px-2 py-1 rounded-md">
                    {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                  </div>
                )}
              </div>
              
              {/* Product details */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium text-white group-hover:text-starry-purple transition-colors">
                    {product.name}
                  </h3>
                </div>
                
                {/* Category & theme badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-xs px-2 py-1 bg-starry-darkPurple/60 text-starry-purple rounded-full">
                    {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                  </span>
                  <span className="text-xs px-2 py-1 bg-starry-darkPurple/60 text-starry-blue rounded-full">
                    {product.theme.charAt(0).toUpperCase() + product.theme.slice(1)}
                  </span>
                </div>
                
                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          "w-4 h-4",
                          star <= Math.floor(product.rating)
                            ? "text-starry-orange fill-starry-orange"
                            : star <= product.rating
                            ? "text-starry-orange fill-starry-orange/50"
                            : "text-gray-300"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-starry-neutral ml-2">
                    ({product.reviewCount})
                  </span>
                </div>
                
                {/* Price & add to cart */}
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-end gap-2">
                    {product.discountPrice ? (
                      <>
                        <span className="text-lg font-bold text-white">${product.discountPrice.toFixed(2)}</span>
                        <span className="text-sm text-starry-neutral line-through">${product.price.toFixed(2)}</span>
                      </>
                    ) : (
                      <span className="text-lg font-bold text-white">${product.price.toFixed(2)}</span>
                    )}
                  </div>
                  <Button 
                    variant="ghost"
                    className="text-starry-purple border border-starry-purple/20 hover:bg-starry-purple/10 hover:text-starry-vividPurple"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* View all button */}
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-starry-purple hover:bg-starry-vividPurple text-white font-medium px-8"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}
