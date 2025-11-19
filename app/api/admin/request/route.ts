import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { prisma } from "@/lib/db/mongodb";
import { sendAdminRequestEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
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

    if (!currentUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Check if user already has admin role
    if (currentUser.role === "ADMIN") {
      return NextResponse.json(
        { error: "You already have admin privileges" },
        { status: 400 }
      );
    }

    // Check if user already has a pending request
    const existingRequest = await prisma.adminRequest.findFirst({
      where: {
        userId: currentUser.id,
        status: "PENDING",
      },
    });

    if (existingRequest) {
      return NextResponse.json(
        { error: "You already have a pending admin request" },
        { status: 400 }
      );
    }

    const { reason } = await request.json();

    // Create the request
    const adminRequest = await prisma.adminRequest.create({
      data: {
        userId: currentUser.id,
        reason: reason || null,
      },
    });

    // Get all admin emails to notify
    const admins = await prisma.user.findMany({
      where: {
        role: "ADMIN",
        isApproved: true,
      },
      select: {
        email: true,
      },
    });

    // Send email notifications to all admins
    const emailPromises = admins.map((admin: { email: string }) =>
      sendAdminRequestEmail(admin.email, currentUser.email!, reason)
    );

    // Send emails asynchronously (don't wait for them)
    Promise.allSettled(emailPromises).catch(console.error);

    return NextResponse.json(
      { message: "Admin access request submitted successfully", requestId: adminRequest.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Admin request error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}