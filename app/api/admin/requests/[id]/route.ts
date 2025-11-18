import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { prisma } from "@/lib/db/mongodb";
import { sendAdminRequestResponseEmail } from "@/lib/email";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
        { error: "Forbidden: Only approved admins can review requests" },
        { status: 403 }
      );
    }

    const { status } = await request.json();

    if (!["APPROVED", "REJECTED"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be APPROVED or REJECTED" },
        { status: 400 }
      );
    }

    const requestId = params.id;

    // Get the request with user info
    const adminRequest = await prisma.adminRequest.findUnique({
      where: { id: requestId },
      include: {
        user: true,
      },
    });

    if (!adminRequest) {
      return NextResponse.json(
        { error: "Request not found" },
        { status: 404 }
      );
    }

    if (adminRequest.status !== "PENDING") {
      return NextResponse.json(
        { error: "Request has already been reviewed" },
        { status: 400 }
      );
    }

    // Update the request
    const updatedRequest = await prisma.adminRequest.update({
      where: { id: requestId },
      data: {
        status: status as "APPROVED" | "REJECTED",
        reviewedAt: new Date(),
        reviewedBy: currentUser.id,
      },
      include: {
        user: true,
        reviewer: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    // If approved, update user role and approval
    if (status === "APPROVED") {
      await prisma.user.update({
        where: { id: adminRequest.userId },
        data: {
          role: "ADMIN",
          isApproved: true,
        },
      });
    }

    // Send email notification to the user
    try {
      await sendAdminRequestResponseEmail(
        adminRequest.user.email,
        status as "APPROVED" | "REJECTED",
        currentUser.email!
      );
    } catch (emailError) {
      console.error("Failed to send response email:", emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      { message: `Request ${status.toLowerCase()} successfully`, request: updatedRequest },
      { status: 200 }
    );
  } catch (error) {
    console.error("Review admin request error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}