import { NextRequest, NextResponse } from "next/server";
import { sign } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/db/mongodb';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key'; // Use environment variable for security

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.password) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const token = sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });

    return NextResponse.json({ token, user: { id: user.id, role: user.role } });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}