# IndiCab - Modern Intercity Cab Booking Platform 🚕

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)

IndiCab is a comprehensive cab booking platform that enables users to book intercity rides across India. Built with modern web technologies, it offers a seamless booking experience with real-time tracking and secure payments.

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Testing](#-testing)
- [Documentation](#-documentation)
- [Contributing](#-contributing)
- [License](#-license)
- [Authors](#-authors)
- [Acknowledgments](#-acknowledgments)
- [Support](#-support)

## ⚡ Quick Start

```bash
# Clone the repository
git clone https://github.com/prasad-bhumkar/indicab-Website.git

# Navigate to project directory
cd indicab-Website

# Install dependencies
npm install

# Start development server
npm run dev
```

## ✨ Features

- 🚗 **Multiple Vehicle Types**: Choose from Hatchback, Sedan, SUV, Luxury, and Electric vehicles
- 🗺️ **Route Management**: Extensive route coverage across major Indian cities
- 📱 **Real-Time Tracking**: Live tracking of your ride with ETA updates
- 💳 **Secure Payments**: Integrated payment gateway with multiple payment options
- 📱 **Responsive Design**: Seamless experience across all devices
- 🔒 **User Authentication**: Secure login and registration system
- 📊 **Booking Management**: Easy booking history and management
- 🌙 **Dark Mode**: Support for both light and dark themes

## 🛠 Tech Stack

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn/UI](https://ui.shadcn.com/)
- **State Management**: React Context
- **Maps**: [Leaflet](https://leafletjs.com/)

### Testing & Quality
- **Unit Testing**: [Vitest](https://vitest.dev/)
- **E2E Testing**: [Playwright](https://playwright.dev/)
- **Component Testing**: [Storybook](https://storybook.js.org/)
- **Linting**: ESLint
- **Formatting**: Prettier

### Deployment
- **Production**: [Vercel](https://vercel.com)
- **Staging**: [Netlify](https://netlify.com)

## 📁 Project Structure

```
indicab-Website/
├── src/                    # Source code
│   ├── app/               # Next.js app router pages
│   │   ├── ui/           # Reusable UI components
│   │   └── [feature]/    # Feature-specific components
│   ├── context/          # React context providers
│   ├── data/             # Static data and mock data
│   ├── features/         # Feature-specific modules
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Core libraries and utilities
│   ├── models/           # Data models and types
│   ├── services/         # API and external services
│   ├── styles/           # Global styles
│   ├── tests/            # Test files
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
├── public/               # Static assets
├── docs/                 # Documentation
├── scripts/             # Build and utility scripts
├── .storybook/          # Storybook configuration
└── config/              # Application configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or later
- npm 9.x or later
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/prasad-bhumkar/indicab-Website.git
   cd indicab-Website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_MAPS_API_KEY=your_maps_api_key

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Database
MONGODB_URI=your_mongodb_uri

# Payment Gateway
STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key

# Analytics
NEXT_PUBLIC_GA_ID=your_ga_id
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key

# Monitoring
SENTRY_DSN=your_sentry_dsn
```

### Configuration Files

The project uses several configuration files:

- `next.config.mjs` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `.eslintrc.js` - ESLint configuration
- `.prettierrc` - Prettier configuration
- `vitest.config.ts` - Vitest configuration
- `playwright.config.ts` - Playwright configuration

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run end-to-end tests |
| `npm run storybook` | Start Storybook development |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

## 🧪 Testing

We use a comprehensive testing strategy:

- **Unit Tests**: Vitest for component and utility testing
- **E2E Tests**: Playwright for end-to-end testing
- **Component Tests**: Storybook for component testing
- **Accessibility**: Lighthouse CI for accessibility testing

Run tests:
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Component tests
npm run test:storybook
```

## 📚 Documentation

### Core Documentation
- [Component Documentation](docs/components.md) - Detailed documentation of all UI components
- [API Documentation](docs/api.md) - API endpoints and usage guidelines
- [Contributing Guide](CONTRIBUTING.md) - Guidelines for contributing to the project
- [Deployment Guide](docs/deployment.md) - Instructions for deploying the application

### Additional Resources
- [Architecture Overview](docs/architecture.md) - System architecture and design decisions
- [Testing Guide](docs/testing.md) - Comprehensive testing documentation
- [Security Guidelines](docs/security.md) - Security best practices and guidelines
- [Performance Optimization](docs/performance.md) - Tips for optimizing application performance

### API Reference
- [Authentication API](docs/api/auth.md) - Authentication endpoints and usage
- [Booking API](docs/api/booking.md) - Booking management endpoints
- [Payment API](docs/api/payment.md) - Payment processing endpoints
- [Vehicle API](docs/api/vehicle.md) - Vehicle management endpoints

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Prasad Bhumkar** - *Initial work* - [GitHub](https://github.com/prasad-bhumkar)

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Special thanks to the Next.js and Tailwind CSS communities
- Inspired by modern cab booking platforms

## 📞 Support

For support, please:
- Open an issue in the GitHub repository
- Contact the maintainers
- Check our [documentation](docs/) for detailed guides

---

Made with ❤️ by the IndiCab Team
