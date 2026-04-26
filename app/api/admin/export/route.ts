import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createClient } from "@/lib/supabase/server";
import { generateCSV, generateJSON } from "@/lib/exportHelpers";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get("format") || "json";
    const status = searchParams.get("status") || undefined;

    const where: Record<string, unknown> = {};
    if (status) where.status = status;

    const responses = await prisma.gaudiResponse.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    if (format === "csv") {
      const csv = generateCSV(responses as unknown as Record<string, unknown>[]);
      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="gaudi_responses_${Date.now()}.csv"`,
        },
      });
    }

    const json = generateJSON(responses as unknown as Record<string, unknown>[]);
    return new NextResponse(json, {
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="gaudi_responses_${Date.now()}.json"`,
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json({ success: false, message: "Export failed" }, { status: 500 });
  }
}
