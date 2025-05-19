import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/products";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, Search, ShoppingBag, Heart, Star, Grid3X3, List } from "lucide-react";
import { categories, themes } from "@/data/products";
import { toast } from "@/hooks/use-toast";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState("grid");
  const [filterOpen, setFilterOpen] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [selectedTheme, setSelectedTheme] = useState(searchParams.get("theme") || "");
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const pageNumber = Number(searchParams.get("page")) || 1;

  // Get products with filters
  const { data: productData, isLoading, error } = useQuery({
    queryKey: ["products", keyword, pageNumber, selectedCategory, selectedTheme, priceRange],
    queryFn: () => getProducts({
      keyword,
      page: pageNumber,
      category: selectedCategory,
      theme: selectedTheme,
      minPrice: priceRange[0],
      maxPrice: priceRange[1]
    })
  });

  useEffect(() => {
    // Update URL with filters
    const params = new URLSearchParams();
    if (keyword) params.set("keyword", keyword);
    if (pageNumber > 1) params.set("page", pageNumber.toString());
    if (selectedCategory) params.set("category", selectedCategory);
    if (selectedTheme) params.set("theme", selectedTheme);
    setSearchParams(params);
  }, [keyword, pageNumber, selectedCategory, selectedTheme, setSearchParams]);

  const handleAddToCart = (product) => {
    // Add to cart logic would go here
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`
    });
  };

  const handleAddToWishlist = (product) => {
    // Add to wishlist logic would go here
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist`
    });
  };

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-starry-darkPurple text-white">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">Error Loading Products</h2>
            <p className="text-starry-neutral">There was a problem loading the products. Please try again later.</p>
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">T-Shirts Collection</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center p-2 bg-starry-charcoal/30 rounded-md">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md ${viewMode === "grid" ? "bg-starry-purple/30" : ""}`}
              >
                <Grid3X3 size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md ${viewMode === "list" ? "bg-starry-purple/30" : ""}`}
              >
                <List size={20} />
              </button>
            </div>
            <Button onClick={toggleFilter} variant="outline" className="bg-starry-charcoal/30 border-gray-700">
              <Filter size={18} className="mr-2" />
              {filterOpen ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {filterOpen && (
            <div className="lg:col-span-1 bg-starry-charcoal/30 p-4 rounded-md border border-gray-700/30">
              <h2 className="text-xl font-semibold mb-4">Filters</h2>
              
              <div className="mb-6">
                <label className="block mb-2 font-medium">Search</label>
                <div className="relative">
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Search products..."
                    className="w-full bg-gray-800/50 text-white border border-gray-700/30 p-2 pl-10 rounded-md"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block mb-2 font-medium">Price Range (₹)</label>
                <Slider
                  defaultValue={priceRange}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={setPriceRange}
                  className="mb-2"
                />
                <div className="flex justify-between">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block mb-2 font-medium">Categories</label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <Checkbox
                        id={`category-${category.id}`}
                        checked={selectedCategory === category.id}
                        onCheckedChange={() => 
                          setSelectedCategory(selectedCategory === category.id ? "" : category.id)
                        }
                      />
                      <label 
                        htmlFor={`category-${category.id}`} 
                        className="ml-2 text-sm cursor-pointer"
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block mb-2 font-medium">Themes</label>
                <div className="space-y-2">
                  {themes.map((theme) => (
                    <div key={theme.id} className="flex items-center">
                      <Checkbox
                        id={`theme-${theme.id}`}
                        checked={selectedTheme === theme.id}
                        onCheckedChange={() => 
                          setSelectedTheme(selectedTheme === theme.id ? "" : theme.id)
                        }
                      />
                      <label 
                        htmlFor={`theme-${theme.id}`} 
                        className="ml-2 text-sm cursor-pointer"
                      >
                        {theme.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <div className={`${filterOpen ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array(6).fill(0).map((_, index) => (
                  <Card key={index} className="bg-gray-900/50 border-gray-700 h-96 animate-pulse">
                    <CardContent className="p-4 h-full flex flex-col">
                      <div className="bg-gray-800 h-64 rounded-md"></div>
                      <div className="bg-gray-800 h-5 w-3/4 mt-4 rounded-md"></div>
                      <div className="bg-gray-800 h-4 w-1/4 mt-2 rounded-md"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : productData && productData.products && productData.products.length > 0 ? (
              <>
                <div className={
                  viewMode === 'grid' 
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" 
                    : "flex flex-col space-y-4"
                }>
                  {productData.products.map((product) => (
                    <Card 
                      key={product.id} 
                      className={`bg-gray-900/50 border-gray-700 group hover:border-gray-500 transition-all ${
                        viewMode === 'list' ? "flex" : ""
                      }`}
                    >
                      <CardContent className={`p-4 ${viewMode === 'list' ? "flex" : ""}`}>
                        <div className={`
                          relative overflow-hidden
                          ${viewMode === 'list' ? "w-1/3" : ""}
                        `}>
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-64 object-cover rounded-md brightness-90 group-hover:brightness-100 transition-all"
                          />
                          <div className="absolute top-2 right-2 flex space-x-2">
                            <button 
                              onClick={() => handleAddToWishlist(product)}
                              className="p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                            >
                              <Heart size={16} />
                            </button>
                            <button 
                              onClick={() => handleAddToCart(product)}
                              className="p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                            >
                              <ShoppingBag size={16} />
                            </button>
                          </div>
                        </div>
                        
                        <div className={`${viewMode === 'list' ? "ml-4 flex-1" : "mt-3"}`}>
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">{product.name}</h3>
                            <div className="flex items-center">
                              <Star size={14} className="text-yellow-400 fill-yellow-400" />
                              <span className="ml-1 text-sm">{product.rating}</span>
                            </div>
                          </div>
                          
                          {viewMode === 'list' && (
                            <p className="mt-2 text-gray-300 line-clamp-2">{product.description}</p>
                          )}
                          
                          <div className="mt-2 flex justify-between items-center">
                            <div className="flex items-center">
                              <span className="text-lg font-semibold">₹{product.price}</span>
                              {product.discountPrice && (
                                <span className="ml-2 text-sm text-gray-400 line-through">₹{product.discountPrice}</span>
                              )}
                            </div>
                            
                            {viewMode === 'list' && (
                              <Button 
                                onClick={() => handleAddToCart(product)}
                                size="sm"
                                className="bg-starry-purple hover:bg-purple-800"
                              >
                                Add to Cart
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {productData.pages > 1 && (
                  <div className="flex justify-center mt-8 space-x-2">
                    {Array.from({ length: productData.pages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={page === productData.page ? "default" : "outline"}
                        size="sm"
                        className={page === productData.page ? "bg-starry-purple" : "bg-starry-charcoal/30 border-gray-700"}
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);
                          params.set("page", page.toString());
                          setSearchParams(params);
                        }}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <h2 className="text-2xl font-bold mb-4">No Products Found</h2>
                <p className="text-starry-neutral">Try changing your search criteria or filters.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
