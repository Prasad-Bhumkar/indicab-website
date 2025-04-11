# IndiCab - Indian Cab Booking Service

![IndiCab Logo](/public/indicab-logo.svg)

A modern cab booking service built with Next.js, React, and TypeScript. IndiCab offers one-way, round trip, and rental services across major Indian cities.

## Live Demo

Check out the live demo:
- [IndiCab Application](https://solidcab.same-app.com)

## Key Features

### Booking Experience
- **Intuitive Interface**: Simple forms for all trip types
- **Smart Route Search**: Autocomplete with popular routes
- **City Explorer**: Browse services by city
- **Favorites System**: Save routes with localStorage sync
- **Responsive Design**: Optimized for all devices
- **Animated UI**: Smooth transitions and micro-interactions
- **Error Handling**: Robust error boundaries and clear messages

## Technology Stack (2024 Q3)

### Core Framework
- Next.js 15.4.0 (App Router)
- React 18.3.1 (Concurrent Features)
- TypeScript 5.4.0 (Strict Mode)
- Node.js 20.0.0 (LTS)

### UI Components
- Tailwind CSS 3.4.0 + CSS Modules
- Framer Motion 10.16.0 (Animations)
- Radix UI 1.0.0 (Accessible Primitives)
- Storybook 8.0.0 (Component Library)

### Backend Services
- MongoDB 7.0.0 (Atlas)
- Redis 7.2.0 (Caching)
- NextAuth.js 5.0.0 (Authentication)

### Infrastructure
- Vercel (Production Hosting)
- Netlify (Staging Environment)
- AWS S3 (Media Storage)
- Cloudflare (CDN & DNS)

## Getting Started

### Prerequisites
- Node.js 20.0.0+
- Bun 1.1.0+ (recommended)
- MongoDB 7.0.0+ (local or Atlas)
- Redis 7.2.0+ (optional for caching)

### Quick Start
```bash
# Clone repository
git clone https://github.com/indicab/indicab.git
cd indicab

# Install dependencies
bun install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your credentials

# Start development server
bun run dev
```

### Advanced Setup
```bash
# Docker Compose (includes MongoDB and Redis)
docker-compose up -d

# Run test suite
bun test

# Production build
bun run build

# Start production server
bun run start
```

## Project Structure

```
indicab/
├── src/
│   ├── app/                # Next.js app router
│   ├── components/         # UI components (atomic design)
│   ├── context/            # React context providers
│   ├── lib/                # Shared utilities
│   ├── services/           # API clients
│   ├── styles/             # Global CSS
│   └── types/              # TypeScript definitions
├── scripts/                # Utility scripts
├── tests/                  # Test suites
└── storybook/              # Component stories
```

## Documentation

- [Features](./FEATURES_DETAILED.md): Complete feature breakdown
- [API Reference](./BACKEND_DOCUMENTATION.md)
- [Component Guide](./COMPONENT_ORGANIZATION.md)
- [Development Guide](./COMMANDS_DOCUMENTATION.md)
- [Progress Tracking](./progress.md)

## Image Handling System

### Key Features
- Automatic redirects (308) from legacy /images/ paths to /assets/
- WebP optimization pipeline (60-70% size reduction)
- Lazy loading with blur placeholders
- Responsive image sizing
- Comprehensive error handling
- Default fallback images

### Maintenance Guide
1. Add new images to `/public/assets/` directory
2. Run `npm run optimize-images` to generate WebP versions
3. Test redirects: `curl -I http://localhost:3000/images/path/to/image.jpg`
4. Reference images using `/assets/` path prefix

### Performance Benefits
- Faster page loads
- Reduced bandwidth usage
- Better SEO through proper image handling
- Improved user experience

## Quality Assurance

### Testing
```bash
# Unit tests
bun test

# E2E tests
bun run test:e2e

# Storybook
bun run storybook
```

### Code Quality
```bash
# Linting
bun run lint

# Type checking  
bun run type-check

# Formatting
bun run format
```

## Deployment

The application is configured for deployment on Netlify. A `netlify.toml` file is included with the necessary configuration.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)
