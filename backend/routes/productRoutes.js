const express = require('express');
const router = express.Router();
const { createProduct } = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getProducts); // GET /api/products
router.get('/:id', getProductById); // GET /api/products/:id

// Admin-only routes
router.post('/', protect, admin, createProduct); // POST /api/products
router.put('/:id', protect, admin, updateProduct); // PUT /api/products/:id
router.delete('/:id', protect, admin, deleteProduct); // DELETE /api/products/:id

module.exports = router;