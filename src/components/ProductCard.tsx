
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoading(true);
    
    try {
      addToCart(
        product,
        1,
        product.price.toString(),
        product.discountPrice !== undefined && product.discountPrice !== null
          ? product.discountPrice.toString()
          : null
      );
      
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      }); 
    } finally {
      setIsLoading(false);
    }
  };

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${isWishlisted ? 'removed from' : 'added to'} your wishlist`,
    });
  };

  const handleViewProduct = () => {
    navigate(`/product/${product.id}`);
  };

  const discountPercentage = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  return (
    <Card className="group overflow-hidden bg-purple-900/20 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 cursor-pointer">
      <div className="relative overflow-hidden" onClick={handleViewProduct}>
        {/* Product Image */}
        <div className="aspect-square overflow-hidden bg-gray-800/30">
          <img
            src={product.images[0] || 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=500'}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=500';
            }}
          />
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.featured && (
            <Badge className="bg-yellow-500/90 text-black">Featured</Badge>
          )}
          {discountPercentage > 0 && (
            <Badge variant="destructive" className="bg-red-500/90">
              -{discountPercentage}%
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            variant="secondary"
            className="bg-white/90 hover:bg-white text-gray-800"
            onClick={handleWishlistToggle}
          >
            <Heart 
              className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} 
            />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="bg-white/90 hover:bg-white text-gray-800"
            onClick={handleViewProduct}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Category and Theme Tags */}
        <div className="flex gap-2">
          <Badge variant="outline" className="text-xs border-purple-400/30 text-purple-300">
            {product.category}
          </Badge>
          <Badge variant="outline" className="text-xs border-blue-400/30 text-blue-300">
            {product.theme}
          </Badge>
        </div>

        {/* Product Name */}
        <h3 
          className="font-semibold text-white line-clamp-2 cursor-pointer hover:text-purple-300 transition-colors"
          onClick={handleViewProduct}
        >
          {product.name}
        </h3>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-3 h-3 ${
                    star <= Math.floor(product.rating || 0)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-400"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400">
              ({product.reviewCount || 0})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {product.discountPrice ? (
              <>
                <span className="text-lg font-bold text-white">
                  ₹{product.discountPrice.toFixed(2)}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ₹{product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-white">
                ₹{product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Stock Status */}
        <div className="flex items-center justify-between">
          <span className={`text-xs ${product.inStock && product.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {product.inStock && product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock || product.stock === 0 || isLoading}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {isLoading ? 'Adding...' : product.inStock && product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardContent>
    </Card>
  );
};
