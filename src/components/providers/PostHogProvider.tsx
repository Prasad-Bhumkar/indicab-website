'use client';

import { trackPageView } from '@/lib/analytics';
import { usePathname, useSearchParams } from 'next/navigation';
import posthog from 'posthog-js';
import { PostHogProvider as Provider } from 'posthog-js/react';
import { useEffect } from 'react';

interface PostHogProviderProps {
    children: React.ReactNode;
}

export default function PostHogProvider({ children }: PostHogProviderProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (pathname) {
            let url = window.origin + pathname;
            if (searchParams?.toString()) {
                url = url + `?${searchParams.toString()}`;
            }
            trackPageView(url);
        }
    }, [pathname, searchParams]);

    return <Provider client={posthog}>{children}</Provider>;
} 