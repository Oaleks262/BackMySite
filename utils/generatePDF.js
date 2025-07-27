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
  const contractVersion = order.contractVersion || 1;
  const filePath = path.join(pdfDir, `contract_${order._id}_v${contractVersion}.pdf`);
  
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
  
  doc.fontSize(18).text('ЦИВІЛЬНО-ПРАВОВИЙ ДОГОВІР', { align: 'center' });
  doc.fontSize(16).text('про надання послуг з розробки веб-сайту', { align: 'center' });
  doc.fontSize(14).text('№ ' + order._id.slice(-6), { align: 'center' });
  doc.moveDown();

  doc.fontSize(12).text(`м. Львів                                                            "${formatDate(contractDate)}"`, { align: 'left' });
  doc.moveDown();

  doc.text(`Звірич Олександр Миколайович, фізична особа, паспорт серія ВВ № 123456, виданий 01.01.2020 Львівським МВ УМВС України у Львівській області, код РНОКПП: 1234567890, надалі "Виконавець", з однієї сторони, та

${order.user.firstName} ${order.user.lastName}, фізична особа, надалі "Замовник", з іншої сторони,

уклали цей цивільно-правовий договір про наступне:`);

  doc.moveDown();
  doc.text('1. ПРЕДМЕТ ДОГОВОРУ');
  
  const template = getContractTemplate(order.tariffType);
  
  doc.text(`1.1. Виконавець зобов'язується виконати роботи з ${template.workDescription}.`);
  doc.text(`1.2. Тип проекту: ${getTariffName(order.tariffType)}`);
  if (order.selectedTemplate) {
    doc.text(`1.3. Обраний шаблон: ${order.selectedTemplate}`);
  }

  doc.moveDown();
  doc.text('1.4. Функціональні можливості:');
  template.features.forEach((feature, index) => {
    doc.text(`    ${index + 1}. ${feature}`);
  });

  doc.moveDown();
  doc.text('1.5. Результати роботи:');
  template.deliverables.forEach((deliverable, index) => {
    doc.text(`    ${index + 1}. ${deliverable}`);
  });

  // Додаємо специфікації з блоків
  if (order.blocks && Object.keys(order.blocks).length > 0) {
    doc.moveDown();
    doc.text('1.6. Додаткові специфікації проекту:');
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
  doc.text('4. ПРАВА ТА ОБОВ\'ЯЗКИ СТОРІН');
  
  doc.text('4.1. ОБОВ\'ЯЗКИ ВИКОНАВЦЯ:');
  doc.text('    - виконати роботи якісно та в строк;');
  doc.text('    - дотримуватися технічних вимог та побажань Замовника;');
  doc.text('    - забезпечити конфіденційність переданих даних;');
  doc.text('    - надати результат роботи у повному обсязі.');
  
  doc.text('4.2. ПРАВА ВИКОНАВЦЯ:');
  doc.text('    - вимагати своєчасної оплати виконаних робіт;');
  doc.text('    - запитувати у Замовника необхідні матеріали та інформацію;');
  doc.text('    - використовувати створений сайт у портфоліо (без конфіденційних даних).');
  
  doc.text('4.3. ОБОВ\'ЯЗКИ ЗАМОВНИКА:');
  doc.text('    - своєчасно оплачувати виконані роботи;');
  doc.text('    - надавати необхідні матеріали та інформацію;');
  doc.text('    - своєчасно розглядати та погоджувати етапи роботи.');
  
  doc.text('4.4. ПРАВА ЗАМОВНИКА:');
  doc.text('    - вимагати якісного та своєчасного виконання робіт;');
  doc.text('    - вносити обґрунтовані зміни до технічного завдання.');

  doc.moveDown();
  doc.text('5. ГАРАНТІЇ ТА ПІДТРИМКА');
  const warranty = getWarrantyTerms(order.tariffType);
  const maintenance = getMaintenanceTerms(order.tariffType);
  doc.text(`5.1. Гарантійний період: ${warranty.period}`);
  doc.text(`5.2. Гарантія покриває: ${warranty.coverage}`);
  doc.text(`5.3. Включена підтримка: ${maintenance.included}`);
  doc.text(`5.4. Додаткові послуги: ${maintenance.optional}`);

  doc.moveDown();
  doc.text('6. ФОРС-МАЖОР');
  doc.text('6.1. Сторони звільняються від відповідальності за часткове або повне невиконання зобов\'язань за цим договором у разі настання форс-мажорних обставин.');
  doc.text('6.2. До форс-мажорних обставин належать: пожежі, повені, землетруси, війна, страйки, акти державних органів тощо.');
  doc.text('6.3. Сторона, яка не може виконати свої зобов\'язання, повинна письмово повідомити іншу сторону протягом 5 днів.');

  doc.moveDown();
  doc.text('7. КОНФІДЕНЦІЙНІСТЬ');
  doc.text('7.1. Сторони зобов\'язуються зберігати конфіденційність отриманої в процесі виконання цього Договору інформації.');

  doc.moveDown();
  doc.text('8. ВІДПОВІДАЛЬНІСТЬ СТОРІН');
  doc.text('8.1. За несвоєчасне виконання зобов\'язань сторони несуть відповідальність згідно з Цивільним кодексом України.');
  doc.text('8.2. У разі затримки оплати Замовником понад 10 днів, Виконавець має право призупинити роботи.');
  doc.text('8.3. У разі затримки здачі робіт з вини Виконавця понад 7 днів, Замовник має право вимагати повернення передоплати.');
  doc.text('8.4. Сторони звільняються від відповідальності у разі дії обставин непереборної сили.');

  doc.moveDown();
  doc.text('9. ЕЛЕКТРОННІ ПІДПИСИ');
  doc.text('9.1. Даний договір може бути підписаний електронними підписами сторін.');
  doc.text('9.2. Електронні підписи мають таку ж юридичну силу, як і власноручні підписи.');

  doc.moveDown();
  doc.text('10. ПРАВОВЕ РЕГУЛЮВАННЯ');
  doc.text('10.1. Даний договір укладається відповідно до Цивільного кодексу України.');
  doc.text('10.2. Виконавець працює як фізична особа, без реєстрації підприємницької діяльності.');
  doc.text('10.3. Оподаткування здійснюється відповідно до Податкового кодексу України.');
  
  doc.moveDown();
  doc.text('11. ІНШІ УМОВИ');
  doc.text('11.1. Усі зміни до Договору оформлюються письмово за погодженням обох сторін.');
  doc.text('11.2. Усі спори, що виникають у процесі виконання цього Договору, вирішуються шляхом переговорів, а у разі неможливості – в судовому порядку.');
  doc.text('11.3. Договір набуває чинності з моменту підписання сторонами.');
  doc.text('11.4. Договір діє до повного виконання сторонами своїх зобов\'язань.');

  doc.moveDown();
  doc.text('12. РЕКВІЗИТИ СТОРІН');
  
  doc.text('ВИКОНАВЕЦЬ:');
  doc.text('Звірич Олександр Миколайович');
  doc.text('Фізична особа');
  doc.text('Паспорт: серія ВВ № 123456');
  doc.text('Код РНОКПП: 1234567890');
  doc.text('Адреса: м. Львів, Україна');
  doc.text('Email: growthtech.contact@gmail.com');
  doc.text('Телефон: +380675252300');
  
  doc.moveDown(0.5);
  doc.text('ЗАМОВНИК:');
  doc.text(`${order.user.firstName} ${order.user.lastName}`);
  doc.text('Фізична особа');
  doc.text(`Email: ${order.user.email}`);
  doc.text(`Телефон: ${order.user.phone}`);

  doc.moveDown();
  if (order.executorSignature && order.clientSignature) {
    doc.text('Підписи сторін:');
    doc.text(`Виконавець: ${order.executorSignature.name} (підписано ${formatDate(order.executorSignature.date)})`);
    doc.text(`Замовник: ${order.clientSignature.name} (підписано ${formatDate(order.clientSignature.date)})`);
  } else {
    doc.text('Підписи сторін:');
    doc.text('__________________       __________________');
    doc.text('     Виконавець                     Замовник');
  }

  doc.moveDown();
  doc.fontSize(10).text(`Версія договору: ${contractVersion}`, { align: 'right' });
  doc.text(`Дата створення: ${formatDate(contractDate)}`, { align: 'right' });

  doc.end();

  return new Promise((resolve, reject) => {
    writeStream.on('finish', () => resolve(filePath));
    writeStream.on('error', reject);
  });
};

module.exports = { generatePDF };