import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import AppErrorBoundary from './AppErrorBoundary';

export default {
    title: 'Components/Common/AppErrorBoundary',
    component: AppErrorBoundary,
} as Meta;

const _Template: StoryFn = (args) => <AppErrorBoundary {...args} />;

export const _Default = _Template.bind({});
_Default.args = {
    children: <div>Test child content</div>,
};
