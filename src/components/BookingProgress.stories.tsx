import React from 'react';

import type { Meta, StoryFn } from '@storybook/react';

import { BookingProvider } from '../context/BookingContext';

import _BookingProgress from './BookingProgress';

export default {
    title: 'Components/BookingProgress',
    component: _BookingProgress,
    decorators: [
        (_Story): JSX.Element => (
            <BookingProvider>
                <_Story />
            </BookingProvider>
        ),
    ],
} as Meta;

const _Template: StoryFn = (args) => <_BookingProgress {...args} />;

export const _Default = _Template.bind({});
_Default.args = {};
