import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
    url: process.env.REDIS_URL || '',
    token: process.env.REDIS_TOKEN || '',
});

const WINDOW_SIZE_IN_SECONDS = parseInt(process.env.RATE_LIMIT_WINDOW || '60', 10);
const _MAX_REQUESTS_PER_WINDOW = parseInt(process.env.RATE_LIMIT_MAX || '100', 10);

function getClientIp(request: Request): string {
    const xForwardedFor = request.headers.get('x-forwarded-for');
    if (xForwardedFor) {
        // x-forwarded-for can be a comma-separated list of IPs
        return xForwardedFor.split(',')[0].trim();
    }
    const remoteAddr = request.headers.get('remote_addr');
    if (remoteAddr) {
        return remoteAddr;
    }
    return 'unknown';
}

export async function rateLimit(request: Request) {
    try {
        const ip = getClientIp(request);
        const key = `rate_limit:${ip}`;
        const current = await redis.incr(key);

        if (current === 1) {
            await redis.expire(key, WINDOW_SIZE_IN_SECONDS);
        }

        if (current > _MAX_REQUESTS_PER_WINDOW) {
            // Log rate limit event here if needed
            console.warn(`Rate limit exceeded for IP: ${ip}`);
            return NextResponse.json(
                { error: 'Too many requests' },
                { status: 429, headers: { 'Retry-After': WINDOW_SIZE_IN_SECONDS.toString() } }
            );
        }

        return null; // Allow request
    } catch (_error) {
        // Fail open - allow request if rate limiting fails
        return null;
    }
}
