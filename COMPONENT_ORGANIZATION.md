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

## Current Implementation Status

### Component Migration (95% complete)
- ✅ All feature components moved to `/features`
- ✅ UI primitives organized in `/ui`  
- ✅ Layout components in `/layout`
- ✅ Shared utilities in `/shared`

### Storybook Integration
- ✅ 80% of UI components have stories
- ⚠️ 15% need story updates
- ❌ 5% missing stories (legacy components)

### TypeScript Coverage
- ✅ 100% of new components
- ⚠️ 90% of migrated components
- ❌ Legacy components need typing

### Documentation
- ✅ All components have JSDoc
- ✅ PropTypes for legacy components
- ✅ Usage examples in Storybook

## Best Practices

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

## Additional Notes
- The `ErrorBoundary` component is critical for robust error handling and should be maintained in the `shared` directory.
- Feature components are dynamically imported in pages for performance optimization.
- UI components use Tailwind CSS and Framer Motion for styling and animations.
- Ensure all new components follow accessibility best practices and responsive design principles.
