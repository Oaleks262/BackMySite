// 📁 controllers/orderController.js
const User = require('../models/User');
const Order = require('../models/Order');
const sendEmail = require('../utils/sendEmail');
const generatePassword = require('../utils/generatePassword');
const bcrypt = require('bcryptjs');
const { generatePDF } = require('../utils/generatePDF');
const path = require('path');
const fs = require('fs');

const createOrder = async (req, res) => {
  const { firstName, lastName, email, phone, tariffType } = req.body;

  // Input validation
  if (!firstName || !lastName || !email || !phone) {
    return res.status(400).json({ error: 'Всі поля є обов\'язковими' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Неправильний формат email' });
  }

  if (firstName.length < 2 || lastName.length < 2) {
    return res.status(400).json({ error: 'Ім\'я та прізвище мають бути довше 2 символів' });
  }

  if (phone.length < 10) {
    return res.status(400).json({ error: 'Телефон має бути довше 10 символів' });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Користувач вже існує' });

    const rawPassword = generatePassword(8);
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const newUser = await User.create({ firstName, lastName, email, phone, password: hashedPassword });
    const newOrder = await Order.create({ user: newUser._id, tariffType });
    
    console.log('New user created:', newUser.email, 'with password:', rawPassword);
    console.log('New order created:', newOrder._id);

    try {
      // Send email to customer
      await sendEmail(email, 'Ваші дані для входу', `
        <h2>Дякуємо за замовлення!</h2>
        <p><strong>Ваш логін:</strong> ${email}</p>
        <p><strong>Ваш пароль:</strong> ${rawPassword}</p>
        <p>Увійдіть у свій кабінет, щоб завершити оформлення сайту.</p>
      `);
      console.log('Customer email sent successfully for:', email);
    } catch (emailError) {
      console.error('Customer email sending failed:', emailError);
    }

    try {
      // Send notification to admin
      await sendEmail(process.env.SMTP_EMAIL, 'Нове замовлення на сайті', `
        <h2>Нове замовлення!</h2>
        <p><strong>Клієнт:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        <p><strong>ID замовлення:</strong> ${newOrder._id}</p>
        <p><strong>Час створення:</strong> ${new Date().toLocaleString('uk-UA')}</p>
        <hr>
        <p>Увійдіть в адмін панель для перегляду деталей замовлення.</p>
      `);
      console.log('Admin notification sent successfully');
    } catch (emailError) {
      console.error('Admin notification sending failed:', emailError);
    }

    res.status(201).json({ 
      message: 'Замовлення створено. Перевірте пошту.',
      orderId: newOrder._id,
      userId: newUser._id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка при створенні замовлення.' });
  }
};

const updateTemplate = async (req, res) => {
  const { template, blocks } = req.body;
  const userId = req.user.userId;

  console.log('Update template request:', { userId, template, blocks: Object.keys(blocks || {}) });

  try {
    let order = await Order.findOne({ user: userId });
    
    if (!order) {
      // Create new order if doesn't exist
      order = await Order.create({ 
        user: userId,
        selectedTemplate: template,
        blocks: blocks,
        status: 'draft'
      });
      console.log('Created new order:', order._id);
    } else {
      // Update existing order
      order.selectedTemplate = template;
      order.blocks = blocks;
      order.status = 'draft';
      await order.save();
      console.log('Updated existing order:', order._id);
    }

    // Send notification to admin about template update
    try {
      const user = await User.findById(userId);
      await sendEmail(process.env.SMTP_EMAIL, 'Замовлення оновлено - готове до обробки', `
        <h2>Замовлення оновлено!</h2>
        <p><strong>Клієнт:</strong> ${user.firstName} ${user.lastName}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Телефон:</strong> ${user.phone}</p>
        <p><strong>ID замовлення:</strong> ${order._id}</p>
        <p><strong>Обраний шаблон:</strong> ${template}</p>
        <p><strong>Час оновлення:</strong> ${new Date().toLocaleString('uk-UA')}</p>
        <hr>
        <p>Замовлення готове до обробки. Увійдіть в адмін панель для підтвердження.</p>
      `);
      console.log('Admin template update notification sent');
    } catch (emailError) {
      console.error('Admin template update notification failed:', emailError);
    }

    res.status(200).json({ message: 'Шаблон оновлено', order });
  } catch (error) {
    console.error('Update template error:', error);
    res.status(500).json({ error: 'Помилка оновлення шаблону' });
  }
};

const getMyOrder = async (req, res) => {
  const userId = req.user.userId;

  try {
    const order = await Order.findOne({ user: userId }).populate('user', 'firstName lastName email phone');
    
    if (!order) {
      return res.status(404).json({ error: 'Замовлення не знайдено' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка при отриманні замовлення' });
  }
};

const confirmOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId).populate('user');
    if (!order) return res.status(404).json({ error: 'Замовлення не знайдено' });

    const pdfPath = await generatePDF(order);
    const pdfUrl = `/pdfs/${path.basename(pdfPath)}`;

    order.confirmed = true;
    order.pdfUrl = pdfUrl;
    await order.save();

    await sendEmail(order.user.email, 'Підтвердження замовлення', `
      <p>Ваш договір сформовано. Завантажити можна за посиланням:</p>
      <a href="http://growth-tech.com.ua/${pdfUrl}" target="_blank">Завантажити PDF</a>
    `);

    res.status(200).json({ message: 'Замовлення підтверджено' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка підтвердження замовлення' });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'firstName lastName email phone').sort({ createdAt: -1 });
    console.log(`Retrieved ${orders.length} orders for admin`);
    res.status(200).json(orders);
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({ error: 'Помилка при отриманні замовлень' });
  }
};

module.exports = { createOrder, updateTemplate, getMyOrder, confirmOrder, getAllOrders };