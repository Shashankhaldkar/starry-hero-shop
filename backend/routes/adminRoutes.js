
const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const Product = require('../models/productModel');
const Order = require('../models/orderModel');
const User = require('../models/userModel');

// @desc    Get admin dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
router.get('/dashboard', protect, admin, async (req, res) => {
  try {
    // Count products, orders, and users
    const productCount = await Product.countDocuments();
    const orderCount = await Order.countDocuments();
    const userCount = await User.countDocuments();

    // Get recent orders (last 5)
    const recentOrders = await Order.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name email');

    // Get popular products (by sales count)
    const popularProducts = await Product.find({})
      .sort({ soldCount: -1 })
      .limit(5)
      .select('name price soldCount');

    res.json({
      productCount,
      orderCount,
      userCount,
      recentOrders,
      popularProducts,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
router.get('/users', protect, admin, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get all orders
// @route   GET /api/admin/orders
// @access  Private/Admin
router.get('/orders', protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email');
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update order status
// @route   PUT /api/admin/orders/:id
// @access  Private/Admin
router.put('/orders/:id', protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (order) {
      order.status = req.body.status;
      
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get product analytics
// @route   GET /api/admin/analytics/products
// @access  Private/Admin
router.get('/analytics/products', protect, admin, async (req, res) => {
  try {
    const { productId, timeRange } = req.query;
    
    // For all products or a specific product
    const query = productId !== 'all' ? { _id: productId } : {};
    
    // Default data structure (mock data for now, to be replaced with real analytics)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const salesData = months.map((month, index) => {
      return {
        period: month, 
        sales: Math.floor(Math.random() * 30) + 5,  // Random sales between 5-35
        revenue: (Math.floor(Math.random() * 30) + 5) * 1000  // Random revenue
      };
    });
    
    // Get product rating
    let averageRating = 0;
    if (productId !== 'all') {
      const product = await Product.findById(productId);
      if (product && product.reviews.length > 0) {
        const totalRating = product.reviews.reduce((acc, item) => item.rating + acc, 0);
        averageRating = totalRating / product.reviews.length;
      }
    } else {
      const products = await Product.find({});
      let totalReviews = 0;
      let ratingSum = 0;
      
      products.forEach(product => {
        if (product.reviews.length > 0) {
          totalReviews += product.reviews.length;
          ratingSum += product.reviews.reduce((acc, item) => item.rating + acc, 0);
        }
      });
      
      averageRating = totalReviews > 0 ? ratingSum / totalReviews : 0;
    }
    
    // Calculate total sales and revenue
    const totalSales = salesData.reduce((acc, item) => acc + item.sales, 0);
    const totalRevenue = salesData.reduce((acc, item) => acc + item.revenue, 0);

    res.json({
      salesData,
      totalSales,
      totalRevenue,
      averageRating
    });
  } catch (error) {
    console.error('Error fetching product analytics:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
