'use client';

import { I18nProvider } from '@/components/I18nProvider';
import ErrorBoundary from '@/components/common/ErrorBoundary';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
    return (
        <ErrorBoundary>
            <I18nProvider>{children}</I18nProvider>
        </ErrorBoundary>
    );
}
