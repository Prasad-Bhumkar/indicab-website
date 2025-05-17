import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import BookingProgress from './BookingProgress';
import { BookingProvider } from '../context/BookingContext';

export default {
  title: 'Components/BookingProgress',
  component: BookingProgress,
  decorators: [
    (Story) => (
      <BookingProvider>
        <Story />
      </BookingProvider>
    ),
  ],
} as Meta;

const Template: StoryFn = (args) => <BookingProgress {...args} />;

export const Default = Template.bind({});
Default.args = {};
