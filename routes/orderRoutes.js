const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders } = require('../controllers/orderController');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

router.post('/', auth, createOrder);
router.get('/', auth, role('admin'), getAllOrders);

module.exports = router;