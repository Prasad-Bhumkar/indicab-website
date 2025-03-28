import { Controller } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface DateRangePickerProps {
  control: any
  startName: string
  endName: string
  errors: any
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
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              selectsStart
              startDate={field.value}
              endDate={control._formValues[endName]}
              minDate={new Date()}
              className="w-full px-3 py-2 border rounded-md"
            />
          )}
        />
        {errors[startName] && (
          <p className="mt-1 text-sm text-red-600">{errors[startName].message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          End Date
        </label>
        <Controller
          name={endName}
          control={control}
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              selectsEnd
              startDate={control._formValues[startName]}
              endDate={field.value}
              minDate={control._formValues[startName] || new Date()}
              className="w-full px-3 py-2 border rounded-md"
            />
          )}
        />
        {errors[endName] && (
          <p className="mt-1 text-sm text-red-600">{errors[endName].message}</p>
        )}
      </div>
    </div>
  )
}