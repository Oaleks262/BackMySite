// Конфігурація банківських реквізитів для оплати
module.exports = {
  // Банківські реквізити
  bankDetails: {
    recipient: process.env.BANK_RECIPIENT || 'Звірич Олександр Миколайович',
    iban: process.env.BANK_IBAN || 'UA213223130000026007233566001',
    bank: process.env.BANK_NAME || 'ПриватБанк',
    currency: process.env.PAYMENT_CURRENCY || 'USD'
  },
  
  // Контактна інформація компанії
  companyInfo: {
    name: process.env.COMPANY_NAME || 'Growth Tech',
    email: process.env.COMPANY_EMAIL || process.env.SMTP_EMAIL || 'info@growth-tech.com.ua',
    phone: process.env.COMPANY_PHONE || '+38 (067) 123-45-67',
    website: process.env.COMPANY_WEBSITE || 'https://growth-tech.com.ua'
  },
  
  // Тарифи та ціни
  pricing: {
    tariffs: {
      single: parseInt(process.env.PRICE_SINGLE) || 500,
      landing: parseInt(process.env.PRICE_LANDING) || 1000,
      blog: parseInt(process.env.PRICE_BLOG) || 1500
    },
    additionalFeatures: {
      ecommerce: parseInt(process.env.PRICE_ECOMMERCE) || 500,
      booking: parseInt(process.env.PRICE_BOOKING) || 300,
      analytics: parseInt(process.env.PRICE_ANALYTICS) || 200,
      seo: parseInt(process.env.PRICE_SEO) || 250
    }
  },
  
  // Налаштування email
  emailSettings: {
    paymentSubject: 'Реквізити для оплати замовлення',
    deliveryDays: '3-7 робочих днів'
  }
};