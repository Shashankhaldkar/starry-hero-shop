
const Coupon = require('../models/couponModel');

// @desc    Create a new coupon
// @route   POST /api/coupons
// @access  Private/Admin
const createCoupon = async (req, res) => {
  try {
    const {
      code,
      description,
      discountType,
      discountAmount,
      minimumPurchase,
      startDate,
      endDate,
      usageLimit,
      isActive,
    } = req.body;

    // Check if coupon with same code already exists
    const existingCoupon = await Coupon.findOne({ code: code.toUpperCase() });
    if (existingCoupon) {
      return res.status(400).json({ message: 'Coupon with this code already exists' });
    }

    const coupon = new Coupon({
      code: code.toUpperCase(),
      description,
      discountType,
      discountAmount,
      minimumPurchase: minimumPurchase || 0,
      startDate,
      endDate,
      usageLimit,
      isActive: isActive !== undefined ? isActive : true,
    });

    const createdCoupon = await coupon.save();
    res.status(201).json(createdCoupon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all coupons
// @route   GET /api/coupons
// @access  Private/Admin
const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({});
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get coupon by ID
// @route   GET /api/coupons/:id
// @access  Private/Admin
const getCouponById = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    
    if (coupon) {
      res.json(coupon);
    } else {
      res.status(404).json({ message: 'Coupon not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a coupon
// @route   PUT /api/coupons/:id
// @access  Private/Admin
const updateCoupon = async (req, res) => {
  try {
    const {
      code,
      description,
      discountType,
      discountAmount,
      minimumPurchase,
      startDate,
      endDate,
      usageLimit,
      isActive,
    } = req.body;

    const coupon = await Coupon.findById(req.params.id);

    if (coupon) {
      // If code is being changed, check if new code already exists
      if (code && code.toUpperCase() !== coupon.code) {
        const existingCoupon = await Coupon.findOne({ code: code.toUpperCase() });
        if (existingCoupon) {
          return res.status(400).json({ message: 'Coupon with this code already exists' });
        }
        coupon.code = code.toUpperCase();
      }
      
      coupon.description = description || coupon.description;
      coupon.discountType = discountType || coupon.discountType;
      coupon.discountAmount = discountAmount !== undefined ? discountAmount : coupon.discountAmount;
      coupon.minimumPurchase = minimumPurchase !== undefined ? minimumPurchase : coupon.minimumPurchase;
      coupon.startDate = startDate || coupon.startDate;
      coupon.endDate = endDate || coupon.endDate;
      coupon.usageLimit = usageLimit !== undefined ? usageLimit : coupon.usageLimit;
      coupon.isActive = isActive !== undefined ? isActive : coupon.isActive;

      const updatedCoupon = await coupon.save();
      res.json(updatedCoupon);
    } else {
      res.status(404).json({ message: 'Coupon not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a coupon
// @route   DELETE /api/coupons/:id
// @access  Private/Admin
const deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);

    if (coupon) {
      await coupon.remove();
      res.json({ message: 'Coupon removed' });
    } else {
      res.status(404).json({ message: 'Coupon not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify coupon validity and return discount info
// @route   POST /api/coupons/verify
// @access  Private
const verifyCoupon = async (req, res) => {
  try {
    const { code, amount } = req.body;
    
    const coupon = await Coupon.findOne({ code: code.toUpperCase() });
    
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }
    
    if (!coupon.isValid()) {
      return res.status(400).json({ message: 'Coupon is expired or inactive' });
    }
    
    if (coupon.minimumPurchase > amount) {
      return res.status(400).json({ 
        message: `Minimum purchase of $${coupon.minimumPurchase} required for this coupon` 
      });
    }
    
    let discountAmount = 0;
    if (coupon.discountType === 'percentage') {
      discountAmount = (amount * coupon.discountAmount) / 100;
    } else {
      discountAmount = coupon.discountAmount;
    }
    
    res.json({
      valid: true,
      discount: discountAmount,
      discountType: coupon.discountType,
      discountValue: coupon.discountAmount,
      message: `Coupon applied successfully! You saved $${discountAmount.toFixed(2)}`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCoupon,
  getCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
  verifyCoupon,
};
