# Component Documentation

## Overview

This document provides detailed information about the components used in the IndiCab project. Components are organized into four main categories:

## Categories

### 1. Feature Components (`/features`)

Feature components implement specific business functionality and domain logic.

#### Booking Components
- `BookingForm` - Main booking form component
- `RouteSelector` - Route selection interface
- `VehicleSelector` - Vehicle type selection
- `PaymentForm` - Payment processing interface

#### Map Components
- `MapView` - Interactive map display
- `RouteVisualization` - Route path visualization
- `LocationPicker` - Location selection interface

#### User Components
- `UserProfile` - User profile management
- `BookingHistory` - Past bookings display
- `SavedRoutes` - Favorite routes management

### 2. UI Components (`/ui`)

Reusable UI components that follow our design system.

#### Input Components
- `Button` - Standard button component
  - Variants: primary, outline, secondary, success
  - Sizes: sm, md, lg
  - Props: variant, size, asChild, className

- `Input` - Text input component
  - Types: text, email, password, number
  - States: default, error, disabled
  - Validation integration

- `Select` - Dropdown selection component
  - Single/Multiple selection
  - Search functionality
  - Custom rendering

#### Layout Components
- `Card` - Container component
- `Dialog` - Modal dialog
- `Drawer` - Side panel
- `Tabs` - Tab navigation

#### Feedback Components
- `Toast` - Notification messages
- `Alert` - Alert boxes
- `Progress` - Progress indicators
- `Spinner` - Loading spinners

### 3. Layout Components (`/layout`)

Components that define the application's structure.

- `Header` - Main navigation header
- `Footer` - Site footer
- `Sidebar` - Navigation sidebar
- `PageContainer` - Standard page wrapper

### 4. Shared Components (`/shared`)

Utility components used across the application.

- `ErrorBoundary` - Error handling wrapper
- `Suspense` - Loading state management
- `ThemeProvider` - Theme context provider
- `AuthGuard` - Authentication wrapper

## Best Practices

### Component Creation

1. **File Structure**
   ```typescript
   // ComponentName.tsx
   import React from 'react';
   import type { ComponentProps } from './types';
   
   export function ComponentName({ prop1, prop2 }: ComponentProps): JSX.Element {
     return (
       // JSX
     );
   }
   ```

2. **Type Definitions**
   ```typescript
   // types.ts
   export interface ComponentProps {
     prop1: string;
     prop2?: number;
   }
   ```

3. **Testing**
   ```typescript
   // ComponentName.test.tsx
   import { render, screen } from '@testing-library/react';
   import { ComponentName } from './ComponentName';
   
   describe('ComponentName', () => {
     it('renders correctly', () => {
       render(<ComponentName prop1="test" />);
       expect(screen.getByText('test')).toBeInTheDocument();
     });
   });
   ```

### Usage Guidelines

1. **State Management**
   - Use local state for UI-only state
   - Use context for shared state
   - Use server state for API data

2. **Performance**
   - Implement proper memoization
   - Use lazy loading for large components
   - Optimize re-renders

3. **Accessibility**
   - Include ARIA labels
   - Ensure keyboard navigation
   - Maintain proper heading hierarchy

## Component Development Workflow

1. **Planning**
   - Define component requirements
   - Create component interface
   - Plan test cases

2. **Implementation**
   - Create component file
   - Implement basic functionality
   - Add styling
   - Write tests

3. **Documentation**
   - Add JSDoc comments
   - Create Storybook stories
   - Update this documentation

4. **Review**
   - Code review
   - Accessibility review
   - Performance testing

## Migration Guide

When migrating from old components to new ones:

1. **Identify Dependencies**
   - List all component dependencies
   - Check for shared state
   - Note any side effects

2. **Create New Component**
   - Implement new version
   - Add necessary tests
   - Update documentation

3. **Replace Usage**
   - Replace in one component at a time
   - Test thoroughly
   - Monitor for issues

4. **Clean Up**
   - Remove old component
   - Update dependencies
   - Clean up imports

## Troubleshooting

Common issues and solutions:

1. **Component Not Rendering**
   - Check import paths
   - Verify props
   - Check for runtime errors

2. **Style Issues**
   - Verify Tailwind classes
   - Check for CSS conflicts
   - Inspect component hierarchy

3. **Performance Issues**
   - Check for unnecessary re-renders
   - Verify memoization
   - Profile component performance

## Contributing

When contributing new components:

1. Follow the established file structure
2. Include comprehensive tests
3. Add Storybook stories
4. Update this documentation
5. Follow the code review process

## Resources

- [Design System](link-to-design-system)
- [Storybook](link-to-storybook)
- [Component Examples](link-to-examples)
- [Testing Guide](link-to-testing-guide) 