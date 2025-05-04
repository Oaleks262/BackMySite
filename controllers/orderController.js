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
  const { firstName, lastName, email, phone } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Користувач вже існує' });

    const rawPassword = generatePassword(8);
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const newUser = await User.create({ firstName, lastName, email, phone, password: hashedPassword });
    const newOrder = await Order.create({ user: newUser._id });

    await sendEmail(email, 'Ваші дані для входу', `
      <h2>Дякуємо за замовлення!</h2>
      <p><strong>Ваш логін:</strong> ${email}</p>
      <p><strong>Ваш пароль:</strong> ${rawPassword}</p>
      <p>Увійдіть у свій кабінет, щоб завершити оформлення сайту.</p>
    `);

    res.status(201).json({ message: 'Замовлення створено. Перевірте пошту.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка при створенні замовлення.' });
  }
};

const updateTemplate = async (req, res) => {
  const { orderId } = req.params;
  const { template, blocks } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ error: 'Замовлення не знайдено' });

    order.selectedTemplate = template;
    if (blocks) {
      order.blocks = blocks;
    }
    await order.save();

    res.status(200).json({ message: 'Шаблон оновлено' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка оновлення шаблону' });
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
    const orders = await Order.find().populate('user', 'firstName lastName email phone');
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка при отриманні замовлень' });
  }
};

module.exports = { createOrder, updateTemplate, confirmOrder, getAllOrders };