import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination"
import { useSearchParams } from 'react-router-dom';
import * as productAPI from "@/api/products";

const Shop = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('keyword') || "");
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || "all");
  const [selectedTheme, setSelectedTheme] = useState(searchParams.get('theme') || "all");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [categories, setCategories] = useState<string[]>([]);
  const [themes, setThemes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategoriesAndThemes = async () => {
      try {
        const fetchedCategories = await productAPI.getProductCategories();
        const fetchedThemes = await productAPI.getProductThemes();
        setCategories(["all", ...fetchedCategories]);
        setThemes(["all", ...fetchedThemes]);
      } catch (error) {
        console.error("Error fetching categories and themes:", error);
      }
    };

    fetchCategoriesAndThemes();
  }, []);

  useEffect(() => {
    const initialPriceRange = async () => {
      try {
        const fetchedProducts = await productAPI.getProducts({
          keyword: searchTerm,
          page: currentPage,
          category: selectedCategory,
          theme: selectedTheme,
        });
        if (fetchedProducts.products && fetchedProducts.products.length > 0) {
          const prices = fetchedProducts.products.map((product) => product.price);
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);
          setPriceRange({ min: minPrice, max: maxPrice });
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    initialPriceRange()
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const data = await productAPI.getProducts({
          keyword: searchTerm,
          page: currentPage,
          category: selectedCategory,
          theme: selectedTheme,
          minPrice: priceRange?.min,
          maxPrice: priceRange?.max
        });
        setProducts(data.products);
        setTotalPages(data.pages);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
        setTotalPages(1);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm, currentPage, selectedCategory, selectedTheme, priceRange]);

  useEffect(() => {
    const newParams = new URLSearchParams(location.search);
    if (searchTerm) {
      newParams.set('keyword', searchTerm);
    } else {
      newParams.delete('keyword');
    }
    if (currentPage > 1) {
      newParams.set('page', String(currentPage));
    } else {
      newParams.delete('page');
    }
    if (selectedCategory !== "all") {
      newParams.set('category', selectedCategory);
    } else {
      newParams.delete('category');
    }
     if (selectedTheme !== "all") {
      newParams.set('theme', selectedTheme);
    } else {
      newParams.delete('theme');
    }
    setSearchParams(newParams);
  }, [searchTerm, currentPage, selectedCategory, selectedTheme, setSearchParams, location.search]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
    setPriceRange({ min: value[0], max: value[1] });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-starry-darkPurple to-starry-darkBlue text-white">
      <Header />
      <main className="container mx-auto py-12 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Section */}
          <div className="md:w-1/4">
            <Card className="bg-starry-darkPurple/40 border-starry-purple/30">
              <CardHeader>
                <CardTitle>Filters</CardTitle>
                <CardDescription>Filter products based on your preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <Input
                    type="search"
                    id="search"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
                {/* Category */}
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select onValueChange={handleCategoryChange} defaultValue={selectedCategory}>
                    <SelectTrigger className="bg-transparent text-white">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="bg-starry-darkPurple border-starry-purple">
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                 {/* Theme */}
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select onValueChange={handleThemeChange} defaultValue={selectedTheme}>
                    <SelectTrigger className="bg-transparent text-white">
                      <SelectValue placeholder="Select a theme" />
                    </SelectTrigger>
                    <SelectContent className="bg-starry-darkPurple border-starry-purple">
                      {themes.map((theme) => (
                        <SelectItem key={theme} value={theme}>{theme}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* Price Range */}
                <div className="space-y-2">
                  <Label>Price Range (₹)</Label>
                  <Slider
                    defaultValue={[priceRange.min, priceRange.max]}
                    min={0}
                    max={1000}
                    step={10}
                    onValueChange={(value) => handlePriceChange(value)}
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>₹{priceRange.min}</span>
                    <span>₹{priceRange.max}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full btn-hero-hover">Apply Filters</Button>
              </CardFooter>
            </Card>
          </div>

          {/* Product Listing Section */}
          <div className="md:w-3/4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">
                {searchTerm ? `Search results for "${searchTerm}"` : "All Products"}
              </h2>
              <Badge variant="secondary">{products.length} Products</Badge>
            </div>

            {isLoading ? (
              <div className="text-center">Loading products...</div>
            ) : products.length === 0 ? (
              <div className="text-center">No products found.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
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
