# ErrorBoundary Component

A React error boundary component that gracefully handles runtime errors in child components and provides a fallback UI.

## Features

- Catches JavaScript errors in child components
- Logs errors to console and error tracking services
- Provides "Copy Error" and "Try Again" buttons
- Displays error details in development
- Customizable fallback UI
- Integration with Sentry error tracking
- Automatic error reporting
- Reset functionality
- Error analytics
- Development tools integration

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| children | ReactNode | Yes | Components to be wrapped |
| fallback | ReactNode | No | Custom fallback UI |
| onError | (error: Error, info: ErrorInfo) => void | No | Custom error handler |
| onReset | () => void | No | Called when "Try Again" is clicked |
| shouldReset | boolean | No | Auto-reset on prop changes |
| errorTracking | boolean | No | Enable error tracking service |

## Usage

### Basic Usage
```tsx
import { ErrorBoundary } from './ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <MyComponent />
    </ErrorBoundary>
  );
}
```

### With Custom Fallback
```tsx
<ErrorBoundary 
  fallback={<CustomErrorComponent />}
  onError={(error, info) => {
    console.error('Error caught:', error);
    logErrorToService(error, info);
  }}
  onReset={() => {
    // Clean up any state
    clearErrorState();
  }}
>
  <MyComponent />
</ErrorBoundary>
```

### With Error Tracking
```tsx
<ErrorBoundary
  errorTracking={true}
  onError={(error, info) => {
    Sentry.captureException(error, {
      extra: {
        componentStack: info.componentStack,
        ...additionalContext
      }
    });
  }}
>
  <MyComponent />
</ErrorBoundary>
```

## Error Handling Patterns

### 1. Component-Level Boundaries
```tsx
function Dashboard() {
  return (
    <div>
      <ErrorBoundary fallback={<WidgetErrorFallback />}>
        <Widget1 />
      </ErrorBoundary>
      <ErrorBoundary fallback={<WidgetErrorFallback />}>
        <Widget2 />
      </ErrorBoundary>
    </div>
  );
}
```

### 2. Feature-Level Boundaries
```tsx
function BookingSystem() {
  return (
    <ErrorBoundary
      fallback={<BookingErrorFallback />}
      onReset={resetBookingState}
    >
      <BookingForm />
      <PaymentProcessor />
      <ConfirmationHandler />
    </ErrorBoundary>
  );
}
```

### 3. Route-Level Boundaries
```tsx
function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/booking"
        element={
          <ErrorBoundary fallback={<RouteErrorFallback />}>
            <BookingPage />
          </ErrorBoundary>
        }
      />
    </Routes>
  );
}
```

## Error Reporting

The component integrates with error tracking services:

```tsx
class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    if (this.props.errorTracking) {
      Sentry.withScope((scope) => {
        scope.setExtras(info);
        Sentry.captureException(error);
      });
    }
  }
}
```

## Development Tools

### Error Details
In development mode, the component shows:
- Error message and stack trace
- Component tree where error occurred
- Props and state at time of error
- "Copy Error" button for sharing

### Error Analytics
Tracks:
- Error frequency
- Affected components
- User actions leading to error
- Browser and environment info
- Recovery success rate

## Styling

The component uses Tailwind CSS for styling:
- Clean, minimal error UI
- Responsive layout
- Proper spacing and typography
- Error message formatting
- Action button styling
- Dark mode support

## Accessibility

- Error messages are announced to screen readers
- Proper heading structure in fallback UI
- Keyboard navigation for error actions
- High contrast mode support
- ARIA labels and roles
- Focus management after error

## Test Coverage

### Unit Tests
- Error catching (100%)
- Fallback rendering (100%)
- Reset functionality (100%)
- Props validation (100%)

### Integration Tests
- Error tracking (95%)
- Development tools (90%)
- Reset behavior (100%)

## Best Practices

1. Component-Level Boundaries
   - Wrap individual components rather than entire app
   - Use different boundaries for different sections
   - Keep error boundaries simple and focused

2. Error Handling
   - Log errors appropriately
   - Provide meaningful error messages
   - Include reset functionality
   - Preserve user data when possible

3. Development
   - Use descriptive error messages
   - Include component stack traces
   - Implement proper logging
   - Add error analytics

4. Production
   - Hide sensitive information
   - Provide user-friendly messages
   - Enable error tracking
   - Monitor error rates

5. Testing
   - Test error scenarios
   - Verify fallback UI
   - Check reset functionality
   - Validate error reporting

## Related Components

- LoadingBoundary
- SuspenseBoundary
- ErrorPage
- ErrorAlert
- ErrorLogger
- ErrorMetrics
- DevTools
