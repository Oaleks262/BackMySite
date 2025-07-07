const sendEmail = require('./sendEmail');
require('dotenv').config();

async function testEmail() {
  try {
    console.log('Testing email with credentials:');
    console.log('SMTP_EMAIL:', process.env.SMTP_EMAIL);
    console.log('SMTP_PASS:', process.env.SMTP_PASS ? 'Set' : 'Not set');
    
    const result = await sendEmail(
      'test.recipient@gmail.com',
      'Тест відправки email',
      `
        <h2>Тестове повідомлення</h2>
        <p>Цей email був відправлений для тестування системи.</p>
        <p><strong>Час відправки:</strong> ${new Date().toLocaleString('uk-UA')}</p>
        <p>Якщо ви отримали це повідомлення, то email система працює правильно!</p>
      `
    );
    
    console.log('Email sent successfully!', result);
  } catch (error) {
    console.error('Email test failed:', error.message);
  }
}

testEmail();