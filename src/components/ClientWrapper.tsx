'use client';

import React, { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import ErrorBoundary from './ErrorBoundary';

interface ClientWrapperProps {
  children: ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  return (
    <ThemeProvider attribute="class">
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </ThemeProvider>
  );
}
