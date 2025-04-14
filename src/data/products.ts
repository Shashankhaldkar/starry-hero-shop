
import { Product, Category, Theme } from '../types';

export const categories: Category[] = [
  { 
    id: 'oversized', 
    name: 'Oversized', 
    image: 'https://images.unsplash.com/photo-1646634580162-d8519e51aa8e?auto=format&fit=crop&q=80&w=500' 
  },
  { 
    id: 'graphic-printed', 
    name: 'Graphic Printed', 
    image: 'https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?auto=format&fit=crop&q=80&w=500' 
  },
  { 
    id: 'solid-color', 
    name: 'Solid Color', 
    image: 'https://images.unsplash.com/photo-1513097633097-329a3a64e0d4?auto=format&fit=crop&q=80&w=500' 
  },
  { 
    id: 'polo-tshirts', 
    name: 'Polo T-Shirts', 
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=500' 
  },
  { 
    id: 'sleeveless', 
    name: 'Sleeveless', 
    image: 'https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?auto=format&fit=crop&q=80&w=500' 
  },
  { 
    id: 'long-sleeve', 
    name: 'Long Sleeve', 
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=500' 
  },
  { 
    id: 'henley', 
    name: 'Henley', 
    image: 'https://images.unsplash.com/photo-1589902978003-a8a2ab571b71?auto=format&fit=crop&q=80&w=500' 
  },
  { 
    id: 'hooded', 
    name: 'Hooded', 
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=500' 
  },
];

export const themes: Theme[] = [
  { 
    id: 'marvel', 
    name: 'Marvel Universe', 
    image: 'https://images.unsplash.com/photo-1560343776-97e7d202ff0e?auto=format&fit=crop&q=80&w=500' 
  },
  { 
    id: 'dc', 
    name: 'DC Comics', 
    image: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?auto=format&fit=crop&q=80&w=500' 
  },
  { 
    id: 'anime', 
    name: 'Anime Superheroes', 
    image: 'https://images.unsplash.com/photo-1580477667995-2b94f01c9516?auto=format&fit=crop&q=80&w=500' 
  },
  { 
    id: 'classic-comics', 
    name: 'Classic Comics', 
    image: 'https://images.unsplash.com/photo-1612036782180-6f0822045d23?auto=format&fit=crop&q=80&w=500' 
  },
  { 
    id: 'sci-fi', 
    name: 'Sci-Fi & Fantasy', 
    image: 'https://images.unsplash.com/photo-1506443432602-ac2fcd6f54e0?auto=format&fit=crop&q=80&w=500' 
  },
  { 
    id: 'video-game', 
    name: 'Video Game Heroes', 
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=500' 
  },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Cosmic Guardian - Oversized Tee',
    description: 'Embrace the galaxy with this oversized cosmic guardian t-shirt. Features a stunning starry night background with a silhouette of a cosmic superhero.',
    price: 29.99,
    discountPrice: 24.99,
    images: [
      'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27',
    ],
    category: 'oversized',
    theme: 'marvel',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Blue', 'Black', 'Purple'],
    rating: 4.5,
    reviewCount: 28,
    inStock: true,
    featured: true
  },
  {
    id: '2',
    name: 'Dark Knight - Graphic Print',
    description: 'Step into the shadows with this hand-illustrated graphic print featuring the silhouette of a bat-inspired vigilante against a starry cityscape.',
    price: 34.99,
    images: [
      'https://images.unsplash.com/photo-1546182990-dffeafbe841d',
      'https://images.unsplash.com/photo-1527719327859-c6ce80353573',
    ],
    category: 'graphic-printed',
    theme: 'dc',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Grey', 'Navy Blue'],
    rating: 4.8,
    reviewCount: 42,
    inStock: true,
    featured: true
  },
  {
    id: '3',
    name: 'Web Slinger - Long Sleeve',
    description: 'Swing into action with this comfortable long sleeve tee featuring abstract web patterns and a red and blue color scheme inspired by the famous web-slinger.',
    price: 39.99,
    discountPrice: 32.99,
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990',
      'https://images.unsplash.com/photo-1588187284031-34a9fdf24526',
    ],
    category: 'long-sleeve',
    theme: 'classic-comics',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Red', 'Blue', 'Black'],
    rating: 4.6,
    reviewCount: 37,
    inStock: true
  },
  {
    id: '4',
    name: 'Thunder God - Sleeveless',
    description: 'Channel the power of thunder with this sleeveless tee. Features a minimalist hammer design with lightning effects on premium fabric.',
    price: 27.99,
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35',
      'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5',
    ],
    category: 'sleeveless',
    theme: 'marvel',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Grey', 'Blue', 'Black'],
    rating: 4.3,
    reviewCount: 18,
    inStock: true
  },
  {
    id: '5',
    name: 'Man of Steel - Polo',
    description: 'Subtle superhero style for the office. This polo features a small embroidered shield on the chest and comes in classic colors.',
    price: 44.99,
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b',
      'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99',
    ],
    category: 'polo-tshirts',
    theme: 'dc',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Blue', 'Red', 'Black'],
    rating: 4.7,
    reviewCount: 23,
    inStock: true
  },
  {
    id: '6',
    name: 'Green Rage - Graphic Hoodie',
    description: 'When the temperature drops, embrace your inner rage monster with this green-themed graphic hoodie featuring torn edges and rage-inspired designs.',
    price: 54.99,
    discountPrice: 49.99,
    images: [
      'https://images.unsplash.com/photo-1565693413579-8a400a3b3d54',
      'https://images.unsplash.com/photo-1542219550-37153d387c27',
    ],
    category: 'hooded',
    theme: 'marvel',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Green', 'Grey', 'Black'],
    rating: 4.9,
    reviewCount: 48,
    inStock: true,
    featured: true
  },
  {
    id: '7',
    name: 'Speed Force - Solid Color Tee',
    description: 'Simple but bold, this vibrant red tee with a minimalist lightning bolt design is perfect for fans of the scarlet speedster.',
    price: 24.99,
    images: [
      'https://images.unsplash.com/photo-1513097633097-329a3a64e0d4',
      'https://images.unsplash.com/photo-1517423568366-8b83523034fd',
    ],
    category: 'solid-color',
    theme: 'dc',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Red', 'Yellow', 'Black'],
    rating: 4.2,
    reviewCount: 15,
    inStock: true
  },
  {
    id: '8',
    name: 'Shadow Assassin - Henley',
    description: 'Inspired by stealthy comic book assassins, this henley features subtle patterns and premium comfort for everyday wear.',
    price: 37.99,
    images: [
      'https://images.unsplash.com/photo-1589902978003-a8a2ab571b71',
      'https://images.unsplash.com/photo-1512353087810-25dfcd100962',
    ],
    category: 'henley',
    theme: 'dc',
    sizes: ['M', 'L', 'XL'],
    colors: ['Black', 'Grey', 'Navy'],
    rating: 4.4,
    reviewCount: 19,
    inStock: true
  }
];
