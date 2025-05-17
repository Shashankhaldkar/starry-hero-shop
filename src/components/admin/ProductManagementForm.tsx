
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plus, Image, Upload } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import * as productAPI from "@/api/products";
import { categories, themes } from "@/data/products";

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

export const ProductManagementForm = () => {
  const { toast } = useToast();
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];
  const availableColors = ["Black", "White", "Red", "Blue", "Green", "Yellow", "Purple"];

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
    
    // In a real app, you would upload to a server and get URLs back
    // For this demo, we'll create some placeholder URLs
    const newImages: string[] = [];
    for (let i = 0; i < files.length; i++) {
      newImages.push(URL.createObjectURL(files[i]));
    }
    
    setPreviewImages([...previewImages, ...newImages]);
    form.setValue("images", [...form.getValues("images"), ...newImages]);
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
  
  const onSubmit = (data: ProductFormValues) => {
    console.log("Product data:", data);
    // Here you would typically send data to your API
    toast({
      title: "Product Added",
      description: `${data.name} has been added successfully.`,
    });
    form.reset();
    setPreviewImages([]);
  };

  return (
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
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
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
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select theme" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {themes.map((theme) => (
                            <SelectItem key={theme.id} value={theme.id}>
                              {theme.name}
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
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
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
                          className="min-h-[150px]"
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
                        className="cursor-pointer"
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
                        className="cursor-pointer"
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
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button type="submit" className="bg-starry-purple hover:bg-starry-vividPurple">
                <Plus className="mr-2 h-4 w-4" /> Add Product
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
