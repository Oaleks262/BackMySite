import { NextResponse } from "next/server";
import { getAuthFromCookie } from "@/lib/auth";
import { getLeadStats } from "@/lib/storage";

export async function GET() {
  const auth = await getAuthFromCookie();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stats = getLeadStats();
  return NextResponse.json({ stats });
}
