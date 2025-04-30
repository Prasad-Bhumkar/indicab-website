import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import VehicleComparison from './VehicleComparison';
import { VehicleType } from '../types/vehicle';

export default {
  title: 'Components/VehicleComparison',
  component: VehicleComparison,
} as Meta;

const Template: StoryFn<{ vehicles?: VehicleType[]; initialDistance?: number }> = (args) => <VehicleComparison {...args} />;

export const Default = Template.bind({});
Default.args = {
  vehicles: [
    { id: '1', name: 'Economy', price: 30, image: '', capacity: 4, features: [] },
    { id: '2', name: 'Sedan', price: 50, image: '', capacity: 4, features: [] },
    { id: '3', name: 'SUV', price: 70, image: '', capacity: 6, features: [] },
  ],
  initialDistance: 100,
};

export const Empty = Template.bind({});
Empty.args = {
  vehicles: [],
  initialDistance: 0,
};
