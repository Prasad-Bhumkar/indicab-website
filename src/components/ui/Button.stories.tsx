import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import _Button from './Button';

export default {
    title: 'UI/Button',
    component: _Button,
} as Meta<typeof _Button>;

const Template: StoryFn<typeof _Button> = (args: any) => <_Button {...args} />;

export const _Default = Template.bind({});
_Default.args = {
    children: 'Click Me',
    variant: 'primary',
    disabled: false,
};

export const _Disabled = Template.bind({});
_Disabled.args = {
    children: 'Disabled',
    variant: 'primary',
    disabled: true,
};

export const _Secondary = Template.bind({});
_Secondary.args = {
    children: 'Secondary',
    variant: 'secondary',
    disabled: false,
};
