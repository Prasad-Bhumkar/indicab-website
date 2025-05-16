import type { Meta, StoryObj } from '@storybook/react';
import { BookingProvider } from '../context/BookingContext';
import BookingForm from './BookingForm';

const meta: Meta<typeof BookingForm> = {
  title: 'Components/BookingForm',
  component: BookingForm,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <BookingProvider>
        <Story />
      </BookingProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BookingForm>;

export const Default: Story = {
  args: {},
};

export const WithPrefilledData: Story = {
  args: {
    initialData: {
      pickupLocation: 'Mumbai Airport',
      dropLocation: 'Pune City',
      pickupDate: '2024-04-01T10:00',
      returnDate: '2024-04-03T10:00',
      vehicleType: 'SUV',
    },
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const WithError: Story = {
  args: {
    error: 'Failed to create booking. Please try again.',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithSuccessMessage: Story = {
  args: {
    successMessage: 'Booking created successfully! Your fare is ₹1,000',
  },
};
