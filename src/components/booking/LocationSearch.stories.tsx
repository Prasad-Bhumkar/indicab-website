import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import LocationSearch, { LocationSearchProps } from './LocationSearch';

const mockControl = {
  _formValues: {},
  _fields: {},
  _formState: {},
  _proxyFormState: {},
  _defaultValues: {},
  _names: {
    mount: new Set<string>(),
    unMount: new Set<string>(),
    disabled: new Set<string>(),
    array: new Set<string>(),
    watch: new Set<string>(),
  },
  _subjects: {
    state: { subscribe: () => ({ unsubscribe: () => {} }) },
    watch: { subscribe: () => ({ unsubscribe: () => {} }) },
    array: { subscribe: () => ({ unsubscribe: () => {} }) },
  },
  register: () => {},
  unregister: () => {},
  setValue: () => {},
  getValues: () => {},
  watch: () => {},
  control: {},
} as any;

export default {
  title: 'Components/Booking/LocationSearch',
  component: LocationSearch,
} as Meta;

const Template: StoryFn<LocationSearchProps> = (args) => <LocationSearch {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'location',
  control: mockControl,
  label: 'Location',
  placeholder: 'Enter location',
};
