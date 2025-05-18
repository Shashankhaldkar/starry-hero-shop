
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Filter, SlidersHorizontal, Search, ShoppingBag } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as productAPI from "@/api/products";
import { Product } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const Shop = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();

  const [filterValues, setFilterValues] = useState({
    keyword: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    theme: searchParams.get("theme") || "",
    minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : 0,
    maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : 5000,
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 1
  });

  const [showFilters, setShowFilters] = useState(false);

  // Fetch products based on filters
  const { data: productsData, isLoading, isError } = useQuery({
    queryKey: ['products', filterValues],
    queryFn: () => productAPI.getProducts(
      filterValues.keyword,
      filterValues.page,
      filterValues.category,
      filterValues.theme,
      filterValues.minPrice,
      filterValues.maxPrice
    ),
  });

  // Fetch categories and themes
  const { data: categories } = useQuery({
    queryKey: ['product-categories'],
    queryFn: productAPI.getProductCategories,
  });

  const { data: themes } = useQuery({
    queryKey: ['product-themes'],
    queryFn: productAPI.getProductThemes,
  });

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filterValues.keyword) params.set("search", filterValues.keyword);
    if (filterValues.category) params.set("category", filterValues.category);
    if (filterValues.theme) params.set("theme", filterValues.theme);
    if (filterValues.minPrice > 0) params.set("minPrice", String(filterValues.minPrice));
    if (filterValues.maxPrice < 5000) params.set("maxPrice", String(filterValues.maxPrice));
    if (filterValues.page > 1) params.set("page", String(filterValues.page));
    
    setSearchParams(params);
  }, [filterValues, setSearchParams]);

  // Handle search input
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setFilterValues({
        ...filterValues,
        keyword: e.target.value,
        page: 1
      });
    }
  };

  // Handle category filter
  const handleCategoryChange = (category) => {
    setFilterValues({
      ...filterValues,
      category: filterValues.category === category ? "" : category,
      page: 1
    });
  };

  // Handle theme filter
  const handleThemeChange = (theme) => {
    setFilterValues({
      ...filterValues,
      theme: filterValues.theme === theme ? "" : theme,
      page: 1
    });
  };

  // Handle price range filter
  const handlePriceChange = (values) => {
    setFilterValues({
      ...filterValues,
      minPrice: values[0],
      maxPrice: values[1],
      page: 1
    });
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    setFilterValues({
      ...filterValues,
      page: newPage
    });
    window.scrollTo(0, 0);
  };

  // Handle add to cart
  const handleAddToCart = (product) => {
    // Add product to cart logic would go here
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setFilterValues({
      keyword: "",
      category: "",
      theme: "",
      minPrice: 0,
      maxPrice: 5000,
      page: 1
    });
  };

  // Navigate to product detail
  const navigateToProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-starry text-white">
      <Header />
      <main>
        <div className="container mx-auto py-8 px-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Shop</h1>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-gray-700 text-white hover:bg-gray-800"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" /> 
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
              <Button 
                variant="outline"
                size="sm"
                className="border-gray-700 text-white hover:bg-gray-800"
                onClick={resetFilters}
              >
                Reset
              </Button>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              type="text" 
              placeholder="Search for products..." 
              className="pl-10 bg-gray-900/50 border-gray-700 text-white" 
              value={filterValues.keyword}
              onChange={(e) => setFilterValues({...filterValues, keyword: e.target.value})}
              onKeyDown={handleSearch}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters */}
            {showFilters && (
              <Card className="p-4 bg-gray-900/50 border-gray-700 h-fit lg:sticky lg:top-24">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center">
                    <SlidersHorizontal className="h-4 w-4 mr-2" /> Filters
                  </h3>
                </div>
                
                <Separator className="my-4 bg-gray-700" />
                
                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <Slider 
                    defaultValue={[filterValues.minPrice, filterValues.maxPrice]} 
                    max={5000} 
                    step={100}
                    onValueChange={handlePriceChange}
                    className="mb-2"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span>₹{filterValues.minPrice}</span>
                    <span>₹{filterValues.maxPrice}</span>
                  </div>
                </div>
                
                <Separator className="my-4 bg-gray-700" />
                
                {/* Categories */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Categories</h4>
                  <div className="space-y-2">
                    {isLoading ? (
                      Array(5).fill(0).map((_, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Skeleton className="h-4 w-4" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      ))
                    ) : (
                      categories?.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`category-${category}`} 
                            checked={filterValues.category === category}
                            onCheckedChange={() => handleCategoryChange(category)}
                          />
                          <Label 
                            htmlFor={`category-${category}`}
                            className="text-sm cursor-pointer"
                          >
                            {category}
                          </Label>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                
                <Separator className="my-4 bg-gray-700" />
                
                {/* Themes */}
                <div>
                  <h4 className="font-medium mb-3">Themes</h4>
                  <div className="space-y-2">
                    {isLoading ? (
                      Array(5).fill(0).map((_, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Skeleton className="h-4 w-4" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      ))
                    ) : (
                      themes?.map((theme) => (
                        <div key={theme} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`theme-${theme}`}
                            checked={filterValues.theme === theme}
                            onCheckedChange={() => handleThemeChange(theme)}
                          />
                          <Label 
                            htmlFor={`theme-${theme}`}
                            className="text-sm cursor-pointer"
                          >
                            {theme}
                          </Label>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </Card>
            )}
            
            {/* Products Grid */}
            <div className={`${showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {Array(6).fill(0).map((_, index) => (
                    <Card key={index} className="bg-gray-900/50 border-gray-700 overflow-hidden">
                      <Skeleton className="h-64 w-full" />
                      <CardContent className="p-4">
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-1/2 mb-4" />
                        <Skeleton className="h-8 w-full" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : isError ? (
                <div className="py-12 text-center">
                  <p className="text-lg text-gray-400">Failed to load products. Please try again.</p>
                  <Button 
                    className="mt-4"
                    onClick={() => window.location.reload()}
                  >
                    Retry
                  </Button>
                </div>
              ) : productsData?.products?.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-lg text-gray-400">No products found matching your criteria.</p>
                  <Button 
                    className="mt-4"
                    onClick={resetFilters}
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {productsData?.products?.map((product: Product) => (
                      <Card 
                        key={product.id} 
                        className="bg-gray-900/50 border-gray-700 overflow-hidden cursor-pointer hover:border-gray-500 transition-all group"
                        onClick={() => navigateToProduct(product.id)}
                      >
                        <div className="h-64 overflow-hidden relative">
                          {product.images && product.images[0] ? (
                            <img 
                              src={product.images[0]} 
                              alt={product.name} 
                              className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                              <ShoppingBag className="h-12 w-12 text-gray-600" />
                            </div>
                          )}
                          {product.discountPrice && (
                            <Badge className="absolute top-2 right-2 bg-gray-800 text-white">
                              Sale
                            </Badge>
                          )}
                          {product.featured && (
                            <Badge className="absolute top-2 left-2 bg-gray-600 text-white">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg truncate">{product.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className="bg-transparent">
                              {product.category}
                            </Badge>
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <div>
                              {product.discountPrice ? (
                                <div className="flex items-center space-x-2">
                                  <span className="text-gray-400 line-through">₹{product.price.toFixed(2)}</span>
                                  <span className="font-semibold text-white">₹{product.discountPrice.toFixed(2)}</span>
                                </div>
                              ) : (
                                <span className="font-semibold text-white">₹{product.price.toFixed(2)}</span>
                              )}
                            </div>
                            <Button 
                              size="sm" 
                              className="bg-gray-700 hover:bg-gray-600"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(product);
                              }}
                            >
                              <ShoppingBag className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  {/* Pagination */}
                  {productsData && productsData.pages > 1 && (
                    <div className="flex items-center justify-center mt-8 space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={filterValues.page === 1}
                        onClick={() => handlePageChange(filterValues.page - 1)}
                        className="border-gray-700"
                      >
                        Previous
                      </Button>
                      
                      {Array.from({length: productsData.pages}, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={filterValues.page === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                          className={filterValues.page === page ? "bg-gray-600" : "border-gray-700"}
                        >
                          {page}
                        </Button>
                      ))}
                      
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={filterValues.page === productsData.pages}
                        onClick={() => handlePageChange(filterValues.page + 1)}
                        className="border-gray-700"
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
