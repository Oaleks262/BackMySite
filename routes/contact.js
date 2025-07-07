const express = require('express');
const router = express.Router();
const sendEmail = require('../utils/sendEmail');

const sendContactMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Всі поля є обов\'язковими' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Неправильний формат email' });
  }

  if (message.length < 10) {
    return res.status(400).json({ error: 'Повідомлення має бути довше 10 символів' });
  }

  try {
    // Send email to company
    await sendEmail(
      process.env.COMPANY_EMAIL || 'growthtech.contact@gmail.com',
      'Нова заявка з сайту',
      `
      <h2>Нова заявка з контактної форми</h2>
      <p><strong>Ім'я:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Повідомлення:</strong></p>
      <p>${message}</p>
      `
    );

    // Send confirmation email to user
    await sendEmail(
      email,
      'Підтвердження отримання повідомлення',
      `
      <h2>Дякуємо за звернення!</h2>
      <p>Вітаю, ${name}!</p>
      <p>Ми отримали ваше повідомлення і зв'яжемося з вами найближчим часом.</p>
      <p>Ваше повідомлення:</p>
      <p><em>${message}</em></p>
      <br>
      <p>З повагою,<br>Команда Growth Tech</p>
      `
    );

    res.status(200).json({ message: 'Повідомлення успішно надіслано' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Помилка при відправці повідомлення' });
  }
};

router.post('/', sendContactMessage);

module.exports = router;