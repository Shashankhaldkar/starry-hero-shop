
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getWishlist } from "@/api/auth";

export const WishlistTab = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const wishlistItems = await getWishlist();
      setWishlist(wishlistItems);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      toast({
        title: "Error",
        description: "Failed to load your wishlist",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-starry-darkPurple/40 border-starry-purple/20 text-white">
      <CardHeader>
        <CardTitle>My Wishlist</CardTitle>
        <CardDescription className="text-gray-400">
          Products you've saved for later
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="p-10 text-center">
            <p>Loading your wishlist...</p>
          </div>
        ) : wishlist.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {wishlist.map((product: any) => (
              <div key={product.id} className="border border-starry-purple/20 rounded-lg p-4 flex">
                <div className="w-16 h-16 bg-starry-charcoal/30 rounded overflow-hidden mr-4">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="text-sm text-gray-400">${product.price.toFixed(2)}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="self-center border-starry-purple/30 text-starry-purple h-8"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  View
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-10 text-center">
            <Heart className="mx-auto h-12 w-12 text-gray-500 mb-3" />
            <h3 className="text-lg font-medium mb-1">Your Wishlist is Empty</h3>
            <p className="text-gray-400">
              You haven't added any items to your wishlist yet
            </p>
            <Button 
              className="mt-4 bg-starry-purple hover:bg-starry-vividPurple"
              onClick={() => navigate("/products")}
            >
              Browse Products
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
