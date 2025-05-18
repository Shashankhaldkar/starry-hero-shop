import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "@/api/productsData";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Product } from "@/types";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const allProducts = await getAllProducts();
        setProducts(allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (value: string) => {
    setSortOrder(value);
  };

  const getFilteredProducts = () => {
    let filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortOrder === "price-asc") {
      filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-desc") {
      filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "rating-desc") {
      filteredProducts = filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return filteredProducts;
  };

  const navigateToProduct = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div className="min-h-screen bg-gradient-starry text-white">
      <Header />
      <main className="container mx-auto py-6">
        <div className="flex items-center justify-between mb-4">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearch}
            className="bg-gray-800/50 border-gray-700/30 text-white w-full md:w-auto"
          />
          <Select onValueChange={handleSort}>
            <SelectTrigger className="bg-gray-800/50 border-gray-700/30 text-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-white">
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating-desc">Rating: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array(8)
              .fill(0)
              .map((_, index) => (
                <Card key={index} className="bg-gray-900/50 border-gray-700">
                  <CardContent className="p-4">
                    <Skeleton className="h-40 w-full rounded-md mb-2" />
                    <Skeleton className="h-6 w-3/4 mb-1" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardContent>
                </Card>
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <Card 
                key={product._id} 
                className="bg-gray-900/50 border-gray-700 group cursor-pointer hover:border-gray-500 transition-all"
                onClick={() => navigateToProduct(product._id)}
              >
                <CardContent className="p-4">
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-md brightness-75 group-hover:brightness-100 transition-all group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all" />
                  </div>
                  <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                  <p className="text-gray-400">${product.price.toFixed(2)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Products;
