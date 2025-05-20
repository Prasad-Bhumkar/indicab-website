import React from 'react';

import type { Meta, StoryFn } from '@storybook/react';

import _FloatingActionButton from './FloatingActionButton';
import type { FloatingActionButtonProps } from './FloatingActionButton';

export default {
    title: 'Shared/FloatingActionButton',
    component: _FloatingActionButton,
} as Meta<typeof _FloatingActionButton>;

const Template: StoryFn<FloatingActionButtonProps> = (args: FloatingActionButtonProps): JSX.Element => (
    <_FloatingActionButton {...args} />
);

export const _Default = Template.bind({});
_Default.args = {
    icon: 'plus',
    position: 'bottom-right',
};

export const _DifferentPosition = Template.bind({});
_DifferentPosition.args = {
    icon: 'edit',
    position: 'top-left',
};

export const _WithTooltip = Template.bind({});
_WithTooltip.args = {
    icon: 'settings',
    tooltip: 'Settings',
    position: 'bottom-right',
};
