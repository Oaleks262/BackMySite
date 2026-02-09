interface TelegramMessage {
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

function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, "\\$&");
}

export async function sendTelegramNotification(data: TelegramMessage): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId || token === "your-telegram-bot-token") {
    console.log("Telegram credentials not configured, skipping notification");
    return false;
  }

  let text = "";

  if (data.type === "contact") {
    text = `
🔔 *Нова заявка з сайту\\!*

👤 *Ім'я:* ${escapeMarkdown(data.name)}
📧 *Email:* ${escapeMarkdown(data.email)}
📱 *Телефон:* ${escapeMarkdown(data.phone)}

💬 *Повідомлення:*
${escapeMarkdown(data.message || "Не вказано")}

🕐 ${escapeMarkdown(new Date().toLocaleString("uk-UA"))}
    `.trim();
  } else {
    const calc = data.calculatorData!;
    text = `
🧮 *Новий розрахунок вартості\\!*

👤 *Ім'я:* ${escapeMarkdown(data.name)}
📧 *Email:* ${escapeMarkdown(data.email)}
📱 *Телефон:* ${escapeMarkdown(data.phone)}

📋 *Деталі проєкту:*
• Тип: ${escapeMarkdown(calc.projectType)}
• Дизайн: ${escapeMarkdown(calc.design)}
• Функціонал: ${escapeMarkdown(calc.features.join(", ") || "Базовий")}
• Терміни: ${escapeMarkdown(calc.timeline)}

💰 *Орієнтовна вартість:* $${calc.priceMin} — $${calc.priceMax}

🕐 ${escapeMarkdown(new Date().toLocaleString("uk-UA"))}
    `.trim();
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "MarkdownV2",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Telegram API error:", errorData);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Telegram send error:", error);
    return false;
  }
}

export async function testTelegramConnection(): Promise<{ success: boolean; message: string }> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId || token === "your-telegram-bot-token") {
    return { success: false, message: "Telegram не налаштовано" };
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: "✅ Тестове повідомлення з Growth-Tech\n\nTelegram сповіщення працюють коректно!",
      }),
    });

    if (response.ok) {
      return { success: true, message: "Telegram працює коректно" };
    } else {
      const errorData = await response.json();
      return { success: false, message: `Помилка: ${errorData.description}` };
    }
  } catch (error) {
    return { success: false, message: `Помилка підключення: ${error}` };
  }
}
