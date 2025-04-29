'use client';

import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '../ui/Button';
import { ErrorService, AppError } from '@/services/ErrorService';
import { ErrorType } from '@/lib/services/errorService';

interface ErrorBoundaryProps {
  fallback?: ReactNode;
  children: ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: AppError | null;
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
    // Report error and update state
    const appError = ErrorService.handleError(error, ErrorType.RUNTIME, {
      component: 'ErrorBoundary'
    });
    return {
      hasError: true,
      error: appError,
      errorInfo: null
    };
  }









  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    const appError = ErrorService.handle(error, ErrorType.RUNTIME, {
      component: this.constructor.name,
      metadata: { errorInfo }
    });

    this.setState({ 
      errorInfo,
      error: appError
    });
  }

  resetErrorBoundary = () => {
    const { onReset } = this.props;

    // Log recovery attempt
    ErrorService.logInfo('Error boundary reset', {
      component: this.constructor.name,
      errorId: this.state.error?.id
    });

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
      return (
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-center p-6">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-4">
              We're sorry - an error occurred (ID: {this.state.error?.id}). Our team has been notified.
            </p>

            <Button
              onClick={this.resetErrorBoundary}
              className="inline-flex items-center"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try again
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
