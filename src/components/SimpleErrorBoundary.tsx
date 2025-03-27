'use client'

import { Component, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class SimpleErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.error('Error caught by boundary:', error)
    // Will be replaced with Sentry once module resolution is fixed
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />
    }

    return this.props.children
  }
}

function ErrorFallback() {
  const router = useRouter()
  
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-red-600">
          Something went wrong
        </h1>
        <p className="mb-6 text-gray-600">
          We're working to fix this issue. Please try again later.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => window.location.reload()}
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
  )
}