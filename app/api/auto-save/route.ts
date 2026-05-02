import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { calculateCompletionPercentage } from "@/lib/exportHelpers";

import { createClient } from "@/lib/supabase/server";

// Columns the client must never set directly via auto-save
const SYSTEM_FIELDS = new Set([
  "id", "createdAt", "updatedAt", "userId",
  "completionPercentage", "status", "lastPageVisited",
  "isReviewed", "reviewStatus", "reviewedAt", "adminNotes",
]);

// Form fields that map to Prisma DateTime columns
const DATE_FIELDS = new Set(["gaudiStartDate"]);

function sanitizeFormData(input: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input)) {
    if (SYSTEM_FIELDS.has(key)) continue;
    if (DATE_FIELDS.has(key)) {
      if (typeof value === "string" && value.length > 0) {
        const d = new Date(value);
        if (!isNaN(d.getTime())) result[key] = d;
      } else if (value instanceof Date) {
        result[key] = value;
      }
      continue;
    }
    result[key] = value;
  }
  return result;
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { formData, lastPageVisited = 1 } = body;

    const cleanData = sanitizeFormData(formData || {});
    const completionPercentage = calculateCompletionPercentage(formData || {});

    // Upsert based on userId
    const response = await prisma.gaudiResponse.upsert({
      where: { userId: user.id },
      update: {
        ...cleanData,
        lastPageVisited,
        completionPercentage,
        updatedAt: new Date(),
      },
      create: {
        userId: user.id,
        ...cleanData,
        status: "draft",
        lastPageVisited,
        completionPercentage,
      },
    });

    return NextResponse.json({
      success: true,
      id: response.id,
      savedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Auto-save error:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}
