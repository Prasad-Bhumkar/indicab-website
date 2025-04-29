# IndiCab Project - Commands Documentation

## Table of Contents
1. [NPM Scripts](#npm-scripts)
2. [API Endpoints](#api-endpoints) 
3. [Utility Scripts](#utility-scripts)
4. [Troubleshooting](#troubleshooting)

## NPM Scripts

### Development
- `dev`: Starts development server (Next.js)
  ```bash
  npm run dev
  # Options:
  # --port=3000 (default)
  # --host=0.0.0.0
  ```

- `dev:debug`: Starts with Node.js inspector
  ```bash
  NODE_OPTIONS='--inspect' npm run dev
  ```

### Building
- `build`: Creates production build
  ```bash
  npm run build
  # Output: .next/ directory
  ```

- `build:analyze`: Build with bundle analysis
  ```bash
  ANALYZE=true npm run build
  ```

### Testing
- `test`: Runs unit tests (Vitest)
  ```bash
  npm run test
  ```

- `test:e2e`: Runs Playwright end-to-end tests
  ```bash
  npm run test:e2e
  ```

### Production
- `start`: Runs production server
  ```bash
  npm run start
  # Requires build first
  ```

- `preview`: Local production preview
  ```bash
  npm run build && npm run start
  ```

## API Endpoints

### Authentication
- `POST /api/auth`: User authentication
  ```bash
  curl -X POST http://localhost:3000/api/auth \
    -H "Content-Type: application/json" \
    -d '{"email":"user@example.com","password":"securepass"}'
  ```
  **Responses:**
  - 200: JWT token
  - 401: Invalid credentials
  - 429: Rate limited

- `POST /api/auth/refresh`: Refresh JWT token
  ```bash
  curl -X POST http://localhost:3000/api/auth/refresh \
    -H "Authorization: Bearer <token>"
  ```

### Booking
- `POST /api/booking`: Create new booking
  ```bash
  curl -X POST http://localhost:3000/api/booking \
    -H "Authorization: Bearer <token>" \
    -H "Content-Type: application/json" \
    -d '{"routeId":"123","vehicleType":"sedan"}'
  ```

## Utility Scripts

### Cache Management
- **Clear Playwright Reports**:
  ```bash
  rm -rf playwright-report
  ```

- **Clear Storybook Static Files**:
  ```bash
  rm -rf storybook-static
  ```

- **Clear Test Results**:
  ```bash
  rm -rf test-results
  ```

### Testing
- `test-api.ts`: API endpoint tests
  ```bash
  bunx ts-node scripts/test-api.ts
  ```

### Database
- `mongo-connection-test.js`: Tests MongoDB connection
  ```bash
  node scripts/mongo-connection-test.js
  ```

- `verify-db.ts`: Database schema validation
  ```bash
  bunx ts-node scripts/verify-db.ts
  ```

### Maintenance
- `clean-cache.ts`: Clears Redis cache
  ```bash
  bunx ts-node scripts/clean-cache.ts
  ```

## Troubleshooting

### Common Issues
1. **Port in use**:
   ```bash
   kill $(lsof -t -i:3000)
   # Or specify port:
   kill $(lsof -t -i:3001)
   ```

2. **Build failures**:
   ```bash
   npm ci && npm run type-check
   ```

3. **Database connection**:
   ```bash
   node scripts/mongo-connection-test.js
   ```

4. **Cache issues**:
   ```bash
   bunx ts-node scripts/clean-cache.ts
   ```

*Last Updated: 2024-07-15*
