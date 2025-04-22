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

router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

router.post('/address', protect, addUserAddress);
router.delete('/address/:addressId', protect, removeUserAddress);

router.post('/wishlist', protect, addToWishlist);
router.delete('/wishlist/:productId', protect, removeFromWishlist);
router.get('/wishlist', protect, getWishlist);

module.exports = router;