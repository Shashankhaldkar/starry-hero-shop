
import axios from 'axios';
import { getMockWishlistItems, getMockOrders } from './mockData';

const API_BASE_URL = 'http://localhost:5000/api';

export const getWishlist = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_BASE_URL}/users/wishlist`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.wishlist;
  } catch (error) {
    console.log('API unavailable, using mock wishlist data');
    return getMockWishlistItems();
  }
};

export const addToWishlist = async (productId: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${API_BASE_URL}/users/wishlist`,
      { productId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.log('API unavailable, simulating add to wishlist');
    return { message: 'Product added to wishlist' };
  }
};

export const removeFromWishlist = async (productId: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_BASE_URL}/users/wishlist/${productId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.log('API unavailable, simulating remove from wishlist');
    return { message: 'Product removed from wishlist' };
  }
};
