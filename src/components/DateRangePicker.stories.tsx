import React from 'react';

import type { Meta, StoryFn } from '@storybook/react';
import { useForm } from 'react-hook-form';

import type { DateRangePickerProps } from './DateRangePicker';
import DateRangePicker from './DateRangePicker';


export default {
    title: 'Components/DateRangePicker',
    component: DateRangePicker,
} as Meta;

const Template: StoryFn<DateRangePickerProps> = (_args) => <DateRangePicker {..._args} />;

export const Default = (): JSX.Element => {
    const { control, formState: { errors } } = useForm({
        defaultValues: {
            startDate: new Date(),
            endDate: new Date(new Date().setDate(new Date().getDate() + 3)),
        },
    });

    return (
        <DateRangePicker
            control={control}
            startName="startDate"
            endName="endDate"
            errors={errors}
        />
    );
};
