
import API from './index';

// Create a new order
export const createOrder = async (orderData: any) => {
  try {
    const { data } = await API.post('/orders', orderData);
    return data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Get order by ID
export const getOrderById = async (id: string) => {
  try {
    const { data } = await API.get(`/orders/${id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching order ${id}:`, error);
    throw error;
  }
};

// Update order to paid
export const updateOrderToPaid = async (orderId: string, paymentResult: any) => {
  try {
    const { data } = await API.put(`/orders/${orderId}/pay`, paymentResult);
    return data;
  } catch (error) {
    console.error('Error updating order to paid:', error);
    throw error;
  }
};

// Get logged in user orders
export const getMyOrders = async () => {
  try {
    const { data } = await API.get('/orders/myorders');
    return data;
  } catch (error) {
    console.error('Error fetching my orders:', error);
    throw error;
  }
};
