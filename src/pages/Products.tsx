
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/api/products';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Filter, Search, ShoppingBag, Heart, Star, ChevronDown, 
  ChevronUp, Grid2X2, Grid3X3, List 
} from 'lucide-react';
import { categories, themes } from '@/data/products';
import { Product } from '@/types';
import { toast } from '@/hooks/use-toast';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterOpen, setFilterOpen] = useState(true);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || '');
  const [selectedTheme, setSelectedTheme] = useState<string>(searchParams.get('theme') || '');
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  
  const pageNumber = Number(searchParams.get('page')) || 1;
  
  // Get products with filters
  const { data: productData, isLoading, error } = useQuery({
    queryKey: ['products', keyword, pageNumber, selectedCategory, selectedTheme, priceRange],
    queryFn: () => getProducts(
      keyword,
      pageNumber,
      selectedCategory,
      selectedTheme,
      priceRange[0], 
      priceRange[1]
    )
  });

  useEffect(() => {
    // Update URL with filters
    const params = new URLSearchParams();
    if (keyword) params.set('keyword', keyword);
    if (pageNumber > 1) params.set('page', pageNumber.toString());
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedTheme) params.set('theme', selectedTheme);
    setSearchParams(params);
  }, [keyword, pageNumber, selectedCategory, selectedTheme, setSearchParams]);

  const handleAddToCart = (product: Product) => {
    // Add to cart logic would go here
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  const handleAddToWishlist = (product: Product) => {
    // Add to wishlist logic would go here
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist`,
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
                onClick={() => setViewMode('grid')} 
                className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-starry-purple/30' : ''}`}
              >
                <Grid3X3 size={20} />
              </button>
              <button 
                onClick={() => setViewMode('list')} 
                className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-starry-purple/30' : ''}`}
              >
                <List size={20} />
              </button>
            </div>
            <Button onClick={toggleFilter} variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              Filters
              {filterOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters sidebar */}
          {filterOpen && (
            <div className="w-full md:w-1/4 bg-starry-charcoal/30 p-4 rounded-lg">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Search</h3>
                <div className="relative">
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Search t-shirts..."
                    className="w-full bg-starry-darkPurple/50 border border-starry-purple/20 rounded-md py-2 pl-3 pr-10 text-white placeholder-starry-neutral"
                  />
                  <Search className="absolute right-3 top-2.5 text-starry-neutral" size={18} />
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Price Range</h3>
                <Slider 
                  defaultValue={[priceRange[0], priceRange[1]]} 
                  max={100} 
                  step={1} 
                  onValueChange={(values) => setPriceRange([values[0], values[1]])}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-starry-neutral">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <Checkbox 
                        id={`category-${category.id}`} 
                        checked={selectedCategory === category.id}
                        onCheckedChange={() => {
                          setSelectedCategory(
                            selectedCategory === category.id ? '' : category.id
                          );
                        }}
                        className="mr-2 data-[state=checked]:bg-starry-purple"
                      />
                      <label 
                        htmlFor={`category-${category.id}`}
                        className="text-sm cursor-pointer"
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Themes</h3>
                <div className="space-y-2">
                  {themes.map((theme) => (
                    <div key={theme.id} className="flex items-center">
                      <Checkbox 
                        id={`theme-${theme.id}`} 
                        checked={selectedTheme === theme.id}
                        onCheckedChange={() => {
                          setSelectedTheme(
                            selectedTheme === theme.id ? '' : theme.id
                          );
                        }}
                        className="mr-2 data-[state=checked]:bg-starry-purple"
                      />
                      <label 
                        htmlFor={`theme-${theme.id}`}
                        className="text-sm cursor-pointer"
                      >
                        {theme.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                onClick={() => {
                  setKeyword('');
                  setSelectedCategory('');
                  setSelectedTheme('');
                  setPriceRange([0, 100]);
                }}
                variant="outline" 
                className="w-full"
              >
                Reset Filters
              </Button>
            </div>
          )}

          {/* Products grid/list */}
          <div className={`${filterOpen ? 'w-full md:w-3/4' : 'w-full'}`}>
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <Card key={index} className="bg-starry-charcoal/30 border-starry-purple/10 animate-pulse">
                    <div className="aspect-[4/5] bg-starry-charcoal/50"></div>
                    <CardContent className="p-5">
                      <div className="h-6 bg-starry-charcoal/50 rounded mb-2"></div>
                      <div className="h-4 bg-starry-charcoal/50 rounded w-3/4 mb-3"></div>
                      <div className="h-8 bg-starry-charcoal/50 rounded mt-4"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : productData?.products?.length ? (
              <>
                <div className={
                  viewMode === 'grid' 
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                }>
                  {productData.products.map((product: Product) => (
                    <Card 
                      key={product.id} 
                      className="bg-gradient-to-b from-starry-darkPurple/40 to-starry-darkPurple/20 backdrop-blur-sm rounded-xl overflow-hidden border border-starry-purple/10 hover:border-starry-purple/30 transition-all duration-300"
                    >
                      {viewMode === 'grid' ? (
                        <>
                          {/* Grid view */}
                          <div className="aspect-[4/5] overflow-hidden relative">
                            <img 
                              src={product.images[0]} 
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                            
                            {/* Discount badge if applicable */}
                            {product.discountPrice && (
                              <div className="absolute top-4 right-4 bg-starry-orange text-white text-xs font-medium px-2 py-1 rounded-md">
                                {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                              </div>
                            )}
                          </div>
                          
                          <CardContent className="p-5">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-lg font-medium text-white hover:text-starry-purple transition-colors">
                                <a href={`/product/${product.id}`}>{product.name}</a>
                              </h3>
                            </div>
                            
                            {/* Category & theme badges */}
                            <div className="flex flex-wrap gap-2 mb-3">
                              <span className="text-xs px-2 py-1 bg-starry-darkPurple/60 text-starry-purple rounded-full">
                                {product.category}
                              </span>
                              <span className="text-xs px-2 py-1 bg-starry-darkPurple/60 text-starry-blue rounded-full">
                                {product.theme}
                              </span>
                            </div>
                            
                            {/* Rating */}
                            <div className="flex items-center mb-3">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={
                                      star <= Math.floor(product.rating)
                                        ? "w-4 h-4 text-starry-orange fill-starry-orange"
                                        : star <= product.rating
                                        ? "w-4 h-4 text-starry-orange fill-starry-orange/50"
                                        : "w-4 h-4 text-gray-300"
                                    }
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-starry-neutral ml-2">
                                ({product.reviewCount})
                              </span>
                            </div>
                            
                            {/* Price & actions */}
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
                              <div className="flex gap-2">
                                <Button 
                                  size="icon"
                                  variant="ghost"
                                  className="h-8 w-8 text-starry-purple border border-starry-purple/20 hover:bg-starry-purple/10 hover:text-starry-vividPurple"
                                  onClick={() => handleAddToWishlist(product)}
                                >
                                  <Heart className="h-4 w-4" />
                                </Button>
                                <Button 
                                  size="sm"
                                  variant="ghost"
                                  className="text-starry-purple border border-starry-purple/20 hover:bg-starry-purple/10 hover:text-starry-vividPurple h-8"
                                  onClick={() => handleAddToCart(product)}
                                >
                                  <ShoppingBag className="h-4 w-4 mr-2" />
                                  Add
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </>
                      ) : (
                        <>
                          {/* List view */}
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/3 aspect-square md:aspect-auto overflow-hidden relative">
                              <img 
                                src={product.images[0]} 
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                              />
                              
                              {/* Discount badge if applicable */}
                              {product.discountPrice && (
                                <div className="absolute top-4 right-4 bg-starry-orange text-white text-xs font-medium px-2 py-1 rounded-md">
                                  {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                                </div>
                              )}
                            </div>
                            
                            <CardContent className="p-5 md:w-2/3 flex flex-col justify-between">
                              <div>
                                <div className="flex justify-between items-start mb-2">
                                  <h3 className="text-xl font-medium text-white hover:text-starry-purple transition-colors">
                                    <a href={`/product/${product.id}`}>{product.name}</a>
                                  </h3>
                                </div>
                                
                                {/* Category & theme badges */}
                                <div className="flex flex-wrap gap-2 mb-3">
                                  <span className="text-xs px-2 py-1 bg-starry-darkPurple/60 text-starry-purple rounded-full">
                                    {product.category}
                                  </span>
                                  <span className="text-xs px-2 py-1 bg-starry-darkPurple/60 text-starry-blue rounded-full">
                                    {product.theme}
                                  </span>
                                </div>
                                
                                {/* Product description - truncated for list view */}
                                <p className="text-starry-neutral text-sm mb-3 line-clamp-2">
                                  {product.description}
                                </p>
                                
                                {/* Rating */}
                                <div className="flex items-center mb-3">
                                  <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star
                                        key={star}
                                        className={
                                          star <= Math.floor(product.rating)
                                            ? "w-4 h-4 text-starry-orange fill-starry-orange"
                                            : star <= product.rating
                                            ? "w-4 h-4 text-starry-orange fill-starry-orange/50"
                                            : "w-4 h-4 text-gray-300"
                                        }
                                      />
                                    ))}
                                  </div>
                                  <span className="text-xs text-starry-neutral ml-2">
                                    ({product.reviewCount})
                                  </span>
                                </div>
                              </div>
                              
                              {/* Price & actions */}
                              <div className="flex justify-between items-center mt-4">
                                <div className="flex items-end gap-2">
                                  {product.discountPrice ? (
                                    <>
                                      <span className="text-xl font-bold text-white">${product.discountPrice.toFixed(2)}</span>
                                      <span className="text-sm text-starry-neutral line-through">${product.price.toFixed(2)}</span>
                                    </>
                                  ) : (
                                    <span className="text-xl font-bold text-white">${product.price.toFixed(2)}</span>
                                  )}
                                </div>
                                <div className="flex gap-2">
                                  <Button 
                                    variant="ghost"
                                    className="text-starry-purple border border-starry-purple/20 hover:bg-starry-purple/10 hover:text-starry-vividPurple"
                                    onClick={() => handleAddToWishlist(product)}
                                  >
                                    <Heart className="h-4 w-4 mr-2" />
                                    Wishlist
                                  </Button>
                                  <Button 
                                    variant="default"
                                    className="bg-starry-purple hover:bg-starry-vividPurple"
                                    onClick={() => handleAddToCart(product)}
                                  >
                                    <ShoppingBag className="h-4 w-4 mr-2" />
                                    Add to Cart
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </div>
                        </>
                      )}
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                {productData.pages > 1 && (
                  <div className="flex justify-center mt-8">
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        disabled={pageNumber <= 1}
                        onClick={() => {
                          searchParams.set('page', String(pageNumber - 1));
                          setSearchParams(searchParams);
                        }}
                      >
                        Previous
                      </Button>
                      
                      <div className="flex items-center">
                        <span className="px-4">
                          Page {pageNumber} of {productData.pages}
                        </span>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        disabled={pageNumber >= productData.pages}
                        onClick={() => {
                          searchParams.set('page', String(pageNumber + 1));
                          setSearchParams(searchParams);
                        }}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <h2 className="text-2xl font-bold mb-4">No Products Found</h2>
                <p className="text-starry-neutral">Try adjusting your filters or search criteria</p>
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
