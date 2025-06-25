const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get dashboard statistics
router.get('/stats', adminAuth, async (req, res) => {
  try {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfYear = new Date(today.getFullYear(), 0, 1);

    // Total counts
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments({ role: 'user' });

    // Revenue calculations
    const totalRevenue = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    const monthlyRevenue = await Order.aggregate([
      { 
        $match: { 
          paymentStatus: 'paid',
          createdAt: { $gte: startOfMonth }
        }
      },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    const yearlyRevenue = await Order.aggregate([
      { 
        $match: { 
          paymentStatus: 'paid',
          createdAt: { $gte: startOfYear }
        }
      },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    // Recent orders
    const recentOrders = await Order.find()
      .populate('user', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .limit(5);

    // Low stock products
    const lowStockProducts = await Product.find({ stock: { $lt: 10 } })
      .select('name stock price')
      .limit(10);

    // Top selling products
    const topProducts = await Order.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.product',
          totalSold: { $sum: '$items.quantity' },
          totalRevenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' }
    ]);

    res.json({
      stats: {
        totalProducts,
        totalOrders,
        totalUsers,
        totalRevenue: totalRevenue[0]?.total || 0,
        monthlyRevenue: monthlyRevenue[0]?.total || 0,
        yearlyRevenue: yearlyRevenue[0]?.total || 0
      },
      recentOrders,
      lowStockProducts,
      topProducts
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get sales chart data
router.get('/sales-chart', adminAuth, async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    let startDate, groupFormat;

    if (period === 'week') {
      startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      groupFormat = { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } };
    } else if (period === 'month') {
      startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      groupFormat = { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } };
    } else {
      startDate = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
      groupFormat = { $dateToString: { format: '%Y-%m', date: '$createdAt' } };
    }

    const salesData = await Order.aggregate([
      {
        $match: {
          paymentStatus: 'paid',
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: groupFormat,
          totalSales: { $sum: '$totalAmount' },
          orderCount: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(salesData);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get category statistics
router.get('/category-stats', adminAuth, async (req, res) => {
  try {
    const categoryStats = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalValue: { $sum: { $multiply: ['$price', '$stock'] } }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json(categoryStats);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; 