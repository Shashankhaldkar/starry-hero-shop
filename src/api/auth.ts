
import axios from 'axios';
import { getMockWishlistItems, getMockOrders } from './mockData';

const API_BASE_URL = 'http://localhost:5000/api';

// Authentication functions
export const login = async (credentials: { email: string; password: string; isAdmin?: boolean }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login`, credentials);
    const { token, ...userData } = response.data;
    
    // Store token and user data
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    
    return userData;
  } catch (error: any) {
    console.log('API unavailable, using mock login');
    // Mock login for development
    const mockUser = {
      _id: 'mock-user-id',
      name: credentials.isAdmin ? 'Admin User' : 'Test User',
      email: credentials.email,
      role: credentials.isAdmin ? 'admin' : 'user',
      avatar: null
    };
    
    const mockToken = 'mock-jwt-token-' + Date.now();
    localStorage.setItem('token', mockToken);
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    return mockUser;
  }
};

export const register = async (userData: { name: string; email: string; password: string; isAdmin?: boolean }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, userData);
    const { token, ...user } = response.data;
    
    // Store token and user data
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return user;
  } catch (error: any) {
    console.log('API unavailable, using mock registration');
    // Mock registration for development
    const mockUser = {
      _id: 'mock-user-id-' + Date.now(),
      name: userData.name,
      email: userData.email,
      role: userData.isAdmin ? 'admin' : 'user',
      avatar: null
    };
    
    const mockToken = 'mock-jwt-token-' + Date.now();
    localStorage.setItem('token', mockToken);
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    return mockUser;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const updateUserProfile = async (profileData: { name?: string; email?: string; avatar?: string }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_BASE_URL}/users/profile`, profileData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    // Update stored user data
    const updatedUser = response.data;
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    return updatedUser;
  } catch (error) {
    console.log('API unavailable, using mock profile update');
    // Mock profile update
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    const updatedUser = { ...currentUser, ...profileData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    return updatedUser;
  }
};

// Wishlist functions
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
