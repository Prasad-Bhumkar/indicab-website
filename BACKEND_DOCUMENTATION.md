# IndiCab Project - Backend Documentation

## API Routes

### Authentication Route
- **POST /api/auth**
  - **Description**: Authenticates a user and returns a JWT token.
  - **Request Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "userpassword"
    }
    ```
  - **Response**:
    - On success:
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
    - On failure:
      ```json
      {
        "error": "Invalid credentials"
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
  - Uses a cached connection to avoid multiple connections.
  - Throws an error if the `MONGODB_URI` environment variable is not defined.

## Environment Variables
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT signing
- `JWT_EXPIRES_IN`: Token expiration time

This documentation provides an overview of the backend architecture and API functionality for the IndiCab project.