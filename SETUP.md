# BackMySite - Налаштування для продакшну

## Необхідні налаштування для запуску

### 1. Змінні оточення (.env)
Оновіть файл `.env` з реальними значеннями:

```env
PORT=4444
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_jwt_secret
SMTP_EMAIL=your_email@gmail.com
SMTP_PASS=your_email_app_password
STRIPE_PUBLIC_KEY=pk_live_your_stripe_public_key
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### 2. Stripe налаштування
1. Створіть акаунт на [Stripe](https://stripe.com)
2. Отримайте API ключі в Dashboard > Developers > API keys
3. Налаштуйте webhook endpoint: `yourdomain.com/api/payment/webhook`
4. Оберіть події: `payment_intent.succeeded`, `payment_intent.payment_failed`

### 3. Email налаштування
1. Увімкніть 2FA в Gmail
2. Створіть App Password в Google Account settings
3. Використайте App Password як SMTP_PASS

### 4. MongoDB
1. Створіть кластер на [MongoDB Atlas](https://cloud.mongodb.com)
2. Налаштуйте доступ до мережі (IP whitelist)
3. Скопіюйте connection string

### 5. Встановлення залежностей
```bash
npm install
```

### 6. Запуск
```bash
npm start
```

## Нові функції

### ✅ Платіжна система
- Інтеграція зі Stripe
- Автоматичне розрахування ціни
- Webhook для підтвердження платежів

### ✅ Завантаження файлів
- Підтримка зображень (JPEG, PNG, GIF, WebP)
- Ліміт 5MB на файл
- Організація файлів по користувачах

### ✅ Превью шаблонів
- Три типи шаблонів: Single Page, Landing, Blog
- Кастомізація на основі користувацьких налаштувань
- Реальний перегляд перед замовленням

### ✅ Генерація сайтів
- Автоматична генерація HTML/CSS/JS
- Збереження файлів сайту
- Можливість завантаження

### ✅ Управління профілем
- Редагування профілю
- Зміна пароля
- Історія замовлень
- Статистика користувача

### ✅ Покращена адмін-панель
- Dashboard з аналітикою
- Управління користувачами
- Відстеження замовлень
- Експорт даних

## API Endpoints

### Аутентифікація
- POST `/api/auth/register` - Реєстрація
- POST `/api/auth/login` - Вхід

### Замовлення
- POST `/api/orders/create` - Створити замовлення
- POST `/api/orders/update-template` - Оновити шаблон
- GET `/api/orders/my-order` - Отримати замовлення користувача

### Платежі
- POST `/api/payment/create-payment-intent` - Створити платіж
- POST `/api/payment/confirm-payment` - Підтвердити платіж
- GET `/api/payment/pricing` - Отримати ціни

### Файли
- POST `/api/upload/image` - Завантажити зображення
- POST `/api/upload/images` - Завантажити кілька зображень
- GET `/api/upload/files` - Отримати файли користувача

### Шаблони
- GET `/api/templates` - Отримати всі шаблони
- GET `/api/templates/:id/preview` - Превью шаблону
- POST `/api/templates/:id/customize` - Кастомізований превью

### Профіль
- GET `/api/profile` - Отримати профіль
- PUT `/api/profile` - Оновити профіль
- GET `/api/profile/orders` - Історія замовлень

### Генерація сайтів
- POST `/api/website/generate/:orderId` - Згенерувати сайт
- GET `/api/website/view/:orderId` - Переглянути сайт
- GET `/api/website/download/:orderId` - Завантажити файли

### Адмін
- GET `/api/admin/dashboard` - Статистика
- GET `/api/admin/users` - Користувачі
- GET `/api/admin/orders` - Замовлення
- GET `/api/admin/analytics` - Аналітика

## Статуси замовлень
- `draft` - Чернетка
- `pending_payment` - Очікує оплату
- `paid` - Оплачено
- `in_progress` - В роботі
- `completed` - Завершено
- `cancelled` - Скасовано
- `payment_failed` - Помилка платежу

## Деплой
1. Налаштуйте production сервер (Heroku, DigitalOcean, AWS)
2. Встановіть змінні оточення
3. Налаштуйте домен та SSL
4. Налаштуйте Stripe webhooks для production домену

## Підтримка
Для питань та підтримки звертайтесь до розробника.