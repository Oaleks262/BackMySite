// 📁 routes/signature.js
const express = require('express');
const Order = require('../models/Order');
const { auth } = require('../middleware/auth');
const { generatePDF } = require('../utils/generatePDF');
const path = require('path');

const router = express.Router();

// Підписати договір клієнтом
router.post('/sign/:orderId', auth, async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.userId;
    const clientIp = req.ip || req.connection.remoteAddress;

    const order = await Order.findById(orderId).populate('user');
    
    if (!order) {
      return res.status(404).json({ error: 'Замовлення не знайдено' });
    }

    if (order.user._id.toString() !== userId) {
      return res.status(403).json({ error: 'Доступ заборонено' });
    }

    if (order.clientSignature) {
      return res.status(400).json({ error: 'Договір уже підписано клієнтом' });
    }

    // Додаємо підпис клієнта
    order.clientSignature = {
      name: `${order.user.firstName} ${order.user.lastName}`,
      date: new Date(),
      ip: clientIp
    };

    await order.save();

    // Регенеруємо PDF з підписами
    if (order.executorSignature) {
      const pdfPath = await generatePDF(order);
      const pdfUrl = `/pdfs/${path.basename(pdfPath)}`;
      order.pdfUrl = pdfUrl;
      await order.save();
    }

    res.status(200).json({ 
      message: 'Договір підписано клієнтом',
      signed: true,
      signatureDate: order.clientSignature.date
    });
  } catch (error) {
    console.error('Помилка підписання договору клієнтом:', error);
    res.status(500).json({ error: 'Помилка підписання договору' });
  }
});

// Підписати договір виконавцем (адмін)
router.post('/sign-executor/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { adminKey } = req.body;
    const executorIp = req.ip || req.connection.remoteAddress;

    // Простий ключ авторизації для виконавця
    if (adminKey !== process.env.ADMIN_SIGNATURE_KEY) {
      return res.status(403).json({ error: 'Неправильний ключ адміністратора' });
    }

    const order = await Order.findById(orderId).populate('user');
    
    if (!order) {
      return res.status(404).json({ error: 'Замовлення не знайдено' });
    }

    if (order.executorSignature) {
      return res.status(400).json({ error: 'Договір уже підписано виконавцем' });
    }

    // Додаємо підпис виконавця
    order.executorSignature = {
      name: 'ФОП Звірич Олександр Олександрович',
      date: new Date(),
      ip: executorIp
    };

    await order.save();

    // Регенеруємо PDF з підписами
    if (order.clientSignature) {
      const pdfPath = await generatePDF(order);
      const pdfUrl = `/pdfs/${path.basename(pdfPath)}`;
      order.pdfUrl = pdfUrl;
      await order.save();
    }

    res.status(200).json({ 
      message: 'Договір підписано виконавцем',
      signed: true,
      signatureDate: order.executorSignature.date
    });
  } catch (error) {
    console.error('Помилка підписання договору виконавцем:', error);
    res.status(500).json({ error: 'Помилка підписання договору' });
  }
});

// Отримати статус підписів
router.get('/status/:orderId', auth, async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.userId;

    const order = await Order.findById(orderId).populate('user');
    
    if (!order) {
      return res.status(404).json({ error: 'Замовлення не знайдено' });
    }

    if (order.user._id.toString() !== userId) {
      return res.status(403).json({ error: 'Доступ заборонено' });
    }

    res.status(200).json({
      clientSigned: !!order.clientSignature,
      executorSigned: !!order.executorSignature,
      clientSignature: order.clientSignature,
      executorSignature: order.executorSignature,
      fullyExecuted: !!(order.clientSignature && order.executorSignature)
    });
  } catch (error) {
    console.error('Помилка отримання статусу підписів:', error);
    res.status(500).json({ error: 'Помилка отримання статусу' });
  }
});

// Створити нову версію договору
router.post('/new-version/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { adminKey } = req.body;

    if (adminKey !== process.env.ADMIN_SIGNATURE_KEY) {
      return res.status(403).json({ error: 'Неправильний ключ адміністратора' });
    }

    const order = await Order.findById(orderId).populate('user');
    
    if (!order) {
      return res.status(404).json({ error: 'Замовлення не знайдено' });
    }

    // Збільшуємо версію договору та скидаємо підписи
    order.contractVersion = (order.contractVersion || 1) + 1;
    order.executorSignature = undefined;
    order.clientSignature = undefined;

    await order.save();

    // Генеруємо новий PDF
    const pdfPath = await generatePDF(order);
    const pdfUrl = `/pdfs/${path.basename(pdfPath)}`;
    order.pdfUrl = pdfUrl;
    await order.save();

    res.status(200).json({ 
      message: 'Створено нову версію договору',
      version: order.contractVersion,
      pdfUrl: pdfUrl
    });
  } catch (error) {
    console.error('Помилка створення нової версії:', error);
    res.status(500).json({ error: 'Помилка створення нової версії' });
  }
});

module.exports = router;