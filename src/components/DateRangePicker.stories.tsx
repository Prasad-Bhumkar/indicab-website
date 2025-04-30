import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import DateRangePicker, { DateRangePickerProps } from './DateRangePicker';
import { Control, FieldErrors } from 'react-hook-form';

export default {
  title: 'Components/DateRangePicker',
  component: DateRangePicker,
} as Meta;

const Template: StoryFn<DateRangePickerProps> = (args) => <DateRangePicker {...args} />;

const mockControl = {
  _formValues: {
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 3)),
  },
  register: () => {},
  unregister: () => {},
  setValue: () => {},
  getValues: () => {},
  watch: () => {},
  control: {},
} as unknown as Control<any>;

const mockErrors: FieldErrors<any> = {};

export const Default = Template.bind({});
Default.args = {
  control: mockControl,
  startName: 'startDate',
  endName: 'endDate',
  errors: mockErrors,
};
