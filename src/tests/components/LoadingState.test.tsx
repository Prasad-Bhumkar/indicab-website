import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { LoadingButton, LoadingOverlay, LoadingState } from '@/components/LoadingState';

describe('LoadingState', () => {
  it('renders nothing when not loading', () => {
    const { container } = render(<LoadingState isLoading={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders loading spinner with default text', () => {
    render(<LoadingState isLoading={true} text="Loading..." />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders with custom text', () => {
    render(<LoadingState isLoading={true} text="Please wait..." />);
    expect(screen.getByText('Please wait...')).toBeInTheDocument();
  });

  it('applies different sizes', () => {
    const { rerender } = render(<LoadingState isLoading={true} size="sm" text="Loading..." />);
    const spinner = screen.getByRole('status').querySelector('div');
    expect(spinner).toHaveClass('w-4 h-4');

    rerender(<LoadingState isLoading={true} size="md" text="Loading..." />);
    expect(screen.getByRole('status').querySelector('div')).toHaveClass('w-6 h-6');

    rerender(<LoadingState isLoading={true} size="lg" text="Loading..." />);
    expect(screen.getByRole('status').querySelector('div')).toHaveClass('w-8 h-8');
  });

  it('applies different variants', () => {
    const { rerender } = render(<LoadingState isLoading={true} variant="default" text="Loading..." />);
    const spinner = screen.getByRole('status').querySelector('div');
    expect(spinner).toHaveClass('text-gray-600');

    rerender(<LoadingState isLoading={true} variant="primary" text="Loading..." />);
    expect(screen.getByRole('status').querySelector('div')).toHaveClass('text-blue-600');

    rerender(<LoadingState isLoading={true} variant="secondary" text="Loading..." />);
    expect(screen.getByRole('status').querySelector('div')).toHaveClass('text-gray-400');
  });
});

describe('LoadingOverlay', () => {
  it('renders children when not loading', () => {
    render(
      <LoadingOverlay isLoading={false} text="Loading...">
        <div>Content</div>
      </LoadingOverlay>
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  it('renders overlay with loading state', () => {
    render(
      <LoadingOverlay isLoading={true} text="Loading...">
        <div>Content</div>
      </LoadingOverlay>
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('applies blur effect by default', () => {
    render(
      <LoadingOverlay isLoading={true} text="Loading...">
        <div>Content</div>
      </LoadingOverlay>
    );
    const status = screen.getByRole('status');
    const overlay = status.closest('.absolute');
    expect(overlay).toHaveClass('backdrop-blur-sm');
  });

  it('disables blur effect when specified', () => {
    render(
      <LoadingOverlay isLoading={true} blur={false} text="Loading...">
        <div>Content</div>
      </LoadingOverlay>
    );
    const status = screen.getByRole('status');
    const overlay = status.closest('.absolute');
    expect(overlay).not.toHaveClass('backdrop-blur-sm');
  });
});

describe('LoadingButton', () => {
  it('renders button content when not loading', () => {
    render(
      <LoadingButton isLoading={false}>
        Click me
      </LoadingButton>
    );
    expect(screen.getByText('Click me')).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  it('renders loading state when loading', () => {
    render(
      <LoadingButton isLoading={true} text="Loading...">
        Click me
      </LoadingButton>
    );
    expect(screen.queryByText('Click me')).not.toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('disables button when loading', () => {
    render(
      <LoadingButton isLoading={true} text="Loading...">
        Click me
      </LoadingButton>
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies different variants', () => {
    const { rerender } = render(
      <LoadingButton isLoading={false} variant="default">
        Click me
      </LoadingButton>
    );
    expect(screen.getByRole('button')).toHaveClass('bg-gray-200');

    rerender(
      <LoadingButton isLoading={false} variant="primary">
        Click me
      </LoadingButton>
    );
    expect(screen.getByRole('button')).toHaveClass('bg-blue-600');

    rerender(
      <LoadingButton isLoading={false} variant="secondary">
        Click me
      </LoadingButton>
    );
    expect(screen.getByRole('button')).toHaveClass('bg-gray-100');
  });

  it('handles click events when not loading', () => {
    const handleClick = vi.fn();
    render(
      <LoadingButton isLoading={false} onClick={handleClick}>
        Click me
      </LoadingButton>
    );
    screen.getByRole('button').click();
    expect(handleClick).toHaveBeenCalled();
  });

  it('does not handle click events when loading', () => {
    const handleClick = vi.fn();
    render(
      <LoadingButton isLoading={true} onClick={handleClick}>
        Click me
      </LoadingButton>
    );
    screen.getByRole('button').click();
    expect(handleClick).not.toHaveBeenCalled();
  });
}); 