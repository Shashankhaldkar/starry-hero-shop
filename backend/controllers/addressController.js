
const User = require('../models/userModel');

// @desc    Add user address
// @route   POST /api/users/address
// @access  Private
const addUserAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { 
      name, 
      street, 
      city, 
      state, 
      zipCode, 
      country, 
      phoneNumber, 
      isDefault 
    } = req.body;

    if (isDefault) {
      user.addresses.forEach(address => {
        address.isDefault = false;
      });
    }

    user.addresses.push({
      name,
      street,
      city,
      state,
      zipCode,
      country,
      phoneNumber,
      isDefault: isDefault || false
    });

    await user.save();

    res.status(201).json({ 
      message: 'Address added successfully', 
      addresses: user.addresses 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove user address
// @route   DELETE /api/users/address/:addressId
// @access  Private
const removeUserAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.addresses = user.addresses.filter(
      address => address._id.toString() !== req.params.addressId
    );

    await user.save();

    res.json({ 
      message: 'Address removed successfully', 
      addresses: user.addresses 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addUserAddress,
  removeUserAddress,
};
