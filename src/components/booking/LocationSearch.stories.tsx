import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import LocationSearch, { LocationSearchProps } from './LocationSearch';

const _mockControl = {
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
        state: { subscribe: () => ({ unsubscribe: () => { } }) },
        watch: { subscribe: () => ({ unsubscribe: () => { } }) },
        array: { subscribe: () => ({ unsubscribe: () => { } }) },
    },
    register: () => { },
    unregister: () => { },
    setValue: () => { },
    getValues: () => { },
    watch: () => { },
    control: {},
} as any;

export default {
    title: 'Components/Booking/LocationSearch',
    component: LocationSearch,
} as Meta;

const _Template: StoryFn<LocationSearchProps> = (args) => <LocationSearch {...args} />;

export const _Default = _Template.bind({});
_Default.args = {
    name: 'location',
    control: _mockControl,
    label: 'Location',
    placeholder: 'Enter location',
};
