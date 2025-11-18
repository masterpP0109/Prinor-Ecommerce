import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { prisma } from "@/lib/db/mongodb";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });

    if (!currentUser || currentUser.role !== "ADMIN" || !currentUser.isApproved) {
      return NextResponse.json(
        { error: "Forbidden: Only approved admins can view requests" },
        { status: 403 }
      );
    }

    const requests = await prisma.adminRequest.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isApproved: true,
          },
        },
        reviewer: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        requestedAt: 'desc',
      },
    });

    return NextResponse.json(
      { requests },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch admin requests error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}