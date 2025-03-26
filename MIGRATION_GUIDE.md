# IndiCab Migration Guide

This guide provides instructions for the migration of legacy React components to modern Next.js components with Tailwind CSS styling.

## Table of Contents

1. [Migration Overview](#migration-overview)
2. [Component Migration Process](#component-migration-process)
3. [CSS to Tailwind Migration](#css-to-tailwind-migration)
4. [Asset Reference Updates](#asset-reference-updates)
5. [External File References](#external-file-references)
6. [Migration Checklist](#migration-checklist)
7. [Examples](#examples)

## Migration Overview

The IndiCab application is being modernized from a traditional React application with CSS files to a Next.js application using Tailwind CSS for styling. This migration involves the following key changes:

1. Converting legacy React components to modern Next.js components
2. Migrating CSS styles to Tailwind CSS utility classes
3. Updating asset paths to work correctly in the Next.js framework
4. Refactoring any code that references files outside the project directory

## Component Migration Process

Follow these steps to migrate each component:

### 1. Create New Component File

Create a new component file in the appropriate location in the `/src/components` directory or `/src/app` directory depending on the component's purpose.

- For shared UI components: `/src/components/`
- For page-specific components: `/src/app/[route]/components/`
- For page components: `/src/app/[route]/page.tsx`

### 2. Add "use client" Directive

For interactive components that use state or event handlers, add the "use client" directive at the top of the file:

```tsx
"use client";

import { useState } from 'react';
// rest of imports
```

### 3. Update Imports

Update import statements:

- Change React Router imports to Next.js equivalents:
  - `import { Link, useNavigate, useLocation } from 'react-router-dom';` →
  - `import Link from 'next/link'; import { useRouter, usePathname } from 'next/navigation';`

- Replace CSS imports with Tailwind classes:
  - Remove: `import '../styles/Header.css';`

### 4. Update Component Structure

- Replace React functional component syntax:
  ```tsx
  const Header: React.FC = () => {
    // component code
  };
  ```
  with Next.js component syntax:
  ```tsx
  const Header = () => {
    // component code
  };
  ```

### 5. Adapt Navigation Logic

- Replace React Router navigation:
  ```tsx
  const navigate = useNavigate();
  navigate('/route');
  ```
  with Next.js navigation:
  ```tsx
  const router = useRouter();
  router.push('/route');
  ```

- Replace location checks:
  ```tsx
  const location = useLocation();
  if (location.pathname === '/route') { ... }
  ```
  with Next.js equivalent:
  ```tsx
  const pathname = usePathname();
  if (pathname === '/route') { ... }
  ```

### 6. Update Links

Replace React Router links with Next.js links:

```tsx
// React Router
<Link to="/route" className="...">Link text</Link>

// Next.js
<Link href="/route" className="...">Link text</Link>
```

### 7. Replace CSS Classes with Tailwind

Replace all CSS classes with equivalent Tailwind utility classes (see [CSS to Tailwind Migration](#css-to-tailwind-migration) section).

### 8. Update Client-Side Operations

Ensure client-side operations like localStorage access are wrapped in checks:

```tsx
useEffect(() => {
  // Only execute in browser environment
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('indicab_user');
    // rest of code
  }
}, []);
```

## CSS to Tailwind Migration

Refer to the utility file `src/utils/css-migration-guide.ts` for detailed mappings of CSS properties to Tailwind utility classes.

### Common CSS to Tailwind Mappings

| CSS | Tailwind |
|-----|----------|
| `.container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }` | `className="container mx-auto px-4 md:px-5"` |
| `.flex-container { display: flex; align-items: center; }` | `className="flex items-center"` |
| `.header { background-color: #0d785c; padding: 15px 0; }` | `className="bg-primary py-4"` |
| `.btn { padding: 8px 16px; border-radius: 4px; }` | `className="px-4 py-2 rounded"` |
| `.card { background-color: white; border-radius: 10px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08); padding: 20px; }` | `className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5"` |

### Color Mapping

The IndiCab color scheme has been configured in `tailwind.config.ts`:

- Primary color (`#0d785c`) → `bg-primary` / `text-primary`
- Secondary color (`#ff6b00`) → `bg-secondary` / `text-secondary`

### Responsive Design

In Tailwind, responsive design is handled using prefixes:

```
sm: (640px and up)
md: (768px and up)
lg: (1024px and up)
xl: (1280px and up)
2xl: (1536px and up)
```

Example:
```html
<div className="text-sm md:text-base lg:text-lg">Responsive text</div>
```

### Dark Mode Support

Add dark mode variants to your components:

```html
<div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
  Dark mode compatible content
</div>
```

## Asset Reference Updates

Update all asset references to use the correct paths:

### Images

Use the Next.js Image component for optimized images:

```tsx
// Before
<img src="/assets/images/example.jpg" alt="Example" />

// After
import Image from 'next/image';

<Image
  src="/assets/images/example.jpg"
  alt="Example"
  width={400}
  height={300}
  // OR
  fill
  className="object-cover"
/>
```

### SVG Icons

Convert inline SVGs to use className for styling:

```tsx
// Before
<svg style={{ color: '#0d785c', width: '24px' }}>...</svg>

// After
<svg className="text-primary w-6 h-6">...</svg>
```

## External File References

Refactor any code that references files outside the project directory:

1. Identify external references in imports, require statements, and file paths
2. Copy required external files into the project
3. Update paths to reference the copied files

## Migration Checklist

Use this checklist for each component you migrate:

- [ ] Create new component file in the appropriate location
- [ ] Add "use client" directive if component is interactive
- [ ] Update import statements for Next.js
- [ ] Remove CSS imports
- [ ] Update component syntax
- [ ] Replace React Router navigation with Next.js equivalents
- [ ] Update Link components
- [ ] Convert CSS classes to Tailwind utility classes
- [ ] Add client-side operation checks
- [ ] Update asset references
- [ ] Add dark mode support
- [ ] Test component functionality
- [ ] Remove legacy component file after successful migration

## Examples

### Header Component Migration

See the example migration of the Header component in `src/components/MigratedHeader.tsx`.

Key changes:
- Replaced React Router with Next.js navigation
- Converted CSS classes to Tailwind utility classes
- Added dark mode support
- Added responsive design with Tailwind breakpoints

### Contact Page Migration

See the example migration of the Contact page in `src/components/MigratedContactPage.tsx`.

Key changes:
- Converted all CSS styling to Tailwind
- Enhanced form styling with focus states
- Improved responsive layout
- Added dark mode support

## Migration Progress Tracking

Create a table to track migration progress:

| Component | Status | Notes |
|-----------|--------|-------|
| Header    | ✅ Done | Example in MigratedHeader.tsx |
| Footer    | ⏳ In Progress | |
| Contact Page | ✅ Done | Example in MigratedContactPage.tsx |
| ... | | |
