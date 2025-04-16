
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createStripePaymentIntent,
  stripeWebhook
} = require('../controllers/paymentController');

// Protected routes
router.post('/stripe', protect, createStripePaymentIntent);

// Webhook route (public)
router.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

module.exports = router;
