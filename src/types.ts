
export interface Product {
  id: string;
  _id?: string; // Some APIs return _id instead of id
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  images: string[];
  category: string;
  theme: string;
  sizes: string[];
  colors: string[];
  stock: number;
  inStock?: boolean;
  featured?: boolean;
  rating?: number;
  reviewCount?: number;
  reviews?: Review[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Review {
  id?: string;
  _id?: string; // Adding this to fix the ProductDetail.tsx error
  name: string;
  rating: number;
  comment: string;
  user: string;
  createdAt?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface Order {
  id: string;
  user: User | string;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentResult?: PaymentResult;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  product: Product | string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
}

export interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface PaymentResult {
  id: string;
  status: string;
  update_time: string;
  email_address?: string;
}

export interface Coupon {
  id: string;
  code: string;
  description?: string;
  discountType: 'percentage' | 'fixed';
  discountAmount: number;
  minimumPurchase: number;
  startDate: string | Date;
  endDate: string | Date;
  usageLimit?: number;
  usageCount: number;
  isActive: boolean;
}

// Adding missing type definitions
export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Theme {
  id: string;
  name: string;
  image: string;
}
