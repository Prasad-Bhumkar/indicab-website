import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import _CorporatePackageCard, { CorporatePackageCardProps } from './CorporatePackageCard';

export default {
    title: 'Packages/CorporatePackageCard',
    component: _CorporatePackageCard,
} as Meta<typeof _CorporatePackageCard>;

const Template: StoryFn<CorporatePackageCardProps> = (args: CorporatePackageCardProps): JSX.Element => (
    <_CorporatePackageCard {...args} />
);

export const _Standard = Template.bind({});
_Standard.args = {
    title: 'Premium Package',
    description: 'All-inclusive corporate solution',
    price: 999,
};

export const _WithDiscount = Template.bind({});
_WithDiscount.args = {
    title: 'Premium Package',
    description: 'All-inclusive corporate solution',
    price: 999,
    discount: '20% off'
};
