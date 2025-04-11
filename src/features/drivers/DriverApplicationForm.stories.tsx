import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import DriverApplicationForm, { DriverApplicationFormProps } from './DriverApplicationForm';

export default {
  title: 'Features/Drivers/DriverApplicationForm',
  component: DriverApplicationForm,
} as Meta<typeof DriverApplicationForm>;

const Template: StoryFn<DriverApplicationFormProps> = (args: DriverApplicationFormProps) => (
  <DriverApplicationForm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  onSubmit: (data: Record<string, string>) => console.log('Form submitted:', data),
};

export const Loading = Template.bind({});
Loading.args = {
  onSubmit: (data: Record<string, string>) => console.log('Form submitted:', data),
  loading: true,
};

export const WithError = Template.bind({});
WithError.args = {
  onSubmit: (data: Record<string, string>) => console.log('Form submitted:', data),
  error: 'There was an error submitting your application',
};
