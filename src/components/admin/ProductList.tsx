import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Image, Eye } from "lucide-react";
import { Product } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import * as adminAPI from "@/api/admin";

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (product: Product) => void;
}

export const ProductList = ({ products, isLoading, onEditProduct, onDeleteProduct }: ProductListProps) => {
  const { toast } = useToast();
  const [viewProduct, setViewProduct] = useState<Product | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Handle product view
  const handleViewProduct = (product: Product) => {
    setViewProduct(product);
    setIsViewDialogOpen(true);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = (product: Product) => {
    setDeleteProduct(product);
    setIsDeleteDialogOpen(true);
  };

  // Handle actual deletion
  const handleDelete = async () => {
    if (!deleteProduct) return;
    
    setIsDeleting(true);
    try {
      await adminAPI.deleteProduct(deleteProduct.id);
      toast({
        title: "Product deleted",
        description: `${deleteProduct.name} has been deleted successfully`,
      });
      onDeleteProduct(deleteProduct);
    } catch (error) {
      console.error("Failed to delete product:", error);
      toast({
        title: "Delete failed",
        description: "There was an error deleting the product",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
      setDeleteProduct(null);
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-indigo-900/50 border-purple-700/30 p-6">
        <div className="text-center p-8 text-purple-200">Loading products...</div>
      </Card>
    );
  }

  if (!products || products.length === 0) {
    return (
      <Card className="bg-indigo-900/50 border-purple-700/30 p-6">
        <div className="text-center p-8 text-purple-200">No products found. Add a new product to get started.</div>
      </Card>
    );
  }

  return (
    <>
      <Card className="bg-indigo-900/50 border-purple-700/30">
        <ScrollArea className="h-[500px] rounded-md">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-indigo-800/50 border-purple-700/30">
                <TableHead className="w-[80px] text-purple-200">Image</TableHead>
                <TableHead className="text-purple-200">Name</TableHead>
                <TableHead className="text-purple-200">Category</TableHead>
                <TableHead className="text-purple-200">Theme</TableHead>
                <TableHead className="text-purple-200">Price</TableHead>
                <TableHead className="text-purple-200">Stock</TableHead>
                <TableHead className="text-right text-purple-200">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} className="hover:bg-indigo-800/40 border-purple-700/20">
                  <TableCell>
                    <div className="h-12 w-12 rounded-md overflow-hidden bg-dark-800">
                      {product.images && product.images.length > 0 ? (
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="h-full w-full object-cover" 
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full w-full">
                          <Image className="h-6 w-6 text-dark-500" />
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {product.name}
                    {product.featured && (
                      <Badge variant="outline" className="ml-2 bg-dark-800 text-dark-200">
                        Featured
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.theme}</TableCell>
                  <TableCell>
                    {product.discountPrice ? (
                      <div>
                        <span className="line-through text-dark-500">₹{product.price.toFixed(2)}</span>
                        <span className="ml-2 text-white">₹{product.discountPrice.toFixed(2)}</span>
                      </div>
                    ) : (
                      <span>₹{product.price.toFixed(2)}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={product.stock > 10 ? "outline" : "destructive"}>
                      {product.stock}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleViewProduct(product)}
                        className="bg-dark-800 hover:bg-dark-700 border-dark-700"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => onEditProduct(product)}
                        className="bg-dark-800 hover:bg-dark-700 border-dark-700"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="icon"
                        onClick={() => handleDeleteConfirm(product)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </Card>

      {/* View Product Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="bg-indigo-900 border-purple-700/30 text-white max-w-3xl">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
          </DialogHeader>
          {viewProduct && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Image */}
              <div className="rounded-md overflow-hidden bg-dark-800 aspect-square">
                {viewProduct.images && viewProduct.images.length > 0 ? (
                  <img 
                    src={viewProduct.images[0]} 
                    alt={viewProduct.name} 
                    className="h-full w-full object-cover" 
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Image className="h-16 w-16 text-dark-500" />
                  </div>
                )}
              </div>
              
              {/* Product Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{viewProduct.name}</h3>
                  {viewProduct.featured && (
                    <Badge variant="outline" className="mt-1 bg-dark-800 text-dark-200">
                      Featured
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-dark-400">Category:</div>
                  <div>{viewProduct.category}</div>
                  
                  <div className="text-dark-400">Theme:</div>
                  <div>{viewProduct.theme}</div>
                  
                  <div className="text-dark-400">Price:</div>
                  <div>₹{viewProduct.price.toFixed(2)}</div>
                  
                  {viewProduct.discountPrice && (
                    <>
                      <div className="text-dark-400">Discount Price:</div>
                      <div>₹{viewProduct.discountPrice.toFixed(2)}</div>
                    </>
                  )}
                  
                  <div className="text-dark-400">Stock:</div>
                  <div>{viewProduct.stock} units</div>
                </div>

                <div>
                  <h4 className="text-dark-400 mb-1">Description</h4>
                  <p className="text-sm text-dark-200">{viewProduct.description}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsViewDialogOpen(false)}
              className="bg-dark-800 hover:bg-dark-700 border-dark-700"
            >
              Close
            </Button>
            <Button 
              onClick={() => {
                setIsViewDialogOpen(false);
                if (viewProduct) onEditProduct(viewProduct);
              }}
              className="bg-dark-700 hover:bg-dark-600"
            >
              Edit Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-indigo-900 border-purple-700/30 text-white">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription className="text-purple-300">
              Are you sure you want to delete "{deleteProduct?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
              className="bg-indigo-800 hover:bg-indigo-700 border-purple-700/30 text-white"
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-700 hover:bg-red-800"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
