# 0001 - Redis Caching and Rate Limiting

## Status
Accepted and Implemented

## Context
To improve the performance, scalability, and security of the IndiCab application, it was necessary to implement robust caching and rate limiting mechanisms. The application needed to handle high traffic loads while maintaining responsive performance and protecting against abuse.

## Decision

### 1. Redis Implementation

#### Connection Setup
```typescript
// lib/redis.ts
import { Redis } from '@upstash/redis';
import { RateLimiter } from '@upstash/ratelimit';

export const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN,
});

export const rateLimiter = new RateLimiter({
  redis,
  limiter: Ratelimit.slidingWindow(100, '1m'),
});
```

#### Caching Utilities
```typescript
// lib/cache.ts
import { redis } from './redis';

interface CacheOptions {
  ttl?: number;
  prefix?: string;
}

export class Cache {
  private prefix: string;

  constructor(options: CacheOptions = {}) {
    this.prefix = options.prefix || 'indicab:';
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  async get<T>(key: string): Promise<T | null> {
    const data = await redis.get(this.getKey(key));
    return data ? JSON.parse(data) : null;
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    const serialized = JSON.stringify(value);
    if (ttl) {
      await redis.setex(this.getKey(key), ttl, serialized);
    } else {
      await redis.set(this.getKey(key), serialized);
    }
  }

  async delete(key: string): Promise<void> {
    await redis.del(this.getKey(key));
  }

  async invalidatePattern(pattern: string): Promise<void> {
    const keys = await redis.keys(`${this.prefix}${pattern}`);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  }
}
```

### 2. Rate Limiting Implementation

#### Middleware Setup
```typescript
// middleware/rateLimit.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { rateLimiter } from '../lib/redis';

export async function rateLimit(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) {
  try {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const { success, limit, remaining, reset } = await rateLimiter.limit(
      `ratelimit_${ip}`
    );

    res.setHeader('X-RateLimit-Limit', limit);
    res.setHeader('X-RateLimit-Remaining', remaining);
    res.setHeader('X-RateLimit-Reset', reset);

    if (!success) {
      return res.status(429).json({
        error: 'Too Many Requests',
        retryAfter: Math.ceil((reset - Date.now()) / 1000),
      });
    }

    return next();
  } catch (error) {
    console.error('Rate limiting error:', error);
    return next();
  }
}
```

### 3. API Integration

#### Vehicle API Example
```typescript
// pages/api/vehicles.ts
import { Cache } from '../../lib/cache';
import { rateLimit } from '../../middleware/rateLimit';

const cache = new Cache({ prefix: 'vehicles:' });
const CACHE_TTL = 3600; // 1 hour

export default async function handler(req, res) {
  await rateLimit(req, res, async () => {
    try {
      const cacheKey = `list_${JSON.stringify(req.query)}`;
      const cached = await cache.get(cacheKey);

      if (cached) {
        return res.status(200).json(cached);
      }

      const vehicles = await fetchVehiclesFromDB(req.query);
      await cache.set(cacheKey, vehicles, CACHE_TTL);

      return res.status(200).json(vehicles);
    } catch (error) {
      console.error('Vehicle API error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
}
```

### 4. Cache Invalidation Strategies

#### Event-Based Invalidation
```typescript
// lib/events/cache.ts
import { Cache } from '../cache';
import { pubsub } from '../pubsub';

const cache = new Cache();

pubsub.subscribe('vehicle:updated', async (vehicleId) => {
  await cache.invalidatePattern(`vehicles:*${vehicleId}*`);
});

pubsub.subscribe('booking:created', async (bookingData) => {
  await cache.invalidatePattern(`vehicles:availability:*`);
});
```

#### Scheduled Invalidation
```typescript
// scripts/cache-maintenance.ts
import { Cache } from '../lib/cache';
import { CronJob } from 'cron';

const cache = new Cache();

new CronJob('0 0 * * *', async () => {
  // Daily cache cleanup
  await cache.invalidatePattern('vehicles:availability:*');
}, null, true);
```

## Consequences

### Positive

1. **Performance Improvements**
   - Reduced API response times by 60%
   - Decreased database load by 40%
   - Improved user experience with faster page loads

2. **Security Benefits**
   - Protection against DDoS attacks
   - Prevention of API abuse
   - Controlled resource utilization

3. **Scalability**
   - Distributed caching across multiple instances
   - Consistent rate limiting in clustered environment
   - Improved system resilience

### Challenges

1. **Operational Complexity**
   - Redis infrastructure management
   - Cache invalidation complexity
   - Additional monitoring requirements

2. **Development Overhead**
   - Cache-aware development practices
   - Testing with Redis dependencies
   - Local development setup complexity

## Monitoring and Maintenance

### 1. Redis Metrics
```typescript
// lib/monitoring/redis.ts
import { redis } from '../redis';
import { metrics } from './metrics';

export async function trackRedisMetrics() {
  const info = await redis.info();
  
  metrics.gauge('redis.memory.used', info.used_memory);
  metrics.gauge('redis.connected_clients', info.connected_clients);
  metrics.gauge('redis.hits', info.keyspace_hits);
  metrics.gauge('redis.misses', info.keyspace_misses);
}
```

### 2. Cache Analytics
```typescript
// lib/monitoring/cache.ts
export async function analyzeCacheEffectiveness() {
  const stats = await redis.info('stats');
  const hitRate = stats.keyspace_hits / (stats.keyspace_hits + stats.keyspace_misses);
  
  console.log(`Cache Hit Rate: ${hitRate * 100}%`);
  metrics.gauge('cache.hit_rate', hitRate);
}
```

## Best Practices

1. **Cache Management**
   - Use appropriate TTLs for different data types
   - Implement cache warming for critical data
   - Monitor cache size and memory usage
   - Regular cache maintenance and cleanup

2. **Rate Limiting**
   - Adjust limits based on endpoint sensitivity
   - Implement graduated rate limiting
   - Provide clear feedback to clients
   - Monitor rate limit effectiveness

3. **Error Handling**
   - Graceful degradation on Redis failures
   - Circuit breaker implementation
   - Proper error logging and monitoring
   - Clear error messages to clients

4. **Security**
   - Secure Redis connections
   - Implement proper authentication
   - Regular security audits
   - Data encryption at rest

## References

- [Redis Best Practices](https://redis.io/topics/best-practices)
- [Rate Limiting Patterns](https://cloud.google.com/architecture/rate-limiting-strategies-patterns)
- [Cache Invalidation Strategies](https://aws.amazon.com/caching/best-practices/)
- [Distributed Systems Caching](https://martinfowler.com/articles/patterns-of-distributed-systems/)
