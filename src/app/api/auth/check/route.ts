import { NextResponse } from "next/server";
import { getAuthFromCookie } from "@/lib/auth";

export async function GET() {
  try {
    const auth = await getAuthFromCookie();
    return NextResponse.json({ authenticated: !!auth, user: auth });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json({ authenticated: false, user: null });
  }
}
