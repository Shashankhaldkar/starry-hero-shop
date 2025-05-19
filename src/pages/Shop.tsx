import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getProducts, getProductCategories, getProductThemes } from '@/api/products';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/context/CartContext';
import { Filter, Search, ShoppingBag, Heart, Star, ChevronDown, ChevronUp, Grid3X3, List } from 'lucide-react';
import { Product } from '@/types';

const Shop = () => {
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedTheme, setSelectedTheme] = useState(searchParams.get('theme') || '');
  const [priceRange, setPriceRange] = useState<number[]>([0, 5000]);
  const [viewMode, setViewMode] = useState('grid');
  const [filtersOpen, setFiltersOpen] = useState(true);
  const pageNumber = Number(searchParams.get('page')) || 1;

  // Fetch products with filters
  const { data: productData, isLoading } = useQuery({
    queryKey: ['products', keyword, pageNumber, selectedCategory, selectedTheme, priceRange],
    queryFn: () => getProducts({
      keyword, 
      page: pageNumber, 
      category: selectedCategory, 
      theme: selectedTheme,
      minPrice: priceRange[0],
      maxPrice: priceRange[1]
    })
  });

  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getProductCategories
  });

  // Fetch themes
  const { data: themes = [] } = useQuery({
    queryKey: ['themes'],
    queryFn: getProductThemes
  });

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (keyword) params.set('keyword', keyword);
    if (pageNumber > 1) params.set('page', pageNumber.toString());
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedTheme) params.set('theme', selectedTheme);
    setSearchParams(params);
  }, [keyword, pageNumber, selectedCategory, selectedTheme, setSearchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search term is already set from the input, so we just need to update the URL
    const params = new URLSearchParams(searchParams);
    if (keyword) params.set('keyword', keyword);
    else params.delete('keyword');
    setSearchParams(params);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme);
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.discountPrice || product.price,
      image: product.images?.[0] || '',
      quantity: 1
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`
    });
  };

  const handleAddToWishlist = (product: Product) => {
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist`
    });
  };

  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Shop Collection</h1>
          <p className="text-gray-400">Find your perfect superhero t-shirt</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <form onSubmit={handleSearch} className="w-full md:w-1/2">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="bg-gray-800/50 border-gray-700 text-white pr-10"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <Search size={18} />
                </button>
              </div>
            </form>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleFilters}
                className="bg-transparent border-gray-700 text-white hover:bg-gray-800"
              >
                <Filter size={16} className="mr-2" />
                Filters {filtersOpen ? <ChevronUp size={16} className="ml-2" /> : <ChevronDown size={16} className="ml-2" />}
              </Button>
              
              <div className="flex items-center p-1 bg-gray-800/50 rounded-md">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1 rounded-sm ${viewMode === 'grid' ? 'bg-gray-700/50' : ''}`}
                >
                  <Grid3X3 size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1 rounded-sm ${viewMode === 'list' ? 'bg-gray-700/50' : ''}`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Filter Panel */}
          {filtersOpen && (
            <Card className="mt-4 bg-gray-800/30 border-gray-700">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Categories */}
                  <div>
                    <h3 className="font-medium mb-2">Categories</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="all-categories" 
                          checked={selectedCategory === ''} 
                          onCheckedChange={() => handleCategoryChange('')}
                        />
                        <label htmlFor="all-categories" className="text-sm">All Categories</label>
                      </div>
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`category-${category}`}
                            checked={selectedCategory === category}
                            onCheckedChange={() => handleCategoryChange(category)}
                          />
                          <label htmlFor={`category-${category}`} className="text-sm">{category}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Themes */}
                  <div>
                    <h3 className="font-medium mb-2">Themes</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="all-themes" 
                          checked={selectedTheme === ''} 
                          onCheckedChange={() => handleThemeChange('')}
                        />
                        <label htmlFor="all-themes" className="text-sm">All Themes</label>
                      </div>
                      {themes.map((theme) => (
                        <div key={theme} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`theme-${theme}`}
                            checked={selectedTheme === theme}
                            onCheckedChange={() => handleThemeChange(theme)}
                          />
                          <label htmlFor={`theme-${theme}`} className="text-sm">{theme}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price Range */}
                  <div>
                    <h3 className="font-medium mb-2">Price Range</h3>
                    <div className="px-2">
                      <Slider 
                        defaultValue={[0, 5000]} 
                        max={5000} 
                        step={100} 
                        onValueChange={handlePriceChange}
                        className="my-6"
                      />
                      <div className="flex justify-between text-sm">
                        <span>₹{priceRange[0]}</span>
                        <span>₹{priceRange[1]}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Active Filters */}
                  <div>
                    <h3 className="font-medium mb-2">Active Filters</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCategory && (
                        <Badge variant="outline" className="bg-gray-700/30">
                          {selectedCategory}
                          <button 
                            className="ml-2" 
                            onClick={() => setSelectedCategory('')}
                          >
                            ×
                          </button>
                        </Badge>
                      )}
                      {selectedTheme && (
                        <Badge variant="outline" className="bg-gray-700/30">
                          {selectedTheme}
                          <button 
                            className="ml-2" 
                            onClick={() => setSelectedTheme('')}
                          >
                            ×
                          </button>
                        </Badge>
                      )}
                      {(priceRange[0] > 0 || priceRange[1] < 5000) && (
                        <Badge variant="outline" className="bg-gray-700/30">
                          ₹{priceRange[0]} - ₹{priceRange[1]}
                          <button 
                            className="ml-2" 
                            onClick={() => setPriceRange([0, 5000])}
                          >
                            ×
                          </button>
                        </Badge>
                      )}
                      {(selectedCategory || selectedTheme || priceRange[0] > 0 || priceRange[1] < 5000) && (
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="px-0 h-auto text-sm text-gray-400 hover:text-white"
                          onClick={() => {
                            setSelectedCategory('');
                            setSelectedTheme('');
                            setPriceRange([0, 5000]);
                          }}
                        >
                          Clear all
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Products Grid/List */}
        <div>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          ) : productData?.products?.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold mb-2">No products found</h2>
              <p className="text-gray-400">Try changing your search criteria</p>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <p className="text-gray-400">
                  Showing {productData?.products?.length} of {productData?.total || 0} products
                </p>
              </div>
              
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {productData?.products?.map((product: Product) => (
                    <Card key={product.id} className="overflow-hidden bg-gray-800/30 border-gray-700">
                      <div className="h-56 overflow-hidden relative group">
                        <img 
                          src={product.images?.[0] || '/placeholder.svg'} 
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              className="rounded-full bg-white text-black hover:bg-gray-200"
                              onClick={() => handleAddToCart(product)}
                            >
                              <ShoppingBag size={16} />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="rounded-full border-white text-white"
                              onClick={() => handleAddToWishlist(product)}
                            >
                              <Heart size={16} />
                            </Button>
                          </div>
                        </div>
                        {product.featured && (
                          <Badge className="absolute top-2 left-2 bg-yellow-600">
                            Featured
                          </Badge>
                        )}
                        {product.discountPrice !== undefined && product.discountPrice < product.price && (
                          <Badge className="absolute top-2 right-2 bg-red-600">
                            {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% Off
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="mb-2 flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-medium text-lg truncate">{product.name}</h3>
                            <p className="text-gray-400 text-sm">{product.category}</p>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                            <span className="text-sm">{product.rating || 0}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div>
                            {product.discountPrice !== undefined && product.discountPrice < product.price ? (
                              <div className="flex items-center space-x-2">
                                <span className="text-lg font-bold">₹{product.discountPrice.toFixed(2)}</span>
                                <span className="text-sm text-gray-400 line-through">₹{product.price.toFixed(2)}</span>
                              </div>
                            ) : (
                              <span className="text-lg font-bold">₹{product.price.toFixed(2)}</span>
                            )}
                          </div>
                          <Badge variant={product.inStock ? "outline" : "destructive"}>
                            {product.inStock ? "In Stock" : "Out of Stock"}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {productData?.products?.map((product: Product) => (
                    <Card key={product.id} className="bg-gray-800/30 border-gray-700">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4 h-40">
                          <img 
                            src={product.images?.[0] || '/placeholder.svg'} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-4 flex-1 flex flex-col md:flex-row">
                          <div className="flex-1">
                            <h3 className="font-medium text-lg">{product.name}</h3>
                            <p className="text-gray-400 text-sm mb-2">{product.category}</p>
                            <p className="text-sm text-gray-300 line-clamp-2 mb-2">{product.description}</p>
                            <div className="flex items-center space-x-4">
                              <Badge variant="outline">{product.theme}</Badge>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                                <span className="text-sm">{product.rating || 0}</span>
                              </div>
                            </div>
                          </div>
                          <div className="md:w-1/4 flex flex-col justify-between items-end mt-4 md:mt-0">
                            <div>
                              {product.discountPrice !== undefined && product.discountPrice < product.price ? (
                                <div className="flex items-center space-x-2">
                                  <span className="text-lg font-bold">₹{product.discountPrice.toFixed(2)}</span>
                                  <span className="text-sm text-gray-400 line-through">₹{product.price.toFixed(2)}</span>
                                </div>
                              ) : (
                                <span className="text-lg font-bold">₹{product.price.toFixed(2)}</span>
                              )}
                            </div>
                            <div className="flex space-x-2 mt-4">
                              <Button 
                                size="sm" 
                                className="bg-white text-black hover:bg-gray-200"
                                onClick={() => handleAddToCart(product)}
                                disabled={!product.inStock}
                              >
                                <ShoppingBag size={16} className="mr-2" />
                                Add to cart
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="border-white text-white"
                                onClick={() => handleAddToWishlist(product)}
                              >
                                <Heart size={16} />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
              
              {/* Pagination controls */}
              {productData?.pages > 1 && (
                <div className="mt-8 flex justify-center">
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      className="bg-transparent text-white border-gray-700"
                      disabled={pageNumber === 1}
                    >
                      Previous
                    </Button>
                    {/* Page numbers would go here */}
                    <Button
                      variant="outline"
                      className="bg-transparent text-white border-gray-700"
                      disabled={pageNumber === productData.pages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Shop;
