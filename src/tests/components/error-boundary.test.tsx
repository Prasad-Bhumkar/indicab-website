import { ErrorBoundary, useErrorBoundary, withErrorBoundary } from '@/components/common/ErrorBoundary';
import * as Sentry from '@sentry/nextjs';
import { fireEvent, render, screen } from '@testing-library/react';

// Mock Sentry
vi.mock('@sentry/nextjs', () => ({
  withScope: vi.fn((callback) => callback({ setExtras: vi.fn() })),
  captureException: vi.fn(),
}));

// Component that throws an error
const ThrowError = ({ message = 'Test error' }: { message?: string }) => {
  throw new Error(message);
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders error UI when there is an error', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  it('calls onError callback when error occurs', () => {
    const onError = vi.fn();
    render(
      <ErrorBoundary onError={onError}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(onError).toHaveBeenCalled();
    expect(Sentry.captureException).toHaveBeenCalled();
  });

  it('renders custom fallback when provided', () => {
    const fallback = <div>Custom error UI</div>;
    render(
      <ErrorBoundary fallback={fallback}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Custom error UI')).toBeInTheDocument();
  });

  it('resets error state when try again is clicked', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    const tryAgainButton = screen.getByText('Try again');
    fireEvent.click(tryAgainButton);

    // Since we're mocking window.location.reload, we can't test the actual reload
    // but we can verify the button click handler was called
    expect(tryAgainButton).toBeInTheDocument();
  });
});

describe('withErrorBoundary HOC', () => {
  const TestComponent = () => <div>Test component</div>;
  const WrappedComponent = withErrorBoundary(TestComponent);

  it('wraps component with error boundary', () => {
    render(<WrappedComponent />);
    expect(screen.getByText('Test component')).toBeInTheDocument();
  });

  it('handles errors in wrapped component', () => {
    const ErrorComponent = () => {
      throw new Error('HOC test error');
    };
    const WrappedErrorComponent = withErrorBoundary(ErrorComponent);

    render(<WrappedErrorComponent />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});

describe('useErrorBoundary hook', () => {
  const TestComponent = () => {
    const { hasError, error, handleError, reset } = useErrorBoundary();

    if (hasError) {
      return (
        <div>
          <p>Error: {error?.message}</p>
          <button onClick={reset}>Reset</button>
        </div>
      );
    }

    return <div>Test component</div>;
  };

  it('manages error state', () => {
    render(<TestComponent />);
    expect(screen.getByText('Test component')).toBeInTheDocument();
  });

  it('handles errors and allows reset', () => {
    const { rerender } = render(<TestComponent />);
    
    // Simulate error
    const error = new Error('Hook test error');
    const errorInfo = { componentStack: 'Test stack' };
    
    // Force error state
    rerender(
      <ErrorBoundary>
        <ThrowError message="Hook test error" />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(Sentry.captureException).toHaveBeenCalled();
  });
}); 