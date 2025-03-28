'use client'
import { Control, FieldError } from 'react-hook-form'

interface VehicleType {
  id: string
  label: string
}

interface VehicleTypeSelectorProps {
  name: string
  control: Control<any>
  error?: FieldError
  disabled?: boolean
}

const vehicleTypes: VehicleType[] = [
  { id: 'economy', label: 'Economy' },
  { id: 'standard', label: 'Standard' },
  { id: 'premium', label: 'Premium' },
  { id: 'luxury', label: 'Luxury' }
]

export default function VehicleTypeSelector({
  name,
  control,
  error,
  disabled = false
}: VehicleTypeSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
      <div className="grid grid-cols-2 gap-2">
        {vehicleTypes.map((type) => (
          <label 
            key={type.id}
            className={`flex items-center p-3 border rounded-md cursor-pointer ${
              error ? 'border-red-500' : 'border-gray-300'
            } ${disabled ? 'bg-gray-100' : ''}`}
          >
            <input
              type="radio"
              value={type.id}
              {...control.register(name)}
              className="mr-2"
              disabled={disabled}
            />
            {type.label}
          </label>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  )
}