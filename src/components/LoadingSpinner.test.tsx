import { render, screen } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';
import { describe, expect, it, test } from 'vitest';

describe('LoadingSpinner Component', () => {
  it('renders spinner element', () => {
    render(<LoadingSpinner />);
    expect(screen.getByRole('status')).toBeDefined();
  });

  test('contains loading text', () => {
    render(<LoadingSpinner />);
    expect(screen.getByText(/loading/i)).toBeDefined();
  });

  test('matches snapshot', () => {
    const { container } = render(<LoadingSpinner />);
    expect(container).toMatchSnapshot();
  });
});