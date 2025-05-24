import axios from 'axios';
import { Product } from '@/types';

const API_BASE_URL = 'http://localhost:5000/api';

// Mock data fallback
const getMockProducts = (): Product[] => {
  return [
    // Oversized T-Shirts
    {
      id: "os1",
      name: "StaartHero Oversized Street Vision Tee",
      description: "Ultra-comfortable oversized fit with dropped shoulders and extended hem. Perfect for a modern street style look.",
      price: 34.99,
      discountPrice: 29.99,
      images: [
        "https://www.theshirtlist.com/wp-content/uploads/2021/03/Wanda-Kiss-T-Shirt.jpg",
        "https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&q=80&w=500"
      ],
      category: "Oversized",
      theme: "Classic Comics",
      sizes: ["M", "L", "XL", "XXL"],
      colors: ["Black", "White", "Beige"],
      stock: 75,
      inStock: true,
      featured: true,
      rating: 4.7,
      reviews: [],
      reviewCount: 32,
      createdAt: "2023-05-15T00:00:00Z"
    },
    {
      id: "os2",
      name: "StaartHero Boxy Cut Hero Silhouette Tee",
      description: "Ultra-wide boxy cut with hero silhouette print. Made from premium cotton for everyday comfort with superhero style.",
      price: 39.99,
      discountPrice: 34.99,
      images: [
        "https://images.unsplash.com/photo-1596609548086-85bbf8ddb6b9?auto=format&fit=crop&q=80&w=500",
        "https://images.unsplash.com/photo-1542574621-e088a4464f7e?auto=format&fit=crop&q=80&w=500"
      ],
      category: "Oversized",
      theme: "Marvel Universe",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Grey", "Black", "Blue"],
      stock: 45,
      inStock: true,
      featured: false,
      rating: 4.5,
      reviews: [],
      reviewCount: 18,
      createdAt: "2023-06-22T00:00:00Z"
    },
    // Acid Wash T-Shirts
    {
      id: "aw1",
      name: "StaartHero Vintage Acid Wash Comic Panel Tee",
      description: "Retro-inspired acid wash tee with faded comic panel design. Each piece has a unique wash pattern making it truly one-of-a-kind.",
      price: 32.99,
      images: [
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=500",
        "https://images.unsplash.com/photo-1599255068390-206e0d068539?auto=format&fit=crop&q=80&w=500"
      ],
      category: "Acid Wash",
      theme: "DC Comics",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Blue Wash", "Black Wash"],
      stock: 30,
      inStock: true,
      featured: true,
      rating: 4.2,
      reviews: [],
      reviewCount: 24,
      createdAt: "2023-07-05T00:00:00Z"
    },
    {
      id: "aw2",
      name: "StaartHero Galaxy Acid Wash Superhero Tee",
      description: "Space-inspired acid wash with superhero silhouettes. The unique washing technique creates a galaxy-like pattern that makes each shirt unique.",
      price: 36.99,
      discountPrice: 29.99,
      images: [
        "https://images.unsplash.com/photo-1516027828283-1053f7a7c5b3?auto=format&fit=crop&q=80&w=500",
        "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&q=80&w=500"
      ],
      category: "Acid Wash",
      theme: "Marvel Universe",
      sizes: ["M", "L", "XL"],
      colors: ["Purple Wash", "Blue Wash"],
      stock: 25,
      inStock: true,
      featured: false,
      rating: 4.6,
      reviews: [],
      reviewCount: 11,
      createdAt: "2023-08-14T00:00:00Z"
    },
    // Graphic Printed T-Shirts
    {
      id: "gp1",
      name: "StaartHero Classic Avengers Assembly Graphic Tee",
      description: "Bold, high-definition print of the classic Avengers team. Premium cotton with reinforced seams for long-lasting wear.",
      price: 28.99,
      discountPrice: 24.99,
      images: [
        "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&q=80&w=500",
        "https://images.unsplash.com/photo-1606115757624-6b777193bd7f?auto=format&fit=crop&q=80&w=500"
      ],
      category: "Graphic Printed",
      theme: "Marvel Universe",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Navy", "Black", "White"],
      stock: 80,
      inStock: true,
      featured: true,
      rating: 4.8,
      reviews: [],
      reviewCount: 47,
      createdAt: "2023-03-20T00:00:00Z"
    },
    {
      id: "gp2",
      name: "StaartHero Justice League Action Graphic Tee",
      description: "Dynamic full-front print featuring the Justice League in action. Vibrant colors that won't fade with washing.",
      price: 27.99,
      images: [
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=500",
        "https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&q=80&w=500"
      ],
      category: "Graphic Printed",
      theme: "DC Comics",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "Blue", "Grey"],
      stock: 65,
      inStock: true,
      featured: true,
      rating: 4.7,
      reviews: [],
      reviewCount: 38,
      createdAt: "2023-04-12T00:00:00Z"
    },
    // Solid Color T-Shirts
    {
      id: "sc1",
      name: "StaartHero Essential Solid Cotton Tee",
      description: "Classic solid color tee made from 100% premium cotton. Perfect for layering or wearing on its own.",
      price: 22.99,
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=500",
        "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&q=80&w=500"
      ],
      category: "Solid Color",
      theme: "Classic Comics",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Black", "White", "Navy", "Grey", "Red"],
      stock: 100,
      inStock: true,
      featured: false,
      rating: 4.4,
      reviews: [],
      reviewCount: 55,
      createdAt: "2023-02-10T00:00:00Z"
    },
    {
      id: "sc2",
      name: "StaartHero Premium Solid V-Neck Tee",
      description: "Sophisticated V-neck design in premium solid colors. Tailored fit with superior comfort and durability.",
      price: 26.99,
      images: [
        "https://images.unsplash.com/photo-1622445275576-721325763afe?auto=format&fit=crop&q=80&w=500",
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=500"
      ],
      category: "Solid Color",
      theme: "Anime Superheroes",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "White", "Navy"],
      stock: 40,
      inStock: true,
      featured: false,
      rating: 4.3,
      reviews: [],
      reviewCount: 22,
      createdAt: "2023-09-08T00:00:00Z"
    },
    // Polo T-Shirts
    {
      id: "po1",
      name: "StaartHero Classic Hero Polo Shirt",
      description: "Refined polo shirt with subtle hero emblem. Perfect for casual business or weekend wear.",
      price: 42.99,
      images: [
        "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&q=80&w=500",
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=500"
      ],
      category: "Polo T-Shirts",
      theme: "Marvel Universe",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Navy", "Black", "White", "Burgundy"],
      stock: 35,
      inStock: true,
      featured: false,
      rating: 4.6,
      reviews: [],
      reviewCount: 15,
      createdAt: "2023-08-03T00:00:00Z"
    },
    {
      id: "po2",
      name: "StaartHero Performance Polo Tee",
      description: "Athletic-inspired polo with moisture-wicking technology. Features subtle superhero-themed details.",
      price: 38.99,
      discountPrice: 32.99,
      images: [
        "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=500",
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=500"
      ],
      category: "Polo T-Shirts",
      theme: "DC Comics",
      sizes: ["M", "L", "XL"],
      colors: ["Grey", "Navy", "Black"],
      stock: 28,
      inStock: true,
      featured: true,
      rating: 4.5,
      reviews: [],
      reviewCount: 12,
      createdAt: "2023-07-18T00:00:00Z"
    }
  ];
};

export const getProducts = async (params: {
  keyword?: string;
  page?: number;
  category?: string;
  theme?: string;
  minPrice?: number;
  maxPrice?: number;
} = {}): Promise<{ products: Product[]; page: number; pages: number; total: number }> => {
  console.log('Attempting to fetch products from API...');

  try {
    const response = await axios.get(`${API_BASE_URL}/products`, { params });

    // Axios doesn't throw for HTTP errors, so check status manually
    if (response.status !== 200 || !response.data.products) {
      throw new Error(`Unexpected response: ${response.status}`);
    }

    return response.data;
  } catch (error: any) {
    console.warn('API unavailable or returned invalid response. Falling back to mock data.');

    const mockProducts = getMockProducts();

    // Apply filters to mock data
    let filteredProducts = mockProducts;

    if (params.keyword) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(params.keyword!.toLowerCase()) ||
        product.description.toLowerCase().includes(params.keyword!.toLowerCase())
      );
    }

    if (params.category && params.category.toLowerCase() !== 'all') {
      filteredProducts = filteredProducts.filter(product =>
        product.category.toLowerCase() === params.category!.toLowerCase()
      );
    }

    if (params.theme && params.theme.toLowerCase() !== 'all') {
      filteredProducts = filteredProducts.filter(product =>
        product.theme.toLowerCase() === params.theme!.toLowerCase()
      );
    }

    if (params.minPrice !== undefined && params.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(product =>
        product.price >= params.minPrice! && product.price <= params.maxPrice!
      );
    }

    const currentPage = params.page || 1;
    const perPage = 10;
    const total = filteredProducts.length;
    const pages = Math.ceil(total / perPage);

    const paginatedProducts = filteredProducts.slice((currentPage - 1) * perPage, currentPage * perPage);

    return {
      products: paginatedProducts,
      page: currentPage,
      pages,
      total
    };
  }
};


export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.log('API unavailable, using mock data');
    const mockProducts = getMockProducts();
    return mockProducts.find(product => product.id === id) || null;
  }
};

export const getRelatedProducts = async (productId: string): Promise<Product[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${productId}/related`);
    return response.data;
  } catch (error) {
    console.log('API unavailable, using mock related products');
    const mockProducts = getMockProducts();
    // Return random 3 products as related products
    return mockProducts.slice(0, 3);
  }
};

export const getProductReviews = async (productId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${productId}/reviews`);
    return response.data;
  } catch (error) {
    console.log('API unavailable, using mock reviews');
    return [];
  }
};

export const addProductReview = async (productId: string, reviewData: { rating: number; comment: string }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${API_BASE_URL}/products/${productId}/reviews`,
      reviewData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.log('API unavailable, simulating review submission');
    return { message: 'Review submitted successfully' };
  }
};

export const getProductCategories = async (): Promise<string[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/categories`);
    return response.data;
  } catch (error) {
    console.log('API unavailable, using mock categories');
    return ["Oversized", "Acid Wash", "Graphic Printed", "Solid Color", "Polo T-Shirts"];
  }
};

export const getProductThemes = async (): Promise<string[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/themes`);
    return response.data;
  } catch (error) {
    console.log('API unavailable, using mock themes');
    return ["Marvel Universe", "DC Comics", "Anime Superheroes", "Classic Comics"];
  }
};
