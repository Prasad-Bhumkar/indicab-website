import React from "react";
import { render, screen } from '@testing-library/react';
import _LoadingSpinner from './LoadingSpinner';
import { describe, expect, it, test } from 'vitest';

describe('LoadingSpinner Component', (): JSX.Element => {
    it('renders spinner element', (): JSX.Element => {
        render(<_LoadingSpinner />);
        expect(screen.getByRole('status')).toBeDefined();
    });

    test('contains loading text', (): JSX.Element => {
        render(<_LoadingSpinner />);
        expect(screen.getByText(/loading/i)).toBeDefined();
    });

    test('matches snapshot', (): JSX.Element => {
        const { container } = render(<_LoadingSpinner />);
        expect(container).toMatchSnapshot();
    });
});
