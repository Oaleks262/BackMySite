const fs = require('fs');
const path = require('path');
const paymentConfig = require('../config/payment');

// Шлях до файлу .env
const envPath = path.join(__dirname, '../.env');

// Отримати поточні налаштування
const getSettings = async (req, res) => {
  try {
    res.status(200).json(paymentConfig);
  } catch (error) {
    console.error('Error getting settings:', error);
    res.status(500).json({ error: 'Помилка отримання налаштувань' });
  }
};

// Оновити налаштування
const updateSettings = async (req, res) => {
  const { section, data } = req.body;
  
  try {
    // Мапінг секцій до ENV змінних
    const envMapping = {
      bankDetails: {
        recipient: 'BANK_RECIPIENT',
        iban: 'BANK_IBAN',
        bank: 'BANK_NAME',
        currency: 'PAYMENT_CURRENCY'
      },
      companyInfo: {
        name: 'COMPANY_NAME',
        email: 'COMPANY_EMAIL',
        phone: 'COMPANY_PHONE',
        website: 'COMPANY_WEBSITE'
      },
      pricing: {
        'tariffs.single': 'PRICE_SINGLE',
        'tariffs.landing': 'PRICE_LANDING',
        'tariffs.blog': 'PRICE_BLOG',
        'additionalFeatures.ecommerce': 'PRICE_ECOMMERCE',
        'additionalFeatures.booking': 'PRICE_BOOKING',
        'additionalFeatures.analytics': 'PRICE_ANALYTICS',
        'additionalFeatures.seo': 'PRICE_SEO'
      }
    };
    
    // Читаємо поточний .env файл
    let envContent = fs.readFileSync(envPath, 'utf8');
    
    // Оновлюємо відповідні змінні
    if (section === 'pricing') {
      // Особлива обробка для pricing
      const { tariffs, additionalFeatures } = data;
      
      if (tariffs) {
        Object.keys(tariffs).forEach(key => {
          const envVar = envMapping.pricing[`tariffs.${key}`];
          if (envVar) {
            envContent = updateEnvVariable(envContent, envVar, tariffs[key]);
          }
        });
      }
      
      if (additionalFeatures) {
        Object.keys(additionalFeatures).forEach(key => {
          const envVar = envMapping.pricing[`additionalFeatures.${key}`];
          if (envVar) {
            envContent = updateEnvVariable(envContent, envVar, additionalFeatures[key]);
          }
        });
      }
    } else {
      // Стандартна обробка для bankDetails та companyInfo
      const mapping = envMapping[section];
      if (mapping) {
        Object.keys(data).forEach(key => {
          const envVar = mapping[key];
          if (envVar) {
            envContent = updateEnvVariable(envContent, envVar, data[key]);
          }
        });
      }
    }
    
    // Записуємо оновлений .env файл
    fs.writeFileSync(envPath, envContent);
    
    // Оновлюємо process.env для поточного процесу
    if (section === 'pricing') {
      const { tariffs, additionalFeatures } = data;
      if (tariffs) {
        Object.keys(tariffs).forEach(key => {
          const envVar = envMapping.pricing[`tariffs.${key}`];
          if (envVar) {
            process.env[envVar] = tariffs[key].toString();
          }
        });
      }
      if (additionalFeatures) {
        Object.keys(additionalFeatures).forEach(key => {
          const envVar = envMapping.pricing[`additionalFeatures.${key}`];
          if (envVar) {
            process.env[envVar] = additionalFeatures[key].toString();
          }
        });
      }
    } else {
      const mapping = envMapping[section];
      if (mapping) {
        Object.keys(data).forEach(key => {
          const envVar = mapping[key];
          if (envVar) {
            process.env[envVar] = data[key];
          }
        });
      }
    }
    
    // Перезавантажуємо конфігурацію
    delete require.cache[require.resolve('../config/payment')];
    
    res.status(200).json({ message: 'Налаштування успішно оновлено' });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ error: 'Помилка оновлення налаштувань' });
  }
};

// Допоміжна функція для оновлення змінної в .env файлі
function updateEnvVariable(content, varName, value) {
  const regex = new RegExp(`^${varName}=.*$`, 'm');
  const newLine = `${varName}=${value}`;
  
  if (regex.test(content)) {
    // Змінна існує, оновлюємо її
    return content.replace(regex, newLine);
  } else {
    // Змінна не існує, додаємо її
    return content + '\n' + newLine;
  }
}

module.exports = {
  getSettings,
  updateSettings
};