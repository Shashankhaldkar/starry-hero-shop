
import { Product, Category, Theme } from "@/types";
import * as productAPI from "@/api/products";

// Helper function to transform API response categories into our Category type
export const getProductCategories = async (): Promise<Category[]> => {
  try {
    const categoryNames = await productAPI.getProductCategories();
    return categoryNames.map((name, index) => ({
      id: name.toLowerCase().replace(/\s+/g, "-"),
      name: name,
      image: `https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=3064&auto=format&fit=crop&ixid=${index}`
    }));
  } catch (error) {
    console.error("Error fetching product categories:", error);
    return [];
  }
};

// Helper function to transform API response themes into our Theme type
export const getProductThemes = async (): Promise<Theme[]> => {
  try {
    const themeNames = await productAPI.getProductThemes();
    return themeNames.map((name, index) => ({
      id: name.toLowerCase().replace(/\s+/g, "-"),
      name: name,
      image: `https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=3074&auto=format&fit=crop&ixid=${index}`
    }));
  } catch (error) {
    console.error("Error fetching product themes:", error);
    return [];
  }
};

// Helper function to get all products
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await productAPI.getProducts({});
    return response.products.map(product => ({
      ...product,
      id: product._id // Map _id to id for consistency with our types
    }));
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
};

// Helper function to get featured products
export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const response = await productAPI.getProducts({
      keyword: "",
      page: 1,
      category: "",
      theme: "",
      minPrice: 0,
      maxPrice: 0
    });
    return response.products
      .filter(product => product.featured)
      .slice(0, 8)
      .map(product => ({
        ...product,
        id: product._id
      }));
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
};

// Helper function to get products by category
export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  try {
    const response = await productAPI.getProducts({
      category: categoryId,
      page: 1
    });
    return response.products.map(product => ({
      ...product,
      id: product._id
    }));
  } catch (error) {
    console.error(`Error fetching products for category ${categoryId}:`, error);
    return [];
  }
};

// Helper function to get products by theme
export const getProductsByTheme = async (themeId: string): Promise<Product[]> => {
  try {
    const response = await productAPI.getProducts({
      theme: themeId,
      page: 1
    });
    return response.products.map(product => ({
      ...product,
      id: product._id
    }));
  } catch (error) {
    console.error(`Error fetching products for theme ${themeId}:`, error);
    return [];
  }
};

// Helper function to get new arrivals (most recently added products)
export const getNewArrivals = async (): Promise<Product[]> => {
  try {
    const response = await productAPI.getProducts({});
    return response.products
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 8)
      .map(product => ({
        ...product,
        id: product._id
      }));
  } catch (error) {
    console.error("Error fetching new arrivals:", error);
    return [];
  }
};

// Helper function to get popular products (highest rated or most sold)
export const getPopularProducts = async (): Promise<Product[]> => {
  try {
    const response = await productAPI.getProducts({});
    return response.products
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 8)
      .map(product => ({
        ...product,
        id: product._id
      }));
  } catch (error) {
    console.error("Error fetching popular products:", error);
    return [];
  }
};
