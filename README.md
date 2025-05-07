# Comprehensive Documentation for IndiCab Project

## Backend Documentation

### API Routes

#### Authentication Route
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

#### Token Refresh Route
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

#### Vehicles API
- **GET /api/vehicles**
  - **Description**: Retrieves a list of all vehicles.
  - **Response**:
    - On success (200): Returns an array of vehicle objects.
    - On failure (500): Returns an error message.

- **POST /api/vehicles**
  - **Description**: Creates a new vehicle entry.
  - **Request Body**: Vehicle object.
  - **Response**:
    - On success (201): Returns the created vehicle object.
    - On failure (400): Returns an error message.

#### Users API
- **GET /api/users**
  - **Description**: Retrieves a list of all users (excluding password hashes).
  - **Response**:
    - On success (200): Returns an array of user objects.
    - On failure (500): Returns an error message.

- **POST /api/users**
  - **Description**: Creates a new user.
  - **Request Body**: User object.
  - **Response**:
    - On success (201): Returns the created user object.
    - On failure (400): Returns an error message.

#### Test API
- **GET /api/test**
  - **Description**: Runs a test booking creation to verify API functionality.
  - **Response**:
    - On success (200): Returns success message and booking data.
    - On failure (500): Returns error message.

#### Payment API
- **POST /api/payment**
  - **Description**: Creates a Stripe payment intent for a booking.
  - **Request Body**:
    ```json
    {
      "amount": number,
      "bookingId": "string"
    }
    ```
  - **Response**:
    - On success (200): Returns Stripe client secret.
    - On failure (400 or 500): Returns error message.

#### Packages APIs
- **GET /api/packages/tours**
  - **Description**: Retrieves tour packages.
  - **Response**:
    - On success (200): Returns array of tour packages.
    - On failure (500): Returns error message.

- **GET /api/packages/hourly**
  - **Description**: Retrieves hourly packages.
  - **Response**:
    - On success (200): Returns array of hourly packages.
    - On failure (500): Returns error message.

- **GET /api/packages/faqs**
  - **Description**: Retrieves frequently asked questions.
  - **Response**:
    - On success (200): Returns array of FAQs.
    - On failure (500): Returns error message.

- **GET /api/packages/corporate**
  - **Description**: Retrieves corporate packages.
  - **Response**:
    - On success (200): Returns array of corporate packages.
    - On failure (500): Returns error message.

> **Note**: Some data files for packages (tour-packages.json, hourly-packages.json, faqs.json, corporate-packages.json) are currently missing and may need to be added or restored.



### Database Models

#### User Model
- **Schema**:
  - `email`: String, required, unique, validated with regex
  - `passwordHash`: String, required, not selectable
  - `name`: String, required
  - `phone`: String, validated for 10 digits
  - `role`: String, enum (user, admin, driver), default: user
  - `bookings`: Array of ObjectId references to Booking
  - `createdAt`: Date, default: now
  - `updatedAt`: Date, updated on save

### Database Connection
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

### API Integration and Error Handling
- API clients in `src/services` use fetch with try-catch blocks.
- Meaningful error messages are thrown and logged.
- Authorization tokens are managed via localStorage.
- Example: `createBooking` function in `src/services/booking/api.ts`.

### Caching
- Redis is used for caching to improve performance.
- Connection details managed via `REDIS_URL` environment variable.

### Deployment and Infrastructure
- Docker Compose setup includes MongoDB and Redis for local development.
- Production hosting on Vercel and staging on Netlify.
- Media storage on AWS S3.
- CDN and DNS managed by Cloudflare.

### Environment Variables
- `MONGODB_URI`: MongoDB connection string (required)
- `JWT_SECRET`: Secret key for JWT signing (required)
- `JWT_EXPIRES_IN`: Token expiration time (default: "1d")
- `REDIS_URL`: Redis connection URL for caching (optional)
- `RATE_LIMIT_WINDOW`: Rate limit window in ms (default: 60000)
- `RATE_LIMIT_MAX`: Max requests per window (default: 100)

---

## Commands Documentation

### NPM Scripts

#### Development
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

#### Building
- `build`: Creates production build
  ```bash
  npm run build
  # Output: .next/ directory
  ```

- `build:analyze`: Build with bundle analysis
  ```bash
  ANALYZE=true npm run build
  ```

#### Testing
- `test`: Runs unit tests (Vitest)
  ```bash
  npm run test
  ```

- `test:e2e`: Runs Playwright end-to-end tests
  ```bash
  npm run test:e2e
  ```

#### Production
- `start`: Runs production server
  ```bash
  npm run start
  # Requires build first
  ```

- `preview`: Local production preview
  ```bash
  npm run build && npm run start
  ```

### Utility Scripts

#### Cache Management
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

#### Testing
- `test-api.ts`: API endpoint tests
  ```bash
  bunx ts-node scripts/test-api.ts
  ```

#### Database
- `mongo-connection-test.js`: Tests MongoDB connection
  ```bash
  node scripts/mongo-connection-test.js
  ```

- `verify-db.ts`: Database schema validation
  ```bash
  bunx ts-node scripts/verify-db.ts
  ```

#### Maintenance
- `clean-cache.ts`: Clears Redis cache
  ```bash
  bunx ts-node scripts/clean-cache.ts
  ```

### Troubleshooting

#### Common Issues
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

---

## Component Organization

### Structure Overview

Components are organized into 4 main categories:

1. **Feature Components** (`/features`)
   - Domain-specific functionality
   - Examples: Booking, Maps, User Profiles
   - Located in `src/components/features/`

2. **UI Primitives** (`/ui`)  
   - Reusable presentational components
   - Examples: Buttons, Cards, Inputs
   - Located in `src/components/ui/`

3. **Layout Components** (`/layout`)
   - Page structure and scaffolding  
   - Examples: Header, Footer, PageContainer
   - Located in `src/components/layout/`

4. **Shared Utilities** (`/shared`)
   - Cross-cutting functionality
   - Examples: ErrorBoundary, ThemeProvider
   - Located in `src/components/shared/`

### Naming Conventions

| Category       | Naming Pattern          | Example           |
|----------------|-------------------------|-------------------|
| Feature        | PascalCase + Feature    | `BookingHistory`  |  
| UI             | Simple Descriptive      | `Button`          |
| Layout         | Structural              | `Header`          |
| Shared         | Functional              | `ErrorBoundary`   |

### File Structure

```
src/components/
├── features/
│   ├── booking/
│   ├── maps/  
│   └── profile/
├── ui/
│   ├── buttons/
│   ├── cards/
│   └── inputs/
├── layout/  
│   ├── Header.tsx
│   └── Footer.tsx
└── shared/
    ├── ErrorBoundary.tsx
    └── ThemeProvider.tsx
```

### Current Implementation Status

#### Component Migration (95% complete)
- ✅ All feature components moved to `/features`
- ✅ UI primitives organized in `/ui`  
- ✅ Layout components in `/layout`
- ✅ Shared utilities in `/shared`

#### Storybook Integration
- ✅ 80% of UI components have stories
- ⚠️ 15% need story updates
- ❌ 5% missing stories (legacy components)

#### TypeScript Coverage
- ✅ 100% of new components
- ⚠️ 90% of migrated components
- ❌ Legacy components need typing

#### Documentation
- ✅ All components have JSDoc
- ✅ PropTypes for legacy components
- ✅ Usage examples in Storybook

### Best Practices

1. **New Components**:
   - Create in appropriate category folder
   - Add Storybook story
   - Include JSDoc and PropTypes
   - Write unit tests

2. **Component Updates**:
   - Update Storybook story
   - Maintain TypeScript types
   - Document changes in JSDoc

3. **Deprecation**:
   - Mark legacy components with `@deprecated`
   - Add migration path in JSDoc
   - Remove after 2 release cycles

### Additional Notes
- The `ErrorBoundary` component is critical for robust error handling and should be maintained in the `shared` directory.
- Feature components are dynamically imported in pages for performance optimization.
- UI components use Tailwind CSS and Framer Motion for styling and animations.
- Ensure all new components follow accessibility best practices and responsive design principles.

---

## Project Structure

Below is a detailed structure of the project, including all files and directories:

```
/workspaces/indicab
├── components.json                # Configuration for components
├── env.d.ts                       # TypeScript environment definitions
├── eslint.config.mjs              # ESLint configuration file
├── LICENSE                        # License file (MIT License)
├── lighthouserc.js                # Lighthouse configuration for performance audits
├── netlify.toml                   # Netlify deployment configuration
├── next-env.d.ts                  # Next.js environment types
├── next.config.backup.mjs         # Backup of Next.js configuration
├── next.config.mjs                # Main Next.js configuration file
├── next.config.original.mjs       # Original Next.js configuration file
├── package.json                   # Project dependencies and scripts
├── package.test.json              # Test-specific package configuration
├── playwright.config.ts           # Playwright testing configuration
├── postcss.config.mjs             # PostCSS configuration for CSS processing
├── progress.md                    # Project progress tracking document
├── Prompt.txt                     # Instructions and guidelines for the project
├── README.md                      # Comprehensive project documentation
├── tailwind.config.js             # Tailwind CSS configuration
├── tsconfig.final.json            # Final TypeScript configuration
├── tsconfig.fixed.json            # Fixed TypeScript configuration
├── tsconfig.json                  # Main TypeScript configuration
├── tsconfig.resolved.json         # Resolved TypeScript configuration
├── tsconfig.tsbuildinfo           # TypeScript build information
├── vitest.config.ts               # Vitest testing configuration
├── analyze/                       # Analysis-related files
│   └── nodejs.html                # Node.js analysis report
├── config/                        # Configuration files
│   └── images.mjs                 # Image-related configuration
├── lib/                           # Library files
│   ├── database.ts                # Database utility functions
│   ├── db-connection.ts           # MongoDB connection logic
│   ├── db-fixed.ts                # Fixed database utilities
│   ├── db.ts                      # Main database utilities
│   ├── pricing.ts                 # Pricing-related utilities
│   └── utils.ts                   # General utility functions
├── public/                        # Public assets
│   ├── favicon.ico                # Favicon for the website
│   ├── indicab-logo.png           # IndiCab logo
│   ├── manifest.json              # Web app manifest
│   ├── robots.txt                 # Robots.txt for SEO
│   ├── sitemap.xml                # Sitemap for search engines
│   └── assets/                    # Asset files
│       ├── default-tour.jpg       # Default tour image
│       ├── avatars/               # User avatars
│       ├── backgrounds/           # Background images
│       ├── cars/                  # Car images
│       ├── cities/                # City images
│       ├── drivers/               # Driver images
│       └── icons/                 # Icon files
├── scripts/                       # Scripts for various tasks
│   ├── analyze-bundle.js          # Bundle analysis script
│   ├── document-linter-errors.js  # Linter error documentation script
│   ├── identify-legacy-components.js # Legacy component identification
│   ├── mongo-connection-test.js   # MongoDB connection test script
│   ├── mongodb-connection-helper.js # MongoDB connection helper
│   ├── mongodb-connection-options.js # MongoDB connection options
│   ├── mongodb-connection.js      # MongoDB connection logic
│   ├── optimize-images.mjs        # Image optimization script
│   ├── test-api-cjs.ts            # CommonJS API test script
│   ├── test-api-new.ts            # New API test script
│   ├── test-api.ts                # Main API test script
│   ├── test-booking-api-fixed.cjs # Fixed booking API test script
│   ├── test-booking-api.cjs       # Booking API test script
│   ├── test-booking-api.js        # JavaScript booking API test
│   ├── test-config.cjs            # Test configuration
│   ├── test-coverage-report.ts    # Test coverage report script
│   ├── test-db-connection.js      # Database connection test
│   ├── test-db-final.js           # Final database test script
│   ├── test-db-operations.js      # Database operations test
│   ├── test-db-ts.ts              # TypeScript database test
│   ├── test-db-working.ts         # Working database test script
│   ├── test-setup.cjs             # Test setup script
│   └── verify-db.ts               # Database verification script
├── services/                      # Service-related files
│   └── booking/                   # Booking services
│       └── api.ts                 # Booking API service
├── src/                           # Source code
│   ├── instrumentation-client.ts  # Instrumentation client
│   ├── instrumentation.ts         # Instrumentation logic
│   ├── test-imports.ts            # Test imports
│   ├── tsconfig.paths.json        # TypeScript paths configuration
│   ├── app/                       # Application-specific files
│   ├── components/                # React components
│   ├── context/                   # React context files
│   ├── data/                      # Data files
│   ├── features/                  # Feature-specific components
│   ├── hooks/                     # React hooks
│   ├── lib/                       # Library files
│   ├── middleware/                # Middleware logic
│   ├── models/                    # Data models
│   ├── packages/                  # Package files
│   ├── services/                  # Service files
│   ├── shared/                    # Shared utilities
│   ├── stories/                   # Storybook stories
│   ├── styles/                    # CSS styles
│   ├── types/                     # TypeScript types
│   └── utils/                     # Utility functions
└── tests/                         # Test files
    ├── accessibility.spec.ts      # Accessibility tests
    ├── authentication.spec.ts     # Authentication tests
    ├── booking-api.spec.ts        # Booking API tests
    ├── booking-flow.spec.ts       # Booking flow tests
    ├── contact-form.spec.ts       # Contact form tests
    ├── custom-matchers.spec.ts    # Custom matchers for tests
    ├── error-handler.test.ts      # Error handler tests
    ├── example.spec.ts            # Example test
    ├── navigation.spec.ts         # Navigation tests
    ├── new-booking-api.spec.ts    # New booking API tests
    └── helpers/                   # Test helpers
```

Each file and directory is annotated with its purpose to provide a clear understanding of the project structure.
