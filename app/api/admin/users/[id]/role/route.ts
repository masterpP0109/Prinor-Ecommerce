import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { prisma } from "@/lib/db/mongodb";

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
        { error: "Forbidden: Only approved admins can update user roles" },
        { status: 403 }
      );
    }

    const { role, isApproved } = await request.json();

    // Validate role
    const validRoles = ["BUYER", "SELLER", "ADMIN"];
    if (role && !validRoles.includes(role.toUpperCase())) {
      return NextResponse.json(
        { error: "Invalid role" },
        { status: 400 }
      );
    }

    const userId = params.id;

    // Prevent admin from demoting themselves or changing their own approval
    if (userId === currentUser.id) {
      return NextResponse.json(
        { error: "Cannot modify your own role or approval status" },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (role !== undefined) {
      updateData.role = role.toUpperCase();
    }
    if (isApproved !== undefined) {
      updateData.isApproved = isApproved;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isApproved: true,
      },
    });

    return NextResponse.json(
      { message: "User updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update user role error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}