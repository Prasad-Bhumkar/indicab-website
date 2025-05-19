# Error Handling and Performance Monitoring

This document provides comprehensive documentation for the error handling and performance monitoring system in our application.

## Error Boundary

The `ErrorBoundary` component is a React error boundary that catches JavaScript errors anywhere in the child component tree, logs those errors, and displays a fallback UI. It includes features for error reporting, retry mechanisms, and performance monitoring.

### Basic Usage

```tsx
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <YourComponent />
    </ErrorBoundary>
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | Required | The components to be wrapped by the error boundary |
| `fallback` | `React.ReactNode` | `undefined` | Custom fallback UI to display when an error occurs |
| `onError` | `(error: Error, errorInfo: React.ErrorInfo) => void` | `undefined` | Callback function called when an error occurs |
| `onReset` | `() => void` | `undefined` | Callback function called when retrying |
| `locale` | `string` | `'en'` | Locale for error messages |
| `component` | `string` | `undefined` | Component name for error tracking |
| `maxRetries` | `number` | `3` | Maximum number of retry attempts |

### Features

1. **Error Catching**
   - Catches JavaScript errors in child components
   - Prevents app crashes
   - Provides fallback UI
   - Supports custom fallback components

2. **Error Reporting**
   - Integrates with Sentry for error tracking
   - Custom error reporting dialog
   - Detailed error information in development
   - Enhanced error context with component info

3. **Retry Mechanism**
   - Automatic retry functionality
   - Configurable retry count
   - Retry attempt tracking
   - Loading state during retry
   - Custom retry handlers

4. **Performance Monitoring**
   - Tracks error handling performance
   - Measures retry attempts
   - Integrates with performance dashboard
   - Detailed error metrics

5. **Accessibility**
   - ARIA roles and labels
   - Keyboard navigation
   - Screen reader support
   - Focus management

6. **Internationalization**
   - Localized error messages
   - Configurable locale
   - Fallback messages

### Higher-Order Component

The `withErrorBoundary` HOC provides a convenient way to wrap components with error boundary functionality:

```tsx
import { withErrorBoundary } from '@/components/common/ErrorBoundary';

const WrappedComponent = withErrorBoundary(YourComponent, {
  fallback: <CustomFallback />,
  onError: (error, errorInfo) => {
    // Handle error
  },
  maxRetries: 3
});
```

### Hook Usage

The `useErrorBoundary` hook provides error boundary functionality in functional components:

```tsx
import { useErrorBoundary } from '@/components/common/ErrorBoundary';

function YourComponent() {
  const { error, handleError, handleRetry, reset, isRetrying } = useErrorBoundary();

  if (error) {
    return (
      <div>
        <button onClick={handleRetry} disabled={isRetrying}>
          {isRetrying ? 'Retrying...' : 'Retry'}
        </button>
        <button onClick={reset}>Reset</button>
      </div>
    );
  }

  return <div>Your component content</div>;
}
```

## Performance Monitoring

The performance monitoring system provides comprehensive tracking of various metrics and performance indicators.

### Basic Usage

```tsx
import { performanceMonitor } from '@/utils/performance';

// Track error
performanceMonitor.addMetric({
  name: 'error-boundary-handling',
  value: 1,
  timestamp: Date.now(),
  metadata: {
    error: 'Error message',
    component: 'ComponentName',
    retryCount: 0
  }
});

// Track retry
performanceMonitor.addMetric({
  name: 'error-boundary-retry',
  value: retryCount,
  timestamp: Date.now(),
  metadata: {
    success: true,
    component: 'ComponentName'
  }
});
```

### Features

1. **Metric Tracking**
   - Component render times
   - API call durations
   - Error handling performance
   - Web Vitals monitoring
   - Custom metrics

2. **Performance Analysis**
   - Average metrics
   - Percentile calculations
   - Trend analysis
   - Performance alerts

3. **Integration**
   - Sentry error tracking
   - Custom analytics
   - Performance dashboards
   - Alert systems

## Best Practices

1. **Error Boundary Placement**
   - Place error boundaries strategically
   - Wrap critical components
   - Consider component hierarchy
   - Use multiple boundaries

2. **Error Handling**
   - Provide meaningful error messages
   - Include recovery options
   - Log detailed error information
   - Track error patterns

3. **Performance Monitoring**
   - Track key metrics
   - Set performance budgets
   - Monitor trends
   - Set up alerts

4. **Accessibility**
   - Use semantic HTML
   - Include ARIA attributes
   - Support keyboard navigation
   - Test with screen readers

5. **Internationalization**
   - Use localized messages
   - Support multiple languages
   - Provide fallback messages
   - Consider cultural differences

## Testing

### Unit Tests

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

test('handles errors correctly', () => {
  render(
    <ErrorBoundary>
      <ThrowError />
    </ErrorBoundary>
  );

  expect(screen.getByText('Something went wrong')).toBeInTheDocument();
});
```

### Integration Tests

```tsx
import { test, expect } from '@playwright/test';

test('handles component error gracefully', async ({ page }) => {
  await page.goto('/test-error-page');
  await expect(page.getByText('Something went wrong')).toBeVisible();
});
```

### Performance Tests

```tsx
test('meets performance requirements', async ({ page }) => {
  await page.goto('/');
  const metrics = await page.evaluate(() => {
    return window.performance.getEntriesByType('measure');
  });
  expect(metrics).toContainEqual(
    expect.objectContaining({
      name: 'page-load',
      duration: expect.any(Number)
    })
  );
});
``` 