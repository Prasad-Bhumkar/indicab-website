import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './button';

export default {
    title: 'UI/Button',
    component: Button,
} as Meta<typeof Button>;

const Template: StoryObj<typeof Button> = (args: any) => <Button {...args} />;

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
