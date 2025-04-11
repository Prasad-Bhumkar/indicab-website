import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import TourPackageCard, { TourPackageCardProps } from './TourPackageCard';

export default {
  title: 'Packages/TourPackageCard',
  component: TourPackageCard,
} as Meta<typeof TourPackageCard>;

const Template: StoryFn<TourPackageCardProps> = (args: TourPackageCardProps) => (
  <TourPackageCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'Exciting Tour Package',
  description: 'Explore the beautiful landscapes and attractions.',
  price: 1200,
};

export const WithDiscount = Template.bind({});
WithDiscount.args = {
  title: 'Exciting Tour Package',
  description: 'Explore the beautiful landscapes and attractions.',
  price: 1000,
  discount: '15% off',
};
