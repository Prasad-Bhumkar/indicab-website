import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import CorporatePackageCard, { CorporatePackageCardProps } from './CorporatePackageCard';

export default {
  title: 'Packages/CorporatePackageCard',
  component: CorporatePackageCard,
} as Meta<typeof CorporatePackageCard>;

const Template: StoryFn<CorporatePackageCardProps> = (args: CorporatePackageCardProps) => (
  <CorporatePackageCard {...args} />
);

export const Standard = Template.bind({});
Standard.args = {
  title: 'Premium Package',
  description: 'All-inclusive corporate solution',
  price: 999,
};

export const WithDiscount = Template.bind({});
WithDiscount.args = {
  title: 'Premium Package',
  description: 'All-inclusive corporate solution',
  price: 999,
  discount: '20% off'
};
