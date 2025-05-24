
import { Product } from '@/types';

export const getMockWishlistItems = (): Product[] => {
  return [
    {
      id: "w1",
      name: "StaartHero Iron Man Classic Tee",
      description: "Classic Iron Man design with arc reactor detail",
      price: 29.99,
      images: ["https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&q=80&w=500"],
      category: "Graphic Printed",
      theme: "Marvel Universe",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Red", "Black"],
      stock: 50,
      inStock: true,
      rating: 4.8,
      reviewCount: 25,
      createdAt: "2023-05-15T00:00:00Z"
    },
    {
      id: "w2",
      name: "StaartHero Batman Vintage Wash",
      description: "Vintage-style Batman logo on acid wash background",
      price: 34.99,
      discountPrice: 27.99,
      images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=500"],
      category: "Acid Wash",
      theme: "DC Comics",
      sizes: ["M", "L", "XL"],
      colors: ["Blue Wash", "Black Wash"],
      stock: 30,
      inStock: true,
      rating: 4.6,
      reviewCount: 18,
      createdAt: "2023-06-20T00:00:00Z"
    }
  ];
};

export const getMockOrders = () => {
  return [
    {
      _id: "order123",
      status: "Delivered",
      createdAt: "2023-10-15T00:00:00Z",
      totalPrice: 89.97,
      items: [
        { name: "StaartHero Spider-Man Tee", quantity: 2, price: 29.99 },
        { name: "StaartHero Thor Hammer Tee", quantity: 1, price: 29.99 }
      ]
    },
    {
      _id: "order456",
      status: "Shipped",
      createdAt: "2023-10-20T00:00:00Z",
      totalPrice: 59.98,
      items: [
        { name: "StaartHero Captain America Shield Tee", quantity: 2, price: 29.99 }
      ]
    },
    {
      _id: "order789",
      status: "Processing",
      createdAt: "2023-10-25T00:00:00Z",
      totalPrice: 34.99,
      items: [
        { name: "StaartHero Wolverine Claws Tee", quantity: 1, price: 34.99 }
      ]
    }
  ];
};
