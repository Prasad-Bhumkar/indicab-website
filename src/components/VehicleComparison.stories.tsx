import React from 'react';

import type { Meta, StoryFn } from '@storybook/react';

import type { VehicleType } from '../types/vehicle';

import _VehicleComparison from './VehicleComparison';

export default {
    title: 'Components/VehicleComparison',
    component: _VehicleComparison,
} as Meta;

const Template: StoryFn<{ vehicles?: VehicleType[]; initialDistance?: number }> = (args) => <_VehicleComparison {...args} />;

export const _Default = Template.bind({});
_Default.args = {
    vehicles: [
        { id: '1', name: 'Economy', price: 30, image: '', capacity: 4, features: [] },
        { id: '2', name: 'Sedan', price: 50, image: '', capacity: 4, features: [] },
        { id: '3', name: 'SUV', price: 70, image: '', capacity: 6, features: [] },
    ],
    initialDistance: 100,
};

export const _Empty = Template.bind({});
_Empty.args = {
    vehicles: [],
    initialDistance: 0,
};
