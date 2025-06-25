const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Register user
router.post('/register', async (req, res) => {
  try {
    console.log('📝 Registration attempt:', { email: req.body.email, username: req.body.username });
    
    const { username, email, password, firstName, lastName, phone } = req.body;

    // Validate required fields
    if (!username || !email || !password || !firstName || !lastName) {
      return res.status(400).json({ 
        message: 'Të gjitha fushat e detyrueshme duhet të plotësohen' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ 
        message: existingUser.email === email 
          ? 'Ky email është tashmë në përdorim' 
          : 'Ky emër përdoruesi është tashmë në përdorim' 
      });
    }

    // Create new user
    const user = new User({
      username,
      email,
      password,
      firstName,
      lastName,
      phone
    });

    await user.save();
    console.log('✅ User registered successfully:', user._id);

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({ 
      message: 'Gabim në regjistrim. Ju lutemi provoni përsëri.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    console.log('🔐 Login attempt:', { email: req.body.email });
    
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Email dhe fjalëkalimi janë të detyrueshëm' 
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email ose fjalëkalimi i gabuar' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email ose fjalëkalimi i gabuar' });
    }

    console.log('✅ User logged in successfully:', user._id);

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ 
      message: 'Gabim në hyrje. Ju lutemi provoni përsëri.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    console.error('❌ Profile error:', error);
    res.status(500).json({ 
      message: 'Gabim në marrjen e profilit',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { firstName, lastName, phone, address } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { firstName, lastName, phone, address },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('❌ Profile update error:', error);
    res.status(500).json({ 
      message: 'Gabim në përditësimin e profilit',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router; 