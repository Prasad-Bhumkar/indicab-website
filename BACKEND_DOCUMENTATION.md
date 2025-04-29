# IndiCab Project - Backend Documentation

## API Routes

### Authentication Route
- **POST /api/auth**
  - **Description**: Authenticates a user and returns a JWT token.
  - **Rate Limit**: 10 requests per minute
  - **Request Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "userpassword"
    }
    ```
  - **Response**:
    - On success (200):
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
    - On failure (401):
      ```json
      {
        "error": "Invalid credentials",
        "code": "AUTH_001"
      }
      ```
    - On rate limit (429):
      ```json
      {
        "error": "Too many requests",
        "retryAfter": 60
      }
      ```

### Token Refresh Route
- **POST /api/auth/refresh**
  - **Description**: Refreshes the JWT token using the provided token.
  - **Request Body**:
    ```json
    {
      "token": "jwt_token"
    }
    ```
  - **Response**:
    - On success:
      ```json
      {
        "token": "new_jwt_token",
        "expiresIn": "86400"
      }
      ```
    - On failure:
      ```json
      {
        "error": "Token refresh failed"
      }
      ```

## Database Models

### User Model
- **Schema**:
  - `email`: String, required, unique, validated with regex
  - `passwordHash`: String, required, not selectable
  - `name`: String, required
  - `phone`: String, validated for 10 digits
  - `role`: String, enum (user, admin, driver), default: user
  - `bookings`: Array of ObjectId references to Booking
  - `createdAt`: Date, default: now
  - `updatedAt`: Date, updated on save

## Database Connection
- **File**: `lib/db-connection.ts`
- **Description**: Establishes a connection to MongoDB using Mongoose.
- **Connection Logic**:
  - Uses a cached connection to avoid multiple connections
  - Implements connection pooling (default poolSize: 5)
  - Automatic reconnection with exponential backoff
  - Throws an error if the `MONGODB_URI` environment variable is not defined
- **Cache Strategy**:
  - Connection cached for 30 minutes
  - Auto-renews when used
  - Drops after inactivity timeout

## API Integration and Error Handling
- API clients in `src/services` use fetch with try-catch blocks.
- Meaningful error messages are thrown and logged.
- Authorization tokens are managed via localStorage.
- Example: `createBooking` function in `src/services/booking/api.ts`.

## Caching
- Redis is used for caching to improve performance.
- Connection details managed via `REDIS_URL` environment variable.

## Deployment and Infrastructure
- Docker Compose setup includes MongoDB and Redis for local development.
- Production hosting on Vercel and staging on Netlify.
- Media storage on AWS S3.
- CDN and DNS managed by Cloudflare.

## Environment Variables
- `MONGODB_URI`: MongoDB connection string (required)
- `JWT_SECRET`: Secret key for JWT signing (required)
- `JWT_EXPIRES_IN`: Token expiration time (default: "1d")
- `REDIS_URL`: Redis connection URL for caching (optional)
- `RATE_LIMIT_WINDOW`: Rate limit window in ms (default: 60000)
- `RATE_LIMIT_MAX`: Max requests per window (default: 100)
