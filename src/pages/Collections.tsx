
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getProductCategories, getProductThemes } from '@/api/products';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

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
    "Oversized": "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=500",
    "Acid Wash": "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=500",
    "Graphic Printed": "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=500",
    "Solid Color": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500",
    "Polo T-Shirts": "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=500",
    "Sleeveless": "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=500",
    "Long Sleeve": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=500",
    "Henley": "https://images.unsplash.com/photo-1622445275576-721325763afe?q=80&w=500",
    "Hooded": "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=500",
    "Crop Tops": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=500",
  };
  
  const themeImages = {
    "Marvel Universe": "https://images.unsplash.com/photo-1612036782180-6f0822045d55?q=80&w=500",
    "DC Comics": "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?q=80&w=500",
    "Anime Superheroes": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=500",
    "Classic Comics": "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=500",
    "Sci-Fi & Fantasy": "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=500",
    "Video Game Characters": "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=500",
    "Custom Fan Art": "https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=500",
  };

  // Default placeholder image
  const defaultImage = "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=500";

  const navigateToProducts = (filter: string, value: string) => {
    navigate(`/products?${filter}=${encodeURIComponent(value)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center py-12 mb-8">
          <h1 className="text-5xl font-bold mb-4">Collections</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore our curated collections of superhero and pop culture t-shirts designed for style and comfort
          </p>
        </div>
        
        {/* Tabs */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-md bg-gray-800/30 p-1">
            <button
              onClick={() => setActiveTab('categories')}
              className={`px-6 py-2 rounded-md ${activeTab === 'categories' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : 'text-gray-300 hover:text-white'}`}
            >
              Categories
            </button>
            <button
              onClick={() => setActiveTab('themes')}
              className={`px-6 py-2 rounded-md ${activeTab === 'themes' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : 'text-gray-300 hover:text-white'}`}
            >
              Themes
            </button>
          </div>
        </div>
        
        {/* Collection Grids */}
        {activeTab === 'categories' ? (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
            
            {categoriesLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map((category) => (
                  <Card key={category} className="overflow-hidden bg-gray-800/30 border-gray-700 hover:border-gray-500 transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={categoryImages[category as keyof typeof categoryImages] || defaultImage} 
                        alt={category}
                        className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                        <div className="p-4 w-full">
                          <h3 className="text-xl font-medium">{category}</h3>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <Button 
                        onClick={() => navigateToProducts('category', category)}
                        className="w-full bg-transparent hover:bg-white/10 border border-white/30 text-white"
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
            <h2 className="text-2xl font-bold mb-6">Shop by Theme</h2>
            
            {themesLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {themes.map((theme) => (
                  <Card key={theme} className="overflow-hidden bg-gray-800/30 border-gray-700 hover:border-gray-500 transition-all duration-300">
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={themeImages[theme as keyof typeof themeImages] || defaultImage} 
                        alt={theme}
                        className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                        <div className="p-6 w-full">
                          <h3 className="text-2xl font-medium">{theme}</h3>
                          <p className="text-gray-300 mt-1">Exclusive designs</p>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <Button 
                        onClick={() => navigateToProducts('theme', theme)}
                        className="w-full bg-transparent hover:bg-white/10 border border-white/30 text-white"
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
            alt="Special Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex items-center">
            <div className="p-8 max-w-lg">
              <h2 className="text-3xl font-bold mb-2">Limited Edition Collection</h2>
              <p className="text-gray-200 mb-6">
                Discover our exclusive limited-edition designs available for a short time only
              </p>
              <Button className="bg-white text-black hover:bg-gray-200">
                Shop Now
              </Button>
            </div>
          </div>
        </div>
        
        {/* Subscription Banner */}
        <Card className="bg-gradient-to-r from-purple-900/80 to-blue-900/80 border-none mb-12">
          <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">Join Our Collectors Club</h3>
              <p className="text-gray-200">Get early access to new releases and exclusive member discounts</p>
            </div>
            <Button className="bg-white text-black hover:bg-gray-200">
              Subscribe Now
            </Button>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Collections;
