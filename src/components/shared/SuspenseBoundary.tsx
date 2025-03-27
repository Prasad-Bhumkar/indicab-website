"use client";

import { Suspense, ReactNode, useState, useEffect } from 'react';

type SuspenseBoundaryProps = {
  /** The component to render inside the suspense boundary */
  children: ReactNode;
  /** Component to show while loading, defaults to standard skeleton */
  fallback?: ReactNode;
  /** CSS class name to apply to the container */
  className?: string;
  /** Whether to add a delay before showing the fallback to avoid flickering for fast loads */
  delayMs?: number;
};

/**
 * A reusable Suspense boundary component that provides a skeleton fallback.
 * Use this to wrap heavy components that might cause layout shifts during hydration.
 */
export default function SuspenseBoundary({
  children,
  fallback,
  className = '',
  delayMs
}: SuspenseBoundaryProps) {
  const defaultFallback = <DefaultFallback />;

  // For server-side rendering, just use standard Suspense
  if (typeof window === 'undefined') {
    return (
      <div className={className}>
        <Suspense fallback={fallback || defaultFallback}>
          {children}
        </Suspense>
      </div>
    );
  }

  // For client-side rendering with delay
  if (delayMs !== undefined) {
    return (
      <div className={className}>
        <Suspense fallback={<DelayedFallback delayMs={delayMs}>{fallback || defaultFallback}</DelayedFallback>}>
          {children}
        </Suspense>
      </div>
    );
  }

  // Regular client-side rendering without delay
  return (
    <div className={className}>
      <Suspense fallback={fallback || defaultFallback}>
        {children}
      </Suspense>
    </div>
  );
}

// A component that only renders its children after a delay
function DelayedFallback({
  children,
  delayMs
}: {
  children: ReactNode;
  delayMs: number;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, delayMs);

    return () => {
      clearTimeout(timer);
    };
  }, [delayMs]);

  if (!show) {
    return null;
  }

  return <>{children}</>;
}

// The default fallback UI
function DefaultFallback() {
  return (
    <div className="animate-pulse flex flex-col space-y-4">
      <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded-md"></div>
      <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
    </div>
  );
}
