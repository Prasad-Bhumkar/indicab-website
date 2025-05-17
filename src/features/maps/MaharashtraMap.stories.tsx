import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import _MaharashtraMap, { MaharashtraMapProps } from './MaharashtraMap';

export default {
    title: 'Features/Maps/MaharashtraMap',
    component: _MaharashtraMap,
} as Meta<typeof _MaharashtraMap>;

const Template: StoryFn<MaharashtraMapProps> = (args: MaharashtraMapProps): JSX.Element => (

    <_MaharashtraMap {...args} />
);

export const _Default = Template.bind({});
_Default.args = {
    markers: [
        { id: 1, lat: 19.076, lng: 72.8777, label: 'Mumbai' },
        { id: 2, lat: 18.5204, lng: 73.8567, label: 'Pune' }
    ]

};

export const _NoMarkers = Template.bind({});
_NoMarkers.args = {
    markers: []

};
