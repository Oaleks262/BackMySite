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

  console.log('New contact form submission from:', email);

  try {
    // Send email to company
    await sendEmail(
      process.env.SMTP_EMAIL || 'growthtech.contact@gmail.com',
      'Нова заявка з сайту',
      `
      <h2>Нова заявка з контактної форми</h2>
      <p><strong>Ім'я:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Час:</strong> ${new Date().toLocaleString('uk-UA')}</p>
      <p><strong>Повідомлення:</strong></p>
      <div style="background: #f5f5f5; padding: 15px; border-left: 4px solid #26B26A; margin: 10px 0;">
        ${message}
      </div>
      <hr>
      <p><small>Надіслано через контактну форму сайту</small></p>
      `
    );
    console.log('Company notification sent for contact form from:', email);

    // Send confirmation email to user
    await sendEmail(
      email,
      'Підтвердження отримання повідомлення - Growth Tech',
      `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #26B26A;">Дякуємо за звернення!</h2>
        <p>Вітаю, <strong>${name}</strong>!</p>
        <p>Ми отримали ваше повідомлення і зв'яжемося з вами найближчим часом.</p>
        
        <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3>Ваше повідомлення:</h3>
          <p style="font-style: italic;">${message}</p>
        </div>
        
        <p>Час отримання: ${new Date().toLocaleString('uk-UA')}</p>
        
        <hr style="margin: 30px 0;">
        <p style="color: #666;">
          З повагою,<br>
          <strong>Команда Growth Tech</strong><br>
          Email: ${process.env.SMTP_EMAIL}<br>
          Сайт: growth-tech.com.ua
        </p>
      </div>
      `
    );
    console.log('Confirmation email sent to user:', email);

    res.status(200).json({ message: 'Повідомлення успішно надіслано' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Помилка при відправці повідомлення' });
  }
};

router.post('/', sendContactMessage);

module.exports = router;