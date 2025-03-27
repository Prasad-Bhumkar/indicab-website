# Component Organization Guidelines

## Structure Overview

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

## Naming Conventions

| Category       | Naming Pattern          | Example           |
|----------------|-------------------------|-------------------|
| Feature        | PascalCase + Feature    | `BookingHistory`  |  
| UI             | Simple Descriptive      | `Button`          |
| Layout         | Structural              | `Header`          |
| Shared         | Functional              | `ErrorBoundary`   |

## File Structure

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

## Migration Status

Current components are documented in `src/components/components.json`. Future work:

1. Move components to their categorized folders
2. Update import paths throughout the codebase
3. Remove unused legacy components
4. Add Storybook stories for UI components