"use client";

import { useState, useEffect } from 'react';

/**
 * A hook that returns whether the component has mounted on the client.
 * Use this to prevent hydration mismatches when using browser APIs.
 *
 * @returns {boolean} Whether the component has mounted
 * @example
 * const mounted = useClientMount();
 *
 * if (!mounted) {
 *   return <SkeletonLoader />;
 * }
 *
 * return <ComponentUsingBrowserAPIs />;
 */
export function useClientMount(): boolean {
    // Set initial state to false to represent not mounted
    const [mounted, setMounted] = useState<boolean>(false);

    // Run once on mount to set mounted to true
    useEffect(() => {
        // Only run once on mount
        setMounted(true);

        // No cleanup needed as this should only run once
        // No dependencies as we only want to run this once
    }, []);

    return mounted;
}

export default useClientMount;
