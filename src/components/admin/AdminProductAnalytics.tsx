
import React, { useState } from 'react';
import { ProductAnalytics } from './ProductAnalytics';
import { useQuery } from '@tanstack/react-query';
import * as productAPI from '@/api/products';
import { Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

const AdminProductAnalytics: React.FC = () => {
  const [filter, setFilter] = useState({
    category: '',
    timeRange: '6months'
  });

  // Fetch products for analytics
  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ['products-analytics'],
    queryFn: () => productAPI.getProducts(),
  });

  if (productsLoading) {
    return (
      <Card className="bg-indigo-900/50 border-purple-700/30 p-6">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-purple-500 mr-2" />
          <p className="text-purple-200">Loading product analytics...</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Product Analytics</h2>
      <ProductAnalytics 
        productsData={productsData?.products} 
        isLoading={productsLoading} 
      />
    </div>
  );
};

export default AdminProductAnalytics;
