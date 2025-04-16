
const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  createCoupon,
  getCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
  verifyCoupon
} = require('../controllers/couponController');

// Admin routes
router.post('/', protect, admin, createCoupon);
router.get('/', protect, admin, getCoupons);
router.get('/:id', protect, admin, getCouponById);
router.put('/:id', protect, admin, updateCoupon);
router.delete('/:id', protect, admin, deleteCoupon);

// User routes
router.post('/verify', protect, verifyCoupon);

module.exports = router;
