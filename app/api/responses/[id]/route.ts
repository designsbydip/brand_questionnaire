import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { calculateCompletionPercentage } from "@/lib/exportHelpers";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const response = await prisma.gaudiResponse.findUnique({ where: { id } });
    if (!response) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: response });
  } catch {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = await request.json();
    const { formData, status } = body;
    const completionPercentage = calculateCompletionPercentage(formData || {});
    const updated = await prisma.gaudiResponse.update({
      where: { id },
      data: { ...formData, status, completionPercentage },
    });
    return NextResponse.json({ success: true, data: updated });
  } catch {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await prisma.gaudiResponse.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
