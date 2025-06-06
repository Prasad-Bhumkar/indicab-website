import ErrorBoundary from '@/components/common/ErrorBoundary';

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { ThemedErrorBoundary } from './ErrorBoundary';

// Mock the clipboard API
const mockClipboard = {
    writeText: vi.fn().mockImplementation(() => Promise.resolve()),
};
Object.assign(navigator, {
    clipboard: mockClipboard,
});

describe('ErrorBoundary', () => {
    const ErrorComponent = (): JSX.Element => {
        throw new Error('Test error');
        return <div>Should not render</div>;
    };

    const GoodComponent = () => <div>Working component</div>;

    beforeAll(() => {
        vi.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    afterAll(() => {
        vi.restoreAllMocks();
    });

    it('catches errors and displays fallback UI', () => {
        render(
            <ErrorBoundary>
                <ErrorComponent />
            </ErrorBoundary>
        );

        expect(screen.getByText('Something went wrong')).toBeInTheDocument();
        expect(screen.getByText('Copy Error Details')).toBeInTheDocument();
        expect(screen.getByText('Try Again')).toBeInTheDocument();
    });

    it('renders children when no error occurs', () => {
        render(
            <ErrorBoundary>
                <GoodComponent />
            </ErrorBoundary>
        );

        expect(screen.getByText('Working component')).toBeInTheDocument();
    });

    it('works with themed version', () => {
        render(
            <ThemedErrorBoundary>
                <ErrorComponent />
            </ThemedErrorBoundary>
        );

        expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    it('copies error details to clipboard', async () => {
        render(
            <ErrorBoundary>
                <ErrorComponent />
            </ErrorBoundary>
        );

        fireEvent.click(screen.getByText('Copy Error Details'));
        expect(navigator.clipboard.writeText).toHaveBeenCalled();
    });

    it('handles clipboard errors gracefully', async () => {
        mockClipboard.writeText.mockRejectedValueOnce(new Error('Clipboard error'));

        render(
            <ErrorBoundary>
                <ErrorComponent />
            </ErrorBoundary>
        );

        fireEvent.click(screen.getByText('Copy Error Details'));
        expect(navigator.clipboard.writeText).toHaveBeenCalled();
    });

    it('displays error details when expanded', () => {
        render(
            <ErrorBoundary>
                <ErrorComponent />
            </ErrorBoundary>
        );

        fireEvent.click(screen.getByText('Error details'));
        expect(screen.getByText('Test error')).toBeInTheDocument();
    });

    it('matches snapshot when error occurs', () => {
        const { asFragment } = render(
            <ErrorBoundary>
                <ErrorComponent />
            </ErrorBoundary>
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('resets when Try Again is clicked', () => {
        const { rerender } = render(
            <ErrorBoundary>
                <ErrorComponent />
            </ErrorBoundary>
        );

        fireEvent.click(screen.getByText('Try Again'));
        rerender(
            <ErrorBoundary>
                <GoodComponent />
            </ErrorBoundary>
        );

        expect(screen.getByText('Working component')).toBeInTheDocument();
    });
});
