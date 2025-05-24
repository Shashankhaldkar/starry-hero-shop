
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useState, useEffect } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/types';
import { getAllProducts } from '@/api/productsData';
import { Badge } from '@/components/ui/badge';

const Sale = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSaleProducts = async () => {
      try {
        const allProducts = await getAllProducts();
        // Filter products that have a discount price
        const saleProducts = allProducts.filter(product => product.discountPrice && product.discountPrice > 0);
        setProducts(saleProducts);
      } catch (error) {
        console.error('Error fetching sale products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSaleProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-purple-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
              Sale
            </h1>
            <Badge variant="destructive" className="text-lg px-3 py-1">
              Up to 50% OFF
            </Badge>
          </div>
          <p className="text-purple-300 text-lg max-w-2xl mx-auto">
            Heroic savings on your favorite superhero merchandise
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
            <p className="text-purple-300 text-lg">No sale items available at the moment.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Sale;
