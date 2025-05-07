# IndiCab Website - Project Progress and Overview

## 1. Introduction
IndiCab is a comprehensive ride-booking and vehicle rental platform with a modular architecture built using Next.js and TypeScript. The project integrates backend APIs, frontend React components, and various utilities to provide a seamless user experience. The architecture emphasizes scalability, maintainability, and performance, with clear separation of concerns across services, components, and utilities.

## 2. Top-Level Files
- **.blackboxrules, .gitattributes, .gitignore**: Git configuration and rules for code analysis.
- **components.json**: Metadata for UI components.
- **env.d.ts**: TypeScript environment declarations.
- **eslint.config.mjs**: ESLint configuration for code linting.
- **LICENSE**: Project license information.
- **lighthouserc.js**: Configuration for Lighthouse performance audits.
- **netlify.toml**: Netlify deployment configuration.
- **next-env.d.ts**: TypeScript definitions for Next.js environment.
- **next.config.backup.mjs, next.config.original.mjs**: Backup and original Next.js configuration files.
- **next.config.mjs**: Main configuration file for Next.js.
- **package.json, package-lock.json, package.test.json**: NPM package manifests and lock files.
- **playwright.config.ts**: Configuration for Playwright end-to-end testing.
- **postcss.config.mjs**: PostCSS configuration for CSS processing.
- **progress.md**: This progress and overview document.
- **Prompt.txt**: Project prompt or notes.
- **README.md**: Project documentation and API overview.
- **tailwind.config.js**: Tailwind CSS configuration.
- **tsconfig.final.json, tsconfig.fixed.json, tsconfig.json, tsconfig.resolved.json, tsconfig.tsbuildinfo**: TypeScript compiler configurations.
- **vitest.config.ts**: Vitest testing framework configuration.

## 3. Directories Overview

### analyze
- Contains `nodejs.html`: An HTML report likely used for bundle or performance analysis.

### config
- Contains `images.mjs`: Configuration related to image handling or optimization.

### lib
- Core utilities and services including:
  - Database connection and models (`database.ts`, `db-connection.ts`, `db.ts`, etc.)
  - Pricing logic (`pricing.ts`)
  - Utility functions (`utils.ts`)
  - API helpers and error handling (`api/`, `errors/`)
  - SEO utilities (`seo/`)
  - Service utilities (`services/`)
  - Validation logic (`validations/`)

### public
- Static assets served by the application:
  - Icons and images (`favicon.ico`, `indicab-logo.png`, etc.)
  - Manifest and robots files for PWA and SEO.
  - `assets/` directory with subfolders for avatars, backgrounds, cars, cities, drivers, icons, and images.

### scripts
- Various utility and test scripts for:
  - Bundle analysis, document linting, legacy component identification.
  - MongoDB connection tests and helpers.
  - Image optimization.
  - API and booking tests.
  - Database operations and verification.

### services
- Backend service logic:
  - Booking API and service files under `services/booking/`.
  - Error service handling.

### src
- Main source code directory with extensive subdirectories:
  - `app/`: Next.js app pages and feature directories.
    - **ClientBody.tsx**: Main client body React component for layout and structure.
    - **globals.css**: Global CSS styles for the application.
    - **layout.tsx**: Layout component managing page structure and navigation.
    - **not-found.tsx**: Custom 404 error page component.
    - **page.clean.tsx**: Clean version of the main page, possibly for testing or minimal UI.
    - **page.final.tsx**: Final version of the main page with full features.
    - **page.test.ts**: Test page for development and debugging.
    - **page.tsx**: Main entry page component.
    - Subdirectories (e.g., about/, admin/, api/, auth/, blog/, booking/, etc.) contain feature-specific pages and components.
  - `components/`: UI components organized into features, common, layout, optimized, packages, shared, and UI primitives.
    - **BookingForm.stories.tsx**: Storybook stories for the BookingForm component.
    - **BookingForm.test.tsx**: Unit tests for BookingForm component.
    - **BookingForm.tsx**: Booking form React component for user input.
    - **BookingProgress.stories.tsx**: Storybook stories for BookingProgress component.
    - **BookingProgress.tsx**: Component showing booking progress steps.
    - **BookingTest.stories.tsx**: Storybook stories for BookingTest component.
    - **BookingTest.tsx**: Component for testing booking functionality.
    - **components.json**: Metadata and configuration for components.
    - **DateRangePicker.stories.tsx**: Storybook stories for DateRangePicker component.
    - **DateRangePicker.tsx**: Date range picker UI component.
    - **ErrorBoundary.test.tsx**: Tests for ErrorBoundary component.
    - **ErrorBoundary.tsx**: React error boundary component for catching errors.
    - **index.ts**: Barrel file exporting components.
    - **LoadingSpinner.test.tsx**: Tests for LoadingSpinner component.
    - **LoadingSpinner.tsx**: Loading spinner UI component.
    - **PaymentForm.tsx**: Payment form component for processing payments.
    - **PaymentStep.tsx**: Component representing a step in payment process.
    - **TestBookingAPI.tsx**: Component for testing booking API integration.
    - **VehicleCard.test.tsx**: Tests for VehicleCard component.
    - **VehicleCard.tsx**: Vehicle card UI component displaying vehicle details.
    - **VehicleComparison.stories.tsx**: Storybook stories for VehicleComparison component.
    - **VehicleComparison.test.tsx**: Tests for VehicleComparison component.
    - **VehicleComparison.tsx**: Component for comparing vehicles side-by-side.
    - **VehicleTypeSelector.tsx**: UI component for selecting vehicle types.
    - Subdirectories (booking/, common/, features/, layout/, optimized/, packages/, shared/, ui/) contain categorized components and utilities.
  - `context/`: React context providers for auth, booking, favorites, and theme.
    - **AuthContext.tsx**: Provides authentication state and methods to the app.
    - **BookingContext.tsx**: Manages booking-related state and logic.
    - **FavoritesContext.tsx**: Handles user favorites state and actions.
    - **ThemeContext.tsx**: Manages theme (light/dark) state and toggling.
  - `data/`: JSON and TS data files for packages, routes, vehicles, and FAQs.

### tests
- Automated tests for accessibility, authentication, booking flows, contact forms, error handling, navigation, and helpers.

### .git
- Git version control directory containing repository metadata and history.

### .husky
- Git hooks managed by Husky for pre-commit and other automation tasks.

### .next
- Next.js build output directory containing compiled application files.

### .storybook
- Storybook configuration and static files for UI component development and testing.

### .vscode
- Visual Studio Code workspace settings and configurations.

### node_modules

## 4. Current Status and Future Tasks
- Most core backend and frontend functionality is implemented with comprehensive API routes and React components.
- Testing is well-covered with unit and end-to-end tests.
- Some data files for packages are missing and may need restoration.
- Component migration and storybook integration are mostly complete with minor gaps.
- Documentation is thorough but can be expanded with more usage examples and migration guides.
- Future tasks include completing missing data files, updating legacy components, and enhancing test coverage.

## 5. Component Organization and Best Practices
- Components are categorized into features, UI primitives, layout, and shared utilities.
- Naming conventions and file structure promote maintainability.
- Storybook is used for UI component documentation and testing.
- Accessibility and responsive design are emphasized.

## 6. Environment Variables, Deployment, and Commands
- Environment variables manage database connections, JWT secrets, caching, and rate limiting.
- Deployment uses Docker Compose for local development and Vercel/Netlify for production and staging.
- NPM scripts cover development, building, testing, and production workflows.
- Utility scripts assist with cache clearing, database verification, and troubleshooting.

---

## 7. Additional Directories

### src/features/drivers
- **DriverApplicationForm.stories.tsx**: Storybook stories for the driver application form.
- **DriverApplicationForm.tsx**: React component for the driver application form.

---

*This document provides a detailed snapshot of the IndiCab project to facilitate onboarding, maintenance, and future development.*
