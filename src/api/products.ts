
import API from './index';
import { Product } from '@/types';

// Get all products with filtering
export const getProducts = async (
  keyword = '',
  pageNumber = 1,
  category = '',
  theme = '',
  minPrice = 0,
  maxPrice = 0
) => {
  try {
    let url = `/products?pageNumber=${pageNumber}`;
    
    if (keyword) url += `&keyword=${keyword}`;
    if (category) url += `&category=${category}`;
    if (theme) url += `&theme=${theme}`;
    if (minPrice > 0) url += `&minPrice=${minPrice}`;
    if (maxPrice > 0) url += `&maxPrice=${maxPrice}`;
    
    const { data } = await API.get(url);
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    // Return empty response structure to prevent UI errors
    return { products: [], pages: 0, page: 1, total: 0 };
  }
};

// Get a product by ID
export const getProductById = async (id: string) => {
  try {
    const { data } = await API.get(`/products/${id}`);
    return data as Product;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

// Get featured products
export const getFeaturedProducts = async () => {
  try {
    const { data } = await API.get('/products/featured');
    return data as Product[];
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return []; // Return empty array to prevent UI errors
  }
};

// Get product categories
export const getProductCategories = async () => {
  try {
    const { data } = await API.get('/products/categories');
    return data as string[];
  } catch (error) {
    console.error('Error fetching product categories:', error);
    // Return fallback categories
    return [
      "Oversized", "Acid Wash", "Graphic Printed", "Solid Color",
      "Polo T-Shirts", "Sleeveless", "Long Sleeve", "Henley",
      "Hooded", "Crop Tops"
    ];
  }
};

// Get product themes
export const getProductThemes = async () => {
  try {
    const { data } = await API.get('/products/themes');
    return data as string[];
  } catch (error) {
    console.error('Error fetching product themes:', error);
    // Return fallback themes
    return [
      "Marvel Universe", "DC Comics", "Anime Superheroes",
      "Classic Comics", "Sci-Fi & Fantasy", "Video Game Characters",
      "Custom Fan Art"
    ];
  }
};

// Create product review
export const createProductReview = async (productId: string, review: { rating: number; comment: string }) => {
  try {
    const { data } = await API.post(`/products/${productId}/reviews`, review);
    return data;
  } catch (error) {
    console.error('Error creating product review:', error);
    throw error;
  }
};
