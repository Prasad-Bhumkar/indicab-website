# Indicab Website Project Setup Script for Windows
Write-Host "🚀 Initializing Indicab Website Development Environment..." -ForegroundColor Green

# Check if Node.js is installed
try {
    $nodeVersion = node -v
    $versionNumber = $nodeVersion.Substring(1).Split('.')[0]
    
    if ([int]$versionNumber -lt 20) {
        Write-Host "❌ Node.js version is too old. Please install Node.js v20 or higher." -ForegroundColor Red
        exit 1
    }
    
    Write-Host "✅ Node.js $nodeVersion detected" -ForegroundColor Green
}
catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js v20 or higher." -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
npm ci

# Set up environment variables
Write-Host "🔧 Setting up environment variables..." -ForegroundColor Cyan
if (-not (Test-Path .env.local)) {
    if (Test-Path .env.example) {
        Copy-Item .env.example .env.local
        Write-Host "⚠️ Please update the values in .env.local with your own credentials." -ForegroundColor Yellow
    }
    else {
        Write-Host "⚠️ No .env.example file found. Creating empty .env.local file." -ForegroundColor Yellow
        New-Item -Path . -Name ".env.local" -ItemType "file" -Value ""
    }
}

# Set up husky
Write-Host "🐶 Setting up Husky hooks..." -ForegroundColor Cyan
npm install husky --save-dev
npx husky install

# Create missing documentation directories
Write-Host "📚 Setting up documentation directories..." -ForegroundColor Cyan
$dirs = @("docs/api", "docs/architecture", "docs/components")
foreach ($dir in $dirs) {
    if (-not (Test-Path $dir)) {
        New-Item -Path $dir -ItemType Directory -Force | Out-Null
        Write-Host "  Created $dir" -ForegroundColor Green
    }
}

# Create CHANGELOG.md if it doesn't exist
if (-not (Test-Path CHANGELOG.md)) {
    $changelogContent = @'
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial project setup

### Changed

### Fixed

### Removed
'@
    Set-Content -Path "CHANGELOG.md" -Value $changelogContent
    Write-Host "✅ Created CHANGELOG.md" -ForegroundColor Green
}

# Create API.md if it doesn't exist
if (-not (Test-Path API.md)) {
    $apiContent = @'
# API Documentation

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
'@
    Set-Content -Path "API.md" -Value $apiContent
    Write-Host "✅ Created API.md" -ForegroundColor Green
}

# Create ARCHITECTURE.md if it doesn't exist
if (-not (Test-Path ARCHITECTURE.md)) {
    $architectureContent = @'
# Architecture Documentation

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

- `/src`: Main source code
  - `/components`: Reusable UI components
  - `/pages`: Next.js pages
  - `/hooks`: Custom React hooks
  - `/context`: React context providers
  - `/utils`: Utility functions
  - `/services`: API services
  - `/types`: TypeScript types
  - `/styles`: Global styles

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
'@
    Set-Content -Path "ARCHITECTURE.md" -Value $architectureContent
    Write-Host "✅ Created ARCHITECTURE.md" -ForegroundColor Green
}

# Run initial build
Write-Host "🏗️ Running initial build..." -ForegroundColor Cyan
npm run build

# Run initial tests
Write-Host "🧪 Running tests..." -ForegroundColor Cyan
npm test

Write-Host "✅ Project initialization complete! You're ready to start developing." -ForegroundColor Green
Write-Host "📝 Next steps:" -ForegroundColor Yellow
Write-Host "  1. Update your .env.local file with appropriate values" -ForegroundColor Yellow
Write-Host "  2. Run 'npm run dev' to start the development server" -ForegroundColor Yellow
Write-Host "  3. Check the README.md for more information about the project" -ForegroundColor Yellow 