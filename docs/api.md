# API Documentation

## Overview

This document provides detailed information about the IndiCab API endpoints, authentication, error handling, and best practices.

## Base URL

- Production: `https://api.indicab.com`
- Staging: `https://api.staging.indicab.com`
- Development: `http://localhost:3000/api`

## Authentication

### JWT Authentication

All API endpoints except public routes require JWT authentication.

#### Headers
```http
Authorization: Bearer <jwt_token>
```

#### Token Management
- Tokens expire after 24 hours
- Refresh tokens are valid for 7 days
- Use the refresh token endpoint to obtain new access tokens

## API Endpoints

### Authentication

#### POST /api/auth/login
Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "userpassword"
}
```

**Response (200 OK):**
```json
{
  "user": {
    "id": "user_id",
    "name": "User Name",
    "email": "user@example.com",
    "role": "user"
  },
  "token": "jwt_token",
  "expiresIn": "1d"
}
```

#### POST /api/auth/refresh
Refreshes an expired JWT token.

**Request Body:**
```json
{
  "refreshToken": "refresh_token"
}
```

**Response (200 OK):**
```json
{
  "token": "new_jwt_token",
  "expiresIn": "1d"
}
```

### Booking

#### GET /api/booking
Retrieves user's bookings.

**Query Parameters:**
- `status` (optional): Filter by booking status
- `limit` (optional): Number of results per page
- `page` (optional): Page number

**Response (200 OK):**
```json
{
  "bookings": [
    {
      "id": "booking_id",
      "route": {
        "from": "Mumbai",
        "to": "Pune"
      },
      "status": "confirmed",
      "price": "2000",
      "date": "2024-03-20"
    }
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 10
  }
}
```

#### POST /api/booking
Creates a new booking.

**Request Body:**
```json
{
  "routeId": "route_id",
  "date": "2024-03-20",
  "passengers": 2,
  "vehicleType": "Sedan"
}
```

**Response (201 Created):**
```json
{
  "bookingId": "new_booking_id",
  "status": "pending",
  "paymentUrl": "payment_gateway_url"
}
```

### Routes

#### GET /api/routes
Retrieves available routes.

**Query Parameters:**
- `from` (optional): Origin city
- `to` (optional): Destination city
- `date` (optional): Travel date

**Response (200 OK):**
```json
{
  "routes": [
    {
      "id": "route_id",
      "from": "Mumbai",
      "to": "Pune",
      "distance": "150km",
      "duration": "3 hours",
      "price": "2000"
    }
  ]
}
```

### Vehicles

#### GET /api/vehicles
Retrieves available vehicles.

**Query Parameters:**
- `type` (optional): Vehicle type
- `available` (optional): Availability status

**Response (200 OK):**
```json
{
  "vehicles": [
    {
      "id": "vehicle_id",
      "type": "Sedan",
      "model": "Honda City",
      "capacity": 4,
      "available": true
    }
  ]
}
```

## Error Handling

### Error Response Format
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description",
    "details": {}
  }
}
```

### Common Error Codes

- `AUTH_001`: Authentication failed
- `AUTH_002`: Token expired
- `BOOK_001`: Booking creation failed
- `ROUTE_001`: Route not found
- `VAL_001`: Validation error

### HTTP Status Codes

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `422`: Validation Error
- `429`: Too Many Requests
- `500`: Server Error

## Rate Limiting

- 100 requests per minute per IP
- 1000 requests per hour per user
- Rate limit headers included in response:
  ```http
  X-RateLimit-Limit: 100
  X-RateLimit-Remaining: 99
  X-RateLimit-Reset: 1616799929
  ```

## Best Practices

### Making API Requests

1. **Always Include Headers:**
   ```typescript
   const headers = {
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${token}`
   };
   ```

2. **Handle Errors:**
   ```typescript
   try {
     const response = await fetch(url, options);
     if (!response.ok) {
       const error = await response.json();
       throw new Error(error.message);
     }
     return await response.json();
   } catch (error) {
     handleError(error);
   }
   ```

3. **Implement Retries:**
   ```typescript
   const fetchWithRetry = async (url, options, retries = 3) => {
     try {
       return await fetch(url, options);
     } catch (error) {
       if (retries > 0) {
         return await fetchWithRetry(url, options, retries - 1);
       }
       throw error;
     }
   };
   ```

### Security

1. Never send sensitive data in URL parameters
2. Always use HTTPS
3. Implement proper token storage
4. Validate all input data
5. Implement request signing for sensitive operations

## Testing

### Endpoint Testing

```typescript
describe('Booking API', () => {
  it('creates a booking', async () => {
    const response = await fetch('/api/booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        routeId: 'test_route',
        date: '2024-03-20'
      })
    });
    
    expect(response.status).toBe(201);
    const data = await response.json();
    expect(data).toHaveProperty('bookingId');
  });
});
```

## Versioning

API versioning is handled through the URL:
- `/api/v1/booking`
- `/api/v2/booking`

Current stable version: `v1`

## SDK

### JavaScript/TypeScript SDK

```typescript
import { IndiCabAPI } from '@indicab/sdk';

const api = new IndiCabAPI({
  apiKey: 'your_api_key',
  environment: 'production'
});

// Create booking
const booking = await api.booking.create({
  routeId: 'route_id',
  date: '2024-03-20'
});
```

## Webhooks

### Available Events

- `booking.created`
- `booking.confirmed`
- `booking.cancelled`
- `payment.succeeded`
- `payment.failed`

### Webhook Format
```json
{
  "event": "booking.created",
  "data": {
    "bookingId": "booking_id",
    "timestamp": "2024-03-20T10:00:00Z"
  }
}
```

## Support

- API Status: [status.indicab.com](https://status.indicab.com)
- Developer Support: [developers@indicab.com](mailto:developers@indicab.com)
- API Documentation: [docs.indicab.com](https://docs.indicab.com) 