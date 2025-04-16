
import API from './index';

// Create Stripe payment intent
export const createStripePaymentIntent = async (amount: number, orderId: string) => {
  try {
    const { data } = await API.post('/payment/stripe', { amount, orderId });
    return data;
  } catch (error) {
    console.error('Error creating Stripe payment intent:', error);
    throw error;
  }
};
