import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";
import { addLead } from "@/lib/storage";
import { sendTelegramNotification } from "@/lib/telegram";
import { sendEmailNotification } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = contactFormSchema.parse(body);

    // Save to JSON
    const lead = addLead({
      type: "contact",
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
    });

    // Send notifications (fire and forget)
    const notificationData = {
      type: "contact" as const,
      ...data,
    };

    sendTelegramNotification(notificationData).catch(console.error);
    sendEmailNotification(notificationData).catch(console.error);

    return NextResponse.json({ success: true, id: lead.id });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { success: false, error: "Невірні дані форми" },
        { status: 400 }
      );
    }
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, error: "Помилка сервера" },
      { status: 500 }
    );
  }
}
