
import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';

import { VehicleTypeSelector } from './VehicleTypeSelector';

const _meta: Meta<typeof VehicleTypeSelector> = {
    title: 'Components/VehicleTypeSelector',
    component: VehicleTypeSelector,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default _meta;
type Story = StoryObj<typeof VehicleTypeSelector>;

const FormWrapper = (_props: any): JSX.Element => {
    const { control } = useForm({
        defaultValues: {
            vehicleType: '',
        },
    });

    return <VehicleTypeSelector control={control} name="vehicleType" {..._props} />;
};

export const Default: Story = {
    render: () => <FormWrapper />,
};

export const WithError: Story = {
    render: (): JSX.Element => (
        <FormWrapper
            error={{
                type: 'required',
                message: 'Please select a vehicle type',
            }}
        />
    ),
};

export const Disabled: Story = {
    render: () => <FormWrapper disabled />,
};

const _FormWrapperWithSelectedValue = (_props: any): JSX.Element => {
    const { control } = useForm({
        defaultValues: {
            vehicleType: 'premium',
        },
    });

    return <VehicleTypeSelector control={control} name="vehicleType" {..._props} />;
};

export const WithSelectedValue: Story = {
    render: () => <_FormWrapperWithSelectedValue />,
};
