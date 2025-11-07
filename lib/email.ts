import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/auth/verify-email?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Verify your email address",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome to Prinor Ecommerce!</h2>
        <p>Please verify your email address by clicking the link below:</p>
        <a href="${verificationUrl}" style="background-color: #9333ea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 16px 0;">
          Verify Email
        </a>
        <p>If you didn't create an account, you can safely ignore this email.</p>
        <p>This link will expire in 24 hours.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Reset your password",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Password Reset Request</h2>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetUrl}" style="background-color: #9333ea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 16px 0;">
          Reset Password
        </a>
        <p>If you didn't request this, you can safely ignore this email.</p>
        <p>This link will expire in 1 hour.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};