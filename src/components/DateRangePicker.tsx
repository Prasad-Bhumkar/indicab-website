import { Controller, Control, FieldErrors } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import React from 'react'
import { DateRange } from '@/lib/types'

const DatePickerComponent = DatePicker as unknown as React.ComponentType<any>

export interface DateRangePickerProps {
    control: Control<any>
    startName: string
    endName: string
    errors: FieldErrors<any>
    startDate: Date | null
    endDate: Date | null
    onChange: (range: DateRange) => void
    minDate?: Date
    maxDate?: Date
}

function renderErrorMessage(error: string | { message?: string } | undefined): JSX.Element {
    if (!error) return null
    const message = typeof error === 'string' ? error : error.message
    return <p className="mt-1 text-sm text-red-600">{message}</p>
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
    control,
    startName,
    endName,
    errors,
    startDate,
    endDate,
    onChange,
    minDate,
    maxDate
}): JSX.Element => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                </label>
                <Controller
                    name={startName}
                    control={control}
                    render={({ field }): JSX.Element => (
                        <DatePickerComponent
                            selected={field.value}
                            onChange={(_date: Date | null) => field.onChange(_date)}
                            selectsStart
                            startDate={field.value}
                            endDate={control._formValues[endName]}
                            minDate={new Date()}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    )}
                />
                {renderErrorMessage(errors[startName])}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                </label>
                <Controller
                    name={endName}
                    control={control}
                    render={({ field }): JSX.Element => (
                        <DatePickerComponent
                            selected={field.value}
                            onChange={(_date: Date | null) => field.onChange(_date)}
                            selectsEnd
                            startDate={control._formValues[startName]}
                            endDate={field.value}
                            minDate={control._formValues[startName] || new Date()}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    )}
                />
                {renderErrorMessage(errors[endName])}
            </div>
        </div>
    )
}
