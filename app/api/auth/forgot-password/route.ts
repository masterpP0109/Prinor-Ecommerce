import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/mongodb";
import { sendPasswordResetEmail } from "@/lib/email";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Don't reveal if user exists or not for security
      return NextResponse.json(
        { message: "If an account with that email exists, a password reset link has been sent." },
        { status: 200 }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Create verification token for password reset
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: resetToken,
        expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
      },
    });

    // Send password reset email
    try {
      await sendPasswordResetEmail(email, resetToken);
    } catch (emailError) {
      console.error("Failed to send password reset email:", emailError);
      return NextResponse.json(
        { error: "Failed to send reset email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "If an account with that email exists, a password reset link has been sent." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}