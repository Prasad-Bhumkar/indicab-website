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

## Technology Stack

- **Framework**: Next.js 15.2.0
- **UI Library**: React 18.3.1
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: Radix UI
- **Maps**: Leaflet/Mapbox
- **Deployment**: Netlify

## Getting Started

### Prerequisites

- Node.js 18+ or Bun 1.0+

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/indicab-clone.git
   cd indicab-clone
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

   Or with npm:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   bun run dev
   ```

   Or with npm:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `/src/app`: Next.js application routes
- `/src/components`: Reusable React components
- `/src/context`: React context providers (Favorites, etc.)
- `/src/data`: Mock data for routes and cities
- `/src/lib`: Utility functions
- `/src/types`: TypeScript type definitions
- `/public`: Static assets

## Documentation

- [Progress Documentation](./progress.md): Details about project versions and improvements
- [User Flows](./UserFlows.md): Documentation of main user journeys

## Testing

Run tests with:

```bash
bun test
```

End-to-end tests:

```bash
bun run test:e2e
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
