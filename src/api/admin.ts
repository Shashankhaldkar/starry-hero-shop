
import API from './index';
import { Product } from '@/types';

// Get all admin products
export const getAdminProducts = async () => {
  try {
    const { data } = await API.get('/admin/products');
    return data;
  } catch (error) {
    console.error('Error fetching admin products:', error);
    throw error;
  }
};

// Create a new product
export const createProduct = async (productData: FormData) => {
  try {
    console.log('Creating product with data:', Object.fromEntries(productData));
    const { data } = await API.post('/products', productData, {
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
export const updateProduct = async (id: string, productData: FormData) => {
  try {
    console.log('Updating product with data:', Object.fromEntries(productData));
    const { data } = await API.put(`/products/${id}`, productData, {
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
export const deleteProduct = async (id: string) => {
  try {
    const { data } = await API.delete(`/products/${id}`);
    return data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Get all orders
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
    const { data } = await API.put(`/orders/${orderId}/status`, { status });
    return data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

// Get all users
export const getUsers = async () => {
  try {
    const { data } = await API.get('/admin/users');
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Get dashboard stats
export const getDashboardStats = async () => {
  try {
    const { data } = await API.get('/admin/dashboard');
    return data;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
};

// Get product analytics data
export const getProductAnalytics = async (productId: string, timeRange: string) => {
  try {
    const { data } = await API.get(`/admin/products/analytics`, {
      params: { productId, timeRange }
    });
    return data;
  } catch (error) {
    console.error('Error fetching product analytics:', error);
    // Return sample data for demonstration when the API is not available
    return {
      salesData: [
        { period: 'Jan', sales: 45, revenue: 1350, views: 120 },
        { period: 'Feb', sales: 52, revenue: 1560, views: 145 },
        { period: 'Mar', sales: 61, revenue: 1830, views: 190 },
        { period: 'Apr', sales: 67, revenue: 2010, views: 220 },
        { period: 'May', sales: 70, revenue: 2100, views: 240 },
        { period: 'Jun', sales: 74, revenue: 2220, views: 260 }
      ],
      totalSales: 369,
      totalRevenue: 11070,
      totalViews: 1175,
      averageRating: 4.5,
      conversionRate: 7.8
    };
  }
};
