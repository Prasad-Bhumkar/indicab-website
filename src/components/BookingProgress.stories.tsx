import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import BookingProgress from './BookingProgress';

export default {
  title: 'Components/BookingProgress',
  component: BookingProgress,
} as Meta;

const Template: StoryFn = (args) => <BookingProgress {...args} />;

export const Default = Template.bind({});
Default.args = {};
