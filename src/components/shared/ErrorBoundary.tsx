'use client';

import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';

interface ErrorBoundaryProps {
  fallback?: ReactNode;
  children: ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Update state so the next render will show the fallback UI.
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // You can log the error to an error reporting service
    console.error('ErrorBoundary caught an error', error, errorInfo);
    this.setState({ errorInfo });
  }

  resetErrorBoundary = () => {
    const { onReset } = this.props;

    // Call the optional onReset callback
    if (onReset) {
      onReset();
    }

    // Reset the error state
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // If a custom fallback is provided, use it
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md my-4">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <h2 className="text-lg font-semibold text-red-700">Something went wrong</h2>
          </div>

          <p className="mb-3 text-red-600 text-sm">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>

          {process.env.NODE_ENV !== 'production' && this.state.errorInfo && (
            <details className="mb-4">
              <summary className="text-sm text-gray-600 cursor-pointer mb-1">View error details</summary>
              <pre className="p-3 bg-gray-100 overflow-auto text-xs text-gray-700 rounded max-h-56 whitespace-pre-wrap">
                {this.state.error?.stack}
              </pre>
            </details>
          )}

          <Button
            onClick={this.resetErrorBoundary}
            className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
