'use client';

import { ReactNode } from 'react';
import ErrorBoundary from './ErrorBoundary';

interface ClientWrapperProps {
    children: ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps): JSX.Element {
    return (
        <ErrorBoundary>
            {children}
        </ErrorBoundary>
    );
}
