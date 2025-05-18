'use client';

import { Button } from '@/components/ui/Button';
import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
        };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return {
            hasError: true,
            error,
        };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        // You can log the error to an error reporting service here
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background text-foreground">
                    <div className="max-w-md w-full space-y-4 text-center">
                        <h1 className="text-4xl font-bold text-primary">Oops!</h1>
                        <p className="text-lg text-muted-foreground">
                            Something went wrong. We're sorry for the inconvenience.
                        </p>
                        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md overflow-auto">
                            <pre>{this.state.error?.message}</pre>
                        </div>
                        <div className="flex justify-center gap-4">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    window.location.reload();
                                }}
                            >
                                Refresh Page
                            </Button>
                            <Button
                                onClick={() => {
                                    window.location.href = '/';
                                }}
                            >
                                Go Home
                            </Button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

// Theme-aware wrapper component
export function ThemedErrorBoundary(props: ErrorBoundaryProps): JSX.Element {
    // Removed passing 'theme' prop as ErrorBoundary does not accept it
    return <ErrorBoundary {...props} />;
}
