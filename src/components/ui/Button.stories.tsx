import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Button from './Button';

export default {
  title: 'UI/Button',
  component: Button,
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args: any) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Click Me',
  variant: 'primary',
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'Disabled',
  variant: 'primary',
  disabled: true,
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Secondary',
  variant: 'secondary',
  disabled: false,
};
