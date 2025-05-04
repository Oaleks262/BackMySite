const express = require('express');
const router = express.Router();
const {
  createOrder,
  updateTemplate,
  confirmOrder,
  getAllOrders
} = require('../controllers/orderController');
const { auth, isAdmin } = require('../middleware/auth');

router.post('/create', createOrder);
router.put('/template/:orderId', updateTemplate);
router.put('/confirm/:orderId', confirmOrder);
router.get('/all', auth, isAdmin, getAllOrders);

module.exports = router;
