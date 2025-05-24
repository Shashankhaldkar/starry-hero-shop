
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Filter, Search, Loader2 } from "lucide-react";
import { getProducts, getProductCategories, getProductThemes } from "@/api/products";

const Shop = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('keyword') || "");
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || "all");
  const [selectedTheme, setSelectedTheme] = useState(searchParams.get('theme') || "all");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [showFilters, setShowFilters] = useState(true);

  // Fetch categories and themes
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getProductCategories
  });

  const { data: themes = [] } = useQuery({
    queryKey: ['themes'],
    queryFn: getProductThemes
  });

  // Fetch products
  const { data: productData, isLoading, error } = useQuery({
    queryKey: ['products', searchTerm, currentPage, selectedCategory, selectedTheme, priceRange],
    queryFn: () => getProducts({
      keyword: searchTerm,
      page: currentPage,
      category: selectedCategory === 'all' ? '' : selectedCategory,
      theme: selectedTheme === 'all' ? '' : selectedTheme,
      minPrice: priceRange[0],
      maxPrice: priceRange[1]
    })
  });

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('keyword', searchTerm);
    if (currentPage > 1) params.set('page', String(currentPage));
    if (selectedCategory !== "all") params.set('category', selectedCategory);
    if (selectedTheme !== "all") params.set('theme', selectedTheme);
    setSearchParams(params);
  }, [searchTerm, currentPage, selectedCategory, selectedTheme, setSearchParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme);
    setCurrentPage(1);
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedTheme("all");
    setPriceRange([0, 100]);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-purple-900 text-white">
      <Header />
      <main className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
            StarryHero Shop
          </h1>
          <p className="text-purple-300 text-lg">
            Discover our complete collection of superhero apparel
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Section */}
          <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card className="bg-purple-900/30 border-purple-500/30 sticky top-4">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Filters</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="text-purple-300 hover:text-white"
                  >
                    Reset
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                  <Label htmlFor="search" className="text-white">Search Products</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-purple-300" />
                    <Input
                      type="search"
                      id="search"
                      placeholder="Search t-shirts..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="pl-10 bg-purple-800/30 border-purple-500/30 text-white placeholder:text-purple-300"
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label className="text-white">Category</Label>
                  <Select onValueChange={handleCategoryChange} value={selectedCategory}>
                    <SelectTrigger className="bg-purple-800/30 border-purple-500/30 text-white">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="bg-purple-900 border-purple-500">
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category} className="text-white">
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Theme */}
                <div className="space-y-2">
                  <Label className="text-white">Theme</Label>
                  <Select onValueChange={handleThemeChange} value={selectedTheme}>
                    <SelectTrigger className="bg-purple-800/30 border-purple-500/30 text-white">
                      <SelectValue placeholder="Select a theme" />
                    </SelectTrigger>
                    <SelectContent className="bg-purple-900 border-purple-500">
                      <SelectItem value="all">All Themes</SelectItem>
                      {themes.map((theme) => (
                        <SelectItem key={theme} value={theme} className="text-white">
                          {theme}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div className="space-y-3">
                  <Label className="text-white">Price Range (₹)</Label>
                  <Slider
                    value={priceRange}
                    onValueChange={handlePriceChange}
                    min={0}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-purple-300">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Section */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold">
                  {searchTerm ? `Results for "${searchTerm}"` : "All Products"}
                </h2>
                {productData && (
                  <Badge variant="secondary" className="bg-purple-800/30 text-purple-200">
                    {productData.total} Products
                  </Badge>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden border-purple-500/30 text-purple-300"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin h-12 w-12 text-purple-400" />
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <p className="text-purple-300 text-lg">Unable to load products. Please try again later.</p>
              </div>
            ) : productData && productData.products && productData.products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {productData.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {productData.pages > 1 && (
                  <div className="flex justify-center mt-12 space-x-2">
                    {Array.from({ length: productData.pages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={page === productData.page ? "default" : "outline"}
                        size="sm"
                        className={
                          page === productData.page 
                            ? "bg-gradient-to-r from-purple-600 to-blue-600" 
                            : "border-purple-500/30 text-purple-300 hover:bg-purple-800/30"
                        }
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-2xl font-bold mb-4">No Products Found</h3>
                <p className="text-purple-300 mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <Button 
                  onClick={resetFilters}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
