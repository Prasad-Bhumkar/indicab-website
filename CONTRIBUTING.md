# Contributing to IndiCab

Thank you for your interest in contributing to IndiCab! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Community](#community)

## Code of Conduct

We are committed to providing a welcoming and inclusive experience for everyone. Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

## Getting Started

1. **Fork the Repository**
   ```bash
   git clone https://github.com/yourusername/indicab-Website.git
   cd indicab-Website
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Development Environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## Development Process

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-fix-name
   ```

2. **Make Changes**
   - Write clean, maintainable code
   - Follow the coding standards
   - Add/update tests as needed
   - Update documentation

3. **Test Your Changes**
   ```bash
   # Run type checking
   npm run type-check
   
   # Run unit tests
   npm run test
   
   # Run E2E tests
   npm run test:e2e
   
   # Run linting
   npm run lint
   ```

## Pull Request Process

1. **Update Documentation**
   - Update README.md if needed
   - Add/update component documentation
   - Update API documentation for backend changes

2. **Create Pull Request**
   - Use the PR template
   - Link related issues
   - Add meaningful description
   - Include screenshots for UI changes

3. **Code Review**
   - Address review comments
   - Keep the PR focused and small
   - Ensure all checks pass

4. **Merge Process**
   - Squash commits
   - Use conventional commit message
   - Delete branch after merge

## Coding Standards

### TypeScript

1. **Types and Interfaces**
   ```typescript
   // Use interfaces for objects
   interface UserProps {
     name: string;
     email: string;
     age?: number;
   }
   
   // Use type for unions/intersections
   type Status = 'pending' | 'active' | 'inactive';
   ```

2. **Component Structure**
   ```typescript
   // Component file (ComponentName.tsx)
   import React from 'react';
   import type { ComponentProps } from './types';
   import styles from './styles.module.css';
   
   export function ComponentName({ prop1, prop2 }: ComponentProps): JSX.Element {
     // Implementation
   }
   ```

3. **Naming Conventions**
   - PascalCase for components
   - camelCase for functions/variables
   - UPPER_CASE for constants

### React

1. **Hooks**
   ```typescript
   // Custom hook
   function useCustomHook(param: string) {
     const [state, setState] = useState<string>(param);
     
     useEffect(() => {
       // Effect logic
     }, [param]);
     
     return state;
   }
   ```

2. **Component Organization**
   ```typescript
   // Imports
   import React from 'react';
   import type { Props } from './types';
   
   // Component
   export function Component(props: Props) {
     // Hooks
     const [state, setState] = useState();
     
     // Handlers
     const handleClick = () => {};
     
     // Effects
     useEffect(() => {}, []);
     
     // Render
     return <div />;
   }
   ```

### Styling

1. **Tailwind CSS**
   ```typescript
   // Use utility classes
   <div className="flex items-center justify-between p-4">
     <h1 className="text-2xl font-bold text-gray-900">
       Title
     </h1>
   </div>
   ```

2. **CSS Modules**
   ```css
   /* styles.module.css */
   .container {
     @apply flex items-center;
   }
   
   .title {
     @apply text-2xl font-bold;
   }
   ```

## Commit Guidelines

Follow conventional commits:

```bash
# Format
type(scope): description

# Examples
feat(auth): add JWT authentication
fix(ui): resolve button alignment issue
docs(api): update endpoint documentation
test(components): add unit tests for Button
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Tests
- `chore`: Maintenance

## Testing Guidelines

1. **Unit Tests**
   ```typescript
   describe('Component', () => {
     it('renders correctly', () => {
       render(<Component />);
       expect(screen.getByText('text')).toBeInTheDocument();
     });
     
     it('handles click event', () => {
       const onClickMock = vi.fn();
       render(<Component onClick={onClickMock} />);
       fireEvent.click(screen.getByRole('button'));
       expect(onClickMock).toHaveBeenCalled();
     });
   });
   ```

2. **Integration Tests**
   ```typescript
   describe('Feature', () => {
     it('completes the workflow', async () => {
       render(<Feature />);
       await userEvent.type(screen.getByRole('textbox'), 'input');
       await userEvent.click(screen.getByRole('button'));
       expect(await screen.findByText('success')).toBeInTheDocument();
     });
   });
   ```

3. **E2E Tests**
   ```typescript
   test('user can book a cab', async ({ page }) => {
     await page.goto('/');
     await page.fill('[name="from"]', 'Mumbai');
     await page.fill('[name="to"]', 'Pune');
     await page.click('text=Book Now');
     await expect(page.locator('text=Booking Confirmed')).toBeVisible();
   });
   ```

## Documentation

1. **Component Documentation**
   ```typescript
   /**
    * Button component with various styles and sizes.
    *
    * @param variant - The button style variant
    * @param size - The button size
    * @param children - The button content
    * @param className - Additional CSS classes
    *
    * @example
    * ```tsx
    * <Button variant="primary" size="lg">
    *   Click Me
    * </Button>
    * ```
    */
   ```

2. **API Documentation**
   ```typescript
   /**
    * Creates a new booking.
    *
    * @param {Object} data - The booking data
    * @param {string} data.from - Origin city
    * @param {string} data.to - Destination city
    * @param {Date} data.date - Travel date
    *
    * @returns {Promise<Booking>} The created booking
    * @throws {ValidationError} If data is invalid
    */
   ```

## Community

- Join our [Discord](https://discord.gg/indicab)
- Follow us on [Twitter](https://twitter.com/indicab)
- Read our [Blog](https://blog.indicab.com)

## Questions?

Feel free to reach out to the maintainers:
- Email: developers@indicab.com
- Discord: @indicab-team

---

Thank you for contributing to IndiCab! 🚗 