import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as productAPI from "@/api/products";
import * as adminAPI from "@/api/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Product } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Plus, Edit, Trash2, Image, Upload, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";

export const ProductManagement = () => {
  const { toast: uiToast } = useToast();
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [isDeleteProductOpen, setIsDeleteProductOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  
  // Form state
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: 0,
    discountPrice: 0,
    category: "",
    theme: "",
    images: [] as string[],
    stock: 0,
    inStock: true,
    featured: false,
    sizes: [] as string[],
    colors: [] as string[]
  });
  
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isCreating, setIsCreating] = useState(true);

  // Fetch products
  const { data: productData, isLoading, refetch } = useQuery({
    queryKey: ["admin-products"],
    queryFn: () => productAPI.getProducts(),
  });

  // Fetch categories
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["product-categories"],
    queryFn: productAPI.getProductCategories,
  });

  // Fetch themes
  const { data: themes, isLoading: themesLoading } = useQuery({
    queryKey: ["product-themes"],
    queryFn: productAPI.getProductThemes,
  });

  // Create product mutation
  const createProductMutation = useMutation({
    mutationFn: (productData: FormData) => adminAPI.createProduct(productData),
    onSuccess: () => {
      toast.success("Product created successfully");
      setIsAddProductOpen(false);
      resetForm();
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      setIsSubmitting(false);
    },
    onError: (error) => {
      console.error("Error creating product:", error);
      toast.error("Failed to create product");
      setIsSubmitting(false);
    }
  });

  // Update product mutation
  const updateProductMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: FormData }) => 
      adminAPI.updateProduct(id, data),
    onSuccess: () => {
      toast.success("Product updated successfully");
      setIsEditProductOpen(false);
      resetForm();
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      setIsSubmitting(false);
    },
    onError: (error) => {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
      setIsSubmitting(false);
    }
  });

  // Delete product mutation
  const deleteProductMutation = useMutation({
    mutationFn: (id: string) => adminAPI.deleteProduct(id),
    onSuccess: () => {
      toast.success("Product deleted successfully");
      setIsDeleteProductOpen(false);
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
    },
    onError: (error) => {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = productData?.products?.filter((product: Product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductForm({ 
      ...productForm, 
      [name]: name === "price" || name === "stock" || name === "discountPrice" ? 
        parseFloat(value) || 0 : value 
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setProductForm({ ...productForm, [name]: value });
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setProductForm({ ...productForm, [name]: checked });
  };

  const resetForm = () => {
    setProductForm({
      name: "",
      description: "",
      price: 0,
      discountPrice: 0,
      category: "",
      theme: "",
      images: [],
      stock: 0,
      inStock: true,
      featured: false,
      sizes: [],
      colors: []
    });
    setSelectedFiles(null);
    setPreviewUrls([]);
    setIsCreating(true);
  };

  const editProduct = (product: Product) => {
    setSelectedProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price,
      discountPrice: product.discountPrice || 0,
      category: product.category,
      theme: product.theme,
      images: product.images || [],
      stock: product.stock,
      inStock: product.inStock !== undefined ? product.inStock : product.stock > 0,
      featured: product.featured || false,
      sizes: product.sizes || [],
      colors: product.colors || []
    });
    
    if (product.images && product.images.length > 0) {
      setPreviewUrls(product.images);
    }
    
    setIsEditProductOpen(true);
    setIsCreating(false);
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

  const validateProductForm = () => {
    if (!productForm.name) {
      toast.error("Please enter a product name");
      return false;
    }
    
    if (!productForm.description) {
      toast.error("Please enter a product description");
      return false;
    }
    
    if (productForm.price <= 0) {
      toast.error("Price must be greater than zero");
      return false;
    }
    
    if (!productForm.category) {
      toast.error("Please select a category");
      return false;
    }
    
    if (!productForm.theme) {
      toast.error("Please select a theme");
      return false;
    }
    
    return true;
  };

  const confirmDelete = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteProductOpen(true);
  };

  const handleAddProduct = async () => {
    if (!validateProductForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Create FormData for the API call
      const formData = new FormData();
      formData.append('name', productForm.name);
      formData.append('description', productForm.description);
      formData.append('price', productForm.price.toString());
      
      if (productForm.discountPrice > 0) {
        formData.append('discountPrice', productForm.discountPrice.toString());
      }
      
      formData.append('category', productForm.category);
      formData.append('theme', productForm.theme);
      formData.append('stock', productForm.stock.toString());
      formData.append('featured', productForm.featured.toString());
      
      // Add sizes and colors
      productForm.sizes.forEach(size => {
        formData.append('sizes', size);
      });
      
      productForm.colors.forEach(color => {
        formData.append('colors', color);
      });
      
      // Add images if any
      if (selectedFiles) {
        for (let i = 0; i < selectedFiles.length; i++) {
          formData.append('images', selectedFiles[i]);
        }
      }
      
      await createProductMutation.mutateAsync(formData);
    } catch (error) {
      console.error("Error creating product:", error);
      setIsSubmitting(false);
    }
  };

  const handleUpdateProduct = async () => {
    if (!selectedProduct || !validateProductForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Create FormData for the API call
      const formData = new FormData();
      formData.append('name', productForm.name);
      formData.append('description', productForm.description);
      formData.append('price', productForm.price.toString());
      
      if (productForm.discountPrice > 0) {
        formData.append('discountPrice', productForm.discountPrice.toString());
      }
      
      formData.append('category', productForm.category);
      formData.append('theme', productForm.theme);
      formData.append('stock', productForm.stock.toString());
      formData.append('featured', productForm.featured.toString());
      
      // Add sizes and colors
      productForm.sizes.forEach(size => {
        formData.append('sizes', size);
      });
      
      productForm.colors.forEach(color => {
        formData.append('colors', color);
      });
      
      // Add images if any
      if (selectedFiles) {
        for (let i = 0; i < selectedFiles.length; i++) {
          formData.append('images', selectedFiles[i]);
        }
      } else if (!isCreating && previewUrls.length > 0) {
        // Keep existing images when updating
        previewUrls.forEach(url => {
          formData.append('images', url);
        });
      }
      
      await updateProductMutation.mutateAsync({ 
        id: selectedProduct.id, 
        data: formData 
      });
    } catch (error) {
      console.error("Error updating product:", error);
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;
    
    try {
      await deleteProductMutation.mutateAsync(selectedProduct.id);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleToggleSize = (size: string) => {
    setProductForm(prev => {
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
    setProductForm(prev => {
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

  const ProductFormContent = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Product Name*</Label>
            <Input 
              id="name" 
              name="name" 
              value={productForm.name} 
              onChange={handleInputChange} 
              placeholder="Enter product name" 
              required
            />
          </div>
          
          <div>
            <Label htmlFor="price">Price (₹)*</Label>
            <Input 
              id="price" 
              name="price" 
              type="number" 
              min="0.01"
              step="0.01"
              value={productForm.price || ''} 
              onChange={handleInputChange} 
              placeholder="0.00" 
              required
            />
          </div>
          
          <div>
            <Label htmlFor="discountPrice">Discount Price (₹)</Label>
            <Input 
              id="discountPrice" 
              name="discountPrice" 
              type="number" 
              min="0"
              step="0.01"
              value={productForm.discountPrice || ''} 
              onChange={handleInputChange} 
              placeholder="0.00" 
            />
          </div>
          
          <div>
            <Label htmlFor="stock">Stock Quantity*</Label>
            <Input 
              id="stock" 
              name="stock" 
              type="number" 
              min="0"
              value={productForm.stock || ''} 
              onChange={handleInputChange} 
              placeholder="0" 
              required
            />
          </div>
          
          <div>
            <Label htmlFor="category">Category*</Label>
            {categoriesLoading ? (
              <div className="text-sm text-gray-500">Loading categories...</div>
            ) : (
              <Select 
                onValueChange={(value) => handleSelectChange("category", value)} 
                value={productForm.category}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-starry-darkPurple text-white border-starry-purple">
                  {categories?.map((category: string) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          
          <div>
            <Label htmlFor="theme">Theme*</Label>
            {themesLoading ? (
              <div className="text-sm text-gray-500">Loading themes...</div>
            ) : (
              <Select 
                onValueChange={(value) => handleSelectChange("theme", value)} 
                value={productForm.theme}
              >
                <SelectTrigger id="theme">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent className="bg-starry-darkPurple text-white border-starry-purple">
                  {themes?.map((theme: string) => (
                    <SelectItem key={theme} value={theme}>
                      {theme}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="featured" 
              checked={productForm.featured} 
              onCheckedChange={(checked) => handleSwitchChange("featured", checked)} 
            />
            <Label htmlFor="featured">Featured Product</Label>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="description">Description*</Label>
            <Textarea 
              id="description" 
              name="description" 
              value={productForm.description} 
              onChange={handleInputChange} 
              placeholder="Enter product description" 
              className="h-24"
              required
            />
          </div>
          
          <div>
            <Label>Available Sizes</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {["XS", "S", "M", "L", "XL", "XXL", "3XL"].map((size) => (
                <Badge 
                  key={size} 
                  variant={productForm.sizes.includes(size) ? "default" : "outline"} 
                  className="cursor-pointer"
                  onClick={() => handleToggleSize(size)}
                >
                  {size}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label>Available Colors</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {["Black", "White", "Red", "Blue", "Green", "Yellow", "Purple"].map((color) => (
                <Badge 
                  key={color} 
                  variant={productForm.colors.includes(color) ? "default" : "outline"} 
                  className="cursor-pointer"
                  onClick={() => handleToggleColor(color)}
                >
                  {color}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <Label htmlFor="images">Product Images</Label>
            <Input
              id="images"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="mt-2"
            />
            
            {previewUrls.length > 0 && (
              <div className="mt-4">
                <Label>Image Previews</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="h-20 w-20 rounded-md overflow-hidden bg-gray-200">
                      <img src={url} alt={`Preview ${index + 1}`} className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Product Management</h2>
        <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
          <DialogTrigger asChild>
            <Button className="btn-hero-hover">
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-starry-darkPurple text-white border-starry-purple max-w-3xl max-h-[90vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Add a new superhero t-shirt to your inventory.
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>
              <TabsContent value="basic" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Product Name*</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={productForm.name} 
                      onChange={handleInputChange} 
                      placeholder="Enter product name" 
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Price (₹)*</Label>
                      <Input 
                        id="price" 
                        name="price" 
                        type="number" 
                        min="0.01"
                        step="0.01"
                        value={productForm.price || ''} 
                        onChange={handleInputChange} 
                        placeholder="0.00" 
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="discountPrice">Discount Price (₹)</Label>
                      <Input 
                        id="discountPrice" 
                        name="discountPrice" 
                        type="number" 
                        min="0"
                        step="0.01"
                        value={productForm.discountPrice || ''} 
                        onChange={handleInputChange} 
                        placeholder="0.00" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description*</Label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      value={productForm.description} 
                      onChange={handleInputChange} 
                      placeholder="Enter product description" 
                      className="h-24"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category*</Label>
                      {categoriesLoading ? (
                        <div className="text-sm text-gray-500">Loading categories...</div>
                      ) : (
                        <Select 
                          onValueChange={(value) => handleSelectChange("category", value)} 
                          value={productForm.category}
                        >
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent className="bg-starry-darkPurple text-white border-starry-purple">
                            {categories?.map((category: string) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="theme">Theme*</Label>
                      {themesLoading ? (
                        <div className="text-sm text-gray-500">Loading themes...</div>
                      ) : (
                        <Select 
                          onValueChange={(value) => handleSelectChange("theme", value)} 
                          value={productForm.theme}
                        >
                          <SelectTrigger id="theme">
                            <SelectValue placeholder="Select theme" />
                          </SelectTrigger>
                          <SelectContent className="bg-starry-darkPurple text-white border-starry-purple">
                            {themes?.map((theme: string) => (
                              <SelectItem key={theme} value={theme}>
                                {theme}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="details" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="stock">Stock Quantity*</Label>
                    <Input 
                      id="stock" 
                      name="stock" 
                      type="number" 
                      min="0"
                      value={productForm.stock || ''} 
                      onChange={handleInputChange} 
                      placeholder="0" 
                      required
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch 
                      id="featured" 
                      checked={productForm.featured} 
                      onCheckedChange={(checked) => handleSwitchChange("featured", checked)} 
                    />
                    <Label htmlFor="featured">Featured Product</Label>
                  </div>

                  <div>
                    <Label>Available Sizes</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {["XS", "S", "M", "L", "XL", "XXL", "3XL"].map((size) => (
                        <Badge 
                          key={size} 
                          variant={productForm.sizes.includes(size) ? "default" : "outline"} 
                          className="cursor-pointer"
                          onClick={() => handleToggleSize(size)}
                        >
                          {size}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Available Colors</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {["Black", "White", "Red", "Blue", "Green", "Yellow", "Purple"].map((color) => (
                        <Badge 
                          key={color} 
                          variant={productForm.colors.includes(color) ? "default" : "outline"} 
                          className="cursor-pointer"
                          onClick={() => handleToggleColor(color)}
                        >
                          {color}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="images">Product Images</Label>
                    <Input
                      id="images"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="mt-2"
                    />
                    
                    {previewUrls.length > 0 && (
                      <div className="mt-4">
                        <Label>Image Previews</Label>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          {previewUrls.map((url, index) => (
                            <div key={index} className="h-20 w-20 rounded-md overflow-hidden bg-gray-200">
                              <img src={url} alt={`Preview ${index + 1}`} className="h-full w-full object-cover" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>Cancel</Button>
              <Button 
                className="btn-hero-hover" 
                onClick={handleAddProduct}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : "Create Product"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="max-w-sm"
        />
      </div>

      <Card className="bg-starry-darkPurple/40 border-starry-purple/30 backdrop-blur-sm">
        <ScrollArea className="h-[500px] rounded-md">
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
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex justify-center items-center">
                      <Loader2 className="h-6 w-6 animate-spin text-purple-500 mr-2" />
                      <span>Loading products...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">No products found</TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product: Product) => (
                  <TableRow key={product._id || product.id} className="hover:bg-starry-darkPurple/60">
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
                          onClick={() => editProduct(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="icon"
                          onClick={() => confirmDelete(product)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </Card>

      <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
        <DialogContent className="bg-starry-darkPurple text-white border-starry-purple max-w-3xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update the details for {selectedProduct?.name}.
            </DialogDescription>
          </DialogHeader>
          <ProductFormContent />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditProductOpen(false)}>Cancel</Button>
            <Button 
              className="btn-hero-hover" 
              onClick={handleUpdateProduct}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : "Update Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteProductOpen} onOpenChange={setIsDeleteProductOpen}>
        <DialogContent className="bg-starry-darkPurple text-white border-starry-purple">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedProduct?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteProductOpen(false)}>Cancel</Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteProduct}
              disabled={deleteProductMutation.isPending}
            >
              {deleteProductMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
