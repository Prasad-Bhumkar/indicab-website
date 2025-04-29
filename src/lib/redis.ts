import { Redis } from '@upstash/redis';

// Initialize Redis client
const redis = new Redis({
  url: process.env.REDIS_URL || '',
  token: process.env.REDIS_TOKEN || '',
});

export async function cacheData<T>(key: string, data: T, expirationInSeconds = 3600): Promise<void> {
  try {
    await redis.set(key, JSON.stringify(data), { ex: expirationInSeconds });
  } catch (error) {
    console.error('Redis caching error:', error);
    // Fail silently - the application should work even if caching fails
  }
}

export async function getCachedData<T>(key: string): Promise<T | null> {
  try {
    const cachedData = await redis.get(key);
    return cachedData ? JSON.parse(cachedData as string) as T : null;
  } catch (error) {
    console.error('Redis retrieval error:', error);
    return null;
  }
}

export async function invalidateCache(key: string): Promise<void> {
  try {
    await redis.del(key);
  } catch (error) {
    console.error('Redis invalidation error:', error);
  }
}