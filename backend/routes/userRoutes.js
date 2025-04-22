
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { registerUser, loginUser } = require('../controllers/authController');
const { getUserProfile, updateUserProfile } = require('../controllers/profileController');
const { addUserAddress, removeUserAddress } = require('../controllers/addressController');
const { addToWishlist, removeFromWishlist, getWishlist } = require('../controllers/wishlistController');

// Auth routes
router.post('/', registerUser);
router.post('/login', loginUser);

// Google OAuth route (stub for now)
router.get('/auth/google', (req, res) => {
  res.status(501).json({ message: 'Google OAuth not fully implemented yet' });
});

// Profile routes
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

// Address routes
router.post('/address', protect, addUserAddress);
router.delete('/address/:addressId', protect, removeUserAddress);

// Wishlist routes
router.post('/wishlist', protect, addToWishlist);
router.delete('/wishlist/:productId', protect, removeFromWishlist);
router.get('/wishlist', protect, getWishlist);

module.exports = router;
