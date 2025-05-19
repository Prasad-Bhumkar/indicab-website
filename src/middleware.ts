import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { z } from 'zod';

// Rate limiting configuration
const ratelimit = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(10, '10 s'),
      analytics: true,
      prefix: 'ratelimit',
    })
  : null;

// Security headers configuration
const securityHeaders = {
  'X-DNS-Prefetch-Control': 'on',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-XSS-Protection': '1; mode=block',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'origin-when-cross-origin',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' blob: data: https://*.stripe.com",
    "font-src 'self' data:",
    "frame-src 'self' https://*.stripe.com",
    "connect-src 'self' https://*.stripe.com https://api.posthog.com",
  ].join('; '),
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'require-corp',
  'Cross-Origin-Resource-Policy': 'same-origin',
};

// Request validation
export class ValidationError extends Error {
  constructor(public errors: z.ZodError) {
    super('Validation Error');
    this.name = 'ValidationError';
  }
}

export function validateRequest<T>(schema: z.Schema<T>) {
  return async (request: Request) => {
    try {
      const body = await request.json();
      const validatedData = await schema.parseAsync(body);
      return { data: validatedData };
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ValidationError(error);
      }
      throw error;
    }
  };
}

export function handleApiError(error: unknown) {
  if (error instanceof ValidationError) {
    return NextResponse.json(
      {
        error: 'Validation Error',
        details: error.errors.errors.map((e) => ({
          path: e.path.join('.'),
          message: e.message,
        })),
      },
      { status: 400 }
    );
  }

  if (error instanceof Error) {
    // Log error for monitoring
    console.error(`API Error: ${error.message}`, {
      stack: error.stack,
      name: error.name,
    });

    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { error: 'Internal Server Error' },
    { status: 500 }
  );
}

// Main middleware function
export async function middleware(request: NextRequest) {
  try {
    const response = NextResponse.next();

    // Add security headers
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    // Rate limiting (only if configured)
    if (ratelimit) {
      const ip = request.ip ?? '127.0.0.1';
      const { success, limit, reset, remaining } = await ratelimit.limit(ip);

      if (!success) {
        console.warn(`Rate limit exceeded for IP: ${ip}`);
        return new NextResponse('Too Many Requests', {
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': reset.toString(),
            'Retry-After': Math.ceil((reset - Date.now()) / 1000).toString(),
          },
        });
      }
    }

    // Authentication check for protected routes
    const token = await getToken({ req: request });
    const isAuthPage = request.nextUrl.pathname.startsWith('/auth');
    const isApiRoute = request.nextUrl.pathname.startsWith('/api');
    const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard');
    const isPublicRoute = request.nextUrl.pathname.startsWith('/public');

    // Handle authentication redirects
    if (isProtectedRoute && !token) {
      const redirectUrl = new URL('/auth/login', request.url);
      redirectUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }

    if (isAuthPage && token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // API route protection
    if (isApiRoute && !isPublicRoute && !token) {
      return new NextResponse('Unauthorized', { 
        status: 401,
        headers: {
          'WWW-Authenticate': 'Bearer',
        },
      });
    }

    return response;
  } catch (error) {
    // Log unexpected errors
    console.error('Middleware Error:', error);
    
    // Return a generic error response
    return new NextResponse('Internal Server Error', { 
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public/|api/public/).*)',
  ],
}; 