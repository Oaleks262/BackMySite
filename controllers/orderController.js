// 📁 controllers/orderController.js
const User = require('../models/User');
const Order = require('../models/Order');
const sendEmail = require('../utils/sendEmail');
const generatePassword = require('../utils/generatePassword');
const bcrypt = require('bcryptjs');
const { generatePDF } = require('../utils/generatePDF');
const path = require('path');
const fs = require('fs');
const paymentConfig = require('../config/payment');

// Функція для генерації email з реквізитами оплати
const generatePaymentEmailTemplate = (order, user) => {
  const { pricing, bankDetails, companyInfo, emailSettings } = paymentConfig;
  
  const basePrice = pricing.tariffs[order.tariffType] || pricing.tariffs.single;
  let totalPrice = basePrice;
  
  // Розрахунок додаткових функцій
  const additionalFeatures = order.blocks?.additionalFeatures || {};
  
  let additionalCost = 0;
  Object.keys(additionalFeatures).forEach(feature => {
    if (additionalFeatures[feature] && pricing.additionalFeatures[feature]) {
      additionalCost += pricing.additionalFeatures[feature];
    }
  });
  
  totalPrice += additionalCost;
  
  const templateNames = {
    'single': 'Односторінковий сайт',
    'landing': 'Лендінг',
    'blog': 'Блог з CMS'
  };
  
  const featureNames = {
    'ecommerce': 'Е-комерс функціонал',
    'booking': 'Система бронювання',
    'analytics': 'Аналітика та метрики',
    'seo': 'SEO оптимізація'
  };
  
  let additionalFeaturesHtml = '';
  if (additionalCost > 0) {
    additionalFeaturesHtml = '<h3>Додаткові функції:</h3><ul>';
    Object.keys(additionalFeatures).forEach(feature => {
      if (additionalFeatures[feature] && pricing.additionalFeatures[feature]) {
        additionalFeaturesHtml += `<li>${featureNames[feature]} - ${pricing.additionalFeatures[feature]} ${bankDetails.currency}</li>`;
      }
    });
    additionalFeaturesHtml += '</ul>';
  }
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
      <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h1 style="color: #2c3e50; text-align: center; margin-bottom: 30px;">💳 Реквізити для оплати</h1>
        
        <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #27ae60; margin-top: 0;">Вітаємо, ${user.firstName} ${user.lastName}!</h2>
          <p style="margin: 10px 0; line-height: 1.6;">Дякуємо за заповнення всіх даних для вашого сайту. Тепер можете оплатити замовлення за реквізитами нижче.</p>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #2c3e50; margin-top: 0;">📋 Деталі замовлення:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px 0; font-weight: bold;">Тип сайту:</td>
              <td style="padding: 8px 0;">${templateNames[order.tariffType] || order.tariffType}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px 0; font-weight: bold;">Базова вартість:</td>
              <td style="padding: 8px 0;">${basePrice} ${bankDetails.currency}</td>
            </tr>
            ${additionalCost > 0 ? `
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px 0; font-weight: bold;">Додаткові функції:</td>
              <td style="padding: 8px 0;">${additionalCost} ${bankDetails.currency}</td>
            </tr>` : ''}
            <tr style="border-bottom: 2px solid #2c3e50;">
              <td style="padding: 8px 0; font-weight: bold; font-size: 18px;">Загальна сума:</td>
              <td style="padding: 8px 0; font-weight: bold; font-size: 18px; color: #e74c3c;">${totalPrice} ${bankDetails.currency}</td>
            </tr>
          </table>
          ${additionalFeaturesHtml}
        </div>
        
        <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #856404; margin-top: 0;">💰 Реквізити для оплати:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 12px 0; font-weight: bold; width: 40%;">Одержувач:</td>
              <td style="padding: 12px 0; font-family: monospace;">${bankDetails.recipient}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 12px 0; font-weight: bold;">IBAN:</td>
              <td style="padding: 12px 0; font-family: monospace; background-color: #fff; padding: 8px; border-radius: 4px;">${bankDetails.iban}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 12px 0; font-weight: bold;">Банк:</td>
              <td style="padding: 12px 0; font-family: monospace;">${bankDetails.bank}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 12px 0; font-weight: bold;">Призначення платежу:</td>
              <td style="padding: 12px 0; font-family: monospace;">Оплата за розробку сайту. Замовлення #${order._id.toString().slice(-6)}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; font-weight: bold;">Сума:</td>
              <td style="padding: 12px 0; font-family: monospace; font-size: 18px; color: #e74c3c; font-weight: bold;">${totalPrice} ${bankDetails.currency}</td>
            </tr>
          </table>
        </div>
        
        <div style="background-color: #d1ecf1; border: 1px solid #bee5eb; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <h4 style="color: #0c5460; margin-top: 0;">ℹ️ Важлива інформація:</h4>
          <ul style="margin: 10px 0; padding-left: 20px; line-height: 1.6;">
            <li>Після оплати розробка сайту розпочнеться автоматично</li>
            <li>Термін виконання: ${emailSettings.deliveryDays}</li>
            <li>Ви отримаете сповіщення про зміну статусу замовлення</li>
            <li>При виникненні питань звертайтесь за цим email або телефоном</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
          <p style="color: #7f8c8d; margin: 5px 0;">З повагою,</p>
          <p style="color: #2c3e50; font-weight: bold; margin: 5px 0;">Команда ${companyInfo.name}</p>
          <p style="color: #7f8c8d; font-size: 14px; margin: 5px 0;">📧 ${companyInfo.email}</p>
          <p style="color: #7f8c8d; font-size: 14px; margin: 5px 0;">📞 ${companyInfo.phone}</p>
        </div>
      </div>
    </div>
  `;
};

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
    const user = await User.findById(userId);
    
    if (!order) {
      // Create new order if doesn't exist
      order = await Order.create({ 
        user: userId,
        selectedTemplate: template,
        blocks: blocks,
        status: 'pending_payment'
      });
      console.log('Created new order:', order._id);
    } else {
      // Update existing order
      order.selectedTemplate = template;
      order.blocks = blocks;
      order.status = 'pending_payment';
      await order.save();
      console.log('Updated existing order:', order._id);
    }

    // Відправляємо email з реквізитами оплати клієнту
    try {
      const paymentEmailContent = generatePaymentEmailTemplate(order, user);
      await sendEmail(user.email, 'Реквізити для оплати замовлення', paymentEmailContent);
      console.log('Payment details email sent to client:', user.email);
    } catch (emailError) {
      console.error('Payment email sending failed:', emailError);
    }

    // Send notification to admin about template update
    try {
      await sendEmail(process.env.SMTP_EMAIL, 'Замовлення готове до оплати', `
        <h2>Клієнт заповнив всі дані!</h2>
        <p><strong>Клієнт:</strong> ${user.firstName} ${user.lastName}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Телефон:</strong> ${user.phone}</p>
        <p><strong>ID замовлення:</strong> ${order._id}</p>
        <p><strong>Обраний шаблон:</strong> ${template}</p>
        <p><strong>Статус:</strong> Очікує оплати</p>
        <p><strong>Час оновлення:</strong> ${new Date().toLocaleString('uk-UA')}</p>
        <hr>
        <p>Клієнту відправлено реквізити для оплати. Увійдіть в адмін панель для перегляду деталей.</p>
      `);
      console.log('Admin notification sent about payment pending');
    } catch (emailError) {
      console.error('Admin notification sending failed:', emailError);
    }

    res.status(200).json({ 
      message: 'Дані збережено. Перевірте пошту для отримання реквізитів оплати.', 
      order,
      status: 'pending_payment'
    });
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
  const { amount } = req.body; // Отримуємо ціну з тіла запиту
  
  console.log('confirmOrder викликано для orderId:', orderId);
  console.log('Custom amount:', amount);
  console.log('User від auth middleware:', req.user || 'No user (test route)');

  try {
    const order = await Order.findById(orderId).populate('user');
    if (!order) return res.status(404).json({ error: 'Замовлення не знайдено' });

    // Встановлюємо кастомну ціну якщо вона передана
    if (amount && amount > 0) {
      order.amount = amount;
    }

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
    console.error('Детальна помилка в confirmOrder:', error);
    console.error('Stack trace:', error.stack);
    res.status(500).json({ 
      error: 'Помилка підтвердження замовлення', 
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
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

const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  
  console.log('updateOrderStatus викликано для orderId:', orderId, 'новий статус:', status);
  
  const validStatuses = ['draft', 'pending_payment', 'paid', 'in_progress', 'completed', 'cancelled', 'payment_failed'];
  
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Неправильний статус замовлення' });
  }

  try {
    const order = await Order.findById(orderId).populate('user');
    if (!order) return res.status(404).json({ error: 'Замовлення не знайдено' });

    const oldStatus = order.status;
    order.status = status;
    await order.save();

    console.log(`Статус замовлення ${orderId} змінено з ${oldStatus} на ${status}`);

    // Відправляємо email сповіщення клієнту при зміні статусу
    const statusMessages = {
      'draft': 'Ваше замовлення створено і знаходиться в статусі чернетки',
      'in_progress': 'Ваше замовлення прийнято в роботу! Ми почали розробку вашого сайту',
      'completed': 'Ваше замовлення завершено! Ваш сайт готовий',
      'cancelled': 'На жаль, ваше замовлення було скасовано',
      'pending_payment': 'Ваше замовлення очікує оплати',
      'paid': 'Дякуємо за оплату! Ваше замовлення буде виконано найближчим часом',
      'payment_failed': 'Помилка оплати. Будь ласка, спробуйте ще раз'
    };

    try {
      await sendEmail(order.user.email, 'Оновлення статусу замовлення', `
        <h2>Статус вашого замовлення змінено</h2>
        <p><strong>ID замовлення:</strong> ${order._id}</p>
        <p><strong>Новий статус:</strong> ${status}</p>
        <p>${statusMessages[status]}</p>
        <hr>
        <p>Увійдіть у свій кабінет для перегляду деталей.</p>
      `);
      console.log('Status update notification sent to client');
    } catch (emailError) {
      console.error('Status update notification failed:', emailError);
    }

    res.status(200).json({ 
      message: 'Статус замовлення оновлено',
      order: {
        ...order.toObject(),
        oldStatus,
        newStatus: status
      }
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ error: 'Помилка при оновленні статусу замовлення' });
  }
};

module.exports = { createOrder, updateTemplate, getMyOrder, confirmOrder, getAllOrders, updateOrderStatus };