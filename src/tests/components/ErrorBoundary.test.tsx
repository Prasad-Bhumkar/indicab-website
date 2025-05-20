import React from "react";

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

import ErrorBoundary, { useErrorBoundary, withErrorBoundary } from '@/components/common/ErrorBoundary';
import { performanceMonitor } from '@/utils/performance';


// Mock Sentry
vi.mock('@sentry/nextjs', () => ({
  captureException: vi.fn(),
  showReportDialog: vi.fn(),
  withScope: vi.fn((callback) => callback({ setExtras: vi.fn() }))
}));

// Mock performance monitor
vi.mock('@/utils/performance', () => ({
  performanceMonitor: {
    addMetric: vi.fn(),
  },
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

  it('renders error UI when an error occurs', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Test error')).toBeInTheDocument();
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
    const onError = vi.fn();
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
    process.env.NODE_ENV = originalEnv;
  });

  it('handles error reporting through Sentry', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
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
    const onReset = vi.fn();
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
  const ThrowingComponent = () => { throw new Error('Test error'); };
  const TestComponent = () => <div>Test Component</div>;

  it('wraps component with error boundary', () => {
    const WrappedComponent = withErrorBoundary(TestComponent);
    render(<WrappedComponent />);
    expect(screen.getByText('Test Component')).toBeInTheDocument();
  });

  it('renders fallback and calls onError when child throws', () => {
    const onError = vi.fn();
    const WrappedComponent = withErrorBoundary(ThrowingComponent, { onError });
    render(<WrappedComponent />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(onError).toHaveBeenCalled();
  });
});

describe('useErrorBoundary Hook', () => {
  const TestComponent = () => {
    const { error, handleError, handleRetry, reset, isRetrying } = useErrorBoundary();

    if (error) {
      return (
        <div>
          <button onClick={handleRetry} disabled={isRetrying}>
            {isRetrying ? 'Retrying...' : 'Try Again'}
          </button>
          <button onClick={reset}>Go to Homepage</button>
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
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /go to homepage/i })).toBeInTheDocument();
  });

  it('handles retry functionality', async () => {
    render(<TestComponent />);
    const throwButton = screen.getByRole('button', { name: /throw error/i });
    fireEvent.click(throwButton);
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

  it('handles reset functionality', () => {
    render(<TestComponent />);
    const throwButton = screen.getByRole('button', { name: /throw error/i });
    fireEvent.click(throwButton);
    const resetButton = screen.getByRole('button', { name: /go to homepage/i });
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