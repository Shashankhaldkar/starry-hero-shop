
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductManagementForm } from "./ProductManagementForm";
import { ProductAnalytics } from "./ProductAnalytics";
import { useQuery } from "@tanstack/react-query";
import * as productAPI from "@/api/products";
import * as adminAPI from "@/api/admin";
import { toast } from "@/components/ui/use-toast";

export const AdminProductAnalytics = () => {
  const [activeTab, setActiveTab] = useState("manage");
  
  // Fetch product data
  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ['products-analytics'],
    queryFn: async () => {
      try {
        return await productAPI.getProducts();
      } catch (error) {
        toast({
          title: "Failed to fetch products",
          description: "There was an error loading product data",
          variant: "destructive"
        });
        return { products: [] };
      }
    }
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Product Management & Analytics</h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-starry-darkPurple/40 border border-starry-purple/30 rounded-lg p-1 mb-6">
          <TabsTrigger value="manage" className="data-[state=active]:bg-starry-purple">
            Manage Products
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-starry-purple">
            Product Analytics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="manage">
          <ProductManagementForm productsData={productsData?.products} isLoading={productsLoading} />
        </TabsContent>
        
        <TabsContent value="analytics">
          <ProductAnalytics productsData={productsData?.products} isLoading={productsLoading} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminProductAnalytics;
