// 📁 utils/generatePDF.js
const fs = require('fs');
const PDFDocument = require('pdfkit');
const path = require('path');
const { getContractTemplate, getWarrantyTerms, getMaintenanceTerms } = require('./contractTemplates');

const getTariffPrice = (tariffType) => {
  const prices = {
    'single': 5000,
    'landing': 8000,
    'blog': 12000
  };
  return prices[tariffType] || 0;
};

const getTariffName = (tariffType) => {
  const names = {
    'single': 'Односторінковий сайт',
    'landing': 'Лендінг',
    'blog': 'Багатосторінковий сайт з блогом'
  };
  return names[tariffType] || 'Веб-сайт';
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('uk-UA');
};

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const generatePDF = async (order) => {
  const doc = new PDFDocument();
  const pdfDir = path.join(__dirname, '../public/pdfs');
  const filePath = path.join(pdfDir, `contract_${order._id}.pdf`);
  
  // Створити директорію якщо не існує
  if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir, { recursive: true });
  }
  
  const writeStream = fs.createWriteStream(filePath);

  // ✅ підключення шрифту з кирилицею
  doc.registerFont('DejaVu', path.join(__dirname, 'fonts/DejaVuSans.ttf'));
  doc.font('DejaVu');

  doc.pipe(writeStream);

  const contractDate = new Date();
  const projectPrice = order.amount || getTariffPrice(order.tariffType);
  const startDate = addDays(contractDate, 1);
  const endDate = addDays(startDate, order.tariffType === 'blog' ? 30 : order.tariffType === 'landing' ? 21 : 14);
  const prepayment = Math.round(projectPrice * 0.3);
  const finalPayment = projectPrice - prepayment;
  
  doc.fontSize(18).text('ДОГОВІР № ' + order._id, { align: 'center' });
  doc.moveDown();

  doc.fontSize(12).text(`м. Львів                                                            "${formatDate(contractDate)}"`, { align: 'left' });
  doc.moveDown();

  doc.text(`ФОП Звірич Олександр Олександрович, надалі "Виконавець", з однієї сторони, та
${order.user.firstName} ${order.user.lastName}, надалі "Замовник", з іншої сторони,
уклали цей Договір про наступне:`);

  doc.moveDown();
  doc.text('1. ПРЕДМЕТ ДОГОВОРУ');
  doc.text('1.1. Виконавець зобов’язується створити веб-сайт відповідно до обраного шаблону Замовником:');
  doc.text(`    - Тип сайту: ${getTariffName(order.tariffType)}`);
  if (order.selectedTemplate) {
    doc.text(`    - Обраний шаблон: ${order.selectedTemplate}`);
  }

  // Додаємо специфікації з блоків
  if (order.blocks && Object.keys(order.blocks).length > 0) {
    doc.text('1.2. Специфікації проекту:');
    Object.entries(order.blocks).forEach(([blockName, blockData]) => {
      if (blockData && typeof blockData === 'object') {
        doc.text(`    - ${blockName}:`);
        if (blockData.title) doc.text(`      Заголовок: ${blockData.title}`);
        if (blockData.content) doc.text(`      Контент: ${blockData.content.substring(0, 100)}${blockData.content.length > 100 ? '...' : ''}`);
        if (blockData.text) doc.text(`      Текст: ${blockData.text.substring(0, 100)}${blockData.text.length > 100 ? '...' : ''}`);
        if (blockData.items && Array.isArray(blockData.items)) {
          doc.text(`      Елементи: ${blockData.items.length} пунктів`);
        }
      }
    });
  }

  doc.moveDown();
  doc.text('2. СТРОКИ ВИКОНАННЯ');
  doc.text(`2.1. Дата початку робіт: ${formatDate(startDate)}`);
  doc.text(`2.2. Дата завершення робіт: ${formatDate(endDate)}`);
  doc.text('2.3. Строки можуть бути скориговані за домовленістю сторін.');

  doc.moveDown();
  doc.text('3. ВАРТІСТЬ ТА ОПЛАТА');
  doc.text(`3.1. Загальна вартість робіт: ${projectPrice.toLocaleString('uk-UA')} грн.`);
  doc.text(`3.2. Передоплата (30%): ${prepayment.toLocaleString('uk-UA')} грн.`);
  doc.text(`3.3. Доплата після завершення робіт (70%): ${finalPayment.toLocaleString('uk-UA')} грн.`);
  doc.text('3.4. Передоплата вноситься протягом 3 днів після підписання договору.');
  doc.text('3.5. Доплата вноситься протягом 5 днів після здачі робіт.');

  doc.moveDown();
  doc.text(`'4. ПРАВА ТА ОБОВ'ЯЗКИ СТОРІН'`);
  doc.text('4.1. Виконавець має право використовувати створений сайт у своєму портфоліо.');
  doc.text('4.2. Замовник зобов’язується надати необхідну інформацію та матеріали для створення сайту.');

  doc.moveDown();
  doc.text('5. ФОРС-МАЖОР');
  doc.text('5.1. Сторони звільняються від відповідальності за часткове або повне невиконання зобов’язань за цим договором у разі настання форс-мажорних обставин.');
  doc.text('5.2. До форс-мажорних обставин належать: пожежі, повені, землетруси, війна, страйки, акти державних органів тощо.');
  doc.text('5.3. Сторона, яка не може виконати свої зобов’язання, повинна письмово повідомити іншу сторону протягом 5 днів.');

  doc.moveDown();
  doc.text('6. КОНФІДЕНЦІЙНІСТЬ');
  doc.text('6.1. Сторони зобов’язуються зберігати конфіденційність отриманої в процесі виконання цього Договору інформації.');

  doc.moveDown();
  doc.text('7. ВІДПОВІДАЛЬНІСТЬ СТОРІН');
  doc.text('7.1. У разі невиконання умов цього Договору винна сторона несе відповідальність згідно з чинним законодавством України.');

  doc.moveDown();
  doc.text('8. ІНШІ УМОВИ');
  doc.text('8.1. Усі зміни до Договору оформлюються письмово за погодженням обох сторін.');
  doc.text('8.2. Усі спори, що виникають у процесі виконання цього Договору, вирішуються шляхом переговорів, а у разі неможливості – в судовому порядку.');

  doc.moveDown();
  doc.text('9. РЕКВІЗИТИ СТОРІН');
  doc.text('Виконавець: ФОП Звірич Олександр Олександрович, Львів, Україна');
  doc.text(`Замовник: ${order.user.firstName} ${order.user.lastName}, email: ${order.user.email}, телефон: ${order.user.phone}`);

  doc.moveDown();
  doc.text('Підписи сторін:');
  doc.text('__________________       __________________');
  doc.text('     Виконавець                     Замовник');

  doc.end();

  return new Promise((resolve, reject) => {
    writeStream.on('finish', () => resolve(filePath));
    writeStream.on('error', reject);
  });
};

module.exports = { generatePDF };
