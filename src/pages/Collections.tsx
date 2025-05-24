
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getProductCategories, getProductThemes } from '@/api/products';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';

const Collections = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'categories' | 'themes'>('categories');

  // Fetch categories
  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getProductCategories
  });

  // Fetch themes
  const { data: themes = [], isLoading: themesLoading } = useQuery({
    queryKey: ['themes'],
    queryFn: getProductThemes
  });

  // Sample images for categories and themes
  const categoryImages = {
    "Oversized": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThqgsPLtI5zerhVPkaVfiFQ3YaCtrTBN2Qrg&s",
    "Acid Wash": "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=500",
    "Graphic Printed": "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=500",
    "Solid Color": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500",
    "Polo T-Shirts": "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=500",
  };
  
  const themeImages = {
    "Marvel Universe": "https://images.unsplash.com/photo-1612036782180-6f0822045d55?q=80&w=500",
    "DC Comics": "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?q=80&w=500",
    "Anime Superheroes": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=500",
    "Classic Comics": "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=500",
  };

  // Default placeholder image
  const defaultImage = "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=500";

  const navigateToProducts = (filter: string, value: string) => {
    navigate(`/products?${filter}=${encodeURIComponent(value)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-purple-900 text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center py-12 mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
            StarryHero Collection
          </h1>
          <p className="text-purple-300 text-lg max-w-2xl mx-auto">
            Explore our curated collections of superhero and pop culture t-shirts designed for style and comfort
          </p>
        </div>
        
        {/* Tabs */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-lg bg-purple-900/30 p-1">
            <button
              onClick={() => setActiveTab('categories')}
              className={`px-6 py-3 rounded-md transition-all ${
                activeTab === 'categories' 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                  : 'text-purple-300 hover:text-white hover:bg-purple-800/30'
              }`}
            >
              Categories
            </button>
            <button
              onClick={() => setActiveTab('themes')}
              className={`px-6 py-3 rounded-md transition-all ${
                activeTab === 'themes' 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                  : 'text-purple-300 hover:text-white hover:bg-purple-800/30'
              }`}
            >
              Themes
            </button>
          </div>
        </div>
        
        {/* Collection Grids */}
        {activeTab === 'categories' ? (
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
            
            {categoriesLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin h-12 w-12 text-purple-400" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map((category) => (
                  <Card key={category} className="overflow-hidden bg-purple-900/20 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 group cursor-pointer">
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={categoryImages[category as keyof typeof categoryImages] || defaultImage} 
                        alt={category}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                        <div className="p-4 w-full">
                          <h3 className="text-xl font-bold text-white">{category}</h3>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <Button 
                        onClick={() => navigateToProducts('category', category)}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0"
                      >
                        View Collection <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Shop by Theme</h2>
            
            {themesLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin h-12 w-12 text-purple-400" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {themes.map((theme) => (
                  <Card key={theme} className="overflow-hidden bg-purple-900/20 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 group cursor-pointer">
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={themeImages[theme as keyof typeof themeImages] || defaultImage} 
                        alt={theme}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                        <div className="p-6 w-full">
                          <h3 className="text-2xl font-bold text-white">{theme}</h3>
                          <p className="text-purple-200 mt-1">Exclusive StaartHero designs</p>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <Button 
                        onClick={() => navigateToProducts('theme', theme)}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0"
                      >
                        Explore Theme <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Featured Collection Banner */}
        <div className="relative overflow-hidden rounded-lg h-80 mb-12">
          <img 
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470" 
            alt="StaartHero Limited Edition"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex items-center">
            <div className="p-8 max-w-lg">
              <h2 className="text-4xl font-bold mb-2">StaartHero Limited Edition</h2>
              <p className="text-purple-200 mb-6 text-lg">
                Discover our exclusive limited-edition designs available for a short time only
              </p>
              <Button 
                onClick={() => navigate('/products')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg px-8 py-3"
              >
                Shop Now
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Collections;
