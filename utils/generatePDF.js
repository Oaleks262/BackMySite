// 📁 utils/generatePDF.js
const fs = require('fs');
const PDFDocument = require('pdfkit');
const path = require('path');

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

  doc.fontSize(18).text('ДОГОВІР № ' + order._id, { align: 'center' });
  doc.moveDown();

  doc.fontSize(12).text(`м. Львів                                                            "${new Date().toLocaleDateString()}"`, { align: 'left' });
  doc.moveDown();

  doc.text(`ФОП Звірич Олександр Олександрович, надалі "Виконавець", з однієї сторони, та
${order.user.firstName} ${order.user.lastName}, надалі "Замовник", з іншої сторони,
уклали цей Договір про наступне:`);

  doc.moveDown();
  doc.text('1. ПРЕДМЕТ ДОГОВОРУ');
  doc.text('1.1. Виконавець зобов’язується створити веб-сайт відповідно до обраного шаблону Замовником:');
  doc.text(`    - Обраний шаблон: ${order.selectedTemplate}`);

  doc.moveDown();
  doc.text('2. СТРОКИ ВИКОНАННЯ');
  doc.text('2.1. Виконавець зобов’язується виконати роботи протягом 14-30 календарних днів з моменту погодження всіх матеріалів.');

  doc.moveDown();
  doc.text('3. ВАРТІСТЬ ТА ОПЛАТА');
  doc.text('3.1. Вартість робіт визначається за домовленістю сторін.');
  doc.text('3.2. Оплата здійснюється у два етапи: 30% передоплата, 70% після завершення робіт.');
  doc.text('3.3. У разі затримки платежів, строки виконання робіт можуть бути переглянуті.');

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
