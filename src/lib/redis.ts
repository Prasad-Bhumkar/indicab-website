import { Redis } from '@upstash/redis';

// Initialize Redis client
const redis = new Redis({
    url: process.env.REDIS_URL || '',
    token: process.env.REDIS_TOKEN || '',
});

export async function cacheData<T>(_key: string, _data: T, _expirationInSeconds = 3600): Promise<void> {
    try {
        await redis.set(_key, JSON.stringify(_data), { ex: _expirationInSeconds });
    } catch (error) {
        console.error('Redis caching error:', error);
        // Fail silently - the application should work even if caching fails
    }
}

export async function getCachedData<T>(_key: string): Promise<T | null> {
    try {
        const cachedData = await redis.get(_key);
        return cachedData ? JSON.parse(cachedData as string) as T : null;
    } catch (error) {
        console.error('Redis retrieval error:', error);
        return null;
    }
}

export async function invalidateCache(_key: string): Promise<void> {
    try {
        await redis.del(_key);
    } catch (error) {
        console.error('Redis invalidation error:', error);
    }
}
