
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Image } from "lucide-react";
import { Product } from "@/types";

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (product: Product) => void;
}

export const ProductList = ({ products, isLoading, onEditProduct, onDeleteProduct }: ProductListProps) => {
  if (isLoading) {
    return (
      <Card className="bg-starry-darkPurple/40 border-starry-purple/30 backdrop-blur-sm p-6">
        <div className="text-center p-8">Loading products...</div>
      </Card>
    );
  }

  if (!products || products.length === 0) {
    return (
      <Card className="bg-starry-darkPurple/40 border-starry-purple/30 backdrop-blur-sm p-6">
        <div className="text-center p-8">No products found. Add a new product to get started.</div>
      </Card>
    );
  }

  return (
    <Card className="bg-starry-darkPurple/40 border-starry-purple/30 backdrop-blur-sm">
      <ScrollArea className="h-[400px] rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-starry-darkPurple/60">
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Theme</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} className="hover:bg-starry-darkPurple/60">
                <TableCell>
                  <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-200">
                    {product.images && product.images.length > 0 ? (
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="h-full w-full object-cover" 
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full w-full bg-gray-200">
                        <Image className="h-6 w-6 text-gray-500" />
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  {product.name}
                  {product.featured && (
                    <Badge variant="outline" className="ml-2 bg-starry-purple/20 text-starry-purple">
                      Featured
                    </Badge>
                  )}
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.theme}</TableCell>
                <TableCell>
                  {product.discountPrice ? (
                    <div>
                      <span className="line-through text-gray-400">₹{product.price.toFixed(2)}</span>
                      <span className="ml-2 text-starry-purple">₹{product.discountPrice.toFixed(2)}</span>
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
                      onClick={() => onEditProduct(product)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="icon"
                      onClick={() => onDeleteProduct(product)}
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
  );
};
