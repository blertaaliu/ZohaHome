const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const Product = require('../models/Product');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Create order
router.post('/', auth, async (req, res) => {
  try {
    const { items, shippingAddress, billingAddress, paymentMethod } = req.body;

    // Validate items and check stock
    const orderItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.productId} not found` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }
      if (!product.isAvailable) {
        return res.status(400).json({ message: `Product ${product.name} is not available` });
      }

      orderItems.push({
        product: item.productId,
        quantity: item.quantity,
        price: product.price
      });

      totalAmount += product.price * item.quantity;
    }

    // Create order
    const order = new Order({
      user: req.user._id,
      items: orderItems,
      totalAmount,
      shippingAddress,
      billingAddress,
      paymentMethod
    });

    await order.save();

    // Update product stock
    for (const item of items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity }
      });
    }

    // Handle payment based on method
    if (paymentMethod === 'card') {
      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(totalAmount * 100), // Convert to cents
          currency: 'eur',
          metadata: { orderId: order._id.toString() }
        });

        order.stripePaymentIntentId = paymentIntent.id;
        await order.save();

        res.json({
          message: 'Order created successfully',
          order,
          clientSecret: paymentIntent.client_secret
        });
      } catch (error) {
        // If payment fails, delete the order
        await Order.findByIdAndDelete(order._id);
        res.status(400).json({ message: 'Payment failed', error: error.message });
      }
    } else {
      res.json({
        message: 'Order created successfully',
        order
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user orders
router.get('/my-orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single order
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product')
      .populate('user', '-password');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user is authorized to view this order
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update order status (admin only)
router.put('/:id/status', adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('items.product');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all orders (admin only)
router.get('/', adminAuth, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    
    let query = {};
    if (status) query.status = status;
    
    const skip = (page - 1) * limit;
    
    const orders = await Order.find(query)
      .populate('user', 'firstName lastName email')
      .populate('items.product', 'name price images')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Order.countDocuments(query);

    res.json({
      orders,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; 