
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import * as productAPI from "@/api/products";
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
import { Plus, Edit, Trash2, Image, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ProductManagement = () => {
  const { toast } = useToast();
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [isDeleteProductOpen, setIsDeleteProductOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Form for creating/editing product
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: 0,
    discountPrice: 0,
    category: "",
    theme: "",
    images: [""],
    stock: 0,
    inStock: true,
    featured: false,
    sizes: ["M", "L", "XL"],
    colors: ["Black", "White", "Red"]
  });

  // Fetch products
  const { data: productData, isLoading, refetch } = useQuery({
    queryKey: ["admin-products"],
    queryFn: () => productAPI.getProducts(),
  });

  // Fetch categories and themes for dropdown options
  const { data: categories } = useQuery({
    queryKey: ["product-categories"],
    queryFn: productAPI.getProductCategories,
  });

  const { data: themes } = useQuery({
    queryKey: ["product-themes"],
    queryFn: productAPI.getProductThemes,
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = productData?.products?.filter((product: Product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductForm({ ...productForm, [name]: value });
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
      images: [""],
      stock: 0,
      inStock: true,
      featured: false,
      sizes: ["M", "L", "XL"],
      colors: ["Black", "White", "Red"]
    });
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
      images: product.images,
      stock: product.stock,
      inStock: product.inStock,
      featured: product.featured,
      sizes: product.sizes,
      colors: product.colors
    });
    setIsEditProductOpen(true);
  };

  const confirmDelete = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteProductOpen(true);
  };

  const handleAddProduct = async () => {
    // Add implementation would go here - API call to create product
    toast({
      title: "Product Added",
      description: `${productForm.name} has been added successfully.`,
    });
    setIsAddProductOpen(false);
    resetForm();
    refetch();
  };

  const handleUpdateProduct = async () => {
    // Update implementation would go here - API call to update product
    toast({
      title: "Product Updated",
      description: `${productForm.name} has been updated successfully.`,
    });
    setIsEditProductOpen(false);
    resetForm();
    refetch();
  };

  const handleDeleteProduct = async () => {
    // Delete implementation would go here - API call to delete product
    toast({
      title: "Product Deleted",
      description: `${selectedProduct?.name} has been deleted.`,
    });
    setIsDeleteProductOpen(false);
    setSelectedProduct(null);
    refetch();
  };

  const ProductFormContent = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input 
              id="name" 
              name="name" 
              value={productForm.name} 
              onChange={handleInputChange} 
              placeholder="Superhero T-Shirt" 
            />
          </div>
          
          <div>
            <Label htmlFor="price">Price ($)</Label>
            <Input 
              id="price" 
              name="price" 
              type="number" 
              value={productForm.price} 
              onChange={handleInputChange} 
              placeholder="29.99" 
            />
          </div>
          
          <div>
            <Label htmlFor="discountPrice">Discount Price ($)</Label>
            <Input 
              id="discountPrice" 
              name="discountPrice" 
              type="number" 
              value={productForm.discountPrice} 
              onChange={handleInputChange} 
              placeholder="19.99" 
            />
          </div>
          
          <div>
            <Label htmlFor="stock">Stock Quantity</Label>
            <Input 
              id="stock" 
              name="stock" 
              type="number" 
              value={productForm.stock} 
              onChange={handleInputChange} 
              placeholder="100" 
            />
          </div>
          
          <div>
            <Label htmlFor="category">Category</Label>
            <Select 
              onValueChange={(value) => handleSelectChange("category", value)} 
              value={productForm.category}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories?.map((category: string) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="theme">Theme</Label>
            <Select 
              onValueChange={(value) => handleSelectChange("theme", value)} 
              value={productForm.theme}
            >
              <SelectTrigger id="theme">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                {themes?.map((theme: string) => (
                  <SelectItem key={theme} value={theme}>
                    {theme}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              name="description" 
              value={productForm.description} 
              onChange={handleInputChange} 
              placeholder="Enter product description" 
              rows={6} 
            />
          </div>
          
          <div>
            <Label htmlFor="images">Images</Label>
            <div className="border border-starry-purple/30 rounded-md p-4 mt-2">
              <div className="flex items-center justify-center border-2 border-dashed border-starry-purple/30 rounded-md h-32 bg-starry-darkPurple/20">
                <div className="text-center">
                  <Upload className="mx-auto h-10 w-10 text-starry-purple/70" />
                  <div className="mt-2 text-sm text-gray-400">
                    Click to upload or drag and drop
                  </div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {productForm.images.map((image, index) => (
                  <div key={index} className="relative w-20 h-20 rounded-md overflow-hidden">
                    <Image className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
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
                <TabsTrigger value="images">Images</TabsTrigger>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
              </TabsList>
              <TabsContent value="basic" className="space-y-4">
                <ProductFormContent />
              </TabsContent>
              <TabsContent value="images" className="space-y-4">
                <div className="border border-starry-purple/30 rounded-md p-6">
                  <div className="flex items-center justify-center border-2 border-dashed border-starry-purple/30 rounded-md h-48 bg-starry-darkPurple/20">
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-starry-purple/70" />
                      <div className="mt-2 text-sm text-gray-400">
                        Click to upload or drag and drop
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        SVG, PNG, JPG or GIF (max. 2MB)
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="inventory" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="stock">Stock Quantity</Label>
                    <Input 
                      id="stock" 
                      name="stock" 
                      type="number" 
                      value={productForm.stock} 
                      onChange={handleInputChange} 
                      placeholder="100" 
                    />
                  </div>
                  <div className="flex items-center space-x-2 mt-8">
                    <Switch 
                      id="inStock" 
                      checked={productForm.inStock} 
                      onCheckedChange={(checked) => handleSwitchChange("inStock", checked)} 
                    />
                    <Label htmlFor="inStock">In Stock</Label>
                  </div>
                </div>
                <Separator className="my-4" />
                <div>
                  <Label>Available Sizes</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {["XS", "S", "M", "L", "XL", "XXL", "3XL"].map((size) => (
                      <Badge 
                        key={size} 
                        variant={productForm.sizes.includes(size) ? "default" : "outline"} 
                        className="cursor-pointer"
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
                      >
                        {color}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>Cancel</Button>
              <Button className="btn-hero-hover" onClick={handleAddProduct}>Add Product</Button>
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
                  <TableCell colSpan={7} className="text-center">Loading products...</TableCell>
                </TableRow>
              ) : filteredProducts?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">No products found</TableCell>
                </TableRow>
              ) : (
                filteredProducts?.map((product: Product) => (
                  <TableRow key={product._id} className="hover:bg-starry-darkPurple/60">
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
                          <span className="line-through text-gray-400">${product.price.toFixed(2)}</span>
                          <span className="ml-2 text-starry-purple">${product.discountPrice.toFixed(2)}</span>
                        </div>
                      ) : (
                        <span>${product.price.toFixed(2)}</span>
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

      {/* Edit Product Dialog */}
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
            <Button className="btn-hero-hover" onClick={handleUpdateProduct}>Update Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Delete Dialog */}
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
            <Button variant="destructive" onClick={handleDeleteProduct}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
