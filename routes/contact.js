const express = require('express');
const router = express.Router();
const sendEmail = require('../utils/sendEmail');
const { createResponsiveEmailTemplate, createEmailSection, createInfoBlock } = require('../utils/emailTemplate');

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
    const companyEmailContent = createEmailSection(`
      <h3 class="email-subtitle" style="color: #2c3e50; margin-top: 0; font-size: 16px;">📋 Деталі заявки:</h3>
      <p class="email-text" style="margin: 10px 0; font-size: 14px;"><strong>Ім'я:</strong> ${name}</p>
      <p class="email-text" style="margin: 10px 0; font-size: 14px;"><strong>Email:</strong> ${email}</p>
      <p class="email-text" style="margin: 10px 0; font-size: 14px;"><strong>Час:</strong> ${new Date().toLocaleString('uk-UA')}</p>
    `) + createInfoBlock('💬 Повідомлення клієнта:', `
      <div style="font-style: italic; line-height: 1.6; word-break: break-word;">
        ${message}
      </div>
    `, 'info') + createEmailSection(`
      <p style="font-size: 12px; color: #666; margin: 0; text-align: center;">
        Надіслано через контактну форму сайту
      </p>
    `, '#f8f9fa');

    const companyEmailTemplate = createResponsiveEmailTemplate(
      '📧 Нова заявка з сайту',
      companyEmailContent,
      { footerText: 'Адмін-панель Growth Tech' }
    );

    await sendEmail(
      process.env.SMTP_EMAIL || 'growthtech.contact@gmail.com',
      'Нова заявка з сайту',
      companyEmailTemplate
    );
    console.log('Company notification sent for contact form from:', email);

    // Send confirmation email to user
    const userEmailContent = createEmailSection(`
      <h2 class="email-subtitle" style="color: #26B26A; margin-top: 0; font-size: 18px;">Дякуємо за звернення!</h2>
      <p class="email-text" style="margin: 10px 0; font-size: 14px; line-height: 1.6;">
        Вітаю, <strong>${name}</strong>!
      </p>
      <p class="email-text" style="margin: 10px 0; font-size: 14px; line-height: 1.6;">
        Ми отримали ваше повідомлення і зв'яжемося з вами найближчим часом.
      </p>
    `, '#e8f5e8') + createInfoBlock('📝 Ваше повідомлення:', `
      <div style="font-style: italic; line-height: 1.6; word-break: break-word;">
        ${message}
      </div>
    `, 'info') + createEmailSection(`
      <p class="email-text" style="margin: 0; font-size: 14px; text-align: center;">
        <strong>Час отримання:</strong> ${new Date().toLocaleString('uk-UA')}
      </p>
    `, '#f8f9fa');

    const userEmailTemplate = createResponsiveEmailTemplate(
      '✅ Підтвердження отримання повідомлення',
      userEmailContent,
      { 
        footerText: 'З повагою,',
        footerEmail: process.env.SMTP_EMAIL
      }
    );

    await sendEmail(
      email,
      'Підтвердження отримання повідомлення - Growth Tech',
      userEmailTemplate
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