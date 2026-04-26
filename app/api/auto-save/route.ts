import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { calculateCompletionPercentage } from "@/lib/exportHelpers";

import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { formData, lastPageVisited = 1 } = body;

    const completionPercentage = calculateCompletionPercentage(formData || {});

    // Upsert based on userId
    const response = await prisma.gaudiResponse.upsert({
      where: { userId: user.id },
      update: {
        ...formData,
        lastPageVisited,
        completionPercentage,
        updatedAt: new Date(),
      },
      create: {
        userId: user.id,
        ...formData,
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
    return NextResponse.json(
      { success: false, message: "Failed to save" },
      { status: 500 }
    );
  }
}
