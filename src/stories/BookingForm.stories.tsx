import { StoryFn, Meta } from '@storybook/react';
import BookingForm from '../components/BookingForm';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const bookingSchema = z.object({
  pickup: z.string().min(1, 'Pickup location is required'),
  destination: z.string().min(1, 'Destination is required'),
  startDate: z.date(),
  endDate: z.date(),
  vehicleType: z.string().min(1, 'Vehicle type is required')
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default {
  title: 'Features/BookingForm',
  component: BookingForm,
} as Meta<typeof BookingForm>;

const Template: StoryFn = (args) => <BookingForm {...args} />;

export const Default = Template.bind({});
Default.args = {};
