
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
    const { data } = await API.get(`/admin/analytics/products`, {
      params: { productId, timeRange }
    });
    return data;
  } catch (error) {
    console.error('Error fetching product analytics:', error);
    // Return mock data temporarily while backend is being fixed
    return {
      salesData: [
        { period: "Jan", sales: 12, revenue: 12000 },
        { period: "Feb", sales: 19, revenue: 19000 },
        { period: "Mar", sales: 15, revenue: 15000 },
        { period: "Apr", sales: 22, revenue: 22000 },
        { period: "May", sales: 28, revenue: 28000 },
        { period: "Jun", sales: 16, revenue: 16000 },
      ],
      totalSales: 112,
      totalRevenue: 112000,
      averageRating: 4.5
    };
  }
};
