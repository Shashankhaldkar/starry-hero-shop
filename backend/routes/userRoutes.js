const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  addUserAddress,
  removeUserAddress,
  addToWishlist,
  removeFromWishlist,
  getWishlist
} = require('../controllers/userController');

router.post('/', registerUser);
router.post('/login', loginUser);

// Google OAuth route (stub for now)
router.get('/auth/google', (req, res) => {
  // In a real implementation, this would redirect to Google OAuth
  // For now, we'll just return a message
  res.status(501).json({ message: 'Google OAuth not fully implemented yet' });
});

router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

router.post('/address', protect, addUserAddress);
router.delete('/address/:addressId', protect, removeUserAddress);

router.post('/wishlist', protect, addToWishlist);
router.delete('/wishlist/:productId', protect, removeFromWishlist);
router.get('/wishlist', protect, getWishlist);

module.exports = router;