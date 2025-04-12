import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';

type ErrorBoundaryProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error) {
    // Capture error details for reporting
    const appError = ErrorService.handle(error, ErrorType.RUNTIME, {
      component: this.constructor.name
    });
    return { 
      hasError: true,
      error: appError,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Report full error with component stack
    const appError = ErrorService.handle(error, ErrorType.RUNTIME, {
      component: this.constructor.name,
      metadata: { errorInfo }
    });
    this.setState({ 
      error: appError,
      errorInfo 
    });
  }


  handleReset = () => {
    // Log recovery attempt
    ErrorService.logInfo('Error boundary reset', {
      component: this.constructor.name,
      error: this.state.error?.message
    });
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    });
  };


  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-red-50">
          <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-center mb-4">
              <AlertTriangle className="h-12 w-12 text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-center mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-4">
              We're sorry, but an unexpected error occurred (Error ID: {this.state.error?.id}). 
              Our team has been notified.
            </p>

            <div className="bg-gray-100 p-3 rounded mb-4">
              <p className="text-sm font-mono text-gray-800 break-words">
                {this.state.error?.toString()}
              </p>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={this.handleReset}
            >
              Try again
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export function withErrorBoundary<T extends object>(
  Component: React.ComponentType<T>,
  fallback?: React.ReactNode
) {
  return function WrappedComponent(props: T) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
