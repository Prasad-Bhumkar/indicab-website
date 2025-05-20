import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner Component', () => {
    it('renders spinner element', () => {
        render(<LoadingSpinner />);
        expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('contains loading text', () => {
        render(<LoadingSpinner />);
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it('matches snapshot', () => {
        const { container } = render(<LoadingSpinner />);
        expect(container).toMatchSnapshot();
    });
});
