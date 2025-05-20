import * as Sentry from '@sentry/nextjs';
import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import ErrorBoundary from '@/components/common/ErrorBoundary';
import { performanceMonitor } from '@/utils/performance';

// Mock Sentry
vi.mock('@sentry/nextjs', () => ({
  captureException: vi.fn(),
  showReportDialog: vi.fn(),
  withScope: vi.fn((callback) => callback({ setExtras: vi.fn() }))
}));

// Mock performance API
const mockPerformance = {
  mark: vi.fn(),
  measure: vi.fn(),
  clearMarks: vi.fn(),
  clearMeasures: vi.fn()
};
global.performance = mockPerformance as any;

// Component that throws an error
const ThrowError = ({ message = 'Test error' }: { message?: string }) => {
  throw new Error(message);
};

describe('ErrorBoundary Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    performanceMonitor.clearMetrics();
  });

  it('catches and displays errors', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  it('handles retry functionality', async () => {
    const onRetry = vi.fn();
    const { rerender } = render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    const retryButton = screen.getByText('Try Again');
    fireEvent.click(retryButton);

    expect(onRetry).toHaveBeenCalled();
    expect(screen.getByText('Retry attempt: 1')).toBeInTheDocument();
  });

  it('reports errors to Sentry', () => {
    render(
      <ErrorBoundary>
        <ThrowError message="Sentry test error" />
      </ErrorBoundary>
    );

    expect(Sentry.captureException).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Sentry test error'
      })
    );
  });

  it('shows error details in development', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText(/at ThrowError/)).toBeInTheDocument();

    process.env.NODE_ENV = originalEnv;
  });

  it('tracks performance metrics for errors', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(mockPerformance.mark).toHaveBeenCalledWith('error-boundary-catch');
    expect(mockPerformance.measure).toHaveBeenCalledWith(
      'error-boundary-handling',
      'error-boundary-catch'
    );
  });

  it('handles custom fallback UI', () => {
    const fallback = <div>Custom error UI</div>;
    render(
      <ErrorBoundary fallback={fallback}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Custom error UI')).toBeInTheDocument();
  });

  it('limits retry attempts', () => {
    const { rerender } = render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    const retryButton = screen.getByText('Try Again');
    
    // First retry
    fireEvent.click(retryButton);
    expect(screen.getByText('Retry attempt: 1')).toBeInTheDocument();
    
    // Second retry
    fireEvent.click(retryButton);
    expect(screen.getByText('Retry attempt: 2')).toBeInTheDocument();
    
    // Third retry should be disabled
    expect(retryButton).toBeDisabled();
  });

  it('shows report dialog when reporting issue', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    const reportButton = screen.getByText('Report Issue');
    fireEvent.click(reportButton);

    expect(Sentry.showReportDialog).toHaveBeenCalled();
  });

  it('handles error reporting with custom handler', () => {
    const onError = vi.fn();
    render(
      <ErrorBoundary onError={onError}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(onError).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Test error'
      }),
      expect.any(Object)
    );
  });
}); 