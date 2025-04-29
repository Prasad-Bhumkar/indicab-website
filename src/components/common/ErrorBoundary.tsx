import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorService, AppError } from '../../services/ErrorService';
import type { ErrorType } from '../../types/errors';
import { ErrorType as ErrorTypeValue } from '../../types/errors';

interface ErrorContext {
  component?: string;
  reactErrorInfo?: {
    componentStack: string;
  };
  metadata?: {
    errorInfo?: ErrorInfo;
  };
}
import { Button } from '../ui/Button';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: AppError, errorInfo: ErrorInfo) => void;
  onReset?: () => void;
  component?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: AppError | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundaryClass extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    const appError = ErrorService.handleError(error, ErrorTypeValue.RUNTIME, {
      component: 'ErrorBoundary'
    });
    return {
      hasError: true,
      error: appError,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const appError = ErrorService.handleError(error, ErrorTypeValue.RUNTIME, {
      component: this.props.component || 'unknown',
      metadata: { errorInfo }
    });

    this.setState({ 
      errorInfo,
      error: appError
    });

    if (this.props.onError) {
      this.props.onError(appError, errorInfo);
    }
  }

  resetErrorBoundary = () => {
    const { onReset } = this.props;

    ErrorService.logInfo('Error boundary reset', {
      component: this.constructor.name,
      errorId: (this.state.error as any)?.id
    });

    if (onReset) {
      onReset();
    }

    this.setState({
      hasError: false, 
      error: null,
      errorInfo: null
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return <ErrorFallback 
        error={this.state.error} 
        onReset={this.resetErrorBoundary}
      />;
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error?: AppError | null;
  onReset?: () => void;
}

function ErrorFallback({ error, onReset }: ErrorFallbackProps) {
  const router = useRouter();
  
  return (
    <div className="flex h-full min-h-[300px] w-full items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md rounded-lg bg-white dark:bg-gray-800 p-8 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="h-8 w-8 text-red-500 dark:text-red-400" />
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400">
            Something went wrong
          </h1>
        </div>
        
        {error && (
          <p className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md text-red-600 dark:text-red-400 text-sm">
            {error.message}
          </p>
        )}
        
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          We're sorry for the inconvenience. Our team has been notified of this issue.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={onReset || (() => window.location.reload())}
            className="flex items-center gap-2"
            variant="outline"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
          
          <Button
            onClick={() => router.push('/')}
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Go to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
}

// Export a component that uses the router hook
export default function ErrorBoundary(props: ErrorBoundaryProps) {
  return <ErrorBoundaryClass {...props} />;
}
