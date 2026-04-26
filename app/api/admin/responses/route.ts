import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status") || undefined;
    const search = searchParams.get("search") || undefined;
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = (searchParams.get("sortOrder") || "desc") as "asc" | "desc";

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (search) {
      where.id = { contains: search, mode: "insensitive" };
    }

    const [total, responses] = await Promise.all([
      prisma.gaudiResponse.count({ where }),
      prisma.gaudiResponse.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          completionPercentage: true,
          status: true,
          isReviewed: true,
          reviewStatus: true,
          lastPageVisited: true,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: responses,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("Admin responses error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
