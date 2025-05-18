
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductManagementForm } from "./ProductManagementForm";
import { ProductAnalytics } from "./ProductAnalytics";
import { ProductList } from "./ProductList";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as productAPI from "@/api/products";
import * as adminAPI from "@/api/admin";
import { toast } from "@/components/ui/use-toast";
import { Product } from "@/types";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const AdminProductAnalytics = () => {
  const [activeTab, setActiveTab] = useState("manage");
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const queryClient = useQueryClient();
  
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
          description: "There was an error retrieving the product list. Please try again.",
          variant: "destructive"
        });
        return { products: [], pages: 1, page: 1, total: 0 }; 
      }
    },
    retry: 1
  });

  // Delete product mutation
  const deleteProductMutation = useMutation({
    mutationFn: (productId: string) => adminAPI.deleteProduct(productId),
    onSuccess: () => {
      toast({
        title: "Product deleted",
        description: "The product has been successfully deleted."
      });
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['products-management'] });
      setIsDeleteDialogOpen(false);
      setProductToDelete(null);
    },
    onError: (error) => {
      console.error('Error deleting product:', error);
      toast({
        title: "Failed to delete product",
        description: "There was an error deleting the product. Please try again.",
        variant: "destructive"
      });
    }
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

  // Confirm product deletion
  const confirmDeleteProduct = () => {
    if (productToDelete) {
      deleteProductMutation.mutate(productToDelete.id);
    }
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
        <TabsList className="bg-gray-900/40 border border-gray-700/30 rounded-lg p-1 mb-6">
          <TabsTrigger 
            value="manage" 
            className="data-[state=active]:bg-gray-700 text-white"
          >
            Manage Products
          </TabsTrigger>
          <TabsTrigger 
            value="list" 
            className="data-[state=active]:bg-gray-700 text-white"
          >
            Product List
          </TabsTrigger>
          <TabsTrigger 
            value="analytics" 
            className="data-[state=active]:bg-gray-700 text-white"
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

      {/* Delete confirmation dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-gray-900 border-gray-700 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              This action cannot be undone. This will permanently delete the product 
              "{productToDelete?.name}" from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent text-white border-gray-700 hover:bg-gray-800">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-900 hover:bg-red-800 text-white" 
              onClick={confirmDeleteProduct}
              disabled={deleteProductMutation.isPending}
            >
              {deleteProductMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminProductAnalytics;
