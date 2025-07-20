const express = require('express');
const router = express.Router();
const { getSettings, updateSettings } = require('../controllers/settingsController');
const { auth, isAdmin } = require('../middleware/auth');

// Отримати налаштування (тільки для адміністраторів)
router.get('/', auth, isAdmin, getSettings);

// Оновити налаштування (тільки для адміністраторів)
router.put('/', auth, isAdmin, updateSettings);

module.exports = router;