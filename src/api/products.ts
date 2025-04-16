
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
    throw error;
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
    throw error;
  }
};

// Get product categories
export const getProductCategories = async () => {
  try {
    const { data } = await API.get('/products/categories');
    return data as string[];
  } catch (error) {
    console.error('Error fetching product categories:', error);
    throw error;
  }
};

// Get product themes
export const getProductThemes = async () => {
  try {
    const { data } = await API.get('/products/themes');
    return data as string[];
  } catch (error) {
    console.error('Error fetching product themes:', error);
    throw error;
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
