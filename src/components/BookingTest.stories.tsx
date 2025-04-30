import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import BookingTest from './BookingTest';

export default {
  title: 'Components/BookingTest',
  component: BookingTest,
} as Meta;

const Template: StoryFn = (args) => <BookingTest {...args} />;

export const Default = Template.bind({});
Default.args = {};
