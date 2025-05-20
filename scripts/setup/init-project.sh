#!/usr/bin/env bash

# Check OS for compatibility
WINDOWS=0
if [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
  WINDOWS=1
  echo "🖥️ Detected Windows environment"
fi

echo "🚀 Initializing Indicab Website Development Environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v20 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [[ $NODE_VERSION -lt 20 ]]; then
    echo "❌ Node.js version is too old. Please install Node.js v20 or higher."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Set up environment variables
echo "🔧 Setting up environment variables..."
if [ ! -f .env.local ]; then
  if [ -f .env.example ]; then
    if [[ $WINDOWS -eq 1 ]]; then
      # Windows copy command
      copy .env.example .env.local
    else
      # Unix copy command
      cp .env.example .env.local
    fi
    echo "⚠️ Please update the values in .env.local with your own credentials."
  else
    echo "⚠️ No .env.example file found. Please create .env.local manually."
    touch .env.local
  fi
fi

# Set up husky
echo "🐶 Setting up Husky hooks..."
bash .husky/install.sh

# Create missing documentation templates if needed
echo "📚 Setting up documentation templates..."
mkdir -p docs/api
mkdir -p docs/architecture
mkdir -p docs/components

# Create CHANGELOG.md if it doesn't exist
if [ ! -f CHANGELOG.md ]; then
  echo "# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial project setup

### Changed

### Fixed

### Removed
" > CHANGELOG.md
  echo "✅ Created CHANGELOG.md"
fi

# Create API.md if it doesn't exist
if [ ! -f API.md ]; then
  echo "# API Documentation

This document describes the APIs used in the Indicab Website project.

## External APIs

List of external APIs used in the project:

- **Google Maps API**: Used for maps and location services
- **Stripe API**: Used for payment processing

## Internal APIs

Overview of internal APIs:

- **Authentication API**: User registration, login, and session management
- **Booking API**: Cab booking and reservation management
- **User API**: User profile management
- **Vehicle API**: Vehicle information and availability
" > API.md
  echo "✅ Created API.md"
fi

# Create ARCHITECTURE.md if it doesn't exist
if [ ! -f ARCHITECTURE.md ]; then
  echo "# Architecture Documentation

This document describes the architecture of the Indicab Website project.

## Overview

Indicab is a Next.js application that provides a cab booking platform. The application follows a modern React architecture with server components and client components where appropriate.

## Tech Stack

- **Frontend**: Next.js with React 19
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **API Integration**: Custom hooks with Axios
- **Authentication**: NextAuth.js
- **Database**: MongoDB with Mongoose
- **Testing**: Vitest for unit tests, Playwright for E2E tests
- **Deployment**: Vercel and Netlify
- **Monitoring**: Sentry

## Directory Structure

The project follows a feature-based directory structure:

- \`/src\`: Main source code
  - \`/components\`: Reusable UI components
  - \`/pages\`: Next.js pages
  - \`/hooks\`: Custom React hooks
  - \`/context\`: React context providers
  - \`/utils\`: Utility functions
  - \`/services\`: API services
  - \`/types\`: TypeScript types
  - \`/styles\`: Global styles

## Data Flow

The application follows a unidirectional data flow:

1. User interactions trigger events
2. Events are handled by components or context
3. API calls are made through services
4. Data is updated in the context
5. UI is re-rendered with new data

## Deployment Strategy

The application uses a multi-environment deployment strategy:

- **Development**: Local development environment
- **Staging**: Pre-production environment for testing
- **Production**: Live environment

Each environment has its own configuration and deployment pipeline.
" > ARCHITECTURE.md
  echo "✅ Created ARCHITECTURE.md"
fi

# Run initial build
echo "🏗️ Running initial build..."
npm run build

# Run initial tests
echo "🧪 Running tests..."
npm test

echo "✅ Project initialization complete! You're ready to start developing."
echo "📝 Next steps:"
echo "  1. Update your .env.local file with appropriate values"
echo "  2. Run 'npm run dev' to start the development server"
echo "  3. Check the README.md for more information about the project" 