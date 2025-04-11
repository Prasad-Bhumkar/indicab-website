import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import MaharashtraMap, { MaharashtraMapProps } from './MaharashtraMap';

export default {
  title: 'Features/Maps/MaharashtraMap',
  component: MaharashtraMap,
} as Meta<typeof MaharashtraMap>;

const Template: StoryFn<MaharashtraMapProps> = (args: MaharashtraMapProps) => (

  <MaharashtraMap {...args} />
);

export const Default = Template.bind({});
Default.args = {
  markers: [
    { id: 1, lat: 19.076, lng: 72.8777, label: 'Mumbai' },
    { id: 2, lat: 18.5204, lng: 73.8567, label: 'Pune' }
  ]

};

export const NoMarkers = Template.bind({});
NoMarkers.args = {
  markers: []

};
