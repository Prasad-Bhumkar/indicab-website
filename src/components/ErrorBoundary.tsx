'use client';

import React, { Component, ReactNode } from 'react';
import { Button } from './ui/button/Button';
import { useTheme } from 'next-themes';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  theme?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo });
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleCopyError = async () => {
    const { error, errorInfo } = this.state;
    if (!error) return;

    try {
      const errorDetails = `Error: ${error.message}\nStack: ${error.stack}\nComponent Stack: ${errorInfo?.componentStack}`;
      await navigator.clipboard.writeText(errorDetails);
      alert('Error details copied to clipboard');
    } catch (copyError) {
      console.error('Failed to copy error:', copyError);
      alert('Failed to copy error details');
    }
  };

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    const { theme = 'light' } = this.props;
    const errorStyles = {
      light: 'bg-white text-gray-900',
      dark: 'bg-gray-800 text-white'
    };

    if (this.state.hasError) {
      return this.props.fallback || (
        <div className={`error-boundary min-h-screen p-8 ${errorStyles[theme as keyof typeof errorStyles]}`}>
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <div className="flex gap-4 mb-6">
            <Button onClick={this.handleCopyError}>Copy Error Details</Button>
            <Button onClick={this.handleReset}>Try Again</Button>
          </div>
          <details className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
            <summary className="cursor-pointer mb-2">Error details</summary>
            <pre className="whitespace-pre-wrap break-words">
              {this.state.error?.toString()}
              <br />
              {this.state.errorInfo?.componentStack}
            </pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

// Theme-aware wrapper component
export function ThemedErrorBoundary(props: ErrorBoundaryProps) {
  const { theme } = useTheme();
  return <ErrorBoundary {...props} theme={theme} />;
}

export default ErrorBoundary;
