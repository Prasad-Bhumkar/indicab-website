// @ts-ignore
'use client'

import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function GlobalErrorBoundary({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    const handleRejection = (event: PromiseRejectionEvent) => {
      Sentry.captureException(event.reason)
    }

    window.addEventListener('unhandledrejection', handleRejection)
    return () => {
      window.removeEventListener('unhandledrejection', handleRejection)
    }
  }, [])

  return (
    <Sentry.ErrorBoundary
      fallback={({ error, resetError }: { error: Error; resetError: () => void }) => (
        <div className="flex h-screen w-full items-center justify-center bg-gray-50 p-4">
          <div className="max-w-md rounded-lg bg-white p-8 shadow-lg">
            <h1 className="mb-4 text-2xl font-bold text-red-600">
              Something went wrong
            </h1>
            <p className="mb-6 text-gray-600">
              We've reported this error to our team. Please try again later.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  resetError()
                  router.refresh()
                }}
                className="rounded bg-primary px-4 py-2 text-white hover:bg-primary-dark"
              >
                Try Again
              </button>
              <button
                onClick={() => router.push('/')}
                className="rounded border px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Return Home
              </button>
            </div>
          </div>
        </div>
      )}
      onError={(error: Error) => {
        Sentry.captureException(error)
      }}
    >
      {children}
    </Sentry.ErrorBoundary>
  )
}