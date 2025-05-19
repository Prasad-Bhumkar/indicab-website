# Error Handling and Loading States

This document provides comprehensive documentation for the error handling and loading state components in our application.

## Error Boundary

The `ErrorBoundary` component is a React error boundary that catches JavaScript errors anywhere in the child component tree, logs those errors, and displays a fallback UI.

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

| Prop          | Type                                                 | Default                                  | Description                                        |
| ------------- | ---------------------------------------------------- | ---------------------------------------- | -------------------------------------------------- |
| `children`    | `React.ReactNode`                                    | Required                                 | The components to be wrapped by the error boundary |
| `fallback`    | `React.ReactNode`                                    | `undefined`                              | Custom fallback UI to display when an error occurs |
| `onError`     | `(error: Error, errorInfo: React.ErrorInfo) => void` | `undefined`                              | Callback function called when an error occurs      |
| `showDetails` | `boolean`                                            | `process.env.NODE_ENV === 'development'` | Whether to show error details in the UI            |
| `retryCount`  | `number`                                             | `3`                                      | Maximum number of retry attempts                   |
| `onRetry`     | `() => Promise<void>`                                | `undefined`                              | Callback function called when retrying             |
| `locale`      | `string`                                             | `i18n.language`                          | Locale for error messages                          |

### Features

1. **Error Catching**: Catches JavaScript errors in child components
2. **Error Reporting**: Integrates with Sentry for error tracking
3. **Retry Mechanism**: Allows retrying failed operations with a configurable retry count
4. **Performance Monitoring**: Tracks errors and retries in performance metrics
5. **Internationalization**: Supports localized error messages
6. **Development Mode**: Shows detailed error information in development

### ThemedErrorBoundary

A pre-configured version of the ErrorBoundary with default props:

```tsx
import { ThemedErrorBoundary } from '@/components/common/ErrorBoundary';

function App() {
  return (
    <ThemedErrorBoundary>
      <YourComponent />
    </ThemedErrorBoundary>
  );
}
```

### useErrorBoundary Hook

A hook for functional components that provides error boundary functionality:

```tsx
import { useErrorBoundary } from '@/components/common/ErrorBoundary';

function YourComponent() {
  const { hasError, handleError, handleRetry, reset } = useErrorBoundary();

  if (hasError) {
    return (
      <div>
        <button onClick={handleRetry}>Retry</button>
        <button onClick={reset}>Reset</button>
      </div>
    );
  }

  return <div>Your content</div>;
}
```

## Loading States

The loading state components provide visual feedback during asynchronous operations.

### LoadingState

A basic loading indicator component.

```tsx
import { LoadingState } from '@/components/LoadingState';

function YourComponent() {
  return <LoadingState isLoading={true} text="Loading..." />;
}
```

#### Props

| Prop        | Type                                    | Default        | Description                         |
| ----------- | --------------------------------------- | -------------- | ----------------------------------- |
| `isLoading` | `boolean`                               | Required       | Whether to show the loading state   |
| `text`      | `string`                                | `'Loading...'` | Text to display next to the spinner |
| `size`      | `'sm' \| 'md' \| 'lg'`                  | `'md'`         | Size of the loading spinner         |
| `variant`   | `'default' \| 'primary' \| 'secondary'` | `'default'`    | Visual variant of the loading state |
| `className` | `string`                                | `undefined`    | Additional CSS classes              |

### LoadingOverlay

A full-screen overlay with a loading indicator.

```tsx
import { LoadingOverlay } from '@/components/LoadingState';

function YourComponent() {
  return (
    <LoadingOverlay isLoading={true}>
      <div>Your content</div>
    </LoadingOverlay>
  );
}
```

#### Props

| Prop               | Type                                    | Default        | Description                                      |
| ------------------ | --------------------------------------- | -------------- | ------------------------------------------------ |
| `isLoading`        | `boolean`                               | Required       | Whether to show the loading overlay              |
| `text`             | `string`                                | `'Loading...'` | Text to display next to the spinner              |
| `size`             | `'sm' \| 'md' \| 'lg'`                  | `'md'`         | Size of the loading spinner                      |
| `variant`          | `'default' \| 'primary' \| 'secondary'` | `'default'`    | Visual variant of the loading state              |
| `overlayClassName` | `string`                                | `undefined`    | Additional CSS classes for the overlay           |
| `contentClassName` | `string`                                | `undefined`    | Additional CSS classes for the content           |
| `blur`             | `boolean`                               | `true`         | Whether to apply a blur effect to the background |

### LoadingButton

A button that shows a loading state when clicked.

```tsx
import { LoadingButton } from '@/components/LoadingState';

function YourComponent() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await someAsyncOperation();
    setIsLoading(false);
  };

  return (
    <LoadingButton isLoading={isLoading} onClick={handleClick} variant="primary">
      Submit
    </LoadingButton>
  );
}
```

#### Props

| Prop        | Type                                    | Default        | Description                       |
| ----------- | --------------------------------------- | -------------- | --------------------------------- |
| `isLoading` | `boolean`                               | Required       | Whether to show the loading state |
| `text`      | `string`                                | `'Loading...'` | Text to display when loading      |
| `size`      | `'sm' \| 'md' \| 'lg'`                  | `'md'`         | Size of the loading spinner       |
| `variant`   | `'default' \| 'primary' \| 'secondary'` | `'default'`    | Visual variant of the button      |
| `onClick`   | `() => void`                            | `undefined`    | Click handler                     |
| `disabled`  | `boolean`                               | `false`        | Whether the button is disabled    |
| `className` | `string`                                | `undefined`    | Additional CSS classes            |

## Best Practices

1. **Error Boundaries**

   - Place error boundaries at strategic points in your component tree
   - Use different error boundaries for different features
   - Provide meaningful error messages and recovery options
   - Log errors to your error tracking service

2. **Loading States**

   - Show loading states for all asynchronous operations
   - Use appropriate loading indicators for different contexts
   - Provide feedback for long-running operations
   - Disable interactive elements during loading

3. **Error Messages**

   - Use clear and concise error messages
   - Provide actionable recovery steps
   - Support internationalization
   - Include relevant error details in development

4. **Performance**
   - Monitor error rates and retry attempts
   - Track loading times for critical operations
   - Optimize error boundary placement
   - Use appropriate loading indicators for different durations

## Examples

### Error Boundary with Retry

```tsx
function YourComponent() {
  const handleRetry = async () => {
    // Retry logic
  };

  return (
    <ErrorBoundary
      onRetry={handleRetry}
      retryCount={3}
      showDetails={process.env.NODE_ENV === 'development'}
    >
      <YourContent />
    </ErrorBoundary>
  );
}
```

### Loading State with Overlay

```tsx
function YourComponent() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingOverlay isLoading={isLoading} text="Processing..." variant="primary">
      <YourContent />
    </LoadingOverlay>
  );
}
```

### Loading Button with Error Handling

```tsx
function YourComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const { handleError } = useErrorBoundary();

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await submitData();
    } catch (error) {
      handleError(error, { componentStack: '' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoadingButton isLoading={isLoading} onClick={handleSubmit} variant="primary">
      Submit
    </LoadingButton>
  );
}
```
