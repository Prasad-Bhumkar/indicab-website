import { Controller, Control, FieldErrors } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import React from 'react'

const DatePickerComponent = DatePicker as unknown as React.ComponentType<any>

export interface DateRangePickerProps {
  control: Control<any>
  startName: string
  endName: string
  errors: FieldErrors<any>
}

function renderErrorMessage(error: string | { message?: string } | undefined) {
  if (!error) return null
  const message = typeof error === 'string' ? error : error.message
  return <p className="mt-1 text-sm text-red-600">{message}</p>
}

export default function DateRangePicker({ control, startName, endName, errors }: DateRangePickerProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Start Date
        </label>
        <Controller
          name={startName}
          control={control}
          render={({ field }) => (
            <DatePickerComponent
              selected={field.value}
              onChange={(date: Date | null) => field.onChange(date)}
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
          render={({ field }) => (
            <DatePickerComponent
              selected={field.value}
              onChange={(date: Date | null) => field.onChange(date)}
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
