import ErrorBoundary from '@/components/common/ErrorBoundary';
import { Button } from '@/components/ui/button';

// Component metadata
const _meta: Meta<typeof ErrorBoundary> = {
    title: 'Components/ErrorBoundary',
    component: ErrorBoundary,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A React error boundary component that catches JavaScript errors anywhere in its child component tree. Provides customizable fallback UI and error reporting.'
            }
        }
    },
    argTypes: {}
}

export default _meta

type Story = StoryObj<typeof ErrorBoundary>

// Error throwing component for demonstration
const ErrorThrower = ({ shouldThrow }: { shouldThrow: boolean }): JSX.Element => {
    if (shouldThrow) {
        throw new Error('Example error thrown from component!')
    }
    return <div className="p-4 bg-green-50 text-green-800">Component rendered successfully</div>
}

// Default story
export const Default: Story = {
    render: (_args): JSX.Element => (
        <ErrorBoundary {..._args}>
            <ErrorThrower shouldThrow={false} />
        </ErrorBoundary>
    )
}

// Error state
export const WithError: Story = {
    render: (_args): JSX.Element => (
        <ErrorBoundary {..._args}>
            <ErrorThrower shouldThrow={true} />
        </ErrorBoundary>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates the fallback UI when an error occurs in a child component.'
            }
        }
    }
}

// Custom fallback
export const WithCustomFallback: Story = {
    render: (_args): JSX.Element => (
        <ErrorBoundary
            {..._args}
            fallback={
                <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h3 className="text-lg font-medium text-yellow-800">Custom Error Message</h3>
                    <p className="mt-2 text-yellow-700">A custom fallback component can be provided</p>
                    <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => window.location.reload()}
                    >
                        Try Again
                    </Button>
                </div>
            }
        >
            <ErrorThrower shouldThrow={true} />
        </ErrorBoundary>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Shows how to provide a custom fallback UI component.'
            }
        }
    }
}

// Nested boundaries
export const NestedBoundaries: Story = {
    render: (_args): JSX.Element => (
        <ErrorBoundary {..._args}>
            <div className="space-y-4">
                <p>This component won&apos;t error</p>
                <ErrorBoundary fallback={<div className="p-3 bg-red-50 text-red-600">Inner component failed</div>}>
                    <ErrorThrower shouldThrow={true} />
                </ErrorBoundary>
                <p>This content will still render because the error was caught by the inner boundary</p>
            </div>
        </ErrorBoundary>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates nested error boundaries where an inner boundary prevents the outer one from showing.'
            }
        }
    }
}
