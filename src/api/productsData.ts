
import { Product, Category, Theme } from "@/types";
import * as productAPI from "@/api/products";

// Helper function to get product categories from API
export const getProductCategories = async (): Promise<Category[]> => {
  try {
    return await productAPI.getProductCategories();
  } catch (error) {
    console.error("Error fetching product categories:", error);
    return [];
  }
};

// Helper function to get product themes from API
export const getProductThemes = async (): Promise<Theme[]> => {
  try {
    return await productAPI.getProductThemes();
  } catch (error) {
    console.error("Error fetching product themes:", error);
    return [];
  }
};

// Helper function to get all products
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    return await productAPI.getAllProducts();
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
};

// Helper function to get featured products
export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const allProducts = await productAPI.getAllProducts();
    return allProducts.filter(product => product.featured).slice(0, 8);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
};

// Helper function to get products by category
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    return await productAPI.getProductsByCategory(category);
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    return [];
  }
};

// Helper function to get products by theme
export const getProductsByTheme = async (theme: string): Promise<Product[]> => {
  try {
    return await productAPI.getProductsByTheme(theme);
  } catch (error) {
    console.error(`Error fetching products for theme ${theme}:`, error);
    return [];
  }
};

// Helper function to get new arrivals (most recently added products)
export const getNewArrivals = async (): Promise<Product[]> => {
  try {
    const allProducts = await productAPI.getAllProducts();
    return [...allProducts]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 8);
  } catch (error) {
    console.error("Error fetching new arrivals:", error);
    return [];
  }
};

// Helper function to get popular products (highest rated or most sold)
export const getPopularProducts = async (): Promise<Product[]> => {
  try {
    const allProducts = await productAPI.getAllProducts();
    return [...allProducts]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 8);
  } catch (error) {
    console.error("Error fetching popular products:", error);
    return [];
  }
};
