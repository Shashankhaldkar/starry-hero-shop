import axios from "axios";
import { API_URL } from "@/config/constants";
import { Product } from "@/types";

// Get all products with filtering options
export const getProducts = async (options: {
  keyword?: string;
  page?: number;
  category?: string;
  theme?: string;
  minPrice?: number;
  maxPrice?: number;
}) => {
  const { keyword = "", page = 1, category = "", theme = "", minPrice, maxPrice } = options;
  
  try {
    const { data } = await axios.get(`${API_URL}/products`, {
      params: {
        keyword,
        page,
        category,
        theme,
        minPrice,
        maxPrice
      }
    });
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      products: [],
      page: 1,
      pages: 1,
      count: 0
    };
  }
};

// Get product by ID
export const getProductById = async (id: string) => {
  try {
    const { data } = await axios.get(`${API_URL}/products/${id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};

// Get featured products
export const getFeaturedProducts = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/products/featured`);
    return data;
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
};

// Get new arrivals
export const getNewArrivals = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/products/new-arrivals`);
    return data;
  } catch (error) {
    console.error("Error fetching new arrivals:", error);
    return [];
  }
};

// Get best sellers
export const getBestSellers = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/products/best-sellers`);
    return data;
  } catch (error) {
    console.error("Error fetching best sellers:", error);
    return [];
  }
};

// Get product categories
export const getProductCategories = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/products/categories`);
    return data;
  } catch (error) {
    console.error("Error fetching product categories:", error);
    return ["T-Shirts", "Hoodies", "Accessories"];
  }
};

// Get product themes
export const getProductThemes = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/products/themes`);
    return data;
  } catch (error) {
    console.error("Error fetching product themes:", error);
    return ["Marvel", "DC", "Star Wars", "Anime"];
  }
};

// Get related products
export const getRelatedProducts = async (productId: string) => {
  try {
    const { data } = await axios.get(`${API_URL}/products/${productId}/related`);
    return data;
  } catch (error) {
    console.error(`Error fetching related products for ${productId}:`, error);
    return [];
  }
};

// Get product reviews
export const getProductReviews = async (productId: string) => {
  try {
    const { data } = await axios.get(`${API_URL}/products/${productId}/reviews`);
    return data;
  } catch (error) {
    console.error(`Error fetching reviews for product ${productId}:`, error);
    return {
      reviews: [],
      averageRating: 0,
      numReviews: 0
    };
  }
};

// Add product review
export const addProductReview = async (productId: string, reviewData: {
  rating: number;
  comment: string;
}) => {
  try {
    const { data } = await axios.post(
      `${API_URL}/products/${productId}/reviews`,
      reviewData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      }
    );
    return data;
  } catch (error) {
    console.error(`Error adding review for product ${productId}:`, error);
    throw error;
  }
};

// Mock data for development
export const getMockProducts = (): Product[] => {
  return [
    {
      id: "1",
      name: "Superman Classic Logo T-Shirt",
      description: "Show your love for the Man of Steel with this classic Superman logo t-shirt. Made from 100% cotton for comfort and durability.",
      price: 24.99,
      discountPrice: 19.99,
      images: [
        "https://images.unsplash.com/photo-1527719327859-c6ce80353573?auto=format&fit=crop&q=80&w=500&h=500",
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=500&h=500",
      ],
      category: "T-Shirts",
      theme: "DC",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Blue", "Red", "Black"],
      stock: 50,
      inStock: true,
      featured: true,
      rating: 4.5,
      numReviews: 12,
      createdAt: "2023-01-15T00:00:00Z"
    },
    {
      id: "2",
      name: "Spider-Man Web Slinger Hoodie",
      description: "Stay warm and show your Spider-Man fandom with this comfortable hoodie featuring the web-slinger in action.",
      price: 49.99,
      discountPrice: 0,
      images: [
        "https://images.unsplash.com/photo-1565693413579-8a73ffa6c6b9?auto=format&fit=crop&q=80&w=500&h=500",
        "https://images.unsplash.com/photo-1613852348851-df1739db8201?auto=format&fit=crop&q=80&w=500&h=500",
      ],
      category: "Hoodies",
      theme: "Marvel",
      sizes: ["M", "L", "XL", "XXL"],
      colors: ["Red", "Black", "Navy"],
      stock: 35,
      inStock: true,
      featured: true,
      rating: 4.8,
      numReviews: 24,
      createdAt: "2023-02-10T00:00:00Z"
    },
    {
      id: "3",
      name: "Batman Dark Knight Cap",
      description: "A sleek cap featuring the iconic Batman logo. Perfect for casual wear or keeping the sun out of your eyes while fighting crime.",
      price: 19.99,
      discountPrice: 0,
      images: [
        "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&q=80&w=500&h=500",
      ],
      category: "Accessories",
      theme: "DC",
      sizes: ["One Size"],
      colors: ["Black", "Grey"],
      stock: 100,
      inStock: true,
      featured: false,
      rating: 4.2,
      numReviews: 8,
      createdAt: "2023-03-05T00:00:00Z"
    },
    {
      id: "4",
      name: "Wonder Woman Warrior T-Shirt",
      description: "Embrace your inner warrior with this Wonder Woman themed t-shirt. Features a vintage-style print of the Amazonian princess.",
      price: 24.99,
      discountPrice: 0,
      images: [
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=500&h=500",
        "https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&q=80&w=500&h=500",
      ],
      category: "T-Shirts",
      theme: "DC",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Red", "Blue", "White"],
      stock: 45,
      inStock: true,
      featured: true,
      rating: 4.7,
      numReviews: 15,
      createdAt: "2023-01-25T00:00:00Z"
    },
    {
      id: "5",
      name: "Iron Man Arc Reactor Backpack",
      description: "Carry your gear in style with this Iron Man themed backpack featuring a light-up arc reactor design (batteries included).",
      price: 59.99,
      discountPrice: 49.99,
      images: [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=500&h=500",
      ],
      category: "Accessories",
      theme: "Marvel",
      sizes: ["One Size"],
      colors: ["Red", "Gold"],
      stock: 20,
      inStock: true,
      featured: false,
      rating: 4.9,
      numReviews: 32,
      createdAt: "2023-02-28T00:00:00Z"
    },
    {
      id: "6",
      name: "Star Wars Mandalorian Helmet T-Shirt",
      description: "This is the way. Show your allegiance with this t-shirt featuring the iconic Mandalorian helmet design.",
      price: 26.99,
      discountPrice: 0,
      images: [
        "https://images.unsplash.com/photo-1602810316693-3667c854239a?auto=format&fit=crop&q=80&w=500&h=500",
      ],
      category: "T-Shirts",
      theme: "Star Wars",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Black", "Grey", "Green"],
      stock: 60,
      inStock: true,
      featured: true,
      rating: 4.6,
      numReviews: 18,
      createdAt: "2023-03-15T00:00:00Z"
    },
    {
      id: "7",
      name: "Naruto Shippuden Akatsuki Hoodie",
      description: "Join the Akatsuki with this cloud-patterned hoodie inspired by the infamous organization from Naruto Shippuden.",
      price: 54.99,
      discountPrice: 0,
      images: [
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=500&h=500",
      ],
      category: "Hoodies",
      theme: "Anime",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "Red"],
      stock: 30,
      inStock: true,
      featured: false,
      rating: 4.8,
      numReviews: 22,
      createdAt: "2023-02-05T00:00:00Z"
    },
    {
      id: "8",
      name: "Avengers Team T-Shirt",
      description: "Assemble your wardrobe with this t-shirt featuring the original Avengers team in an artistic style.",
      price: 24.99,
      discountPrice: 21.99,
      images: [
        "https://images.unsplash.com/photo-1571455786673-9d9d6c194f90?auto=format&fit=crop&q=80&w=500&h=500",
      ],
      category: "T-Shirts",
      theme: "Marvel",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Navy", "Black", "Grey"],
      stock: 55,
      inStock: true,
      featured: true,
      rating: 4.4,
      numReviews: 16,
      createdAt: "2023-01-10T00:00:00Z"
    }
  ];
};
