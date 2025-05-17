import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import VehicleTypeSelector from './VehicleTypeSelector';

const meta: Meta<typeof VehicleTypeSelector> = {
  title: 'Components/VehicleTypeSelector',
  component: VehicleTypeSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof VehicleTypeSelector>;

const FormWrapper = (props: any) => {
  const { control } = useForm({
    defaultValues: {
      vehicleType: '',
    },
  });

  return <VehicleTypeSelector control={control} name="vehicleType" {...props} />;
};

export const Default: Story = {
  render: () => <FormWrapper />,
};

export const WithError: Story = {
  render: () => (
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

const FormWrapperWithSelectedValue = (props: any) => {
  const { control } = useForm({
    defaultValues: {
      vehicleType: 'premium',
    },
  });

  return <VehicleTypeSelector control={control} name="vehicleType" {...props} />;
};

export const WithSelectedValue: Story = {
  render: () => <FormWrapperWithSelectedValue />,
};
