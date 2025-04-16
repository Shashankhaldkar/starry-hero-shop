import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { CartItem, Product } from '@/types';
import { toast } from '@/hooks/use-toast';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number, size: string, color: string) => void;
  removeFromCart: (productId: string, size?: string, color?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  total: number;
  discount: number;
  shipping: number;
  tax: number;
  applyCoupon: (code: string, discountAmount: number) => void;
  removeCoupon: () => void;
  couponCode: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    const savedCoupon = localStorage.getItem('couponCode');
    const savedDiscount = localStorage.getItem('discount');
    
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart items from localStorage:', error);
      }
    }
    
    if (savedCoupon) {
      setCouponCode(savedCoupon);
    }
    
    if (savedDiscount) {
      try {
        setDiscount(JSON.parse(savedDiscount));
      } catch (error) {
        console.error('Error parsing discount from localStorage:', error);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    if (couponCode) {
      localStorage.setItem('couponCode', couponCode);
    } else {
      localStorage.removeItem('couponCode');
    }
    
    localStorage.setItem('discount', JSON.stringify(discount));
  }, [cartItems, couponCode, discount]);
  
  // Calculate cart totals
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  
  const subtotal = cartItems.reduce(
    (total, item) => total + (item.product.discountPrice || item.product.price) * item.quantity,
    0
  );
  
  const shipping = subtotal > 50 ? 0 : 4.99;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax - discount;
  
  // Add item to cart
  const addToCart = (product: Product, quantity: number, size: string, color: string) => {
    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(
        item => item.product.id === product.id && item.size === size && item.color === color
      );
      
      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        
        toast({
          title: "Cart updated",
          description: `${product.name} (${size}, ${color}) quantity updated to ${updatedItems[existingItemIndex].quantity}`,
        });
        
        return updatedItems;
      } else {
        // Add new item if it doesn't exist
        toast({
          title: "Added to cart",
          description: `${product.name} (${size}, ${color}) x ${quantity} has been added to your cart`,
        });
        
        return [
          ...prevItems,
          { product, quantity, size, color }
        ];
      }
    });
  };
  
  // Remove item from cart
  const removeFromCart = (productId: string, size?: string, color?: string) => {
    setCartItems(prevItems => {
      // If size and color are specified, remove specific item variant
      if (size && color) {
        const filteredItems = prevItems.filter(
          item => !(item.product.id === productId && item.size === size && item.color === color)
        );
        
        if (filteredItems.length < prevItems.length) {
          toast({
            title: "Item removed",
            description: "The item has been removed from your cart",
          });
        }
        
        return filteredItems;
      }
      
      // Otherwise remove all items with the specified productId
      const filteredItems = prevItems.filter(item => item.product.id !== productId);
      
      if (filteredItems.length < prevItems.length) {
        toast({
          title: "Items removed",
          description: "All variants of this item have been removed from your cart",
        });
      }
      
      return filteredItems;
    });
  };
  
  // Update item quantity
  const updateQuantity = (productId: string, quantity: number, size?: string, color?: string) => {
    if (quantity < 1) return;
    
    setCartItems(prevItems => {
      // If size and color are specified, update specific item variant
      if (size && color) {
        return prevItems.map(item => 
          (item.product.id === productId && item.size === size && item.color === color)
            ? { ...item, quantity }
            : item
        );
      }
      
      // Otherwise update all items with the specified productId
      return prevItems.map(item => 
        item.product.id === productId
          ? { ...item, quantity }
          : item
      );
    });
  };
  
  // Clear the entire cart
  const clearCart = () => {
    setCartItems([]);
    setCouponCode(null);
    setDiscount(0);
    
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };
  
  // Apply coupon code
  const applyCoupon = (code: string, discountAmount: number) => {
    setCouponCode(code);
    setDiscount(discountAmount);
    
    toast({
      title: "Coupon applied",
      description: `Discount of $${discountAmount.toFixed(2)} has been applied to your order`,
    });
  };
  
  // Remove coupon code
  const removeCoupon = () => {
    setCouponCode(null);
    setDiscount(0);
    
    toast({
      title: "Coupon removed",
      description: "The coupon has been removed from your order",
    });
  };
  
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        total,
        discount,
        shipping,
        tax,
        applyCoupon,
        removeCoupon,
        couponCode,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
