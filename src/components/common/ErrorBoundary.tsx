'use client'
import { ReactNode, useState, useEffect } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error) => void
}

export default function ErrorBoundary({ 
  children, 
  fallback,
  onError 
}: ErrorBoundaryProps) {
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      const error = event.error
      setError(error)
      onError?.(error)
      console.error('ErrorBoundary caught:', error)
    }

    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [onError])

  if (error) {
    return fallback || (
      <div className="error-boundary p-6 bg-red-50 rounded-lg border border-red-200">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <svg 
              className="h-6 w-6 text-red-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-medium text-red-800">
              Something went wrong
            </h3>
            <p className="mt-1 text-sm text-red-700">
              {error.message || 'An unexpected error occurred'}
            </p>
            <div className="mt-4">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return children
}