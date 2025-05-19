import { NextRequest } from 'next/server';
import { z } from 'zod';

// API test helper types
export interface ApiTestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: unknown;
  query?: Record<string, string>;
  cookies?: Record<string, string>;
}

export interface ApiTestContext {
  req: NextRequest;
  params: Record<string, string>;
}

// Helper to create a mock NextRequest
export function createMockRequest(config: ApiTestConfig = {}): NextRequest {
  const {
    method = 'GET',
    headers = {},
    body,
    query = {},
    cookies = {},
  } = config;

  const url = new URL('http://localhost:3000');
  Object.entries(query).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const request = new NextRequest(url, {
    method,
    headers: new Headers(headers),
    body: body ? JSON.stringify(body) : undefined,
  });

  // Add cookies
  Object.entries(cookies).forEach(([key, value]) => {
    request.cookies.set(key, value);
  });

  return request;
}

// Helper to validate API response
export function validateApiResponse<T>(
  response: Response,
  schema: z.Schema<T>
): Promise<T> {
  return response.json().then((data) => schema.parse(data));
}

// Helper to test API error responses
export function expectApiError(
  response: Response,
  expectedStatus: number,
  expectedError?: string
) {
  expect(response.status).toBe(expectedStatus);
  return response.json().then((data) => {
    expect(data).toHaveProperty('error');
    if (expectedError) {
      expect(data.error).toBe(expectedError);
    }
  });
}

// Helper to test API success responses
export function expectApiSuccess<T>(
  response: Response,
  schema: z.Schema<T>
): Promise<T> {
  expect(response.status).toBe(200);
  return validateApiResponse(response, schema);
}

// Helper to test API validation errors
export function expectValidationError(
  response: Response,
  expectedErrors: Array<{ path: string; message: string }>
) {
  expect(response.status).toBe(400);
  return response.json().then((data) => {
    expect(data).toHaveProperty('error', 'Validation Error');
    expect(data).toHaveProperty('details');
    expect(data.details).toEqual(expect.arrayContaining(expectedErrors));
  });
}

// Helper to test API authentication
export function expectUnauthorized(response: Response) {
  expect(response.status).toBe(401);
  expect(response.headers.get('WWW-Authenticate')).toBe('Bearer');
  return response.json().then((data) => {
    expect(data).toHaveProperty('error', 'Unauthorized');
  });
}

// Helper to test API rate limiting
export function expectRateLimited(response: Response) {
  expect(response.status).toBe(429);
  expect(response.headers.get('Retry-After')).toBeDefined();
  return response.text().then((text) => {
    expect(text).toBe('Too Many Requests');
  });
}

// Helper to test API pagination
export function expectPaginatedResponse<T>(
  response: Response,
  schema: z.Schema<T>
) {
  expect(response.status).toBe(200);
  return response.json().then((data) => {
    expect(data).toHaveProperty('items');
    expect(data).toHaveProperty('total');
    expect(data).toHaveProperty('page');
    expect(data).toHaveProperty('limit');
    expect(Array.isArray(data.items)).toBe(true);
    data.items.forEach((item: unknown) => {
      schema.parse(item);
    });
  });
}

// Helper to test API sorting
export function expectSortedResponse<T>(
  response: Response,
  schema: z.Schema<T>,
  sortBy: string,
  direction: 'asc' | 'desc' = 'asc'
) {
  expect(response.status).toBe(200);
  return response.json().then((data) => {
    expect(data).toHaveProperty('items');
    expect(Array.isArray(data.items)).toBe(true);
    data.items.forEach((item: unknown) => {
      schema.parse(item);
    });

    // Check if items are sorted
    const items = data.items as Array<Record<string, unknown>>;
    for (let i = 1; i < items.length; i++) {
      const current = items[i][sortBy];
      const previous = items[i - 1][sortBy];
      if (direction === 'asc') {
        expect(current >= previous).toBe(true);
      } else {
        expect(current <= previous).toBe(true);
      }
    }
  });
}

// Helper to test API filtering
export function expectFilteredResponse<T>(
  response: Response,
  schema: z.Schema<T>,
  filter: Record<string, unknown>
) {
  expect(response.status).toBe(200);
  return response.json().then((data) => {
    expect(data).toHaveProperty('items');
    expect(Array.isArray(data.items)).toBe(true);
    data.items.forEach((item: unknown) => {
      schema.parse(item);
    });

    // Check if items match filter
    const items = data.items as Array<Record<string, unknown>>;
    items.forEach((item) => {
      Object.entries(filter).forEach(([key, value]) => {
        expect(item[key]).toBe(value);
      });
    });
  });
} 