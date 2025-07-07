const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, html) => {
  try {
    if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASS) {
      console.warn('SMTP credentials not configured');
      return;
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS
      }
    });

    const result = await transporter.sendMail({ 
      from: `Growth Tech <${process.env.SMTP_EMAIL}>`, 
      to, 
      subject, 
      html 
    });
    
    console.log('Email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error('Failed to send email');
  }
};

module.exports = sendEmail;
