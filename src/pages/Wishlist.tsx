
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getWishlist, removeFromWishlist } from '@/api/auth';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Trash2, Star } from 'lucide-react';
import { Product } from '@/types';
import { toast } from '@/hooks/use-toast';

const Wishlist = () => {
  const queryClient = useQueryClient();
  
  // Fetch wishlist items
  const { data: wishlistItems, isLoading, error } = useQuery({
    queryKey: ['wishlist'],
    queryFn: getWishlist
  });
  
  // Remove from wishlist mutation
  const removeFromWishlistMutation = useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      toast({
        title: "Item removed",
        description: "The item has been removed from your wishlist",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "There was a problem removing the item from your wishlist",
        variant: "destructive",
      });
    }
  });
  
  // Handle adding to cart
  const handleAddToCart = (product: Product) => {
    // Add to cart logic would go here
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };
  
  // Handle removing from wishlist
  const handleRemoveFromWishlist = (productId: string) => {
    removeFromWishlistMutation.mutate(productId);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-starry-darkPurple text-white">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-starry-charcoal/50 rounded w-1/4 mb-8"></div>
            {[...Array(3)].map((_, index) => (
              <div key={index} className="mb-6 flex gap-4">
                <div className="w-20 h-20 bg-starry-charcoal/50 rounded"></div>
                <div className="flex-1">
                  <div className="h-6 bg-starry-charcoal/50 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-starry-charcoal/50 rounded w-1/4 mb-2"></div>
                  <div className="h-4 bg-starry-charcoal/50 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-starry-darkPurple text-white">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">Error Loading Wishlist</h2>
            <p className="text-starry-neutral mb-8">There was a problem loading your wishlist. Please try again later.</p>
            <Button onClick={() => queryClient.invalidateQueries({ queryKey: ['wishlist'] })}>
              Retry
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-starry-darkPurple text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
        
        {wishlistItems && wishlistItems.length > 0 ? (
          <div className="bg-starry-charcoal/30 rounded-lg p-6">
            <div className="grid gap-6">
              {wishlistItems.map((item: Product) => (
                <div 
                  key={item.id} 
                  className="flex flex-col md:flex-row items-start md:items-center gap-4 border-b border-starry-charcoal/50 pb-6 last:border-0 last:pb-0"
                >
                  {/* Product image */}
                  <a 
                    href={`/product/${item.id}`} 
                    className="w-20 h-20 bg-starry-charcoal/20 rounded overflow-hidden flex-shrink-0"
                  >
                    <img 
                      src={item.images[0]} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </a>
                  
                  {/* Product details */}
                  <div className="flex-1">
                    <h3 className="font-medium">
                      <a href={`/product/${item.id}`} className="hover:text-starry-purple transition-colors">
                        {item.name}
                      </a>
                    </h3>
                    <div className="flex items-center mt-1 mb-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={
                              star <= Math.floor(item.rating)
                                ? "w-4 h-4 text-starry-orange fill-starry-orange"
                                : star <= item.rating
                                ? "w-4 h-4 text-starry-orange fill-starry-orange/50"
                                : "w-4 h-4 text-gray-300"
                            }
                          />
                        ))}
                      </div>
                      <span className="text-xs text-starry-neutral ml-2">
                        ({item.reviewCount})
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span className="text-xs px-2 py-1 bg-starry-darkPurple/60 text-starry-purple rounded-full">
                        {item.category}
                      </span>
                      <span className="text-xs px-2 py-1 bg-starry-darkPurple/60 text-starry-blue rounded-full">
                        {item.theme}
                      </span>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-end gap-2 md:w-32 w-full justify-start md:justify-end">
                    {item.discountPrice ? (
                      <>
                        <span className="text-lg font-bold">₹{item.discountPrice.toFixed(2)}</span>
                        <span className="text-sm text-starry-neutral line-through">₹{item.price.toFixed(2)}</span>
                      </>
                    ) : (
                      <span className="text-lg font-bold">₹{item.price.toFixed(2)}</span>
                    )}
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex gap-2 md:w-auto w-full">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-starry-neutral hover:text-white border border-starry-purple/20 hover:bg-starry-purple/10"
                      onClick={() => handleRemoveFromWishlist(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      className="bg-starry-purple hover:bg-starry-vividPurple w-full md:w-auto"
                      onClick={() => handleAddToCart(item)}
                      disabled={!item.inStock || item.stock === 0}
                    >
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      {item.inStock && item.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-starry-charcoal/30 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
            <p className="text-starry-neutral mb-8">
              Save your favorite t-shirts for later by adding them to your wishlist.
            </p>
            <Button 
              onClick={() => window.location.href = '/products'}
              className="bg-starry-purple hover:bg-starry-vividPurple"
            >
              Explore T-Shirts
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;
