import ErrorBoundary from '@/components/common/ErrorBoundary';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemedErrorBoundary } from './ErrorBoundary';

// Mock the clipboard API
const mockClipboard = {
    writeText: jest.fn().mockImplementation(() => Promise.resolve()),
};
Object.assign(navigator, {
    clipboard: mockClipboard,
});

describe('ErrorBoundary', (): JSX.Element => {
    const ErrorComponent = (): JSX.Element => {
        throw new Error('Test error');
        return <div>Should not render</div>;
    };

    const GoodComponent = () => <div>Working component</div>;

    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('catches errors and displays fallback UI', (): JSX.Element => {
        render(
            <ErrorBoundary>
                <ErrorComponent />
            </ErrorBoundary>
        );

        expect(screen.getByText('Something went wrong')).toBeInTheDocument();
        expect(screen.getByText('Copy Error Details')).toBeInTheDocument();
        expect(screen.getByText('Try Again')).toBeInTheDocument();
    });

    it('renders children when no error occurs', (): JSX.Element => {
        render(
            <ErrorBoundary>
                <GoodComponent />
            </ErrorBoundary>
        );

        expect(screen.getByText('Working component')).toBeInTheDocument();
    });

    it('works with themed version', (): JSX.Element => {
        render(
            <ThemedErrorBoundary>
                <ErrorComponent />
            </ThemedErrorBoundary>
        );

        expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    it('copies error details to clipboard', async (): JSX.Element => {
        render(
            <ErrorBoundary>
                <ErrorComponent />
            </ErrorBoundary>
        );

        fireEvent.click(screen.getByText('Copy Error Details'));
        expect(navigator.clipboard.writeText).toHaveBeenCalled();
    });

    it('handles clipboard errors gracefully', async (): JSX.Element => {
        mockClipboard.writeText.mockRejectedValueOnce(new Error('Clipboard error'));

        render(
            <ErrorBoundary>
                <ErrorComponent />
            </ErrorBoundary>
        );

        fireEvent.click(screen.getByText('Copy Error Details'));
        expect(navigator.clipboard.writeText).toHaveBeenCalled();
    });

    it('displays error details when expanded', (): JSX.Element => {
        render(
            <ErrorBoundary>
                <ErrorComponent />
            </ErrorBoundary>
        );

        fireEvent.click(screen.getByText('Error details'));
        expect(screen.getByText('Test error')).toBeInTheDocument();
    });

    it('matches snapshot when error occurs', (): JSX.Element => {
        const { asFragment } = render(
            <ErrorBoundary>
                <ErrorComponent />
            </ErrorBoundary>
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('resets when Try Again is clicked', (): JSX.Element => {
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
