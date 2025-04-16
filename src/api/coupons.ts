
import API from './index';

// Verify coupon code
export const verifyCoupon = async (code: string, amount: number) => {
  try {
    const { data } = await API.post('/coupons/verify', { code, amount });
    return data;
  } catch (error) {
    console.error('Error verifying coupon:', error);
    throw error;
  }
};
