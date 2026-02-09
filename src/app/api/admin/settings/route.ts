import { NextRequest, NextResponse } from "next/server";
import { getAuthFromCookie } from "@/lib/auth";
import { getSettings, updateSettings } from "@/lib/storage";
import { testTelegramConnection } from "@/lib/telegram";
import { testEmailConnection } from "@/lib/email";

export async function GET() {
  const auth = await getAuthFromCookie();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const settings = getSettings();

  // Check connection status
  const telegramConfigured = !!(
    process.env.TELEGRAM_BOT_TOKEN &&
    process.env.TELEGRAM_CHAT_ID &&
    process.env.TELEGRAM_BOT_TOKEN !== "your-telegram-bot-token"
  );

  const emailConfigured = !!(
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    process.env.EMAIL_TO
  );

  return NextResponse.json({
    settings,
    status: {
      telegramConfigured,
      emailConfigured,
    },
  });
}

export async function PATCH(req: NextRequest) {
  const auth = await getAuthFromCookie();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const updates = await req.json();
    const settings = updateSettings(updates);
    return NextResponse.json({ settings });
  } catch (error) {
    console.error("Update settings error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await getAuthFromCookie();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { action } = await req.json();

    if (action === "test-telegram") {
      const result = await testTelegramConnection();
      return NextResponse.json(result);
    }

    if (action === "test-email") {
      const result = await testEmailConnection();
      return NextResponse.json(result);
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    console.error("Settings action error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
