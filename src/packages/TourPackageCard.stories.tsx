import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import _TourPackageCard, { TourPackageCardProps } from './TourPackageCard';

export default {
    title: 'Packages/TourPackageCard',
    component: _TourPackageCard,
} as Meta<typeof _TourPackageCard>;

const Template: StoryFn<TourPackageCardProps> = (args: TourPackageCardProps): JSX.Element => (
    <_TourPackageCard {...args} />
);

export const _Default = Template.bind({});
_Default.args = {
    title: 'Exciting Tour Package',
    description: 'Explore the beautiful landscapes and attractions.',
    price: 1200,
};

export const _WithDiscount = Template.bind({});
_WithDiscount.args = {
    title: 'Exciting Tour Package',
    description: 'Explore the beautiful landscapes and attractions.',
    price: 1000,
    discount: '15% off',
};
