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
const { createResponsiveEmailTemplate, createEmailSection, createEmailTable, createEmailButton, createInfoBlock } = require('../utils/emailTemplate');

// Функція для генерації email з реквізитами оплати (тільки з встановленою ціною)
const generatePaymentEmailTemplate = (order, user) => {
  const { bankDetails, companyInfo, emailSettings } = paymentConfig;
  
  // Використовуємо тільки встановлену адміном ціну
  const totalPrice = order.amount;
  
  if (!totalPrice || totalPrice <= 0) {
    throw new Error('Ціна не встановлена адміністратором');
  }
  
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
  const additionalFeatures = order.blocks?.additionalFeatures || {};
  const selectedFeatures = Object.keys(additionalFeatures).filter(feature => additionalFeatures[feature]);
  
  if (selectedFeatures.length > 0) {
    additionalFeaturesHtml = '<h4 class="email-subtitle" style="color: #2c3e50; margin-top: 15px; font-size: 14px;">Додаткові функції:</h4><ul style="margin: 10px 0; padding-left: 20px; line-height: 1.6;">';
    selectedFeatures.forEach(feature => {
      if (featureNames[feature]) {
        additionalFeaturesHtml += `<li style="margin-bottom: 5px; font-size: 14px;">${featureNames[feature]}</li>`;
      }
    });
    additionalFeaturesHtml += '</ul>';
  }

  // Створюємо вітальну секцію
  const greetingSection = createEmailSection(`
    <h2 class="email-subtitle" style="color: #27ae60; margin-top: 0; font-size: 18px;">Вітаємо, ${user.firstName} ${user.lastName}!</h2>
    <p class="email-text" style="margin: 10px 0; line-height: 1.6; font-size: 14px;">
      Дякуємо за заповнення всіх даних для вашого сайту. Тепер можете оплатити замовлення за реквізитами нижче.
    </p>
  `, '#e8f5e8');

  // Створюємо секцію з деталями замовлення
  const orderDetailsTable = createEmailTable([
    ['Тип сайту:', templateNames[order.tariffType] || order.tariffType],
    [`<strong style="font-size: 16px;">Загальна сума:</strong>`, `<span class="total-price" style="font-weight: bold; font-size: 18px; color: #e74c3c;">${totalPrice} ${bankDetails.currency}</span>`]
  ]);

  const orderDetailsSection = createEmailSection(`
    <h3 class="email-subtitle" style="color: #2c3e50; margin-top: 0; font-size: 16px;">📋 Деталі замовлення:</h3>
    ${orderDetailsTable}
    ${additionalFeaturesHtml}
  `, '#f8f9fa');

  // Створюємо секцію з реквізитами для оплати
  const paymentDetailsTable = createEmailTable([
    ['Одержувач:', `<span class="monospace-text" style="font-family: monospace; font-size: 13px; word-break: break-word;">${bankDetails.recipient}</span>`],
    ['IBAN:', `<span class="monospace-text" style="font-family: monospace; background-color: #fff; padding: 8px; border-radius: 4px; font-size: 13px; word-break: break-all; letter-spacing: 1px; display: inline-block;">${bankDetails.iban}</span>`],
    ['Банк:', `<span class="monospace-text" style="font-family: monospace; font-size: 13px; word-break: break-word;">${bankDetails.bank}</span>`],
    ['Призначення платежу:', `<span class="monospace-text" style="font-family: monospace; font-size: 13px; word-break: break-word; line-height: 1.4;">Оплата за розробку сайту. Замовлення #${order._id.toString().slice(-6)}</span>`],
    ['Сума:', `<span class="total-price monospace-text" style="font-family: monospace; font-size: 16px; color: #e74c3c; font-weight: bold;">${totalPrice} ${bankDetails.currency}</span>`]
  ]);

  const paymentDetailsSection = createEmailSection(`
    <h3 class="email-subtitle" style="color: #856404; margin-top: 0; font-size: 16px;">💰 Реквізити для оплати:</h3>
    ${paymentDetailsTable}
  `, '#fff3cd', '#ffeaa7');

  // Створюємо інформаційний блок
  const infoSection = createInfoBlock('ℹ️ Важлива інформація:', `
    <ul style="margin: 10px 0; padding-left: 20px; line-height: 1.6;">
      <li style="margin-bottom: 5px;">Після оплати розробка сайту розпочнеться автоматично</li>
      <li style="margin-bottom: 5px;">Термін виконання: ${emailSettings.deliveryDays}</li>
      <li style="margin-bottom: 5px;">Ви отримаете сповіщення про зміну статусу замовлення</li>
      <li style="margin-bottom: 5px;">При виникненні питань звертайтесь за цим email або телефоном</li>
    </ul>
  `, 'info');

  // Збираємо всі секції разом
  const emailContent = greetingSection + orderDetailsSection + paymentDetailsSection + infoSection;

  // Створюємо фінальний email template
  return createResponsiveEmailTemplate(
    '💳 Реквізити для оплати',
    emailContent,
    {
      footerText: 'З повагою,',
      footerEmail: companyInfo.email,
      footerWebsite: companyInfo.website.replace('https://', ''),
      companyName: companyInfo.name
    }
  );
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
      const customerEmailContent = createEmailSection(`
        <h2 class="email-subtitle" style="color: #26B26A; margin-top: 0; font-size: 18px;">Дякуємо за замовлення!</h2>
        <p class="email-text" style="margin: 10px 0; font-size: 14px; line-height: 1.6;">
          Ваше замовлення успішно створено. Використовуйте дані нижче для входу в особистий кабінет.
        </p>
      `, '#e8f5e8') + createInfoBlock('🔑 Дані для входу:', `
        <table style="width: 100%; margin: 10px 0;">
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px 0; font-weight: bold; font-size: 14px;">Логін (Email):</td>
            <td style="padding: 8px 0; font-size: 14px; word-break: break-word;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; font-size: 14px;">Пароль:</td>
            <td style="padding: 8px 0; font-family: monospace; font-size: 16px; font-weight: bold; color: #e74c3c;">${rawPassword}</td>
          </tr>
        </table>
      `, 'warning') + createEmailSection(`
        <p class="email-text" style="margin: 0; font-size: 14px; text-align: center;">
          <strong>Увійдіть у свій кабінет, щоб завершити оформлення сайту.</strong>
        </p>
      `, '#f8f9fa');

      const customerEmailTemplate = createResponsiveEmailTemplate(
        '🎉 Ваше замовлення створено',
        customerEmailContent
      );

      await sendEmail(email, 'Ваші дані для входу', customerEmailTemplate);
      console.log('Customer email sent successfully for:', email);
    } catch (emailError) {
      console.error('Customer email sending failed:', emailError);
    }

    try {
      // Send notification to admin
      const adminEmailContent = createEmailSection(`
        <h2 class="email-subtitle" style="color: #e74c3c; margin-top: 0; font-size: 18px;">🆕 Нове замовлення!</h2>
        <p class="email-text" style="margin: 10px 0; font-size: 14px; line-height: 1.6;">
          На сайті створено нове замовлення. Перевірте деталі нижче.
        </p>
      `, '#fdeaea') + createEmailSection(`
        <h3 class="email-subtitle" style="color: #2c3e50; margin-top: 0; font-size: 16px;">👤 Інформація про клієнта:</h3>
        <table style="width: 100%; margin: 10px 0;">
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px 0; font-weight: bold; font-size: 14px;">Клієнт:</td>
            <td style="padding: 8px 0; font-size: 14px;">${firstName} ${lastName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px 0; font-weight: bold; font-size: 14px;">Email:</td>
            <td style="padding: 8px 0; font-size: 14px; word-break: break-word;">${email}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px 0; font-weight: bold; font-size: 14px;">Телефон:</td>
            <td style="padding: 8px 0; font-size: 14px;">${phone}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px 0; font-weight: bold; font-size: 14px;">ID замовлення:</td>
            <td style="padding: 8px 0; font-family: monospace; font-size: 14px;">${newOrder._id}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; font-size: 14px;">Час створення:</td>
            <td style="padding: 8px 0; font-size: 14px;">${new Date().toLocaleString('uk-UA')}</td>
          </tr>
        </table>
      `, '#f8f9fa') + createInfoBlock('⚡ Дія потрібна:', `
        Увійдіть в адмін панель для перегляду деталей замовлення та встановлення ціни.
      `, 'warning');

      const adminEmailTemplate = createResponsiveEmailTemplate(
        '🆕 Нове замовлення на сайті',
        adminEmailContent,
        { footerText: 'Адмін-панель Growth Tech' }
      );

      await sendEmail(process.env.SMTP_EMAIL, 'Нове замовлення на сайті', adminEmailTemplate);
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

    // Send notification to admin about template update
    try {
      const templateUpdateEmailContent = createEmailSection(`
        <h2 class="email-subtitle" style="color: #27ae60; margin-top: 0; font-size: 18px;">✅ Клієнт заповнив всі дані!</h2>
        <p class="email-text" style="margin: 10px 0; font-size: 14px; line-height: 1.6;">
          Замовлення готове до розгляду адміністратора.
        </p>
      `, '#e8f5e8') + createEmailSection(`
        <h3 class="email-subtitle" style="color: #2c3e50; margin-top: 0; font-size: 16px;">👤 Інформація про клієнта:</h3>
        <table style="width: 100%; margin: 10px 0;">
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px 0; font-weight: bold; font-size: 14px;">Клієнт:</td>
            <td style="padding: 8px 0; font-size: 14px;">${user.firstName} ${user.lastName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px 0; font-weight: bold; font-size: 14px;">Email:</td>
            <td style="padding: 8px 0; font-size: 14px; word-break: break-word;">${user.email}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px 0; font-weight: bold; font-size: 14px;">Телефон:</td>
            <td style="padding: 8px 0; font-size: 14px;">${user.phone}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px 0; font-weight: bold; font-size: 14px;">ID замовлення:</td>
            <td style="padding: 8px 0; font-family: monospace; font-size: 14px;">${order._id}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px 0; font-weight: bold; font-size: 14px;">Обраний шаблон:</td>
            <td style="padding: 8px 0; font-size: 14px;">${template}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px 0; font-weight: bold; font-size: 14px;">Статус:</td>
            <td style="padding: 8px 0; font-size: 14px;">Чернетка</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; font-size: 14px;">Час оновлення:</td>
            <td style="padding: 8px 0; font-size: 14px;">${new Date().toLocaleString('uk-UA')}</td>
          </tr>
        </table>
      `, '#f8f9fa') + createInfoBlock('⚡ Дія потрібна:', `
        Замовлення готове до розгляду. Увійдіть в адмін панель, ознайомтесь з матеріалами та встановіть ціну. Після встановлення ціни клієнт отримає реквізити для оплати.
      `, 'warning');

      const templateUpdateEmailTemplate = createResponsiveEmailTemplate(
        '✅ Замовлення готове до розгляду',
        templateUpdateEmailContent,
        { footerText: 'Адмін-панель Growth Tech' }
      );

      await sendEmail(process.env.SMTP_EMAIL, 'Замовлення готове до розгляду', templateUpdateEmailTemplate);
      console.log('Admin notification sent about order ready for review');
    } catch (emailError) {
      console.error('Admin notification sending failed:', emailError);
    }

    res.status(200).json({ 
      message: 'Дані збережено. Очікуйте на розгляд адміністратора для встановлення ціни.', 
      order,
      status: 'draft'
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

// Нова функція для встановлення ціни та відправки реквізитів
const setPriceAndSendPayment = async (req, res) => {
  const { orderId } = req.params;
  const { amount } = req.body;
  
  console.log('setPriceAndSendPayment викликано для orderId:', orderId, 'amount:', amount);

  try {
    const order = await Order.findById(orderId).populate('user');
    if (!order) return res.status(404).json({ error: 'Замовлення не знайдено' });

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Необхідно вказати коректну ціну' });
    }

    // Встановлюємо ціну та статус
    order.amount = amount;
    order.status = 'pending_payment';
    order.paymentEmailSent = true; // Позначаємо, що email з реквізитами вже відправлено
    await order.save();

    // Відправляємо email з реквізитами оплати
    try {
      const paymentEmailHtml = generatePaymentEmailTemplate(order, order.user);
      await sendEmail(order.user.email, 'Реквізити для оплати', paymentEmailHtml);
      console.log('Payment email sent to client:', order.user.email);
    } catch (emailError) {
      console.error('Payment email sending failed:', emailError);
      return res.status(500).json({ error: 'Помилка відправки email з реквізитами' });
    }

    res.status(200).json({ 
      message: 'Ціну встановлено, клієнт отримав реквізити для оплати',
      order: {
        ...order.toObject(),
        amount: amount
      }
    });
  } catch (error) {
    console.error('setPriceAndSendPayment error:', error);
    res.status(500).json({ 
      error: 'Помилка встановлення ціни', 
      details: error.message
    });
  }
};

const confirmOrder = async (req, res) => {
  const { orderId } = req.params;
  
  console.log('confirmOrder викликано для orderId:', orderId);
  console.log('Environment check:', {
    nodeEnv: process.env.NODE_ENV,
    hasSmtpEmail: !!process.env.SMTP_EMAIL,
    hasSmtpPass: !!process.env.SMTP_PASS
  });

  try {
    console.log('Fetching order from database...');
    const order = await Order.findById(orderId).populate('user');
    if (!order) return res.status(404).json({ error: 'Замовлення не знайдено' });
    
    console.log('Order found:', { id: order._id, amount: order.amount, hasUser: !!order.user });

    if (!order.amount || order.amount <= 0) {
      return res.status(400).json({ error: 'Спочатку потрібно встановити ціну замовлення' });
    }

    console.log('Starting PDF generation...');
    const pdfPath = await generatePDF(order);
    console.log('PDF generated successfully:', pdfPath);
    const pdfUrl = `/pdfs/${path.basename(pdfPath)}`;

    order.confirmed = true;
    order.pdfUrl = pdfUrl;
    await order.save();

    const confirmationEmailContent = createEmailSection(`
      <h2 class="email-subtitle" style="color: #27ae60; margin-top: 0; font-size: 18px;">🎉 Замовлення підтверджено!</h2>
      <p class="email-text" style="margin: 10px 0; font-size: 14px; line-height: 1.6;">
        Ваше замовлення успішно підтверджено. Договір сформовано та готовий до завантаження.
      </p>
    `, '#e8f5e8') + createInfoBlock('📄 Документи:', `
      <p style="margin: 10px 0; text-align: center;">
        Ваш договір готовий для завантаження:
      </p>
    `, 'info') + createEmailButton(
      '📥 Завантажити договір (PDF)',
      `http://growth-tech.com.ua/${pdfUrl}`,
      '#e74c3c'
    ) + createEmailSection(`
      <p class="email-text" style="margin: 0; font-size: 14px; text-align: center;">
        Зберігайте цей документ для своїх записів.
      </p>
    `, '#f8f9fa');

    const confirmationEmailTemplate = createResponsiveEmailTemplate(
      '📋 Підтвердження замовлення',
      confirmationEmailContent
    );

    await sendEmail(order.user.email, 'Підтвердження замовлення', confirmationEmailTemplate);

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

    const statusTranslations = {
      'draft': 'Чернетка',
      'in_progress': 'В роботі',
      'completed': 'Завершено',
      'cancelled': 'Скасовано',
      'pending_payment': 'Очікує оплати',
      'paid': 'Оплачено',
      'payment_failed': 'Помилка оплати'
    };

    try {
      const statusUpdateEmailContent = createEmailSection(`
        <h2 class="email-subtitle" style="color: #2c3e50; margin-top: 0; font-size: 18px;">📊 Статус замовлення змінено</h2>
        <p class="email-text" style="margin: 10px 0; font-size: 14px; line-height: 1.6;">
          ${statusMessages[status]}
        </p>
      `, '#f8f9fa') + createEmailSection(`
        <h3 class="email-subtitle" style="color: #2c3e50; margin-top: 0; font-size: 16px;">📋 Деталі оновлення:</h3>
        <table style="width: 100%; margin: 10px 0;">
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px 0; font-weight: bold; font-size: 14px;">ID замовлення:</td>
            <td style="padding: 8px 0; font-family: monospace; font-size: 14px;">${order._id}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; font-size: 14px;">Новий статус:</td>
            <td style="padding: 8px 0; font-size: 14px; font-weight: bold; color: #27ae60;">${statusTranslations[status] || status}</td>
          </tr>
        </table>
      `, '#e8f5e8') + createInfoBlock('💡 Що далі?', `
        Увійдіть у свій кабінет для перегляду деталей замовлення.
      `, 'info');

      let emailContent = statusUpdateEmailContent;

      // Якщо статус "pending_payment" і реквізити ще не відправлені
      if (status === 'pending_payment' && !order.paymentEmailSent && order.amount) {
        try {
          const paymentEmailHtml = generatePaymentEmailTemplate(order, order.user);
          await sendEmail(order.user.email, 'Реквізити для оплати', paymentEmailHtml);
          
          // Позначаємо, що email з реквізитами відправлено
          order.paymentEmailSent = true;
          await order.save();
          
          console.log('Payment email sent to client via status update:', order.user.email);
          return res.status(200).json({ 
            message: 'Статус оновлено та відправлено реквізити для оплати',
            order: {
              ...order.toObject(),
              oldStatus,
              newStatus: status
            }
          });
        } catch (emailError) {
          console.error('Payment email sending failed:', emailError);
          // Продовжуємо з звичайним сповіщенням про зміну статусу
        }
      }

      // Якщо статус "completed", додаємо посилання на відгук
      if (status === 'completed') {
        const reviewUrl = `${process.env.FRONTEND_URL || 'http://localhost:5000'}/review/${order._id}`;
        const reviewSection = createInfoBlock('🌟 Залиште відгук про нашу роботу!', `
          <p style="margin: 10px 0; text-align: center;">
            Ваше замовлення завершено! Ми будемо дуже вдячні, якщо ви залишите відгук про якість нашої роботи.
          </p>
        `, 'success') + createEmailButton(
          '⭐ Залишити відгук',
          reviewUrl,
          '#27ae60'
        ) + createEmailSection(`
          <p style="font-size: 12px; color: #666; margin: 0; text-align: center;">
            Ваш відгук допоможе іншим клієнтам довіритися нам та покращить якість наших послуг.
          </p>
        `, '#f8f9fa');
        
        emailContent += reviewSection;
      }

      const finalEmailTemplate = createResponsiveEmailTemplate(
        '📊 Оновлення статусу замовлення',
        emailContent
      );

      await sendEmail(order.user.email, 'Оновлення статусу замовлення', finalEmailTemplate);
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

module.exports = { createOrder, updateTemplate, getMyOrder, confirmOrder, getAllOrders, updateOrderStatus, setPriceAndSendPayment };