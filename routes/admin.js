const express = require('express');
const router = express.Router();
const { auth: authMiddleware, isAdmin: adminMiddleware } = require('../middleware/auth');
const User = require('../models/User');
const Order = require('../models/Order');

// Get dashboard statistics
router.get('/dashboard', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const paidOrders = await Order.countDocuments({ status: 'paid' });
    const completedOrders = await Order.countDocuments({ status: 'completed' });
    const activeOrders = await Order.countDocuments({ status: { $in: ['paid', 'in_progress'] } });
    
    // Revenue calculation
    const revenueResult = await Order.aggregate([
      { $match: { status: { $in: ['paid', 'completed'] } } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total / 100 : 0;

    // Recent orders
    const recentOrders = await Order.find()
      .populate('user', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .limit(5);

    // Monthly statistics
    const monthlyStats = await Order.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          orders: { $sum: 1 },
          revenue: { $sum: '$amount' }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 12 }
    ]);

    res.json({
      stats: {
        totalUsers,
        totalOrders,
        paidOrders,
        completedOrders,
        activeOrders,
        totalRevenue
      },
      recentOrders,
      monthlyStats
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Failed to fetch dashboard data' });
  }
});

// Get all users
router.get('/users', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments();

    res.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Users fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// Get specific user details
router.get('/users/:userId', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const orders = await Order.find({ user: req.params.userId })
      .sort({ createdAt: -1 });

    res.json({ user, orders });
  } catch (error) {
    console.error('User details error:', error);
    res.status(500).json({ message: 'Failed to fetch user details' });
  }
});

// Update user role
router.put('/users/:userId/role', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { role } = req.body;
    
    if (!['client', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { role },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User role updated successfully', user });
  } catch (error) {
    console.error('Role update error:', error);
    res.status(500).json({ message: 'Failed to update user role' });
  }
});

// Get all orders with filters
router.get('/orders', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const status = req.query.status;
    const template = req.query.template;

    let filter = {};
    if (status) filter.status = status;
    if (template) filter.selectedTemplate = template;

    const orders = await Order.find(filter)
      .populate('user', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Order.countDocuments(filter);

    res.json({
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Orders fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

// Update order status
router.put('/orders/:orderId/status', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['draft', 'pending_payment', 'paid', 'in_progress', 'completed', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status },
      { new: true }
    ).populate('user', 'firstName lastName email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Order status updated successfully', order });
  } catch (error) {
    console.error('Order status update error:', error);
    res.status(500).json({ message: 'Failed to update order status' });
  }
});

// Delete order
router.delete('/orders/:orderId', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.status === 'in_progress') {
      return res.status(400).json({ message: 'Cannot delete order in progress' });
    }

    await Order.findByIdAndDelete(req.params.orderId);
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Order deletion error:', error);
    res.status(500).json({ message: 'Failed to delete order' });
  }
});

// Get system logs (simplified)
router.get('/logs', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const logs = [
      { timestamp: new Date(), level: 'info', message: 'System operational' },
      { timestamp: new Date(Date.now() - 3600000), level: 'warning', message: 'High memory usage detected' },
      { timestamp: new Date(Date.now() - 7200000), level: 'error', message: 'Database connection timeout' }
    ];

    res.json({ logs });
  } catch (error) {
    console.error('Logs fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch logs' });
  }
});

// Export data
router.get('/export', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { type } = req.query;
    
    let data;
    switch (type) {
      case 'users':
        data = await User.find().select('-password');
        break;
      case 'orders':
        data = await Order.find().populate('user', 'firstName lastName email');
        break;
      default:
        return res.status(400).json({ message: 'Invalid export type' });
    }

    res.json({ data, exportedAt: new Date() });
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ message: 'Failed to export data' });
  }
});

// Get analytics data
router.get('/analytics', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { period } = req.query; // 'week', 'month', 'year'
    
    let startDate;
    switch (period) {
      case 'week':
        startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        break;
      case 'year':
        startDate = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    }

    // Orders by status
    const ordersByStatus = await Order.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // Orders by template
    const ordersByTemplate = await Order.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      { $group: { _id: '$selectedTemplate', count: { $sum: 1 } } }
    ]);

    // Revenue over time
    const revenueOverTime = await Order.aggregate([
      { $match: { createdAt: { $gte: startDate }, status: { $in: ['paid', 'completed'] } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          revenue: { $sum: '$amount' },
          orders: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
    ]);

    res.json({
      ordersByStatus,
      ordersByTemplate,
      revenueOverTime,
      period
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ message: 'Failed to fetch analytics' });
  }
});

module.exports = router;