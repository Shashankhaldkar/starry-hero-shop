
const Product = require('../models/productModel');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};
    
    // Filter by category, theme, etc.
    let filter = { ...keyword };
    
    if (req.query.category) {
      filter.category = req.query.category;
    }
    
    if (req.query.theme) {
      filter.theme = req.query.theme;
    }
    
    if (req.query.minPrice && req.query.maxPrice) {
      filter.price = { 
        $gte: Number(req.query.minPrice), 
        $lte: Number(req.query.maxPrice) 
      };
    } else if (req.query.minPrice) {
      filter.price = { $gte: Number(req.query.minPrice) };
    } else if (req.query.maxPrice) {
      filter.price = { $lte: Number(req.query.maxPrice) };
    }
    
    const count = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      total: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      category,
      theme,
      sizes,
      colors,
      stock,
      featured
    } = req.body;

    // Process images
    let images = [];
    if (req.files && req.files.images) {
      if (Array.isArray(req.files.images)) {
        images = req.files.images.map(file => file.path);
      } else {
        images = [req.files.images.path];
      }
    } else if (req.body.images) {
      if (Array.isArray(req.body.images)) {
        images = req.body.images;
      } else {
        images = [req.body.images];
      }
    }

    // Process sizes and colors
    let productSizes = [];
    if (sizes) {
      productSizes = Array.isArray(sizes) ? sizes : [sizes];
    }

    let productColors = [];
    if (colors) {
      productColors = Array.isArray(colors) ? colors : [colors];
    }

    const product = new Product({
      name,
      description,
      price,
      discountPrice: discountPrice || undefined,
      images,
      category,
      theme,
      sizes: productSizes,
      colors: productColors,
      stock: stock || 0,
      inStock: stock > 0,
      featured: featured === 'true' || featured === true,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      category,
      theme,
      sizes,
      colors,
      stock,
      featured
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Process images
    let images = product.images || [];
    if (req.files && req.files.images) {
      // Handle file uploads
      if (Array.isArray(req.files.images)) {
        images = req.files.images.map(file => file.path);
      } else {
        images = [req.files.images.path];
      }
    } else if (req.body.images) {
      // Handle image URLs in request body
      if (Array.isArray(req.body.images)) {
        images = req.body.images;
      } else {
        images = [req.body.images];
      }
    }

    // Process sizes and colors
    let productSizes = product.sizes || [];
    if (sizes) {
      productSizes = Array.isArray(sizes) ? sizes : [sizes];
    }

    let productColors = product.colors || [];
    if (colors) {
      productColors = Array.isArray(colors) ? colors : [colors];
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.discountPrice = discountPrice !== undefined ? discountPrice : product.discountPrice;
    product.images = images;
    product.category = category || product.category;
    product.theme = theme || product.theme;
    product.sizes = productSizes;
    product.colors = productColors;
    product.stock = stock !== undefined ? stock : product.stock;
    product.inStock = stock > 0;
    product.featured = featured === 'true' || featured === true;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product removed' });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      // Check if user already reviewed
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user.id.toString()
      );

      if (alreadyReviewed) {
        return res.status(400).json({ message: 'Product already reviewed' });
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user.id,
      };

      product.reviews.push(review);

      product.reviewCount = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: 'Review added' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ featured: true }).limit(8);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get product categories
// @route   GET /api/products/categories
// @access  Public
const getProductCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get product themes
// @route   GET /api/products/themes
// @access  Public
const getProductThemes = async (req, res) => {
  try {
    const themes = await Product.distinct('theme');
    res.json(themes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getFeaturedProducts,
  getProductCategories,
  getProductThemes,
};
