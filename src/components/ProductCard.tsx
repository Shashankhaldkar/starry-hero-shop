
import { FC } from "react";
import { Product } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  
  const handleProductClick = () => {
    navigate(`/products/${product.id}`);
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Cart functionality would be implemented here
    console.log("Added to cart:", product.name);
  };
  
  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Wishlist functionality would be implemented here
    console.log("Added to wishlist:", product.name);
  };
  
  return (
    <Card 
      className="bg-starry-darkBlue/40 border-starry-purple/30 transition-all hover:border-starry-purple cursor-pointer overflow-hidden group"
      onClick={handleProductClick}
    >
      <CardContent className="p-0">
        <div className="relative">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.discountPrice > 0 && (
            <Badge className="absolute top-2 left-2 bg-starry-vividPurple">
              Sale
            </Badge>
          )}
          <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              size="icon" 
              variant="secondary"
              className="rounded-full bg-black/50 hover:bg-black/70"
              onClick={handleAddToWishlist}
            >
              <Heart size={16} />
            </Button>
            <Button 
              size="icon" 
              variant="secondary"
              className="rounded-full bg-black/50 hover:bg-black/70"
              onClick={handleAddToCart}
            >
              <ShoppingBag size={16} />
            </Button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-starry-neutral">{product.category}</span>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="text-xs ml-1">{product.rating}</span>
            </div>
          </div>
          
          <h3 className="font-medium mt-1 line-clamp-1">{product.name}</h3>
          
          <div className="mt-2 flex items-center justify-between">
            <div>
              {product.discountPrice > 0 ? (
                <div className="flex items-center">
                  <span className="font-semibold">₹{product.discountPrice}</span>
                  <span className="text-sm text-starry-neutral line-through ml-2">₹{product.price}</span>
                </div>
              ) : (
                <span className="font-semibold">₹{product.price}</span>
              )}
            </div>
            <Button 
              size="sm" 
              variant="outline" 
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
