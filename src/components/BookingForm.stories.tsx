import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import BookingForm from './BookingForm';

export default {
  title: 'Components/BookingForm',
  component: BookingForm,
} as Meta;

const Template: StoryFn = (args) => <BookingForm {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithInitialData = Template.bind({});
WithInitialData.args = {
  pickup: 'Mumbai',
  destination: 'Pune',
  startDate: new Date(),
  endDate: new Date(new Date().setDate(new Date().getDate() + 3)),
  vehicleType: 'Sedan',
};
