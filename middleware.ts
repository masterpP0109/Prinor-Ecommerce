import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple in-memory rate limiting (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5; // Max requests per window

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const clientIP = request.headers.get('x-client-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  if (clientIP) {
    return clientIP;
  }

  // Fallback to a default
  return 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const userData = rateLimitMap.get(ip);

  if (!userData || now > userData.resetTime) {
    // Reset or initialize rate limit data
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (userData.count >= MAX_REQUESTS) {
    return true;
  }

  userData.count++;
  return false;
}

export function middleware(request: NextRequest) {
  // Apply rate limiting to auth endpoints
  if (request.nextUrl.pathname.startsWith('/api/auth/')) {
    const clientIP = getClientIP(request);

    if (isRateLimited(clientIP)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/auth/:path*',
};