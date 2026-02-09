import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface EmailData {
  type: "contact" | "calculator";
  name: string;
  email: string;
  phone: string;
  message?: string;
  calculatorData?: {
    projectType: string;
    design: string;
    features: string[];
    timeline: string;
    priceMin: number;
    priceMax: number;
  };
}

export async function sendEmailNotification(data: EmailData): Promise<boolean> {
  const companyEmail = process.env.EMAIL_TO;
  const from = process.env.EMAIL_FROM;

  if (!companyEmail || !from || !process.env.SMTP_USER) {
    console.log("Email credentials not configured, skipping notification");
    return false;
  }

  // Send to company
  await sendCompanyNotification(data, companyEmail, from);

  // Send confirmation to client
  await sendClientConfirmation(data, from);

  return true;
}

async function sendCompanyNotification(data: EmailData, to: string, from: string): Promise<void> {
  let subject = "";
  let html = "";

  const baseStyles = `
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  `;

  if (data.type === "contact") {
    subject = `🔔 Нова заявка від ${data.name}`;
    html = `
      <div style="${baseStyles}">
        <div style="background: linear-gradient(135deg, #003366 0%, #004d99 100%); padding: 30px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Нова заявка з контактної форми</h1>
        </div>
        <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
                <strong style="color: #6b7280;">Ім'я:</strong>
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
                ${data.name}
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
                <strong style="color: #6b7280;">Email:</strong>
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
                <a href="mailto:${data.email}" style="color: #00d4aa;">${data.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
                <strong style="color: #6b7280;">Телефон:</strong>
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
                <a href="tel:${data.phone}" style="color: #00d4aa;">${data.phone}</a>
              </td>
            </tr>
          </table>

          <div style="margin-top: 20px; padding: 20px; background: #f9fafb; border-radius: 8px;">
            <strong style="color: #6b7280;">Повідомлення:</strong>
            <p style="margin: 10px 0 0; color: #374151;">${data.message || "Не вказано"}</p>
          </div>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">
            Відправлено з growth-tech.com.ua о ${new Date().toLocaleString("uk-UA")}
          </p>
        </div>
      </div>
    `;
  } else {
    const calc = data.calculatorData!;
    subject = `🧮 Розрахунок вартості від ${data.name} ($${calc.priceMin}-$${calc.priceMax})`;
    html = `
      <div style="${baseStyles}">
        <div style="background: linear-gradient(135deg, #003366 0%, #004d99 100%); padding: 30px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Новий розрахунок вартості</h1>
        </div>
        <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">

          <h3 style="color: #374151; margin: 0 0 15px;">📋 Контактні дані</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
            <tr>
              <td style="padding: 8px 0;"><strong style="color: #6b7280;">Ім'я:</strong></td>
              <td style="padding: 8px 0;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong style="color: #6b7280;">Email:</strong></td>
              <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #00d4aa;">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong style="color: #6b7280;">Телефон:</strong></td>
              <td style="padding: 8px 0;"><a href="tel:${data.phone}" style="color: #00d4aa;">${data.phone}</a></td>
            </tr>
          </table>

          <h3 style="color: #374151; margin: 0 0 15px;">🛠️ Деталі проєкту</h3>
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
            <p style="margin: 8px 0;"><strong>Тип проєкту:</strong> ${calc.projectType}</p>
            <p style="margin: 8px 0;"><strong>Дизайн:</strong> ${calc.design}</p>
            <p style="margin: 8px 0;"><strong>Функціонал:</strong> ${calc.features.join(", ") || "Базовий"}</p>
            <p style="margin: 8px 0;"><strong>Терміни:</strong> ${calc.timeline}</p>
          </div>

          <div style="background: linear-gradient(135deg, #00d4aa 0%, #00e6b8 100%); padding: 20px; border-radius: 8px; text-align: center;">
            <p style="margin: 0; color: #003366; font-size: 14px;">Орієнтовна вартість</p>
            <p style="margin: 5px 0 0; color: #003366; font-size: 28px; font-weight: bold;">$${calc.priceMin} — $${calc.priceMax}</p>
          </div>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">
            Відправлено з growth-tech.com.ua о ${new Date().toLocaleString("uk-UA")}
          </p>
        </div>
      </div>
    `;
  }

  try {
    await transporter.sendMail({
      from,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error("Company email send error:", error);
  }
}

async function sendClientConfirmation(data: EmailData, from: string): Promise<void> {
  const baseStyles = `
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  `;

  let subject = "";
  let html = "";

  if (data.type === "contact") {
    subject = "✅ Дякуємо за звернення — Growth Tech";
    html = `
      <div style="${baseStyles}">
        <div style="background: linear-gradient(135deg, #003366 0%, #004d99 100%); padding: 30px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Дякуємо за звернення!</h1>
        </div>
        <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            Вітаємо, ${data.name}! 👋
          </p>
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            Ми отримали ваше повідомлення і зв'яжемося з вами найближчим часом.
          </p>

          <div style="margin: 25px 0; padding: 20px; background: #f9fafb; border-radius: 8px;">
            <strong style="color: #6b7280;">Ваше повідомлення:</strong>
            <p style="margin: 10px 0 0; color: #374151;">${data.message || "Не вказано"}</p>
          </div>

          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            Якщо у вас є термінове питання, телефонуйте:<br>
            <a href="tel:+380671234567" style="color: #00d4aa; font-weight: bold;">+38 (067) 123-45-67</a>
          </p>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">
            З повагою, команда Growth Tech<br>
            <a href="https://growth-tech.com.ua" style="color: #00d4aa;">growth-tech.com.ua</a>
          </p>
        </div>
      </div>
    `;
  } else {
    const calc = data.calculatorData!;
    subject = "✅ Ваш розрахунок готовий — Growth Tech";
    html = `
      <div style="${baseStyles}">
        <div style="background: linear-gradient(135deg, #003366 0%, #004d99 100%); padding: 30px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Ваш розрахунок готовий!</h1>
        </div>
        <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            Вітаємо, ${data.name}! 👋
          </p>
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            Дякуємо за ваш інтерес до наших послуг. Ось деталі вашого запиту:
          </p>

          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <h3 style="color: #374151; margin: 0 0 15px;">📋 Деталі проєкту</h3>
            <p style="margin: 8px 0; color: #374151;"><strong>Тип:</strong> ${calc.projectType}</p>
            <p style="margin: 8px 0; color: #374151;"><strong>Дизайн:</strong> ${calc.design}</p>
            <p style="margin: 8px 0; color: #374151;"><strong>Функціонал:</strong> ${calc.features.join(", ") || "Базовий"}</p>
            <p style="margin: 8px 0; color: #374151;"><strong>Терміни:</strong> ${calc.timeline}</p>
          </div>

          <div style="background: linear-gradient(135deg, #00d4aa 0%, #00e6b8 100%); padding: 25px; border-radius: 8px; text-align: center; margin: 25px 0;">
            <p style="margin: 0; color: #003366; font-size: 14px;">Орієнтовна вартість</p>
            <p style="margin: 5px 0 0; color: #003366; font-size: 32px; font-weight: bold;">$${calc.priceMin} — $${calc.priceMax}</p>
          </div>

          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            Наш менеджер зв'яжеться з вами найближчим часом для уточнення деталей та обговорення проєкту.
          </p>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">
            З повагою, команда Growth Tech<br>
            <a href="https://growth-tech.com.ua" style="color: #00d4aa;">growth-tech.com.ua</a>
          </p>
        </div>
      </div>
    `;
  }

  try {
    await transporter.sendMail({
      from,
      to: data.email,
      subject,
      html,
    });
  } catch (error) {
    console.error("Client email send error:", error);
  }
}

export async function testEmailConnection(): Promise<{ success: boolean; message: string }> {
  const to = process.env.EMAIL_TO;
  const from = process.env.EMAIL_FROM;

  if (!to || !from || !process.env.SMTP_USER) {
    return { success: false, message: "Email не налаштовано" };
  }

  try {
    await transporter.sendMail({
      from,
      to,
      subject: "✅ Тестове повідомлення з Growth-Tech",
      html: `
        <div style="font-family: sans-serif; max-width: 400px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #003366;">Тестове повідомлення</h2>
          <p>Email сповіщення працюють коректно!</p>
          <p style="color: #666; font-size: 12px;">Відправлено ${new Date().toLocaleString("uk-UA")}</p>
        </div>
      `,
    });
    return { success: true, message: "Email працює коректно" };
  } catch (error) {
    return { success: false, message: `Помилка: ${error}` };
  }
}
