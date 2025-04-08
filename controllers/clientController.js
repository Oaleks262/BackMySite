const User = require('../models/User');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const PDFDocument = require('pdfkit');
const fs = require('fs');

exports.registerClient = async (req, res) => {
  try {
    const { firstName, lastName, email, price } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const generatedPassword = crypto.randomBytes(4).toString('hex');
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    const siteType = price === 300
      ? 'Односторінковий сайт'
      : price === 400
      ? 'Лендінг'
      : price === 1600
      ? 'Комерційний сайт'
      : 'Невідомий тип';

    const newUser = new User({ email, password: hashedPassword, role: 'client' });
    await newUser.save();

    // Генерація PDF угоди
    const doc = new PDFDocument();
    const filePath = `./agreements/${email.replace(/@.*/, '')}_agreement.pdf`;
    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(18).text('УГОДА №001', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`м. Львів, дата: ${new Date().toLocaleDateString()}`);
    doc.moveDown();

    doc.fontSize(14).text('1. Сторони Угоди', { underline: true });
    doc.text(`ФОП Звірич Олександр ("Виконавець") та ${firstName} ${lastName} ("Замовник") погоджують наступне:`);

    doc.moveDown();
    doc.fontSize(14).text('2. Предмет Угоди', { underline: true });
    doc.text(`Створення вебсайту типу: ${siteType} за ціною ${price}$`);

    doc.moveDown();
    doc.fontSize(14).text('3. Оплата та повернення коштів', { underline: true });
    doc.text('Замовник зобов’язується оплатити послуги у повному обсязі. У разі відмови від послуг після початку робіт — повертається лише 50% вартості.');

    doc.moveDown();
    doc.fontSize(14).text('4. Форс-мажор', { underline: true });
    doc.text('Сторони звільняються від відповідальності у випадку дії форс-мажорних обставин (війна, хвороба, стихійні лиха тощо).');

    doc.moveDown();
    doc.fontSize(14).text('5. Заключні положення', { underline: true });
    doc.text('Оплата є підтвердженням згоди Замовника на укладення Угоди та початок виконання робіт. Угода є дійсною з моменту оплати.');
    doc.text('Документ зберігається в електронному вигляді (PDF) та має юридичну силу.');

    doc.moveDown();
    doc.text('Виконавець: ФОП Звірич Олександр');
    doc.text(`Замовник: ${firstName} ${lastName}, Email: ${email}`);

    doc.end();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Ваш логін для входу + угода',
      text: `Доброго дня, ${firstName} ${lastName}!

Ваш логін: ${email}
Ваш пароль: ${generatedPassword}
Тип сайту: ${siteType} (${price}$)

Увійдіть до свого кабінету за посиланням: https://growth-tech.com.ua/login

До цього листа прикріплено угоду для ознайомлення.`,
      attachments: [
        {
          filename: 'agreement.pdf',
          path: filePath,
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Клієнта зареєстровано, PDF створено та лист відправлено' });
  } catch (err) {
    res.status(500).json({ message: 'Помилка створення клієнта', error: err.message });
  }
};
