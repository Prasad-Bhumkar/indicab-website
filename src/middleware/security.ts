import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { apiRateLimiter } from '@/utils/rate-limiter';

// Security headers configuration
const securityHeaders = {
  'Content-Security-Policy': 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "font-src 'self' data:; " +
    "connect-src 'self' https:;",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 
    'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
};

// Sanitize request data
function sanitizeData(data: unknown): unknown {
  if (typeof data !== 'object' || data === null) {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(sanitizeData);
  }

  const sanitized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
    // Sanitize keys
    const sanitizedKey = key.replace(/[<>]/g, '');
    
    // Sanitize values
    let sanitizedValue = value;
    if (typeof value === 'string') {
      sanitizedValue = value
        .replace(/[<>]/g, '')
        .replace(/javascript:/gi, '')
        .replace(/data:/gi, '');
    } else if (typeof value === 'object' && value !== null) {
      sanitizedValue = sanitizeData(value);
    }

    sanitized[sanitizedKey] = sanitizedValue;
  }

  return sanitized;
}

export async function middleware(request: NextRequest) {
  // Apply security headers to all responses
  const response = NextResponse.next();
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Rate limiting for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
    if (apiRateLimiter.isRateLimited(ip)) {
      return new NextResponse(
        JSON.stringify({
          error: 'Too many requests',
          retryAfter: Math.ceil(apiRateLimiter.getResetTime(ip) / 1000)
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': Math.ceil(apiRateLimiter.getResetTime(ip) / 1000).toString()
          }
        }
      );
    }
  }

  // Sanitize request data
  if (request.method === 'POST' || request.method === 'PUT') {
    try {
      const body = await request.json();
      const sanitizedBody = sanitizeData(body);
      
      // Create new request with sanitized body
      const newRequest = new NextRequest(request.url, {
        method: request.method,
        headers: request.headers,
        body: JSON.stringify(sanitizedBody)
      });

      return NextResponse.next({
        request: newRequest
      });
    } catch (error) {
      // If body parsing fails, continue with original request
      console.error('Error sanitizing request body:', error);
    }
  }

  return response;
}

export const config = {
  matcher: [
    // Apply to all routes
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 