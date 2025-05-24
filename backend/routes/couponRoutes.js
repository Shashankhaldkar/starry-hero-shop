const express = require('express');
const router = express.Router();
const {
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} = require('../controllers/couponController');
const { protect, admin } = require('../middleware/authMiddleware');

// Admin-only routes
router.get('/', protect, admin, getCoupons); // GET /api/coupons
router.post('/', protect, admin, createCoupon); // POST /api/coupons
router.put('/:id', protect, admin, updateCoupon); // PUT /api/coupons/:id
router.delete('/:id', protect, admin, deleteCoupon); // DELETE /api/coupons/:id

module.exports = router;