const express = require('express');
const router = express.Router();
const { loginUser, changePassword } = require('../controllers/authController');
const { auth } = require('../middleware/auth');

router.post('/login', loginUser);
router.post('/change-password', auth, changePassword);

module.exports = router;
