# Indicab Clone Organization

This document explains the organization of the Indicab Clone codebase, which has been consolidated to have all necessary files within the `indicab-clone` directory.

## Project Structure

The project follows a Next.js application structure with additional folders for legacy components and files:

- `/public` - Static assets
  - `/assets` - Organized assets
    - `/drivers` - Driver images
    - `/cities` - City images
  - `/images` - General images
  - `/favicon.ico`, `manifest.json`, etc. - Standard web files

- `/src` - Source code
  - `/app` - Next.js App Router pages
  - `/components` - React components used in the Next.js app
  - `/context` - React context providers
  - `/data` - Data files and configuration
  - `/lib` - Utility libraries
  - `/styles` - CSS styles
    - `/admin` - Admin-specific styles
  - `/legacy-components` - Original components from the previous version
  - `/legacy-pages` - Original pages from the previous version
    - `/admin` - Admin-specific pages

## Dependencies

The project uses the following main dependencies:
- Next.js for the framework
- React and React DOM
- React Router DOM for legacy components
- Various UI components like Radix UI
- Leaflet and Mapbox for maps
- Tailwind CSS for styling

## Scripts

The project includes several shell scripts:
- Download scripts for fetching images
- Deployment scripts for handling assets

## Note on Legacy Code

The project contains both:
1. Modern Next.js App Router code in `/src/app`
2. Legacy React components and pages in `/src/legacy-components` and `/src/legacy-pages`

This organization allows for gradual migration from the legacy code to the modern Next.js structure.
