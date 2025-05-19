
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { getProductById, getRelatedProducts, getProductReviews, addProductReview } from '@/api/products';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Share2, 
  MinusCircle, 
  PlusCircle, 
  Truck 
} from 'lucide-react';
import { Product, Review } from '@/types';
import { toast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';

interface ReviewFormData {
  rating: number;
  comment: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [reviewRating, setReviewRating] = useState(5);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ReviewFormData>();

  // Fetch product details
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id as string),
    enabled: !!id
  });

  // Fetch related products
  const { data: relatedProducts } = useQuery({
    queryKey: ['related-products', id],
    queryFn: () => getRelatedProducts(id as string),
    enabled: !!id
  });

  // Fetch product reviews
  const { data: productReviews } = useQuery({
    queryKey: ['product-reviews', id],
    queryFn: () => getProductReviews(id as string),
    enabled: !!id
  });

  // Navigate to next or previous image
  const handleImageNavigation = (direction: 'next' | 'prev') => {
    if (!product) return;
    if (direction === 'next') {
      setSelectedImage((prev) => (prev + 1) % product.images.length);
    } else {
      setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  // Handle adding to cart
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Select a size",
        description: "Please select a size before adding to cart",
        variant: "destructive",
      });
      return;
    }

    if (!selectedColor) {
      toast({
        title: "Select a color",
        description: "Please select a color before adding to cart",
        variant: "destructive",
      });
      return;
    }

    // Add to cart logic would go here
    toast({
      title: "Added to cart",
      description: `${product?.name} (${selectedSize}, ${selectedColor}) x ${quantity} has been added to your cart`,
    });
  };

  // Handle adding to wishlist
  const handleAddToWishlist = () => {
    // Add to wishlist logic would go here
    toast({
      title: "Added to wishlist",
      description: `${product?.name} has been added to your wishlist`,
    });
  };

  // Submit review
  const onSubmitReview = async (data: ReviewFormData) => {
    if (!id) return;

    try {
      await addProductReview(id, {
        rating: reviewRating,
        comment: data.comment
      });
      
      toast({
        title: "Review submitted",
        description: "Thank you for your feedback!",
      });
      
      reset();
      setReviewRating(5);
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your review. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-starry-darkPurple text-white">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8 animate-pulse">
            <div className="md:w-1/2">
              <div className="aspect-square bg-starry-charcoal/50 rounded-lg"></div>
              <div className="flex gap-2 mt-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-20 h-20 bg-starry-charcoal/50 rounded"></div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="h-8 bg-starry-charcoal/50 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-starry-charcoal/50 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-starry-charcoal/50 rounded w-full mb-6"></div>
              <div className="h-10 bg-starry-charcoal/50 rounded w-1/4 mb-8"></div>
              <div className="h-12 bg-starry-charcoal/50 rounded w-full mb-4"></div>
              <div className="h-12 bg-starry-charcoal/50 rounded w-full"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-starry-darkPurple text-white">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
            <p className="text-starry-neutral mb-8">The requested product could not be found or an error occurred.</p>
            <Button onClick={() => navigate('/products')}>
              Browse All Products
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-starry-darkPurple text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-starry-neutral mb-8">
          <a href="/" className="hover:text-white">Home</a>
          <span className="mx-2">/</span>
          <a href="/products" className="hover:text-white">Products</a>
          <span className="mx-2">/</span>
          <span className="text-white">{product.name}</span>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product images */}
          <div className="md:w-1/2">
            <div className="relative">
              <div className="aspect-square bg-starry-charcoal/30 rounded-lg overflow-hidden">
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Image navigation */}
              {product.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full"
                    onClick={() => handleImageNavigation('prev')}
                  >
                    <ChevronLeft size={20} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full"
                    onClick={() => handleImageNavigation('next')}
                  >
                    <ChevronRight size={20} />
                  </Button>
                </>
              )}
              
              {/* Discount badge if applicable */}
              {product.discountPrice && (
                <div className="absolute top-4 left-4 bg-starry-orange text-white text-xs font-medium px-2 py-1 rounded-md">
                  {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                </div>
              )}
            </div>
            
            {/* Thumbnail images */}
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`w-20 h-20 rounded overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-starry-purple' 
                        : 'border-transparent hover:border-starry-purple/50'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} - view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product info */}
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={
                      star <= Math.floor(product.rating)
                        ? "w-5 h-5 text-starry-orange fill-starry-orange"
                        : star <= product.rating
                        ? "w-5 h-5 text-starry-orange fill-starry-orange/50"
                        : "w-5 h-5 text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-starry-neutral ml-2">
                {product.rating.toFixed(1)} ({product.reviewCount} reviews)
              </span>
            </div>
            
            {/* Price */}
            <div className="flex items-end gap-3 mb-6">
              {product.discountPrice ? (
                <>
                  <span className="text-3xl font-bold">${product.discountPrice.toFixed(2)}</span>
                  <span className="text-xl text-starry-neutral line-through">${product.price.toFixed(2)}</span>
                </>
              ) : (
                <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
              )}
            </div>
            
            {/* Description */}
            <p className="text-starry-neutral mb-6">
              {product.description}
            </p>
            
            {/* Size selection */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <h3 className="font-medium">Size</h3>
                <a href="#size-guide" className="text-sm text-starry-purple hover:underline">Size Guide</a>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant="outline"
                    className={`w-12 h-12 ${
                      selectedSize === size 
                        ? 'bg-starry-purple text-white' 
                        : 'text-white hover:bg-starry-purple/10'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
              {errors.rating && (
                <p className="text-red-500 text-sm mt-1">Please select a size</p>
              )}
            </div>
            
            {/* Color selection */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${
                      selectedColor === color 
                        ? 'border-starry-purple ring-2 ring-starry-purple/50 ring-offset-2 ring-offset-starry-darkPurple' 
                        : 'border-transparent hover:border-starry-purple/50'
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Quantity */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Quantity</h3>
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="text-starry-neutral hover:text-white"
                >
                  <MinusCircle />
                </Button>
                <span className="w-12 text-center text-xl">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={quantity >= product.stock}
                  onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))}
                  className="text-starry-neutral hover:text-white"
                >
                  <PlusCircle />
                </Button>
                <span className="ml-4 text-sm text-starry-neutral">
                  {product.stock} available
                </span>
              </div>
            </div>
            
            {/* Add to cart and wishlist */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                className="bg-starry-purple hover:bg-starry-vividPurple flex-1"
                onClick={handleAddToCart}
                disabled={!product.inStock || product.stock === 0}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                {product.inStock && product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-starry-purple text-starry-purple hover:bg-starry-purple/10"
                onClick={handleAddToWishlist}
              >
                <Heart className="mr-2 h-5 w-5" />
                Add to Wishlist
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="border border-starry-purple/20 text-starry-neutral hover:bg-starry-purple/10 hover:text-starry-purple"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Shipping info */}
            <div className="bg-starry-charcoal/30 p-4 rounded-lg mb-6">
              <div className="flex items-start">
                <Truck className="text-starry-purple mr-3 mt-1" />
                <div>
                  <h4 className="font-medium">Free Shipping</h4>
                  <p className="text-sm text-starry-neutral">
                    Free standard shipping on orders over $50. Estimated delivery: 3-5 business days.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Product meta info */}
            <div className="text-sm text-starry-neutral">
              <div className="flex mb-1">
                <span className="w-24">Category:</span>
                <a href={`/products?category=${product.category}`} className="text-starry-purple hover:underline">
                  {product.category}
                </a>
              </div>
              <div className="flex mb-1">
                <span className="w-24">Theme:</span>
                <a href={`/products?theme=${product.theme}`} className="text-starry-purple hover:underline">
                  {product.theme}
                </a>
              </div>
              <div className="flex">
                <span className="w-24">SKU:</span>
                <span>HERO-{product.id}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product details tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description">
            <TabsList className="w-full bg-starry-charcoal/30 p-0 mb-6">
              <TabsTrigger value="description" className="flex-1 py-3">Description</TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1 py-3">Reviews ({product.reviews?.length || 0})</TabsTrigger>
              <TabsTrigger value="shipping" className="flex-1 py-3">Shipping & Returns</TabsTrigger>
              <TabsTrigger value="size-guide" className="flex-1 py-3" id="size-guide">Size Guide</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="p-6 bg-starry-charcoal/20 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Product Description</h3>
              <p className="text-starry-neutral mb-4">
                {product.description}
              </p>
              <h4 className="font-bold mb-2">Features:</h4>
              <ul className="list-disc pl-5 text-starry-neutral space-y-1">
                <li>Premium cotton blend for comfort and durability</li>
                <li>Official licensed merchandise</li>
                <li>Machine washable, tumble dry low</li>
                <li>High-quality screen printing that won't crack or fade</li>
                <li>Perfect for fans and collectors</li>
              </ul>
            </TabsContent>
            
            <TabsContent value="reviews" className="p-6 bg-starry-charcoal/20 rounded-lg">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Reviews list */}
                <div className="md:w-2/3">
                  <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
                  
                  {product.reviews && product.reviews.length > 0 ? (
                    <div className="space-y-6">
                      {product.reviews.map((review: Review) => (
                        <div key={review._id} className="border-b border-starry-charcoal pb-6">
                          <div className="flex justify-between mb-2">
                            <h4 className="font-medium">{review.name}</h4>
                            <span className="text-sm text-starry-neutral">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={
                                  star <= review.rating
                                    ? "w-4 h-4 text-starry-orange fill-starry-orange"
                                    : "w-4 h-4 text-gray-300"
                                }
                              />
                            ))}
                          </div>
                          <p className="text-starry-neutral">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-starry-neutral">No reviews yet. Be the first to leave a review!</p>
                  )}
                </div>
                
                {/* Review form */}
                <div className="md:w-1/3">
                  <Card className="bg-starry-darkPurple/40 border-starry-purple/10">
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-4">Write a Review</h3>
                      <form onSubmit={handleSubmit(onSubmitReview)}>
                        <div className="mb-4">
                          <label className="block mb-2">Rating</label>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setReviewRating(star)}
                                className="p-1"
                              >
                                <Star
                                  className={
                                    star <= reviewRating
                                      ? "w-6 h-6 text-starry-orange fill-starry-orange"
                                      : "w-6 h-6 text-gray-300 hover:text-starry-orange"
                                  }
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="mb-4">
                          <label className="block mb-2" htmlFor="comment">
                            Your Review
                          </label>
                          <textarea
                            id="comment"
                            {...register('comment', { required: true })}
                            rows={4}
                            className="w-full p-3 bg-starry-darkPurple border border-starry-purple/20 rounded-md text-white placeholder-starry-neutral focus:border-starry-purple focus:ring-1 focus:ring-starry-purple"
                            placeholder="Share your experience with this product..."
                          ></textarea>
                          {errors.comment && (
                            <p className="text-red-500 text-sm mt-1">Please enter your review</p>
                          )}
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-starry-purple hover:bg-starry-vividPurple"
                        >
                          Submit Review
                        </Button>
                      </form>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="shipping" className="p-6 bg-starry-charcoal/20 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Shipping Information</h3>
              <div className="space-y-4 text-starry-neutral">
                <p>
                  We offer the following shipping options for all orders within the United States:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium text-white">Standard Shipping (3-5 business days):</span> Free on orders over $50, or $4.99 for orders under $50.
                  </li>
                  <li>
                    <span className="font-medium text-white">Express Shipping (2-3 business days):</span> $9.99 flat rate.
                  </li>
                  <li>
                    <span className="font-medium text-white">Priority Shipping (1-2 business days):</span> $14.99 flat rate.
                  </li>
                </ul>
                
                <h4 className="font-bold text-white mt-6 mb-2">Returns Policy</h4>
                <p>
                  We want you to be completely satisfied with your purchase. If for any reason you're not happy with your order, you can return it within 30 days of delivery for a full refund or exchange.
                </p>
                <p>
                  To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.
                </p>
                <p>
                  To start a return, please contact our customer service team at support@heroicthreads.com.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="size-guide" className="p-6 bg-starry-charcoal/20 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Size Guide</h3>
              <p className="text-starry-neutral mb-6">
                Our t-shirts are designed for a comfortable, relaxed fit. Please refer to the measurements below to find your perfect size.
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] border-collapse">
                  <thead>
                    <tr className="bg-starry-charcoal text-left">
                      <th className="p-3 border border-starry-charcoal/50">Size</th>
                      <th className="p-3 border border-starry-charcoal/50">Chest (inches)</th>
                      <th className="p-3 border border-starry-charcoal/50">Length (inches)</th>
                      <th className="p-3 border border-starry-charcoal/50">Sleeve (inches)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-starry-darkPurple/20">
                      <td className="p-3 border border-starry-charcoal/50">XS</td>
                      <td className="p-3 border border-starry-charcoal/50">34-36</td>
                      <td className="p-3 border border-starry-charcoal/50">25-26</td>
                      <td className="p-3 border border-starry-charcoal/50">7-7.5</td>
                    </tr>
                    <tr className="bg-starry-darkPurple/30">
                      <td className="p-3 border border-starry-charcoal/50">S</td>
                      <td className="p-3 border border-starry-charcoal/50">36-38</td>
                      <td className="p-3 border border-starry-charcoal/50">26-27</td>
                      <td className="p-3 border border-starry-charcoal/50">7.5-8</td>
                    </tr>
                    <tr className="bg-starry-darkPurple/20">
                      <td className="p-3 border border-starry-charcoal/50">M</td>
                      <td className="p-3 border border-starry-charcoal/50">38-40</td>
                      <td className="p-3 border border-starry-charcoal/50">27-28</td>
                      <td className="p-3 border border-starry-charcoal/50">8-8.5</td>
                    </tr>
                    <tr className="bg-starry-darkPurple/30">
                      <td className="p-3 border border-starry-charcoal/50">L</td>
                      <td className="p-3 border border-starry-charcoal/50">40-42</td>
                      <td className="p-3 border border-starry-charcoal/50">28-29</td>
                      <td className="p-3 border border-starry-charcoal/50">8.5-9</td>
                    </tr>
                    <tr className="bg-starry-darkPurple/20">
                      <td className="p-3 border border-starry-charcoal/50">XL</td>
                      <td className="p-3 border border-starry-charcoal/50">42-44</td>
                      <td className="p-3 border border-starry-charcoal/50">29-30</td>
                      <td className="p-3 border border-starry-charcoal/50">9-9.5</td>
                    </tr>
                    <tr className="bg-starry-darkPurple/30">
                      <td className="p-3 border border-starry-charcoal/50">XXL</td>
                      <td className="p-3 border border-starry-charcoal/50">44-46</td>
                      <td className="p-3 border border-starry-charcoal/50">30-31</td>
                      <td className="p-3 border border-starry-charcoal/50">9.5-10</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 text-starry-neutral">
                <h4 className="font-bold text-white mb-2">Measurement Tips:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Chest: Measure around the fullest part of your chest, keeping the tape horizontal.</li>
                  <li>Length: Measure from the highest point of the shoulder to the bottom hem.</li>
                  <li>Sleeve: Measure from the shoulder seam to the end of the sleeve.</li>
                </ul>
                <p className="mt-4">
                  If you're between sizes, we recommend sizing up for a more comfortable fit.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related products section */}
        <div className="mt-12">
          <h3 className="text-xl font-bold mb-4">Related Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedProducts && relatedProducts.length > 0 ? (
              relatedProducts.map((product) => (
                <div key={product.id} className="bg-starry-charcoal/30 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xl font-bold mb-2">{product.name}</h4>
                    <span className="text-starry-neutral">${product.price.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center">
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-starry-neutral">No related products found.</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
