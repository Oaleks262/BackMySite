import { NextRequest, NextResponse } from "next/server";
import { calculatorFormSchema } from "@/lib/validations";
import { addLead } from "@/lib/storage";
import { sendTelegramNotification } from "@/lib/telegram";
import { sendEmailNotification } from "@/lib/email";
import {
  calculatePrice,
  getProjectTypeLabel,
  getDesignLabel,
  getTimelineLabel,
  getFeatureLabels,
} from "@/lib/calculator-data";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = calculatorFormSchema.parse(body);

    // Calculate price
    const { priceMin, priceMax, daysMin, daysMax } = calculatePrice(
      data.projectType,
      data.design,
      data.features,
      data.timeline
    );

    // Get labels for notification
    const projectLabel = getProjectTypeLabel(data.projectType);
    const designLabel = getDesignLabel(data.design);
    const timelineLabel = getTimelineLabel(data.timeline);
    const featureLabels = getFeatureLabels(data.features);

    // Save to JSON
    const lead = addLead({
      type: "calculator",
      name: data.contact.name,
      email: data.contact.email,
      phone: data.contact.phone,
      message: data.contact.message,
      calculatorData: {
        projectType: projectLabel,
        design: designLabel,
        features: featureLabels,
        timeline: timelineLabel,
        priceMin,
        priceMax,
        daysMin,
        daysMax,
      },
    });

    // Send notifications
    const notificationData = {
      type: "calculator" as const,
      name: data.contact.name,
      email: data.contact.email,
      phone: data.contact.phone,
      calculatorData: {
        projectType: projectLabel,
        design: designLabel,
        features: featureLabels,
        timeline: timelineLabel,
        priceMin,
        priceMax,
      },
    };

    sendTelegramNotification(notificationData).catch(console.error);
    sendEmailNotification(notificationData).catch(console.error);

    return NextResponse.json({
      success: true,
      id: lead.id,
      estimate: { priceMin, priceMax, daysMin, daysMax },
    });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { success: false, error: "Невірні дані форми" },
        { status: 400 }
      );
    }
    console.error("Calculator error:", error);
    return NextResponse.json(
      { success: false, error: "Помилка сервера" },
      { status: 500 }
    );
  }
}
