const express = require('express');
const router = express.Router();
const {
  submitReview,
  getReviewForm,
  getPublicReviews,
  getAllReviews,
  updateReviewVisibility,
  deleteReview
} = require('../controllers/reviewController');
const { auth, isAdmin } = require('../middleware/auth');

// Public routes
router.get('/public', getPublicReviews);
router.get('/form/:orderId', getReviewForm);
router.post('/submit/:orderId', submitReview);

// Admin routes
router.get('/admin/all', auth, isAdmin, getAllReviews);
router.put('/admin/:reviewId/visibility', auth, isAdmin, updateReviewVisibility);
router.delete('/admin/:reviewId', auth, isAdmin, deleteReview);

module.exports = router;