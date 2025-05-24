
import axios from 'axios';
import { getMockOrders } from './mockData';

const API_BASE_URL = 'http://localhost:5000/api';

export const getMyOrders = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_BASE_URL}/orders/myorders`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.log('API unavailable, using mock orders data');
    return getMockOrders();
  }
};

export const createOrder = async (orderData: any) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_BASE_URL}/orders`, orderData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.log('API unavailable, simulating order creation');
    return { 
      _id: 'mock-order-' + Date.now(),
      status: 'Processing',
      totalPrice: orderData.totalPrice,
      createdAt: new Date().toISOString()
    };
  }
};
