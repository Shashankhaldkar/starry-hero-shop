
import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MinusCircle, PlusCircle, Trash2, ShoppingBag, AlertCircle } from 'lucide-react';
import { Product, CartItem } from '@/types';
import { verifyCoupon } from '@/api/coupons';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  
  // Calculate totals
  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.discountPrice || item.product.price) * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 4.99;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax - discount;
  
  // Load cart items from localStorage on initial render
  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      try {
        setCartItems(JSON.parse(savedCartItems));
      } catch (error) {
        console.error('Failed to parse cart items from localStorage:', error);
      }
    }
  }, []);
  
  // Save cart items to localStorage when they change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);
  
  // Handle item quantity change
  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };
  
  // Handle item removal
  const handleRemoveItem = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart"
    });
  };
  
  // Apply coupon
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast({
        title: "Enter a coupon code",
        description: "Please enter a valid coupon code",
        variant: "destructive"
      });
      return;
    }
    
    setCouponLoading(true);
    
    try {
      const result = await verifyCoupon(couponCode, subtotal);
      
      setDiscount(result.discount);
      setCouponApplied(true);
      
      toast({
        title: "Coupon applied",
        description: `Discount of $${result.discount.toFixed(2)} has been applied to your order`
      });
    } catch (error) {
      toast({
        title: "Invalid coupon",
        description: "The coupon code you entered is invalid or has expired",
        variant: "destructive"
      });
      
      setDiscount(0);
      setCouponApplied(false);
    } finally {
      setCouponLoading(false);
    }
  };
  
  // Handle remove coupon
  const handleRemoveCoupon = () => {
    setCouponCode('');
    setDiscount(0);
    setCouponApplied(false);
    
    toast({
      title: "Coupon removed",
      description: "The coupon has been removed from your order"
    });
  };
  
  return (
    <div className="min-h-screen bg-starry-darkPurple text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        {cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart items */}
            <div className="lg:w-2/3">
              <div className="bg-starry-charcoal/30 rounded-lg p-6">
                {cartItems.map((item) => (
                  <div 
                    key={`${item.product.id}-${item.size}-${item.color}`} 
                    className="flex flex-col sm:flex-row gap-4 border-b border-starry-charcoal/50 py-6 last:border-0 last:pb-0 first:pt-0"
                  >
                    {/* Product image */}
                    <a 
                      href={`/product/${item.product.id}`} 
                      className="w-24 h-24 bg-starry-charcoal/20 rounded overflow-hidden flex-shrink-0"
                    >
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </a>
                    
                    {/* Product details */}
                    <div className="flex-1">
                      <h3 className="font-medium">
                        <a href={`/product/${item.product.id}`} className="hover:text-starry-purple transition-colors">
                          {item.product.name}
                        </a>
                      </h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-starry-neutral mt-1">
                        <span>Size: {item.size}</span>
                        <span>Color: {item.color}</span>
                      </div>
                      
                      <div className="flex flex-wrap sm:flex-nowrap justify-between items-center mt-4 gap-4">
                        {/* Price */}
                        <div className="flex items-end gap-2">
                          {item.product.discountPrice ? (
                            <>
                              <span className="font-bold">₹{item.product.discountPrice.toFixed(2)}</span>
                              <span className="text-sm text-starry-neutral line-through">₹{item.product.price.toFixed(2)}</span>
                            </>
                          ) : (
                            <span className="font-bold">₹{item.product.price.toFixed(2)}</span>
                          )}
                        </div>
                        
                        {/* Quantity controls */}
                        <div className="flex items-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            disabled={item.quantity <= 1}
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            className="text-starry-neutral hover:text-white h-8 w-8"
                          >
                            <MinusCircle className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            disabled={item.quantity >= item.product.stock}
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            className="text-starry-neutral hover:text-white h-8 w-8"
                          >
                            <PlusCircle className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        {/* Subtotal and remove */}
                        <div className="flex items-center gap-4">
                          <span className="font-medium">
                            ₹{((item.product.discountPrice || item.product.price) * item.quantity).toFixed(2)}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveItem(item.product.id)}
                            className="text-starry-neutral hover:text-red-500 h-8 w-8"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Continue shopping button */}
                <div className="mt-6 pt-6 border-t border-starry-charcoal/50">
                  <Button
                    variant="outline"
                    className="text-starry-purple border-starry-purple hover:bg-starry-purple/10"
                    onClick={() => window.location.href = '/products'}
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Order summary */}
            <div className="lg:w-1/3">
              <Card className="bg-starry-darkPurple/40 border-starry-purple/10 sticky top-4">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 text-starry-neutral">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-white">₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="text-white">
                        {shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span className="text-white">₹{tax.toFixed(2)}</span>
                    </div>
                    
                    {discount > 0 && (
                      <div className="flex justify-between text-starry-orange">
                        <span>Discount</span>
                        <span>-₹{discount.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="pt-3 mt-3 border-t border-starry-charcoal/50 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  {/* Coupon code */}
                  <div className="mt-6">
                    <h3 className="font-medium mb-2">Apply Coupon Code</h3>
                    {!couponApplied ? (
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter coupon code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="bg-starry-darkPurple border-starry-purple/20"
                        />
                        <Button
                          onClick={handleApplyCoupon}
                          disabled={couponLoading}
                          className="bg-starry-purple hover:bg-starry-vividPurple whitespace-nowrap"
                        >
                          {couponLoading ? 'Applying...' : 'Apply'}
                        </Button>
                      </div>
                    ) : (
                      <div className="bg-starry-purple/10 p-3 rounded flex justify-between items-center">
                        <div>
                          <div className="font-medium text-starry-purple">{couponCode}</div>
                          <div className="text-sm text-starry-neutral">Discount: ${discount.toFixed(2)}</div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleRemoveCoupon}
                          className="text-starry-neutral hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  {/* Checkout button */}
                  <Button 
                    className="w-full mt-6 bg-starry-purple hover:bg-starry-vividPurple"
                    size="lg"
                    asChild
                  >
                    <Link to="/checkout">
                      Proceed to Checkout
                    </Link>
                  </Button>
                  
                  {/* Additional info */}
                  <div className="mt-6 text-sm text-starry-neutral flex items-start gap-2">
                    <AlertCircle className="text-starry-purple h-4 w-4 mt-0.5 flex-shrink-0" />
                    <p>Free shipping on orders over ₹50. Need help? Contact our support team.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="bg-starry-charcoal/30 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-starry-neutral mb-8">
              Your shopping cart is waiting to be filled with awesome t-shirts!
            </p>
            <Button 
              onClick={() => window.location.href = '/products'}
              className="bg-starry-purple hover:bg-starry-vividPurple"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Start Shopping
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
