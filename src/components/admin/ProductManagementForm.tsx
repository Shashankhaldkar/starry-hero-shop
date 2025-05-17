
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plus, Image, Upload, X } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as productAPI from "@/api/products";
import * as adminAPI from "@/api/admin";
import { Product } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ProductList } from "./ProductList";

type ProductFormValues = {
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  theme: string;
  stock: number;
  featured: boolean;
  sizes: string[];
  colors: string[];
  images: string[];
};

// Add proper type definition for the component props
interface ProductManagementFormProps {
  productsData?: Product[];
  isLoading?: boolean;
}

export const ProductManagementForm = ({ productsData, isLoading }: ProductManagementFormProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  
  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];
  const availableColors = ["Black", "White", "Red", "Blue", "Green", "Yellow", "Purple"];

  // Fetch categories and themes from the backend
  const { data: categoriesData } = useQuery({
    queryKey: ['product-categories'],
    queryFn: async () => {
      try {
        const data = await productAPI.getProductCategories();
        return data || [];
      } catch (error) {
        console.error('Error fetching categories:', error);
        return ["Oversized", "Acid Wash", "Graphic Printed", "Solid Color", 
        "Polo T-Shirts", "Sleeveless", "Long Sleeve", "Henley", 
        "Hooded", "Crop Tops"];
      }
    }
  });

  const { data: themesData } = useQuery({
    queryKey: ['product-themes'],
    queryFn: async () => {
      try {
        const data = await productAPI.getProductThemes();
        return data || [];
      } catch (error) {
        console.error('Error fetching themes:', error);
        return ["Marvel Universe", "DC Comics", "Anime Superheroes", 
        "Classic Comics", "Sci-Fi & Fantasy", "Video Game Characters", 
        "Custom Fan Art"];
      }
    }
  });

  // Create product mutation
  const createProductMutation = useMutation({
    mutationFn: (data: FormData) => adminAPI.createProduct(data),
    onSuccess: () => {
      toast({
        title: "Product Added",
        description: "Product has been added successfully.",
      });
      form.reset();
      setPreviewImages([]);
      setImageFiles([]);
      // Invalidate queries to refresh product data
      queryClient.invalidateQueries({ queryKey: ['products-analytics'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add product.",
        variant: "destructive",
      });
    }
  });

  // Update product mutation
  const updateProductMutation = useMutation({
    mutationFn: ({id, data}: {id: string, data: FormData}) => adminAPI.updateProduct(id, data),
    onSuccess: () => {
      toast({
        title: "Product Updated",
        description: "Product has been updated successfully.",
      });
      resetForm();
      // Invalidate queries to refresh product data
      queryClient.invalidateQueries({ queryKey: ['products-analytics'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update product.",
        variant: "destructive",
      });
    }
  });

  // Delete product mutation
  const deleteProductMutation = useMutation({
    mutationFn: (id: string) => adminAPI.deleteProduct(id),
    onSuccess: () => {
      toast({
        title: "Product Deleted",
        description: "Product has been deleted successfully.",
      });
      setIsDeleteDialogOpen(false);
      setProductToDelete(null);
      // Invalidate queries to refresh product data
      queryClient.invalidateQueries({ queryKey: ['products-analytics'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete product.",
        variant: "destructive",
      });
    }
  });

  const form = useForm<ProductFormValues>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      discountPrice: 0,
      category: "",
      theme: "",
      stock: 0,
      featured: false,
      sizes: ["M", "L", "XL"],
      colors: ["Black"],
      images: []
    }
  });
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    // Store the File objects for later upload
    const newFiles = Array.from(files);
    setImageFiles([...imageFiles, ...newFiles]);
    
    // Create preview URLs
    const newImages: string[] = [];
    for (let i = 0; i < files.length; i++) {
      newImages.push(URL.createObjectURL(files[i]));
    }
    
    setPreviewImages([...previewImages, ...newImages]);
    form.setValue("images", [...form.getValues("images"), ...newImages]);
  };

  const removeImage = (index: number) => {
    const updatedPreviewImages = [...previewImages];
    const updatedImageFiles = [...imageFiles];
    
    updatedPreviewImages.splice(index, 1);
    updatedImageFiles.splice(index, 1);
    
    setPreviewImages(updatedPreviewImages);
    setImageFiles(updatedImageFiles);
    form.setValue("images", updatedPreviewImages);
  };
  
  const toggleSize = (size: string) => {
    const currentSizes = form.getValues("sizes");
    if (currentSizes.includes(size)) {
      form.setValue("sizes", currentSizes.filter(s => s !== size));
    } else {
      form.setValue("sizes", [...currentSizes, size]);
    }
  };
  
  const toggleColor = (color: string) => {
    const currentColors = form.getValues("colors");
    if (currentColors.includes(color)) {
      form.setValue("colors", currentColors.filter(c => c !== color));
    } else {
      form.setValue("colors", [...currentColors, color]);
    }
  };

  const resetForm = () => {
    form.reset({
      name: "",
      description: "",
      price: 0,
      discountPrice: 0,
      category: "",
      theme: "",
      stock: 0,
      featured: false,
      sizes: ["M", "L", "XL"],
      colors: ["Black"],
      images: []
    });
    setPreviewImages([]);
    setImageFiles([]);
    setIsEditMode(false);
    setEditProductId(null);
  };

  const handleEditProduct = (product: Product) => {
    form.reset({
      name: product.name,
      description: product.description,
      price: product.price,
      discountPrice: product.discountPrice || 0,
      category: product.category,
      theme: product.theme,
      stock: product.stock,
      featured: product.featured || false,
      sizes: product.sizes,
      colors: product.colors,
      images: product.images
    });
    
    setPreviewImages(product.images);
    setImageFiles([]);  // Can't restore files, only URLs
    setIsEditMode(true);
    setEditProductId(product.id);
    
    // Scroll to form
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleDeleteProduct = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteProduct = () => {
    if (productToDelete) {
      deleteProductMutation.mutate(productToDelete.id);
    }
  };
  
  const onSubmit = (data: ProductFormValues) => {
    // Create a FormData object to send the product data with images
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    if (data.discountPrice) formData.append("discountPrice", data.discountPrice.toString());
    formData.append("category", data.category);
    formData.append("theme", data.theme);
    formData.append("stock", data.stock.toString());
    formData.append("featured", data.featured.toString());
    formData.append("sizes", JSON.stringify(data.sizes));
    formData.append("colors", JSON.stringify(data.colors));
    
    // Append all image files
    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    // If we have image URLs but no files (like in edit mode), pass those too
    if (previewImages.length > 0 && previewImages.length !== imageFiles.length) {
      formData.append("imageUrls", JSON.stringify(previewImages));
    }
    
    // Submit the product data to the server
    if (isEditMode && editProductId) {
      updateProductMutation.mutate({id: editProductId, data: formData});
    } else {
      createProductMutation.mutate(formData);
    }
  };

  // Show loading state if data is loading
  if (isLoading) {
    return (
      <Card className="bg-starry-darkPurple/40 border-starry-purple/30 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-64">
            <p className="text-white">Loading product data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Transform categories and themes for select options
  const categoryOptions = categoriesData || [
    "Oversized", "Acid Wash", "Graphic Printed", "Solid Color", 
    "Polo T-Shirts", "Sleeveless", "Long Sleeve", "Henley", 
    "Hooded", "Crop Tops"
  ];
  
  const themeOptions = themesData || [
    "Marvel Universe", "DC Comics", "Anime Superheroes", 
    "Classic Comics", "Sci-Fi & Fantasy", "Video Game Characters", 
    "Custom Fan Art"
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-starry-darkPurple/40 border-starry-purple/30 backdrop-blur-sm">
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Superhero T-Shirt" 
                            {...field} 
                            className="bg-starry-darkPurple/20 border-starry-purple/30"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (₹)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number"
                            placeholder="999" 
                            className="bg-starry-darkPurple/20 border-starry-purple/30"
                            {...field}
                            onChange={e => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="discountPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount Price (₹)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number"
                            placeholder="799"
                            className="bg-starry-darkPurple/20 border-starry-purple/30"
                            {...field}
                            onChange={e => {
                              const value = e.target.value;
                              field.onChange(value ? parseFloat(value) : undefined);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock Quantity</FormLabel>
                        <FormControl>
                          <Input 
                            type="number"
                            placeholder="100" 
                            className="bg-starry-darkPurple/20 border-starry-purple/30"
                            {...field}
                            onChange={e => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          value={field.value}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-starry-darkPurple/20 border-starry-purple/30">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categoryOptions.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="theme"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Theme</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          value={field.value}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-starry-darkPurple/20 border-starry-purple/30">
                              <SelectValue placeholder="Select theme" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {themeOptions.map((theme) => (
                              <SelectItem key={theme} value={theme}>
                                {theme}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="featured"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border border-starry-purple/30 p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Featured Product</FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter product description" 
                            className="min-h-[150px] bg-starry-darkPurple/20 border-starry-purple/30"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-2">
                    <Label>Available Sizes</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {availableSizes.map((size) => (
                        <Badge 
                          key={size} 
                          variant={form.getValues("sizes").includes(size) ? "default" : "outline"} 
                          className="cursor-pointer hover:bg-starry-purple/70"
                          onClick={() => toggleSize(size)}
                        >
                          {size}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Available Colors</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {availableColors.map((color) => (
                        <Badge 
                          key={color} 
                          variant={form.getValues("colors").includes(color) ? "default" : "outline"} 
                          className="cursor-pointer hover:bg-starry-purple/70"
                          onClick={() => toggleColor(color)}
                        >
                          {color}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Product Images</Label>
                    <div className="border border-starry-purple/30 rounded-md p-4">
                      <label className="flex flex-col items-center justify-center border-2 border-dashed border-starry-purple/30 rounded-md h-32 bg-starry-darkPurple/20 cursor-pointer">
                        <Upload className="h-10 w-10 text-starry-purple/70" />
                        <div className="mt-2 text-sm text-gray-400">
                          Click to upload or drag and drop
                        </div>
                        <input 
                          type="file" 
                          accept="image/*" 
                          multiple 
                          className="hidden" 
                          onChange={handleImageUpload} 
                        />
                      </label>
                      
                      {previewImages.length > 0 && (
                        <div className="mt-4 grid grid-cols-3 gap-2">
                          {previewImages.map((img, index) => (
                            <div key={index} className="relative h-20 rounded-md overflow-hidden">
                              <img 
                                src={img} 
                                alt={`Preview ${index}`} 
                                className="h-full w-full object-cover" 
                              />
                              <Button 
                                type="button"
                                size="icon"
                                variant="destructive" 
                                className="absolute top-1 right-1 h-6 w-6 rounded-full p-0"
                                onClick={() => removeImage(index)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                {isEditMode && (
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={resetForm}
                  >
                    Cancel
                  </Button>
                )}
                <Button 
                  type="submit" 
                  className="bg-starry-purple hover:bg-starry-vividPurple"
                  disabled={createProductMutation.isPending || updateProductMutation.isPending}
                >
                  {createProductMutation.isPending || updateProductMutation.isPending ? (
                    <span>Saving...</span>
                  ) : isEditMode ? (
                    <span>Update Product</span>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" /> Add Product
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <h3 className="text-xl font-bold text-white mt-8 mb-4">Existing Products</h3>
      
      <ProductList 
        products={productsData || []} 
        isLoading={isLoading || false}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
      />

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-starry-darkPurple text-white border-starry-purple">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            Are you sure you want to delete "{productToDelete?.name}"? This action cannot be undone.
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDeleteProduct}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
