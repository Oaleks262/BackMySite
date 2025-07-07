# Налаштування Email для відправки повідомлень

## Для Gmail

1. **Увімкніть 2-факторну аутентифікацію** в своєму Google аккаунті
2. **Створіть App Password:**
   - Перейдіть в Google Account Settings
   - Security > 2-Step Verification > App passwords
   - Оберіть "Mail" та згенеруйте пароль
   - Скопіюйте згенерований 16-значний пароль

3. **Оновіть .env файл:**
```env
SMTP_EMAIL=your-gmail@gmail.com
SMTP_PASS=your-16-character-app-password
```

## Для інших провайдерів

### Outlook/Hotmail
```env
SMTP_EMAIL=your-email@outlook.com
SMTP_PASS=your-password
```

### Yahoo
```env
SMTP_EMAIL=your-email@yahoo.com
SMTP_PASS=your-app-password
```

### Custom SMTP
Якщо потрібно змінити сервіс, відредагуйте `utils/sendEmail.js`:

```javascript
const transporter = nodemailer.createTransporter({
  host: 'your-smtp-server.com',
  port: 587,
  secure: false, // true для 465, false для інших портів
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASS
  }
});
```

## Тестування

Після налаштування SMTP, перезапустіть сервер і створіть тестове замовлення.
Перевірте консоль на наявність повідомлень про успішну відправку email.

## Логи

У консолі сервера ви побачите:
- `Email sent successfully: [message-id]` - при успішній відправці
- `Email sending failed: [error]` - при помилці
- `SMTP credentials not configured` - якщо немає налаштувань