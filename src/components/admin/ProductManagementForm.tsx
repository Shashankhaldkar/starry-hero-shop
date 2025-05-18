
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import * as adminAPI from "@/api/admin";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Product } from "@/types";

interface ProductManagementFormProps {
  productsData: Product[];
  isLoading: boolean;
  onSuccess?: () => void;
}

export const ProductManagementForm: React.FC<ProductManagementFormProps> = ({ 
  productsData, 
  isLoading, 
  onSuccess 
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    theme: "",
    stock: 0,
    featured: false
  });
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // Product creation mutation
  const createProductMutation = useMutation({
    mutationFn: (data: FormData) => adminAPI.createProduct(data),
    onSuccess: () => {
      toast({
        title: "Product Created",
        description: "The product has been created successfully."
      });
      resetForm();
      onSuccess && onSuccess();
    },
    onError: (error) => {
      console.error("Error creating product:", error);
      toast({
        title: "Creation Failed",
        description: "There was a problem creating the product.",
        variant: "destructive"
      });
    }
  });

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: 0,
      category: "",
      theme: "",
      stock: 0,
      featured: false
    });
    setSelectedFiles(null);
    setPreviewUrls([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? parseFloat(value) : value
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      featured: checked
    }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(e.target.files);
      
      // Create preview URLs
      const urls = [];
      for (let i = 0; i < e.target.files.length; i++) {
        urls.push(URL.createObjectURL(e.target.files[i]));
      }
      setPreviewUrls(urls);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.description || formData.price <= 0) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Create FormData for file upload
    const productFormData = new FormData();
    productFormData.append("name", formData.name);
    productFormData.append("description", formData.description);
    productFormData.append("price", formData.price.toString());
    productFormData.append("category", formData.category);
    productFormData.append("theme", formData.theme);
    productFormData.append("stock", formData.stock.toString());
    productFormData.append("featured", formData.featured.toString());
    
    // Add images if available
    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        productFormData.append("images", selectedFiles[i]);
      }
    }
    
    // Submit the form
    createProductMutation.mutate(productFormData);
  };

  if (isLoading) {
    return (
      <Card className="bg-admin-darkGrey/80 border-admin-grey/30 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <p className="text-admin-softGrey">Loading...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-admin-darkGrey/80 border-admin-grey/30 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">Add New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-admin-softGrey">Product Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                className="bg-admin-grey/10 text-white border-admin-grey/30"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price" className="text-admin-softGrey">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price || ""}
                onChange={handleInputChange}
                placeholder="0.00"
                className="bg-admin-grey/10 text-white border-admin-grey/30"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category" className="text-admin-softGrey">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleSelectChange("category", value)}
              >
                <SelectTrigger className="bg-admin-grey/10 text-white border-admin-grey/30">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="T-Shirts">T-Shirts</SelectItem>
                  <SelectItem value="Hoodies">Hoodies</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                  <SelectItem value="Collectibles">Collectibles</SelectItem>
                  <SelectItem value="Posters">Posters</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="theme" className="text-admin-softGrey">Theme</Label>
              <Select
                value={formData.theme}
                onValueChange={(value) => handleSelectChange("theme", value)}
              >
                <SelectTrigger className="bg-admin-grey/10 text-white border-admin-grey/30">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Marvel">Marvel</SelectItem>
                  <SelectItem value="DC">DC</SelectItem>
                  <SelectItem value="Star Wars">Star Wars</SelectItem>
                  <SelectItem value="Harry Potter">Harry Potter</SelectItem>
                  <SelectItem value="Anime">Anime</SelectItem>
                  <SelectItem value="Gaming">Gaming</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="stock" className="text-admin-softGrey">Stock</Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                min="0"
                value={formData.stock || ""}
                onChange={handleInputChange}
                placeholder="0"
                className="bg-admin-grey/10 text-white border-admin-grey/30"
              />
            </div>
            
            <div className="flex items-center space-x-2 pt-8">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="featured" className="text-admin-softGrey">Featured Product</Label>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="text-admin-softGrey">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter product description"
              className="bg-admin-grey/10 text-white border-admin-grey/30 h-24"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="images" className="text-admin-softGrey">Product Images</Label>
            <Input
              id="images"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="bg-admin-grey/10 text-white border-admin-grey/30"
            />
          </div>
          
          {previewUrls.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {previewUrls.map((url, index) => (
                <div key={index} className="h-20 w-20 rounded-md overflow-hidden">
                  <img src={url} alt="Preview" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          )}
          
          <div className="flex justify-end space-x-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={resetForm}
              className="bg-admin-grey/10 text-white border-admin-grey/30 hover:bg-admin-grey/30"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={createProductMutation.isPending}
              className="bg-admin-grey text-white hover:bg-admin-lightGrey"
            >
              {createProductMutation.isPending ? "Creating..." : "Create Product"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
