import { useState } from 'react';

import ErrorBoundary from '@/components/common/ErrorBoundary';

export function ErrorBoundaryExample(): JSX.Element {
    const [shouldError, setShouldError] = useState(false);

    const _BadComponent = (): JSX.Element => {
        if (shouldError) {
            throw new Error('This is a simulated error!');
        }
        return <div>Component working normally</div>;
    };

    return (
        <div className="error-boundary-example">
            <h2>ErrorBoundary Example</h2>

            <button onClick={() => setShouldError(!shouldError)}>
                {shouldError ? 'Reset' : 'Trigger Error'}
            </button>

            <div className="demo-area">
                <ErrorBoundary>
                    <_BadComponent />
                </ErrorBoundary>
            </div>
        </div>
    );
}
