# 0001 - Redis Caching and Rate Limiting

## Status
Accepted

## Context
To improve the performance and security of the IndiCab application, it was necessary to implement caching and rate limiting mechanisms.

## Decision
- Use Redis (via Upstash) as a distributed cache to store frequently accessed data such as vehicle lists.
- Implement caching utility functions for setting, getting, and invalidating cache entries.
- Integrate Redis caching in API service calls to reduce database and API load.
- Implement rate limiting middleware using Redis to limit the number of requests per IP address to 100 requests per minute.
- Return HTTP 429 status with Retry-After header when rate limit is exceeded.

## Consequences
- Improved API response times and reduced backend load due to caching.
- Enhanced security and protection against abuse via rate limiting.
- Additional operational complexity due to Redis dependency.
- Need to monitor Redis availability and performance.
