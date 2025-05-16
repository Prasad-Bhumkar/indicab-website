import type { Meta, StoryObj } from '@storybook/react';
import { ErrorBoundary } from './ErrorBoundary';
import { ErrorBoundaryExample } from './features/examples/ErrorBoundaryExample';

// Temporary ErrorThrowingComponent for demonstration
const ErrorThrowingComponent = () => {
  throw new Error('This is a test error');
};

const meta: Meta<typeof ErrorBoundary> = {
  title: 'Components/ErrorBoundary',
  component: ErrorBoundary,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ErrorBoundary>;

export const Default: Story = {
  render: () => (
    <ErrorBoundary>
      <div>This component will not throw errors</div>
    </ErrorBoundary>
  )
};

export const WithError: Story = {
  render: () => <ErrorBoundaryExample />
};

export const CustomFallback: Story = {
  render: () => (
    <ErrorBoundary fallback={<div style={{color: 'red'}}>Custom error message</div>}>
      <ErrorThrowingComponent />
    </ErrorBoundary>
  )
};
