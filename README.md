# IndiCab - Indian Cab Booking Service

![IndiCab Logo](/public/indicab-logo.svg)

A modern cab booking service built with Next.js, React, and TypeScript. IndiCab offers one-way, round trip, and rental services across major Indian cities.

## Live Demo

Check out the live demo:
- [IndiCab Application](https://solidcab.same-app.com)

## Features

- **Intuitive Booking Interface**: Easy-to-use forms for various trip types
- **Route Search**: Quick search with autocomplete for popular routes
- **City Exploration**: Browse cab services by city
- **Favorites System**: Save and manage your favorite routes with localStorage persistence
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Animated UI**: Smooth transitions and animations for better user experience
- **Error Handling**: Robust error boundaries and user-friendly error messages

## Technology Stack (2024)

### Core
- Next.js 15.4.0
- React 18.3.1
- TypeScript 5.4.0
- Node.js 20.0.0

### UI/UX
- Tailwind CSS 3.4.0
- Framer Motion 10.16.0
- Radix UI 1.0.0
- Storybook 8.0.0

### Backend
- MongoDB 7.0.0
- Redis 7.2.0
- NextAuth.js 5.0.0

### Infrastructure
- Vercel (Production)
- Netlify (Staging)
- AWS S3 (Storage)
- Cloudflare (CDN/DNS)

## Development Setup

### Requirements
- Node.js 20.0.0+
- Bun 1.1.0+ (optional)
- MongoDB 7.0.0+
- Redis 7.2.0+

### Quick Start
```bash
# 1. Clone repository
git clone https://github.com/indicab/indicab.git
cd indicab

# 2. Install dependencies
bun install

# 3. Setup environment
cp .env.example .env.local
# Edit .env.local with your credentials

# 4. Start development server
bun run dev
```

### Advanced Setup
```bash
# Run with Docker
docker-compose up -d

# Run tests
bun test

# Build for production
bun run build

# Start production server
bun run start
```

## Project Architecture

```
indicab/
├── src/
│   ├── app/                # Next.js app router
│   ├── components/         # Organized UI components
│   ├── context/            # Global state management
│   ├── lib/                # Shared utilities
│   ├── services/           # API clients
│   ├── styles/             # Global styles
│   └── types/              # TypeScript definitions
├── public/                 # Static assets
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
