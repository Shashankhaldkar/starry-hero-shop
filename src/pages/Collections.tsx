
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import * as productAPI from "@/api/products";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Category, Theme } from "@/types";
import { ShoppingBag } from "lucide-react";

const Collections = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("categories");

  // Fetch categories
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['product-categories'],
    queryFn: productAPI.getProductCategories,
  });

  // Fetch themes
  const { data: themes, isLoading: themesLoading } = useQuery({
    queryKey: ['product-themes'],
    queryFn: productAPI.getProductThemes,
  });

  // Navigate to filtered shop page
  const navigateToCategory = (category: string) => {
    navigate(`/shop?category=${encodeURIComponent(category)}`);
  };

  const navigateToTheme = (theme: string) => {
    navigate(`/shop?theme=${encodeURIComponent(theme)}`);
  };

  // Create visual collections data
  const visualCategories = categories?.map((category, index) => ({
    id: category.toLowerCase().replace(/\s+/g, '-'),
    name: category,
    image: `https://images.unsplash.com/photo-${1550000000000 + index * 100000}?auto=format&fit=crop&q=80&w=500`
  })) || [];

  const visualThemes = themes?.map((theme, index) => ({
    id: theme.toLowerCase().replace(/\s+/g, '-'),
    name: theme,
    image: `https://images.unsplash.com/photo-${1560000000000 + index * 100000}?auto=format&fit=crop&q=80&w=500`
  })) || [];

  // Render collection grid
  const renderCollectionGrid = (
    items: Array<{ id: string, name: string, image: string }>,
    isLoading: boolean,
    onItemClick: (name: string) => void
  ) => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(8).fill(0).map((_, index) => (
            <div key={index} className="flex flex-col">
              <Skeleton className="h-48 w-full rounded-lg mb-2" />
              <Skeleton className="h-6 w-3/4 mb-1" />
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <Card 
            key={item.id} 
            className="bg-gray-900/50 border-gray-700 group cursor-pointer hover:border-gray-500 transition-all overflow-hidden"
            onClick={() => onItemClick(item.name)}
          >
            <div className="h-48 relative overflow-hidden">
              {item.image ? (
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover brightness-75 group-hover:brightness-100 transition-all group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <ShoppingBag className="h-12 w-12 text-gray-600" />
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-all">
                <h3 className="text-white text-xl font-bold text-center px-4">{item.name}</h3>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-starry text-white">
      <Header />
      <main>
        <div className="container mx-auto py-12 px-4">
          <h1 className="text-3xl font-bold mb-6">Collections</h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-gray-900/50 border border-gray-700/30 rounded-lg p-1 mb-8 w-full sm:w-auto">
              <TabsTrigger 
                value="categories" 
                className="data-[state=active]:bg-gray-700 text-white"
              >
                By Category
              </TabsTrigger>
              <TabsTrigger 
                value="themes" 
                className="data-[state=active]:bg-gray-700 text-white"
              >
                By Theme
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="categories" className="pt-4">
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Browse by Category</h2>
                <p className="text-gray-400 mb-6">Explore our t-shirt collection by type and style</p>
                {renderCollectionGrid(visualCategories, categoriesLoading, navigateToCategory)}
              </div>
            </TabsContent>
            
            <TabsContent value="themes" className="pt-4">
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Browse by Theme</h2>
                <p className="text-gray-400 mb-6">Discover t-shirts from your favorite universes and characters</p>
                {renderCollectionGrid(visualThemes, themesLoading, navigateToTheme)}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Collections;
