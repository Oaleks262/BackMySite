// Універсальна функція для створення адаптивних email шаблонів

const createResponsiveEmailTemplate = (title, content, options = {}) => {
  const {
    backgroundColor = '#f9f9f9',
    maxWidth = '600px',
    padding = '20px',
    fontFamily = 'Arial, sans-serif',
    footerText = '',
    footerEmail = process.env.SMTP_EMAIL || 'growthtech.contact@gmail.com',
    footerWebsite = 'growth-tech.com.ua',
    companyName = 'Growth Tech'
  } = options;

  return `
    <div style="font-family: ${fontFamily}; width: 100%; max-width: ${maxWidth}; margin: 0 auto; padding: 5px; background-color: ${backgroundColor}; box-sizing: border-box;">
      <style>
        @media only screen and (max-width: 600px) {
          .email-container { padding: 10px !important; }
          .email-content { padding: 15px !important; }
          .email-section { padding: 15px !important; margin-bottom: 15px !important; }
          .email-table { display: block !important; width: 100% !important; }
          .email-table tr { display: block !important; margin-bottom: 10px !important; border-bottom: 1px solid #eee !important; padding-bottom: 8px !important; }
          .email-table td { display: block !important; width: 100% !important; padding: 3px 0 !important; text-align: left !important; }
          .email-table td:first-child { font-weight: bold !important; margin-bottom: 2px !important; }
          .email-title { font-size: 20px !important; }
          .email-subtitle { font-size: 16px !important; }
          .email-text { font-size: 14px !important; }
          .monospace-text { font-size: 12px !important; word-break: break-all !important; line-height: 1.3 !important; }
          .total-price { font-size: 16px !important; }
          .responsive-padding { padding: 10px !important; }
          .responsive-margin { margin: 10px 0 !important; }
        }
      </style>
      <div class="email-content" style="background-color: white; padding: ${padding}; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h1 class="email-title" style="color: #2c3e50; text-align: center; margin-bottom: 30px; font-size: 24px;">${title}</h1>
        
        ${content}
        
        ${footerText || footerEmail || footerWebsite ? `
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
          ${footerText ? `<p style="color: #7f8c8d; margin: 5px 0; font-size: 14px;">${footerText}</p>` : ''}
          <p style="color: #2c3e50; font-weight: bold; margin: 5px 0; font-size: 16px;">Команда ${companyName}</p>
          ${footerEmail ? `<p style="color: #7f8c8d; font-size: 14px; margin: 5px 0; word-break: break-word;">📧 ${footerEmail}</p>` : ''}
          ${footerWebsite ? `<p style="color: #7f8c8d; font-size: 14px; margin: 5px 0;">🌐 ${footerWebsite}</p>` : ''}
        </div>
        ` : ''}
      </div>
    </div>
  `;
};

// Функція для створення секції email
const createEmailSection = (content, backgroundColor = '#f8f9fa', borderColor = null) => {
  const borderStyle = borderColor ? `border: 1px solid ${borderColor};` : '';
  return `
    <div class="email-section responsive-padding responsive-margin" style="background-color: ${backgroundColor}; ${borderStyle} padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      ${content}
    </div>
  `;
};

// Функція для створення таблиці
const createEmailTable = (rows) => {
  const tableRows = rows.map(row => {
    if (Array.isArray(row)) {
      return `
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="padding: 8px 0; font-weight: bold; font-size: 14px; width: 40%;">${row[0]}</td>
          <td class="email-text" style="padding: 8px 0; font-size: 14px; word-break: break-word;">${row[1]}</td>
        </tr>
      `;
    }
    return row;
  }).join('');

  return `
    <table class="email-table" style="width: 100%; border-collapse: collapse;">
      ${tableRows}
    </table>
  `;
};

// Функція для створення кнопки
const createEmailButton = (text, url, backgroundColor = '#26B26A', textColor = 'white') => {
  return `
    <div style="text-align: center; margin: 20px 0;">
      <a href="${url}" style="background-color: ${backgroundColor}; color: ${textColor}; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
        ${text}
      </a>
    </div>
  `;
};

// Функція для створення інформаційного блоку
const createInfoBlock = (title, content, type = 'info') => {
  const colors = {
    success: { bg: '#d1f2eb', border: '#00b894', text: '#00b894' },
    error: { bg: '#f8d7da', border: '#dc3545', text: '#dc3545' },
    warning: { bg: '#fff3cd', border: '#ffc107', text: '#856404' },
    info: { bg: '#d1ecf1', border: '#17a2b8', text: '#0c5460' }
  };

  const color = colors[type] || colors.info;

  return `
    <div class="email-section responsive-padding responsive-margin" style="background-color: ${color.bg}; border: 1px solid ${color.border}; padding: 15px; border-radius: 8px; margin: 20px 0;">
      ${title ? `<h4 style="color: ${color.text}; margin-top: 0; font-size: 14px;">${title}</h4>` : ''}
      <div style="color: ${color.text}; font-size: 14px; line-height: 1.6;">
        ${content}
      </div>
    </div>
  `;
};

module.exports = {
  createResponsiveEmailTemplate,
  createEmailSection,
  createEmailTable,
  createEmailButton,
  createInfoBlock
};