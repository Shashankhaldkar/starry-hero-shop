
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/types';
import { getProductsByCategory } from '@/api/productsData';

const Category = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      if (!categoryId) return;
      
      try {
        const categoryProducts = await getProductsByCategory(categoryId);
        setProducts(categoryProducts);
        
        // Set category name based on categoryId
        const name = categoryId.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        setCategoryName(name);
      } catch (error) {
        console.error('Error fetching category products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [categoryId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-purple-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
            {categoryName}
          </h1>
          <p className="text-purple-300 text-lg max-w-2xl mx-auto">
            Discover our collection of {categoryName.toLowerCase()} superhero apparel
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-purple-900/30 rounded-lg h-96 animate-pulse"></div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-purple-300 text-lg">No products found in this category.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Category;
