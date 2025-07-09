# Інструкції з деплою

## Проблема
API ендпоінти повертають 404 помилку, що означає що Node.js сервер не запущений на продакшені.

## Потрібні кроки для деплою:

### 1. Завантажити файли на сервер
```bash
# Завантажити весь проект на сервер
scp -r BackMySite/ user@growth-tech.com.ua:/var/www/
```

### 2. Встановити залежності
```bash
# На сервері
cd /var/www/BackMySite
npm install
```

### 3. Налаштувати environment змінні

**ВАЖЛИВО**: Переконайтесь, що .env файл існує на сервері!

```bash
# На сервері створити .env файл
cd /var/www/BackMySite

# Скопіювати з проекту
cp .env.production .env

# АБО створити вручну
cat > .env << EOF
PORT=4444
MONGO_URI=mongodb+srv://Admin:Lviv_28_04_25@growthtech.0exondm.mongodb.net/GrowthTech?retryWrites=true&w=majority&appName=GrowthTech
JWT_SECRET=growthtech
SMTP_EMAIL=growthtech.contact@gmail.com
SMTP_PASS=oxifcomzzrftfves
NODE_ENV=production
EOF

# Перевірити що файл створений
cat .env
ls -la .env
```

### 4. Запустити сервер
```bash
# Встановити PM2 для автозапуску
npm install -g pm2

# Запустити додаток
pm2 start index.js --name "growth-tech-api"

# Зберегти конфігурацію PM2
pm2 save
pm2 startup
```

### 5. Налаштувати Nginx (якщо використовується)
```nginx
server {
    listen 80;
    server_name growth-tech.com.ua;
    
    # Статичні файли
    location / {
        root /var/www/BackMySite/public;
        try_files $uri $uri/ /index.html;
    }
    
    # API проксі
    location /api/ {
        proxy_pass http://localhost:4444;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 6. Перевірити статус
```bash
# Перевірити чи працює сервер
pm2 status
pm2 logs growth-tech-api

# Перевірити порт
netstat -tulpn | grep :4444

# Тестувати API
curl https://growth-tech.com.ua/api/auth/login
```

## Альтернативний спосіб (без nginx)

Якщо не використовуєте nginx, можна запустити Node.js на порту 80:

```bash
# Змінити PORT в .env
PORT=80

# Запустити з sudo (для порту 80)
sudo pm2 start index.js --name "growth-tech-api"
```

## Перевірка деплою

Після деплою перевірте:
1. `http://growth-tech.com.ua` - має відкриватися сайт
2. `http://growth-tech.com.ua/api/auth/register` - має повертати JSON помилку (не 404)
3. Консоль браузера не має показувати 404 помилки для API

## Налагодження

### Якщо проблеми продовжуються:

```bash
# 1. Перевірити .env файл
ls -la /var/www/BackMySite/.env
cat /var/www/BackMySite/.env

# 2. Перевірити логи сервера
pm2 logs growth-tech-api

# 3. Запустити сервер у debug режимі
cd /var/www/BackMySite
npm start

# У логах має бути:
# ✅ .env file loaded successfully
# ✅ All required environment variables are present
# 🔄 Connecting to MongoDB...
# ✅ MongoDB connected successfully
# 🚀 Server running on port 4444
```

### Типові проблеми та рішення:

**❌ Error loading .env file**
```bash
# Створити .env файл
cp .env.production .env
```

**❌ Missing required environment variables**
```bash
# Перевірити зміст .env
cat .env
# Має містити MONGO_URI та JWT_SECRET
```

**❌ MongoDB connection error**
```bash
# Перевірити інтернет підключення
ping mongodb.net
# Перевірити MONGO_URI в .env
```

**❌ API повертає 404**
```bash
# Перевірити чи працює сервер
netstat -tulpn | grep :4444
curl http://localhost:4444/api/auth/register
```