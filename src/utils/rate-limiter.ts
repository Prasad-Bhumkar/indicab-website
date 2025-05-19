interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
  }

  isRateLimited(key: string): boolean {
    const now = Date.now();
    const windowStart = now - this.config.windowMs;
    
    // Get existing requests for this key
    const requests = this.requests.get(key) || [];
    
    // Remove expired requests
    const validRequests = requests.filter(time => time > windowStart);
    
    // Check if we're over the limit
    if (validRequests.length >= this.config.maxRequests) {
      return true;
    }
    
    // Add new request
    validRequests.push(now);
    this.requests.set(key, validRequests);
    
    return false;
  }

  getRemainingRequests(key: string): number {
    const now = Date.now();
    const windowStart = now - this.config.windowMs;
    const requests = this.requests.get(key) || [];
    const validRequests = requests.filter(time => time > windowStart);
    return Math.max(0, this.config.maxRequests - validRequests.length);
  }

  getResetTime(key: string): number {
    const requests = this.requests.get(key) || [];
    if (requests.length === 0) return 0;
    
    const oldestRequest = Math.min(...requests);
    return oldestRequest + this.config.windowMs;
  }

  clear(key?: string) {
    if (key) {
      this.requests.delete(key);
    } else {
      this.requests.clear();
    }
  }
}

// Create rate limiters for different purposes
export const errorReportingLimiter = new RateLimiter({
  maxRequests: 5, // 5 error reports
  windowMs: 60 * 1000 // per minute
});

export const apiRateLimiter = new RateLimiter({
  maxRequests: 100, // 100 requests
  windowMs: 60 * 1000 // per minute
});

// Hook for rate limiting in React components
export const useRateLimit = (key: string, limiter: RateLimiter) => {
  const isLimited = limiter.isRateLimited(key);
  const remaining = limiter.getRemainingRequests(key);
  const resetTime = limiter.getResetTime(key);

  return {
    isLimited,
    remaining,
    resetTime,
    reset: () => limiter.clear(key)
  };
}; 