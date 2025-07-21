const Review = require('../models/Review');
const Order = require('../models/Order');
const User = require('../models/User');

// Submit a review
const submitReview = async (req, res) => {
  const { orderId } = req.params;
  const { rating, comment } = req.body;

  try {
    // Find the order and populate user data
    const order = await Order.findById(orderId).populate('user');
    if (!order) {
      return res.status(404).json({ error: 'Замовлення не знайдено' });
    }

    // Check if order is completed
    if (order.status !== 'completed') {
      return res.status(400).json({ error: 'Відгук можна залишити тільки для завершених замовлень' });
    }

    // Check if review already exists
    const existingReview = await Review.findOne({ order: orderId });
    if (existingReview) {
      return res.status(400).json({ error: 'Відгук для цього замовлення вже існує' });
    }

    // Validate input
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Оцінка має бути від 1 до 5' });
    }

    if (!comment || comment.trim().length < 10) {
      return res.status(400).json({ error: 'Коментар має містити мінімум 10 символів' });
    }

    if (comment.length > 1000) {
      return res.status(400).json({ error: 'Коментар не може перевищувати 1000 символів' });
    }

    // Get project type translation
    const projectTypes = {
      'single': 'Односторінковий сайт',
      'landing': 'Лендінг',
      'blog': 'Блог з CMS'
    };

    // Create review
    const review = new Review({
      order: orderId,
      user: order.user._id,
      rating: parseInt(rating),
      comment: comment.trim(),
      clientName: `${order.user.firstName} ${order.user.lastName}`,
      projectType: projectTypes[order.tariffType] || order.tariffType
    });

    await review.save();

    res.status(201).json({ 
      message: 'Дякуємо за ваш відгук! Він буде опублікований після модерації.',
      review: {
        rating: review.rating,
        comment: review.comment,
        clientName: review.clientName,
        projectType: review.projectType
      }
    });

  } catch (error) {
    console.error('Submit review error:', error);
    res.status(500).json({ error: 'Помилка при збереженні відгуку' });
  }
};

// Get review form data
const getReviewForm = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId).populate('user');
    if (!order) {
      return res.status(404).json({ error: 'Замовлення не знайдено' });
    }

    if (order.status !== 'completed') {
      return res.status(400).json({ error: 'Відгук можна залишити тільки для завершених замовлень' });
    }

    // Check if review already exists
    const existingReview = await Review.findOne({ order: orderId });
    if (existingReview) {
      return res.status(400).json({ error: 'Відгук для цього замовлення вже існує' });
    }

    const projectTypes = {
      'single': 'Односторінковий сайт',
      'landing': 'Лендінг',
      'blog': 'Блог з CMS'
    };

    res.json({
      orderId: order._id,
      clientName: `${order.user.firstName} ${order.user.lastName}`,
      projectType: projectTypes[order.tariffType] || order.tariffType,
      canSubmitReview: true
    });

  } catch (error) {
    console.error('Get review form error:', error);
    res.status(500).json({ error: 'Помилка при завантаженні форми відгуку' });
  }
};

// Get all reviews for homepage
const getPublicReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ 
      isVisible: true, 
      isApproved: true 
    })
    .sort({ createdAt: -1 })
    .limit(10)
    .select('rating comment clientName projectType createdAt');

    res.json(reviews);
  } catch (error) {
    console.error('Get public reviews error:', error);
    res.status(500).json({ error: 'Помилка при завантаженні відгуків' });
  }
};

// Admin: Get all reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('user', 'firstName lastName email')
      .populate('order', 'tariffType status')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    console.error('Get all reviews error:', error);
    res.status(500).json({ error: 'Помилка при завантаженні відгуків' });
  }
};

// Admin: Update review visibility
const updateReviewVisibility = async (req, res) => {
  const { reviewId } = req.params;
  const { isVisible, isApproved } = req.body;

  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ error: 'Відгук не знайдено' });
    }

    if (typeof isVisible === 'boolean') {
      review.isVisible = isVisible;
    }
    
    if (typeof isApproved === 'boolean') {
      review.isApproved = isApproved;
    }

    await review.save();

    res.json({ 
      message: 'Статус відгуку оновлено',
      review: {
        _id: review._id,
        isVisible: review.isVisible,
        isApproved: review.isApproved
      }
    });

  } catch (error) {
    console.error('Update review visibility error:', error);
    res.status(500).json({ error: 'Помилка при оновленні статусу відгуку' });
  }
};

// Admin: Delete review
const deleteReview = async (req, res) => {
  const { reviewId } = req.params;

  try {
    const review = await Review.findByIdAndDelete(reviewId);
    if (!review) {
      return res.status(404).json({ error: 'Відгук не знайдено' });
    }

    res.json({ message: 'Відгук видалено' });

  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({ error: 'Помилка при видаленні відгуку' });
  }
};

module.exports = {
  submitReview,
  getReviewForm,
  getPublicReviews,
  getAllReviews,
  updateReviewVisibility,
  deleteReview
};