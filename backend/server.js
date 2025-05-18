
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/coupons', require('./routes/couponRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Fallback route for admin dashboard API
app.get('/api/admin/dashboard', (req, res) => {
  // Send mock data if no real data exists yet
  res.json({
    productCount: 24,
    orderCount: 87,
    userCount: 164,
    recentOrders: [
      { _id: "ord123", user: { name: "John Doe" }, totalPrice: 89.99, createdAt: new Date().toISOString() },
      { _id: "ord124", user: { name: "Jane Smith" }, totalPrice: 129.99, createdAt: new Date().toISOString() },
      { _id: "ord125", user: { name: "Mike Johnson" }, totalPrice: 59.99, createdAt: new Date().toISOString() }
    ],
    popularProducts: [
      { _id: "prod1", name: "Batman T-Shirt", price: 29.99, soldCount: 42 },
      { _id: "prod2", name: "Superman Hoodie", price: 49.99, soldCount: 38 },
      { _id: "prod3", name: "Spider-Man Cap", price: 19.99, soldCount: 35 }
    ],
    salesData: [
      { month: "Jan", sales: 40, revenue: 1200 },
      { month: "Feb", sales: 55, revenue: 1650 },
      { month: "Mar", sales: 68, revenue: 2040 },
      { month: "Apr", sales: 60, revenue: 1800 },
      { month: "May", sales: 75, revenue: 2250 },
      { month: "Jun", sales: 82, revenue: 2460 }
    ],
    growthData: {
      products: 12.5,
      orders: 8.3,
      users: 15.2,
      revenue: 10.7
    }
  });
});

// Fallback route for product analytics
app.get('/api/admin/analytics/products', (req, res) => {
  const { productId, timeRange } = req.query;
  
  // Send mock data if no real data exists yet
  res.json({
    salesData: [
      { period: 'Jan', sales: 45, revenue: 1350, views: 120 },
      { period: 'Feb', sales: 52, revenue: 1560, views: 145 },
      { period: 'Mar', sales: 61, revenue: 1830, views: 190 },
      { period: 'Apr', sales: 67, revenue: 2010, views: 220 },
      { period: 'May', sales: 70, revenue: 2100, views: 240 },
      { period: 'Jun', sales: 74, revenue: 2220, views: 260 }
    ],
    totalSales: 369,
    totalRevenue: 11070,
    totalViews: 1175, 
    averageRating: 4.5,
    conversionRate: 7.8
  });
});

// Error handler middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
