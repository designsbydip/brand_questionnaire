import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { calculateCompletionPercentage } from "@/lib/exportHelpers";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { formData, status = "submitted" } = body;
    const completionPercentage = calculateCompletionPercentage(formData || {});

    const response = await prisma.gaudiResponse.create({
      data: {
        ...formData,
        status,
        completionPercentage,
      },
    });

    return NextResponse.json({ success: true, id: response.id, message: "Response created" });
  } catch (error) {
    console.error("Create response error:", error);
    return NextResponse.json({ success: false, message: "Failed to create response" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, message: "ID required" }, { status: 400 });
    }
    const response = await prisma.gaudiResponse.findUnique({ where: { id } });
    if (!response) {
      return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: response });
  } catch (error) {
    console.error("Get response error:", error);
    return NextResponse.json({ success: false, message: "Failed to retrieve" }, { status: 500 });
  }
}
