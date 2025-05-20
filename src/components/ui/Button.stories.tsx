import type { Meta, StoryFn } from '@storybook/react';

import { Button } from './button';

const meta: Meta<typeof Button> = {
    title: 'UI/Button',
    component: Button,
};
export default meta;

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />;

export const _Default = Template.bind({});
_Default.args = {
    children: 'Default Button',
};

export const _Disabled = Template.bind({});
_Disabled.args = {
    children: 'Disabled Button',
    disabled: true,
};

export const _Secondary = Template.bind({});
_Secondary.args = {
    children: 'Secondary Button',
    variant: 'secondary',
};
