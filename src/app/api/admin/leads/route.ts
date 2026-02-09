import { NextRequest, NextResponse } from "next/server";
import { getAuthFromCookie } from "@/lib/auth";
import { getLeads, updateLead, deleteLead } from "@/lib/storage";

async function checkAuth() {
  const auth = await getAuthFromCookie();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function GET() {
  const authError = await checkAuth();
  if (authError) return authError;

  const leads = getLeads();
  return NextResponse.json({ leads });
}

export async function PATCH(req: NextRequest) {
  const authError = await checkAuth();
  if (authError) return authError;

  try {
    const { id, ...updates } = await req.json();
    const updated = updateLead(id, updates);

    if (!updated) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ lead: updated });
  } catch (error) {
    console.error("Update lead error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const authError = await checkAuth();
  if (authError) return authError;

  try {
    const { id } = await req.json();
    const deleted = deleteLead(id);

    if (!deleted) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete lead error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
