
import API from './index';
import { Product, User, Order } from '@/types';

// Get admin dashboard stats
export const getDashboardStats = async () => {
  try {
    const { data } = await API.get('/admin/dashboard');
    return data;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
};

// Get all users (admin only)
export const getUsers = async () => {
  try {
    const { data } = await API.get('/admin/users');
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Get all orders (admin only)
export const getOrders = async () => {
  try {
    const { data } = await API.get('/admin/orders');
    return data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

// Update order status
export const updateOrderStatus = async (orderId: string, status: string) => {
  try {
    const { data } = await API.put(`/admin/orders/${orderId}`, { status });
    return data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

// Create a new product
export const createProduct = async (productData: FormData) => {
  try {
    const { data } = await API.post('/admin/products', productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Update a product
export const updateProduct = async (productId: string, productData: FormData) => {
  try {
    const { data } = await API.put(`/admin/products/${productId}`, productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (productId: string) => {
  try {
    const { data } = await API.delete(`/admin/products/${productId}`);
    return data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Get product analytics
export const getProductAnalytics = async (productId: string = 'all', timeRange: string = '6months') => {
  try {
    const { data } = await API.get(`/admin/analytics/products?productId=${productId}&timeRange=${timeRange}`);
    return data;
  } catch (error) {
    console.error('Error fetching product analytics:', error);
    throw error;
  }
};
