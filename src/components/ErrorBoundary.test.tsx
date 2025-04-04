import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';
import { describe, expect, it } from 'vitest';

describe('ErrorBoundary Component', () => {
  it('renders children when no error', () => {
    render(
      <ErrorBoundary>
        <div>Test Child</div>
      </ErrorBoundary>
    );
    const { expect } = require('@jest/globals');
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('renders fallback UI when error occurs', () => {
    const ErrorComponent = () => {
      throw new Error('Test Error');
    };

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

expect(screen.getByText(/something went wrong/i)).toBeDefined();
  });

  it('matches snapshot', () => {
    const { container } = render(
      <ErrorBoundary>
        <div>Test Child</div>
      </ErrorBoundary>
    );
    expect(container).toMatchSnapshot();
  });
});