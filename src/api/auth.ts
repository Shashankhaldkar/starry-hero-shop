
import API from './index';

interface UserData {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

interface LoginData {
  email: string;
  password: string;
  isAdmin?: boolean;
}

// Register a new user
export const register = async (userData: UserData) => {
  try {
    const { data } = await API.post('/users', userData);
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
    }
    return data;
  } catch (error: any) {
    console.error('Error registering user:', error);
    const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
    throw new Error(errorMessage);
  }
};

// Login user
export const login = async (loginData: LoginData) => {
  try {
    const { data } = await API.post('/users/login', loginData);
    
    // Save token to localStorage
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
    }
    
    return data;
  } catch (error: any) {
    console.error('Error logging in:', error);
    const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
    throw new Error(errorMessage);
  }
};

// Logout user
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('cartItems');
};

// Get user profile
export const getUserProfile = async () => {
  try {
    const { data } = await API.get('/users/profile');
    return data;
  } catch (error: any) {
    console.error('Error fetching user profile:', error);
    const errorMessage = error.response?.data?.message || 'Failed to fetch user profile.';
    throw new Error(errorMessage);
  }
};

// Update user profile
export const updateUserProfile = async (userData: Partial<UserData>) => {
  try {
    const { data } = await API.put('/users/profile', userData);
    
    // Update user in localStorage
    if (data) {
      const existingUser = JSON.parse(localStorage.getItem('user') || '{}');
      const updatedUser = { ...existingUser, ...data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
    
    return data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Add user address
export const addAddress = async (addressData: any) => {
  try {
    const { data } = await API.post('/users/address', addressData);
    return data;
  } catch (error) {
    console.error('Error adding address:', error);
    throw error;
  }
};

// Remove user address
export const removeAddress = async (addressId: string) => {
  try {
    const { data } = await API.delete(`/users/address/${addressId}`);
    return data;
  } catch (error) {
    console.error('Error removing address:', error);
    throw error;
  }
};

// Add to wishlist
export const addToWishlist = async (productId: string) => {
  try {
    const { data } = await API.post('/users/wishlist', { productId });
    return data;
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    throw error;
  }
};

// Remove from wishlist
export const removeFromWishlist = async (productId: string) => {
  try {
    const { data } = await API.delete(`/users/wishlist/${productId}`);
    return data;
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    throw error;
  }
};

// Get wishlist
export const getWishlist = async () => {
  try {
    const { data } = await API.get('/users/wishlist');
    return data.wishlist;
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    throw error;
  }
};
