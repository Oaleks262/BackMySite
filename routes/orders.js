const express = require('express');
const router = express.Router();
const {
  createOrder,
  updateTemplate,
  getMyOrder,
  confirmOrder,
  getAllOrders
} = require('../controllers/orderController');
const { auth, isAdmin } = require('../middleware/auth');

router.post('/create', createOrder);
router.post('/update-template', auth, updateTemplate);
router.get('/my-order', auth, getMyOrder);
router.put('/template/:orderId', updateTemplate);
router.put('/confirm/:orderId', confirmOrder);
router.get('/all', auth, isAdmin, getAllOrders);

module.exports = router;
