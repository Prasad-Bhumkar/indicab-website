import React, { useState } from 'react';
import ErrorBoundary from '../../ErrorBoundary';

export function ErrorBoundaryExample() {
  const [shouldError, setShouldError] = useState(false);

  const BadComponent = () => {
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
          <BadComponent />
        </ErrorBoundary>
      </div>
    </div>
  );
}
