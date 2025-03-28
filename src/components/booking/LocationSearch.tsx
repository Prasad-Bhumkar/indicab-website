'use client'
import { Control, FieldError } from 'react-hook-form'

interface LocationSearchProps {
  name: string
  control: Control<any>
  label: string
  placeholder: string
  error?: FieldError
  disabled?: boolean
}

export default function LocationSearch({
  name,
  control,
  label,
  placeholder,
  error,
  disabled = false
}: LocationSearchProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        {...control.register(name)}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-md ${error ? 'border-red-500' : 'border-gray-300'} ${disabled ? 'bg-gray-100' : ''}`}
        disabled={disabled}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  )
}