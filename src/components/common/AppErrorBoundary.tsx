// Minimal error boundary implementation
'use client'

import { Component } from 'react'

import { useRouter } from 'next/navigation'

interface ErrorBoundaryProps {
    children: React.ReactNode
}

export default class AppErrorBoundary extends Component<ErrorBoundaryProps> {
    state = { hasError: false }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    componentDidCatch(error: Error) {
        console.error('Application error:', error)
    }

    render() {
        if (this.state.hasError) {
            return <ErrorFallback />
        }

        return this.props.children
    }
}

function ErrorFallback(): JSX.Element {
    const _router = useRouter()

    return (
        <div style={{
            display: 'flex',
            height: '100vh',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            backgroundColor: '#f9fafb'
        }}>
            <div style={{
                maxWidth: '28rem',
                borderRadius: '0.5rem',
                backgroundColor: 'white',
                padding: '2rem',
                boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
            }}>
                <h1 style={{
                    marginBottom: '1rem',
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#dc2626'
                }}>
                    Something went wrong
                </h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            borderRadius: '0.375rem',
                            backgroundColor: '#0c9242',
                            padding: '0.5rem 1rem',
                            color: 'white'
                        }}
                    >
                        Try Again
                    </button>
                    <button
                        onClick={() => _router.push('/')}
                        style={{
                            borderRadius: '0.375rem',
                            border: '1px solid #d1d5db',
                            padding: '0.5rem 1rem',
                            color: '#374151'
                        }}
                    >
                        Return Home
                    </button>
                </div>
            </div>
        </div>
    )
}
