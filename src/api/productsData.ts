import { Product, Category, Theme } from "@/types";
import * as productAPI from "@/api/products";

// Helper function to transform API response categories into our Category type
export const getProductCategories = async (): Promise<Category[]> => {
  try {
    const categoryNames = await productAPI.getProductCategories();
    return categoryNames.map((name, index) => ({
      id: name.toLowerCase().replace(/\s+/g, "-"),
      name: name,
      image: `https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=3064&auto=format&fit=crop&ixid=${index}`
    }));
  } catch (error) {
    console.error("Error fetching product categories:", error);
    return [];
  }
};

// Helper function to transform API response themes into our Theme type
export const getProductThemes = async (): Promise<Theme[]> => {
  try {
    const themeNames = await productAPI.getProductThemes();
    return themeNames.map((name, index) => ({
      id: name.toLowerCase().replace(/\s+/g, "-"),
      name: name,
      image: `https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=3074&auto=format&fit=crop&ixid=${index}`
    }));
  } catch (error) {
    console.error("Error fetching product themes:", error);
    return [];
  }
};

// Helper function to get all products
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await productAPI.getProducts({});
    return response.products.map(product => ({
      ...product,
      id: product._id // Map _id to id for consistency with our types
    }));
  } catch (error) {
    console.error("Error fetching all products:", error);
    return getMockProducts(); // Fallback to mock products if API fails
  }
};

// Helper function to get featured products
export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const response = await productAPI.getProducts({
      keyword: "",
      page: 1,
      category: "",
      theme: "",
      minPrice: 0,
      maxPrice: 0
    });
    
    // If we have real products, return featured ones
    if (response.products && response.products.length > 0) {
      return response.products
        .filter(product => product.featured)
        .slice(0, 8)
        .map(product => ({
          ...product,
          id: product._id
        }));
    }
    
    // Otherwise return mock featured products
    return getMockProducts().filter(p => p.featured).slice(0, 8);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return getMockProducts().filter(p => p.featured).slice(0, 8);
  }
};

// Helper function to get products by category
export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  try {
    const response = await productAPI.getProducts({
      category: categoryId,
      page: 1
    });
    return response.products.map(product => ({
      ...product,
      id: product._id
    }));
  } catch (error) {
    console.error(`Error fetching products for category ${categoryId}:`, error);
    return getMockProducts().filter(p => 
      p.category.toLowerCase() === categoryId.toLowerCase() || 
      p.category.toLowerCase().replace(/\s+/g, '-') === categoryId.toLowerCase()
    );
  }
};

// Helper function to get products by theme
export const getProductsByTheme = async (themeId: string): Promise<Product[]> => {
  try {
    const response = await productAPI.getProducts({
      theme: themeId,
      page: 1
    });
    return response.products.map(product => ({
      ...product,
      id: product._id
    }));
  } catch (error) {
    console.error(`Error fetching products for theme ${themeId}:`, error);
    return getMockProducts().filter(p => 
      p.theme.toLowerCase() === themeId.toLowerCase() || 
      p.theme.toLowerCase().replace(/\s+/g, '-') === themeId.toLowerCase()
    );
  }
};

// Helper function to get new arrivals (most recently added products)
export const getNewArrivals = async (): Promise<Product[]> => {
  try {
    const response = await productAPI.getProducts({});
    return response.products
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 8)
      .map(product => ({
        ...product,
        id: product._id
      }));
  } catch (error) {
    console.error("Error fetching new arrivals:", error);
    return getMockProducts()
      .sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime())
      .slice(0, 8);
  }
};

// Helper function to get popular products (highest rated or most sold)
export const getPopularProducts = async (): Promise<Product[]> => {
  try {
    const response = await productAPI.getProducts({});
    return response.products
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 8)
      .map(product => ({
        ...product,
        id: product._id
      }));
  } catch (error) {
    console.error("Error fetching popular products:", error);
    return getMockProducts()
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 8);
  }
};

// Mock data for development - with expanded product offerings
export const getMockProducts = (): Product[] => {
  return [
    // Oversized T-Shirts
    {
      id: "os1",
      name: "Oversized Street Vision T-Shirt",
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
      name: "Boxy Cut Hero Silhouette Tee",
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
      name: "Vintage Acid Wash Comic Panel Tee",
      description: "Retro-inspired acid wash tee with faded comic panel design. Each piece has a unique wash pattern making it truly one-of-a-kind.",
      price: 32.99,
      discountPrice: 0,
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
      name: "Galaxy Acid Wash Superhero Tee",
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
      name: "Classic Avengers Assembly Graphic Tee",
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
      name: "Justice League Action Graphic Tee",
      description: "Dynamic full-front print featuring the Justice League in action. Vibrant colors that won't fade with washing.",
      price: 27.99,
      discountPrice: 0,
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
    {
      id: "gp3",
      name: "One Punch Hero Graphic Tee",
      description: "Minimalist design featuring the iconic bald hero. Made from lightweight, breathable fabric perfect for casual wear.",
      price: 26.99,
      discountPrice: 22.99,
      images: [
        "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=500",
        "https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?auto=format&fit=crop&q=80&w=500"
      ],
      category: "Graphic Printed",
      theme: "Anime Superheroes",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["White", "Yellow", "Red"],
      stock: 55,
      inStock: true,
      featured: false,
      rating: 4.9,
      reviews: [],
      reviewCount: 29,
      createdAt: "2023-09-08T00:00:00Z"
    },
    
    // Solid Color T-Shirts
    {
      id: "sc1",
      name: "Premium Hero Essential Solid Tee",
      description: "Ultra-soft premium cotton solid color tee with subtle embroidered hero logo. Perfect base layer for any superhero fan's wardrobe.",
      price: 22.99,
      discountPrice: 0,
      images: [
        "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&q=80&w=500",
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=500"
      ],
      category: "Solid Color",
      theme: "Classic Comics",
      sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
      colors: ["Black", "White", "Navy", "Red", "Forest Green"],
      stock: 120,
      inStock: true,
      featured: false,
      rating: 4.5,
      reviews: [],
      reviewCount: 62,
      createdAt: "2023-02-10T00:00:00Z"
    },
    {
      id: "sc2",
      name: "Wayne Enterprises Staff Solid Tee",
      description: "Official staff tee from Wayne Enterprises with small embroidered logo. Made from high-quality pima cotton for lasting softness.",
      price: 24.99,
      discountPrice: 21.99,
      images: [
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=500",
        "https://images.unsplash.com/photo-1576566588022-66b0c6383620?auto=format&fit=crop&q=80&w=500"
      ],
      category: "Solid Color",
      theme: "DC Comics",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "Dark Grey", "Navy"],
      stock: 70,
      inStock: true,
      featured: true,
      rating: 4.6,
      reviews: [],
      reviewCount: 34,
      createdAt: "2023-05-25T00:00:00Z"
    },
    
    // Polo T-Shirts
    {
      id: "pt1",
      name: "Stark Industries Executive Polo",
      description: "Professional polo with subtle Stark Industries logo embroidery. Moisture-wicking fabric keeps you comfortable all day.",
      price: 44.99,
      discountPrice: 39.99,
      images: [
        "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=500",
        "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=500"
      ],
      category: "Polo T-Shirts",
      theme: "Marvel Universe",
      sizes: ["M", "L", "XL", "XXL"],
      colors: ["Black", "Grey", "Navy"],
      stock: 40,
      inStock: true,
      featured: true,
      rating: 4.7,
      reviews: [],
      reviewCount: 28,
      createdAt: "2023-06-30T00:00:00Z"
    },
    {
      id: "pt2",
      name: "Daily Planet Press Polo",
      description: "Officially licensed Daily Planet newspaper polo with subtle embroidered logo. Business casual with superhero fandom.",
      price: 42.99,
      discountPrice: 0,
      images: [
        "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=500",
        "https://images.unsplash.com/photo-1563630423918-b58f07336ac9?auto=format&fit=crop&q=80&w=500"
      ],
      category: "Polo T-Shirts",
      theme: "DC Comics",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Blue", "White", "Red"],
      stock: 35,
      inStock: true,
      featured: false,
      rating: 4.4,
      reviews: [],
      reviewCount: 19,
      createdAt: "2023-07-15T00:00:00Z"
    },
    
    // Marvel Universe Themed
    {
      id: "mu1",
      name: "Wakanda Forever Tribute Tee",
      description: "Special edition tee honoring the Black Panther legacy. Features vibranium-inspired metallic print that changes appearance in different lighting.",
      price: 32.99,
      discountPrice: 29.99,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEi6AA0fhFdBQ4GywQkUedVDK2mcdsmARWFg&s",
        "https://images.unsplash.com/photo-1612033448550-9d6f55312cb4?auto=format&fit=crop&q=80&w=500"
      ],
      category: "Graphic Printed",
      theme: "Marvel Universe",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Black", "Purple"],
      stock: 60,
      inStock: true,
      featured: true,
      rating: 4.9,
      reviews: [],
      reviewCount: 53,
      createdAt: "2023-08-10T00:00:00Z"
    },
    {
      id: "mu2",
      name: "Spider-Verse Multi-Dimensional Tee",
      description: "Featuring multiple Spider-heroes from across the multiverse in a dynamic web design. Glow-in-the-dark elements make the design pop in low light.",
      price: 29.99,
      discountPrice: 0,
      images: [
        "https://images.unsplash.com/photo-1613852348851-df1739db8201?auto=format&fit=crop&q=80&w=500",
        "https://images.unsplash.com/photo-1565693413579-8a73ffa6c6b9?auto=format&fit=crop&q=80&w=500"
      ],
      category: "Graphic Printed",
      theme: "Marvel Universe",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "Red", "Blue"],
      stock: 50,
      inStock: true,
      featured: true,
      rating: 4.8,
      reviews: [],
      reviewCount: 46,
      createdAt: "2023-09-05T00:00:00Z"
    },
    
    // DC Comics Themed
    {
      id: "dc1",
      name: "Gotham City Skyline Tee",
      description: "Atmospheric nighttime silhouette of Gotham City with bat signal illuminating the sky. Distressed print gives a vintage comic book feel.",
      price: 28.99,
      discountPrice: 24.99,
      images: [
        "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?auto=format&fit=crop&q=80&w=500",
        "https://images.unsplash.com/photo-1520013135029-3c668b01f0b9?auto=format&fit=crop&q=80&w=500"
      ],
      category: "Graphic Printed",
      theme: "DC Comics",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Dark Grey", "Black", "Navy"],
      stock: 55,
      inStock: true,
      featured: false,
      rating: 4.6,
      reviews: [],
      reviewCount: 37,
      createdAt: "2023-04-20T00:00:00Z"
    },
    {
      id: "dc2",
      name: "Flash Lightning Speed Tee",
      description: "Action-packed design showing the Flash in motion with lightning effects. The special print has subtle holographic details that catch the light.",
      price: 27.99,
      discountPrice: 0,
      images: [
        "https://images.unsplash.com/photo-1527719327859-c6ce80353573?auto=format&fit=crop&q=80&w=500",
        "https://images.unsplash.com/photo-1592516406345-a42f3a421936?auto=format&fit=crop&q=80&w=500"
      ],
      category: "Graphic Printed",
      theme: "DC Comics",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Red", "Black", "Gold"],
      stock: 45,
      inStock: true,
      featured: true,
      rating: 4.7,
      reviews: [],
      reviewCount: 29,
      createdAt: "2023-05-18T00:00:00Z"
    },
    
    // Anime Superheroes Themed
    {
      id: "an1",
      name: "Plus Ultra Academy Tee",
      description: "Inspired by the world's greatest hero academy, featuring the school emblem and motto. Ultra-soft jersey cotton with reinforced neckline.",
      price: 26.99,
      discountPrice: 23.99,
      images: [
        "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=500",
        "https://images.unsplash.com/photo-1566677379759-5522d60cad36?auto=format&fit=crop&q=80&w=500"
      ],
      category: "Graphic Printed",
      theme: "Anime Superheroes",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Blue", "Green", "Red"],
      stock: 70,
      inStock: true,
      featured: true,
      rating: 4.8,
      reviews: [],
      reviewCount: 42,
      createdAt: "2023-06-25T00:00:00Z"
    },
    {
      id: "an2",
      name: "Titan Battle Oversized Tee",
      description: "Dramatic anime-inspired battle scene printed on an oversized silhouette. Extra-long fit with side slits for comfortable movement.",
      price: 34.99,
      discountPrice: 29.99,
      images: [
        "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=500",
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=500"
      ],
      category: "Oversized",
      theme: "Anime Superheroes",
      sizes: ["M", "L", "XL", "XXL"],
      colors: ["Black", "White", "Beige"],
      stock: 40,
      inStock: true,
      featured: false,
      rating: 4.5,
      reviews: [],
      reviewCount: 23,
      createdAt: "2023-07-30T00:00:00Z"
    }
  ];
};
