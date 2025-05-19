import { ErrorBoundary, useErrorBoundary, withErrorBoundary } from '@/components/common/ErrorBoundary';
import { performanceMonitor } from '@/utils/performance';
import * as Sentry from '@sentry/nextjs';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

// Mock Sentry
jest.mock('@sentry/nextjs', () => ({
  captureException: jest.fn(),
  showReportDialog: jest.fn(),
  withScope: jest.fn((callback) => callback({ setExtras: jest.fn() }))
}));

// Mock performance monitor
jest.mock('@/utils/performance', () => ({
  performanceMonitor: {
    addMetric: jest.fn()
  }
}));

// Component that throws an error
const ThrowError = ({ message = 'Test error' }: { message?: string }) => {
  throw new Error(message);
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders error UI when an error occurs', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('An unexpected error occurred. Please try again.')).toBeInTheDocument();
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

  it('calls onError callback when an error occurs', () => {
    const onError = jest.fn();
    render(
      <ErrorBoundary onError={onError}>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(onError).toHaveBeenCalled();
  });

  it('handles retry functionality', async () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    const retryButton = screen.getByRole('button', { name: /try again/i });
    fireEvent.click(retryButton);

    await waitFor(() => {
      expect(performanceMonitor.addMetric).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'error-boundary-retry',
          metadata: expect.objectContaining({
            success: true
          })
        })
      );
    });
  });

  it('disables retry button after max retries', () => {
    render(
      <ErrorBoundary maxRetries={2}>
        <ThrowError />
      </ErrorBoundary>
    );

    const retryButton = screen.getByRole('button', { name: /try again/i });
    fireEvent.click(retryButton);
    fireEvent.click(retryButton);

    expect(retryButton).toBeDisabled();
  });

  it('shows error details in development mode', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    render(
      <ErrorBoundary>
        <ThrowError message="Test error message" />
      </ErrorBoundary>
    );

    const detailsButton = screen.getByRole('button', { name: /show details/i });
    fireEvent.click(detailsButton);

    expect(screen.getByText(/Test error message/)).toBeInTheDocument();
    expect(screen.getByRole('log')).toBeInTheDocument();

    process.env.NODE_ENV = originalEnv;
  });

  it('handles error reporting through Sentry', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    const reportButton = screen.getByRole('button', { name: /report issue/i });
    fireEvent.click(reportButton);

    expect(Sentry.showReportDialog).toHaveBeenCalled();
  });

  it('tracks errors in performance metrics', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(performanceMonitor.addMetric).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'error-boundary-handling',
        metadata: expect.objectContaining({
          error: 'Test error'
        })
      })
    );
  });

  it('tracks retries in performance metrics', async () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    const retryButton = screen.getByRole('button', { name: /try again/i });
    fireEvent.click(retryButton);

    await waitFor(() => {
      expect(performanceMonitor.addMetric).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'error-boundary-retry',
          metadata: expect.objectContaining({
            success: true
          })
        })
      );
    });
  });

  it('calls onReset callback when retrying', async () => {
    const onReset = jest.fn();
    render(
      <ErrorBoundary onReset={onReset}>
        <ThrowError />
      </ErrorBoundary>
    );

    const retryButton = screen.getByRole('button', { name: /try again/i });
    fireEvent.click(retryButton);

    await waitFor(() => {
      expect(onReset).toHaveBeenCalled();
    });
  });
});

describe('withErrorBoundary HOC', () => {
  const TestComponent = () => <div>Test Component</div>;

  it('wraps component with error boundary', () => {
    const WrappedComponent = withErrorBoundary(TestComponent);
    render(<WrappedComponent />);
    expect(screen.getByText('Test Component')).toBeInTheDocument();
  });

  it('passes error boundary props correctly', () => {
    const onError = jest.fn();
    const WrappedComponent = withErrorBoundary(TestComponent, { onError });
    render(<WrappedComponent />);
    
    // Force an error
    const error = new Error('Test error');
    const errorInfo = { componentStack: 'Test stack' } as React.ErrorInfo;
    
    // Simulate error
    const instance = screen.getByText('Test Component').parentElement;
    if (instance) {
      const errorBoundary = instance.parentElement;
      if (errorBoundary) {
        const errorBoundaryInstance = errorBoundary as any;
        errorBoundaryInstance.componentDidCatch(error, errorInfo);
      }
    }

    expect(onError).toHaveBeenCalledWith(error, errorInfo);
  });
});

describe('useErrorBoundary Hook', () => {
  const TestComponent = () => {
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

    return (
      <button onClick={() => handleError(new Error('Test error'), { componentStack: 'Test stack' } as React.ErrorInfo)}>
        Throw Error
      </button>
    );
  };

  it('handles error state', () => {
    render(<TestComponent />);
    
    const throwButton = screen.getByRole('button', { name: /throw error/i });
    fireEvent.click(throwButton);

    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
  });

  it('handles retry functionality', async () => {
    render(<TestComponent />);
    
    const throwButton = screen.getByRole('button', { name: /throw error/i });
    fireEvent.click(throwButton);

    const retryButton = screen.getByRole('button', { name: /retry/i });
    fireEvent.click(retryButton);

    await waitFor(() => {
      expect(performanceMonitor.addMetric).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'error-boundary-retry',
          metadata: expect.objectContaining({
            success: true
          })
        })
      );
    });
  });

  it('handles reset functionality', () => {
    render(<TestComponent />);
    
    const throwButton = screen.getByRole('button', { name: /throw error/i });
    fireEvent.click(throwButton);

    const resetButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetButton);

    expect(screen.getByRole('button', { name: /throw error/i })).toBeInTheDocument();
  });

  it('tracks errors in performance metrics', () => {
    render(<TestComponent />);
    
    const throwButton = screen.getByRole('button', { name: /throw error/i });
    fireEvent.click(throwButton);

    expect(performanceMonitor.addMetric).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'error-boundary-handling',
        metadata: expect.objectContaining({
          error: 'Test error'
        })
      })
    );
  });
}); 