import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import _DriverApplicationForm, { DriverApplicationFormProps } from './DriverApplicationForm';

export default {
    title: 'Features/Drivers/DriverApplicationForm',
    component: _DriverApplicationForm,
} as Meta<typeof _DriverApplicationForm>;

const Template: StoryFn<DriverApplicationFormProps> = (args: DriverApplicationFormProps): JSX.Element => (
    <_DriverApplicationForm {...args} />
);

export const _Default = Template.bind({});
_Default.args = {
    onSubmit: (_data: Record<string, string>) => console.log('Form submitted:', _data),
};

export const _Loading = Template.bind({});
_Loading.args = {
    onSubmit: (_data: Record<string, string>) => console.log('Form submitted:', _data),
    loading: true,
};

export const _WithError = Template.bind({});
_WithError.args = {
    onSubmit: (_data: Record<string, string>) => console.log('Form submitted:', _data),
    error: 'There was an error submitting your application',
};
