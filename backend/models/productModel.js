
const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  }
}, { timestamps: true });

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a product description']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a product price'],
    min: [0, 'Price must be positive']
  },
  discountPrice: {
    type: Number,
    min: [0, 'Discount price must be positive']
  },
  images: [
    {
      type: String,
      required: true
    }
  ],
  category: {
    type: String,
    required: [true, 'Please provide a product category'],
    enum: [
      'Oversized',
      'Acid Wash',
      'Graphic Printed',
      'Solid Color',
      'Polo T-Shirts',
      'Sleeveless',
      'Long Sleeve',
      'Henley',
      'Hooded',
      'Crop Tops'
    ]
  },
  theme: {
    type: String,
    required: [true, 'Please provide a product theme'],
    enum: [
      'Marvel Universe',
      'DC Comics',
      'Anime Superheroes',
      'Classic Comics',
      'Sci-Fi & Fantasy',
      'Video Game Characters',
      'Custom Fan Art'
    ]
  },
  sizes: [{
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL']
  }],
  colors: [String],
  rating: {
    type: Number,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  reviews: [reviewSchema],
  inStock: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  stock: {
    type: Number,
    required: [true, 'Please provide stock quantity'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
