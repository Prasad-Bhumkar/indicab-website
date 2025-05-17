import { StoryFn, Meta } from '@storybook/react';
import BookingForm from '../components/BookingForm';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { BookingContext } from '../context/BookingContext';
import { AuthContext } from '../context/AuthContext';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { vi } from 'vitest';
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Load Stripe using loadStripe utility
const stripePromise = loadStripe('your-publishable-key-here'); // Replace with your actual Stripe publishable key

// Mock Next.js navigation hooks
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    refresh: vi.fn(),
    forward: vi.fn(),
    beforePopState: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock Next.js app router
const appRouter = {
  back: vi.fn(),
  forward: vi.fn(),
  push: vi.fn(),
  replace: vi.fn(),
  refresh: vi.fn(),
  prefetch: vi.fn(),
};

const bookingSchema = z.object({
  pickup: z.string().min(1, 'Pickup location is required'),
  destination: z.string().min(1, 'Destination is required'),
  startDate: z.date(),
  endDate: z.date(),
  vehicleType: z.string().min(1, 'Vehicle type is required')
});

type BookingFormData = z.infer<typeof bookingSchema>;

// Mock context providers wrapper
const ContextWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const mockDispatch = vi.fn();
  const mockUser = {
    id: '123',
    email: 'test@example.com',
  };

  const mockBookingState = {
    id: '1',
    pickupLocation: 'Mumbai',
    dropLocation: 'Pune',
    pickupDate: new Date(),
    dropDate: new Date(new Date().setDate(new Date().getDate() + 3)),
    vehicleType: 'Sedan',
    fare: 1000,
    customerId: '123',
    status: 'pending'
  };

  return (
    <AppRouterContext.Provider value={appRouter}>
      <AuthContext.Provider value={{ user: mockUser, status: 'authenticated', signIn: vi.fn(), signOut: vi.fn() }}>
        <BookingContext.Provider value={{ state: { ...mockBookingState, pickupDate: mockBookingState.pickupDate.toISOString(), returnDate: mockBookingState.dropDate.toISOString(), status: 'pending' }, dispatch: mockDispatch }}>
          <Elements stripe={stripePromise}>
            {children}
          </Elements>
        </BookingContext.Provider>
      </AuthContext.Provider>
    </AppRouterContext.Provider>
  );
};

export default {
  title: 'Features/BookingForm',
  component: BookingForm,
  decorators: [
    (Story) => (
      <ContextWrapper>
        <Story />
      </ContextWrapper>
    ),
  ],
} as Meta<typeof BookingForm>;

const Template: StoryFn = (args) => <BookingForm {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithData = Template.bind({});
WithData.args = {
  pickup: 'Mumbai',
  destination: 'Pune',
  startDate: new Date(),
  endDate: new Date(new Date().setDate(new Date().getDate() + 3)),
  vehicleType: 'Sedan',
};

export const WithValidationErrors = Template.bind({});
WithValidationErrors.args = {
  pickup: '',
  destination: '',
  startDate: new Date(),
  endDate: new Date(new Date().setDate(new Date().getDate() - 1)),
  vehicleType: '',
};