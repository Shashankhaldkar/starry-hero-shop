
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductManagementForm } from "./ProductManagementForm";
import { ProductAnalytics } from "./ProductAnalytics";
import { ProductList } from "./ProductList";
import { useQuery } from "@tanstack/react-query";
import * as productAPI from "@/api/products";
import * as adminAPI from "@/api/admin";
import { toast } from "@/components/ui/use-toast";
import { Product } from "@/types";

export const AdminProductAnalytics = () => {
  const [activeTab, setActiveTab] = useState("manage");
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  
  // Fetch product data
  const { data: productsData, isLoading, error, refetch } = useQuery({
    queryKey: ['products-management'],
    queryFn: async () => {
      try {
        const data = await productAPI.getProducts();
        console.log("Fetched products:", data);
        return data;
      } catch (error) {
        console.error('Error fetching products:', error);
        toast({
          title: "Failed to fetch products",
          description: "Using sample data for demonstration",
          variant: "destructive"
        });
        // Return some sample data as fallback
        return { 
          products: [
            {
              id: "1",
              name: "Batman T-Shirt",
              description: "Dark Knight t-shirt for fans",
              price: 29.99,
              category: "T-Shirts",
              theme: "DC",
              stock: 25,
              images: ["/placeholder.svg"],
              featured: true
            },
            {
              id: "2",
              name: "Superman Hoodie",
              description: "Man of Steel hoodie with logo",
              price: 49.99,
              category: "Hoodies",
              theme: "DC",
              stock: 15,
              images: ["/placeholder.svg"],
              featured: false
            }
          ], 
          pages: 1, 
          page: 1, 
          total: 2 
        };
      }
    },
    retry: 1
  });

  // Handle product edit
  const handleEditProduct = (product: Product) => {
    setEditProduct(product);
    setActiveTab("manage");
  };

  // Handle product delete confirmation
  const handleDeleteProduct = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteDialogOpen(true);
  };

  // Handle successful product action (create/update/delete)
  const handleProductAction = () => {
    setEditProduct(null);
    refetch();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Product Management & Analytics</h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-dark-900 border border-dark-800 rounded-lg p-1 mb-6">
          <TabsTrigger 
            value="manage" 
            className="data-[state=active]:bg-dark-700 data-[state=active]:text-dark-100"
          >
            Manage Products
          </TabsTrigger>
          <TabsTrigger 
            value="list" 
            className="data-[state=active]:bg-dark-700 data-[state=active]:text-dark-100"
          >
            Product List
          </TabsTrigger>
          <TabsTrigger 
            value="analytics" 
            className="data-[state=active]:bg-dark-700 data-[state=active]:text-dark-100"
          >
            Product Analytics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="manage">
          <ProductManagementForm 
            productsData={productsData?.products || []} 
            isLoading={isLoading}
            editProduct={editProduct}
            onSuccess={handleProductAction}
          />
        </TabsContent>
        
        <TabsContent value="list">
          <ProductList 
            products={productsData?.products || []} 
            isLoading={isLoading}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        </TabsContent>
        
        <TabsContent value="analytics">
          <ProductAnalytics 
            productsData={productsData?.products || []} 
            isLoading={isLoading} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminProductAnalytics;
