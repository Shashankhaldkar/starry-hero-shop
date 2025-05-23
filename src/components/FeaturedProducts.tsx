
import { useState, useEffect } from "react";
import { getFeaturedProducts } from "@/api/productsData";
import { Card } from "@/components/ui/card";
import { Product } from "@/types";
import { cn } from "@/lib/utils";
import { Star, Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export function FeaturedProducts() {
  // Filter only featured products
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    getFeaturedProducts().then((data) => {
      setFeaturedProducts(data);
    });
  }, []);
  
  const handleAddToCart = (product: Product, e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    toast.success(`Added ${product.name} to your cart!`);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Comic-style decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute top-20 left-[30%] w-40 h-40 border-8 border-white rounded-full"></div>
        <div className="absolute bottom-40 right-[10%] w-60 h-60 border-8 border-white rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-2 text-white">Featured Hero Gear</h2>
        <p className="text-purple-300 text-center mb-10">Exclusive designs our heroes would wear</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Link 
              to={`/product/${product.id}`}
              key={product.id} 
              className="group"
            >
              <div 
                className="bg-gradient-to-b from-indigo-800/60 to-purple-800/40 backdrop-blur-sm rounded-xl overflow-hidden border-2 border-purple-500/30 hover:border-purple-400/70 transition-all duration-300 h-full"
              >
                {/* Product image */}
                <div className="aspect-[4/5] overflow-hidden relative">
                  {/* Comic-style beam background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 via-purple-600/0 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Comic burst on discount */}
                  {product.discountPrice && (
                    <div className="absolute top-4 right-4 w-16 h-16">
                      <div className="absolute inset-0 bg-yellow-400 rounded-full animate-pulse-gentle"></div>
                      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-purple-900 transform -rotate-12">
                        {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                      </div>
                      {/* Starburst effect */}
                      {[...Array(8)].map((_, i) => (
                        <div 
                          key={i} 
                          className="absolute w-16 h-1 bg-yellow-300"
                          style={{
                            left: '50%', 
                            top: '50%',
                            transform: `translateX(-50%) translateY(-50%) rotate(${i * 45}deg)`,
                            transformOrigin: 'center'
                          }}
                        ></div>
                      ))}
                    </div>
                  )}
                  
                  {/* Quick actions */}
                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      size="icon" 
                      variant="secondary" 
                      className="rounded-full bg-purple-800/80 hover:bg-purple-700/80 text-white w-8 h-8 mb-2"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toast.success(`Added ${product.name} to wishlist!`);
                      }}
                    >
                      <Heart size={14} />
                    </Button>
                  </div>
                </div>
                
                {/* Product details */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium text-white group-hover:text-purple-300 transition-colors">
                      {product.name}
                    </h3>
                  </div>
                  
                  {/* Category & theme badges */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs px-2 py-1 bg-purple-800/60 text-purple-300 rounded-full border border-purple-600/30">
                      {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                    </span>
                    <span className="text-xs px-2 py-1 bg-indigo-800/60 text-blue-300 rounded-full border border-indigo-600/30">
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
                              ? "text-yellow-400 fill-yellow-400"
                              : star <= product.rating
                              ? "text-yellow-400 fill-yellow-400/50"
                              : "text-gray-500"
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-purple-300 ml-2">
                      ({product.reviewCount})
                    </span>
                  </div>
                  
                  {/* Price & add to cart */}
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-end gap-2">
                      {product.discountPrice ? (
                        <>
                          <span className="text-lg font-bold text-white">${product.discountPrice.toFixed(2)}</span>
                          <span className="text-sm text-purple-400 line-through">${product.price.toFixed(2)}</span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-white">${product.price.toFixed(2)}</span>
                      )}
                    </div>
                    <Button 
                      variant="ghost"
                      className="text-white border border-purple-500/30 hover:bg-purple-700/30 hover:text-white"
                      onClick={(e) => handleAddToCart(product, e)}
                    >
                      <ShoppingBag className="mr-1 h-4 w-4" /> Add
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* View all button */}
        <div className="text-center mt-12">
          <Link to="/shop">
            <Button
              size="lg"
              className="bg-purple-700/50 hover:bg-purple-600/70 text-white font-medium px-8 border border-purple-500/50"
            >
              View All Hero Gear
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
