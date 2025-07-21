const express = require('express');
const router = express.Router();
const {
  createOrder,
  updateTemplate,
  getMyOrder,
  confirmOrder,
  getAllOrders,
  updateOrderStatus,
  setPriceAndSendPayment
} = require('../controllers/orderController');
const { auth, isAdmin } = require('../middleware/auth');

router.post('/create', createOrder);
router.post('/update-template', auth, updateTemplate);
router.get('/my-order', auth, getMyOrder);
router.put('/template/:orderId', updateTemplate);
router.put('/confirm/:orderId', auth, isAdmin, confirmOrder);
router.patch('/confirm/:orderId', auth, isAdmin, confirmOrder);
router.post('/update/:orderId', auth, isAdmin, confirmOrder);
// Тимчасовий роут для тестування без аутентифікації
router.post('/confirm-test/:orderId', confirmOrder);
router.get('/all', auth, isAdmin, getAllOrders);
router.put('/:orderId/status', auth, isAdmin, updateOrderStatus);
router.post('/:orderId/set-price', auth, isAdmin, setPriceAndSendPayment);

module.exports = router;
