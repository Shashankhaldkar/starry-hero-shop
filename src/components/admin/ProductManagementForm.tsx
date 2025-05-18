
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as adminAPI from "@/api/admin";
import * as productAPI from "@/api/products";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

interface ProductManagementFormProps {
  productsData: Product[];
  isLoading: boolean;
  editProduct: Product | null;
  onSuccess?: () => void;
}

export const ProductManagementForm: React.FC<ProductManagementFormProps> = ({ 
  productsData, 
  isLoading, 
  editProduct,
  onSuccess 
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    discountPrice: 0,
    category: "",
    theme: "",
    stock: 0,
    featured: false,
    sizes: [] as string[],
    colors: [] as string[]
  });
  
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isCreating, setIsCreating] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch categories
  const { data: categories } = useQuery({
    queryKey: ['product-categories'],
    queryFn: productAPI.getProductCategories,
  });

  // Fetch themes
  const { data: themes } = useQuery({
    queryKey: ['product-themes'],
    queryFn: productAPI.getProductThemes,
  });

  // Product creation mutation
  const createProductMutation = useMutation({
    mutationFn: (data: FormData) => adminAPI.createProduct(data),
    onSuccess: () => {
      toast({
        title: "Product Created",
        description: "The product has been created successfully."
      });
      resetForm();
      queryClient.invalidateQueries({ queryKey: ['products-management'] });
      onSuccess && onSuccess();
      setIsSubmitting(false);
    },
    onError: (error) => {
      console.error("Error creating product:", error);
      toast({
        title: "Creation Failed",
        description: "There was a problem creating the product.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  });

  // Product update mutation
  const updateProductMutation = useMutation({
    mutationFn: ({id, data}: {id: string, data: FormData}) => adminAPI.updateProduct(id, data),
    onSuccess: () => {
      toast({
        title: "Product Updated",
        description: "The product has been updated successfully."
      });
      resetForm();
      queryClient.invalidateQueries({ queryKey: ['products-management'] });
      onSuccess && onSuccess();
      setIsSubmitting(false);
    },
    onError: (error) => {
      console.error("Error updating product:", error);
      toast({
        title: "Update Failed",
        description: "There was a problem updating the product.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  });

  // Update form when editing product changes
  useEffect(() => {
    if (editProduct) {
      setFormData({
        name: editProduct.name || "",
        description: editProduct.description || "",
        price: editProduct.price || 0,
        discountPrice: editProduct.discountPrice || 0,
        category: editProduct.category || "",
        theme: editProduct.theme || "",
        stock: editProduct.stock || 0,
        featured: editProduct.featured || false,
        sizes: editProduct.sizes || [],
        colors: editProduct.colors || []
      });
      
      if (editProduct.images && editProduct.images.length > 0) {
        setPreviewUrls(editProduct.images);
      } else {
        setPreviewUrls([]);
      }
      
      setIsCreating(false);
    } else {
      resetForm();
      setIsCreating(true);
    }
  }, [editProduct]);

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: 0,
      discountPrice: 0,
      category: "",
      theme: "",
      stock: 0,
      featured: false,
      sizes: [],
      colors: []
    });
    setSelectedFiles(null);
    setPreviewUrls([]);
    setIsCreating(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "price" || name === "stock" || name === "discountPrice" ? 
        parseFloat(value) || 0 : value
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

  const handleToggleSize = (size: string) => {
    setFormData(prev => {
      if (prev.sizes.includes(size)) {
        return {
          ...prev,
          sizes: prev.sizes.filter(s => s !== size)
        };
      } else {
        return {
          ...prev,
          sizes: [...prev.sizes, size]
        };
      }
    });
  };

  const handleToggleColor = (color: string) => {
    setFormData(prev => {
      if (prev.colors.includes(color)) {
        return {
          ...prev,
          colors: prev.colors.filter(c => c !== color)
        };
      } else {
        return {
          ...prev,
          colors: [...prev.colors, color]
        };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form
    if (!formData.name || !formData.description || formData.price <= 0) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields.",
        variant: "destructive"
      });
      setIsSubmitting(false);
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
    
    if (formData.discountPrice > 0) {
      productFormData.append("discountPrice", formData.discountPrice.toString());
    }
    
    // Add sizes and colors
    formData.sizes.forEach(size => {
      productFormData.append("sizes", size);
    });
    
    formData.colors.forEach(color => {
      productFormData.append("colors", color);
    });
    
    // Add images if available
    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        productFormData.append("images", selectedFiles[i]);
      }
    } else if (!isCreating && previewUrls.length > 0) {
      // Keep existing images when updating
      previewUrls.forEach(url => {
        productFormData.append("images", url);
      });
    }
    
    console.log("Submitting product form:", formData);
    
    // Submit the form
    if (isCreating) {
      createProductMutation.mutate(productFormData);
    } else if (editProduct) {
      updateProductMutation.mutate({ 
        id: editProduct.id, 
        data: productFormData 
      });
    }
  };

  const cancelEdit = () => {
    resetForm();
    if (editProduct) {
      onSuccess && onSuccess();
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-gray-900/80 border-gray-700/30 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <p className="text-gray-400">Loading...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Available sizes and colors
  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];
  const availableColors = ["Black", "White", "Red", "Blue", "Green", "Yellow", "Purple", "Gray", "Navy", "Orange"];

  return (
    <Card className="bg-gray-900/80 border-gray-700/30 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">
          {isCreating ? "Add New Product" : "Edit Product"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-400">Product Name*</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                  className="bg-gray-800/10 border-gray-700/30"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-gray-400">Price (₹)*</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price || ""}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    className="bg-gray-800/10 border-gray-700/30"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="discountPrice" className="text-gray-400">Discount Price (₹)</Label>
                  <Input
                    id="discountPrice"
                    name="discountPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.discountPrice || ""}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    className="bg-gray-800/10 border-gray-700/30"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-400">Description*</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter product description"
                  className="bg-gray-800/10 border-gray-700/30 h-24"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-gray-400">Category*</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleSelectChange("category", value)}
                  >
                    <SelectTrigger className="bg-gray-800/10 border-gray-700/30 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="theme" className="text-gray-400">Theme*</Label>
                  <Select
                    value={formData.theme}
                    onValueChange={(value) => handleSelectChange("theme", value)}
                  >
                    <SelectTrigger className="bg-gray-800/10 border-gray-700/30 text-white">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      {themes?.map((theme) => (
                        <SelectItem key={theme} value={theme}>{theme}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="stock" className="text-gray-400">Stock Quantity*</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
                  value={formData.stock || ""}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="bg-gray-800/10 border-gray-700/30"
                  required
                />
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={handleSwitchChange}
                />
                <Label htmlFor="featured" className="text-gray-400">Featured Product</Label>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sizes" className="text-gray-400">Available Sizes</Label>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map((size) => (
                    <Button
                      key={size}
                      type="button"
                      variant={formData.sizes.includes(size) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleToggleSize(size)}
                      className={formData.sizes.includes(size) ? 
                        "bg-gray-700 hover:bg-gray-600" : 
                        "bg-transparent border-gray-700 text-white hover:bg-gray-800"
                      }
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="colors" className="text-gray-400">Available Colors</Label>
                <div className="flex flex-wrap gap-2">
                  {availableColors.map((color) => (
                    <Button
                      key={color}
                      type="button"
                      variant={formData.colors.includes(color) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleToggleColor(color)}
                      className={formData.colors.includes(color) ? 
                        "bg-gray-700 hover:bg-gray-600" : 
                        "bg-transparent border-gray-700 text-white hover:bg-gray-800"
                      }
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="images" className="text-gray-400">Product Images</Label>
                <Input
                  id="images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="bg-gray-800/10 border-gray-700/30"
                />
              </div>
              
              {previewUrls.length > 0 && (
                <div className="border border-gray-700/30 rounded-md p-4">
                  <Label className="text-gray-400 mb-2 block">Image Previews</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="h-20 w-20 rounded-md overflow-hidden">
                        <img src={url} alt={`Preview ${index + 1}`} className="h-full w-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={cancelEdit}
              className="bg-transparent text-white border-gray-700 hover:bg-gray-800"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-gray-700 text-white hover:bg-gray-600"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isCreating ? "Creating..." : "Updating..."}
                </>
              ) : (
                isCreating ? "Create Product" : "Update Product"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
